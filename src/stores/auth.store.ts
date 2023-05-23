import { defineStore } from 'pinia'
import router from '@/router'
import axios from 'axios'

const currentUser = localStorage.getItem('user')

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    user: currentUser ? JSON.parse(currentUser) : null,
    returnUrl: null
  }),
  actions: {
    async login(email: String, password: String) {
      await axios.post('/login', { email: email, password: password }).then((response) => {
        localStorage.setItem('token', response.data.token)

        this.user = response.data.user
        localStorage.setItem('user', JSON.stringify(this.user))

        router.push(this.returnUrl || '/')
      })
    },
    logout() {
      this.user = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      router.push('/login')
    }
  }
})
