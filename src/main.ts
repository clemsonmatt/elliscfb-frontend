import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth.store'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

// Add a request interceptor for auth token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// redirect to login page if needed
// axios.interceptors.response.use(undefined, function (error) {
//   const authStore = useAuthStore()

//   if (error) {
//     const originalRequest = error.config
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true
//       // store.dispatch('LogOut')
//       authStore.logout()
//       return router.push({ name: 'cfb_login' })
//     }
//   }
// })

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
