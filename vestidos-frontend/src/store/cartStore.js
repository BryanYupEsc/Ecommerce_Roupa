import { create } from 'zustand'

const useCartStore = create((set, get) => ({
  items: [],

  addItem: (product) => {
    const items = get().items
    const existing = items.find(item => item.id === product.id)
    if (existing) {
      set({
        items: items.map(item =>
          item.id === product.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      })
    } else {
      set({ items: [...items, { ...product, cantidad: 1 }] })
    }
  },

  removeItem: (id) => {
    set({ items: get().items.filter(item => item.id !== id) })
  },

  updateCantidad: (id, cantidad) => {
    if (cantidad <= 0) {
      set({ items: get().items.filter(item => item.id !== id) })
      return
    }
    set({
      items: get().items.map(item =>
        item.id === id ? { ...item, cantidad } : item
      )
    })
  },

  clearCart: () => set({ items: [] }),

  getTotal: () => {
    return get().items.reduce((total, item) => {
      return total + (item.precio * item.cantidad)
    }, 0)
  },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.cantidad, 0)
  }
}))

export default useCartStore