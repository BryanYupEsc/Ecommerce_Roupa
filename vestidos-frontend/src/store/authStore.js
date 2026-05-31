import { create } from 'zustand'

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,

  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user))
    set({ user })
  },

  logout: () => {
    localStorage.removeItem('user')
    set({ user: null })
  },

  isAdmin: () => {
    const user = JSON.parse(localStorage.getItem('user'))
    return user?.rol === 'ADMIN'
  }
}))

export default useAuthStore