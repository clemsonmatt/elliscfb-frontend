import { defineStore } from 'pinia'
import router from '@/router'
import axios from 'axios'

const currentUser = localStorage.getItem('user')
const userRoles = localStorage.getItem('roles')

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    user: currentUser ? JSON.parse(currentUser) : null,
    canManage: userRoles && JSON.parse(userRoles) == 'manage' ? true : false,
    returnUrl: null
  }),
  actions: {
    async login(email: String, password: String) {
      await axios.post('/login', { email: email, password: password }).then((response) => {
        // set token
        localStorage.setItem('token', response.data.token)

        // set user
        this.user = response.data.user
        localStorage.setItem('user', JSON.stringify(this.user))

        // set permissions
        localStorage.setItem('roles', JSON.stringify(response.data.roles))

        router.push(this.returnUrl || '/')
      })
    },

    async updateUser() {
      await axios.get('/users/details').then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data.user))
        localStorage.setItem('roles', JSON.stringify(response.data.roles))
      })
    },

    logout() {
      this.user = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      localStorage.removeItem('roles')
      router.push('/login')
    }
  }
})
