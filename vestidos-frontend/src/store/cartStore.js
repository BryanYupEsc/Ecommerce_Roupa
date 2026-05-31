import {create} from 'zustand';

const useCartStore = create((set, get) => ({
    items: [],

    //agregar vestido al carrito
    addItem: (product) => {
        const items = get().items
        const existing = items.find(item => item.id ===product.id)

        if(existing){
            set({
                items: items.map(item =>
                    item.id === product.id
                    ? {...item, cantidad: item.cantidad + 1}
                    : item
                )
            })
        }else{
            set({ items: [...items, {...product, cantidad: 1}]})
        }
    },

    //quitar vestido del carrito
    removeItem: (prodcutId) => {
        set({ items: get().items.filter(item => item.id !== productId)})
    },

    //cambiar cantidad de un vestido en el carrito
    updateCantidad: (prodcutId, cantidad) =>{
        if(cantidad <= 0){
            get().removeItem(productId)
            return
        }
        set({
            items: get().items.map(item =>
                item.id === productId ? {...item, cantidad } : item
            )
        })
    },

    //Vaciar carrito
    clearCart: () => set({ items: []}),

    //totla del carrito
    getTotal: () => {
        return get().items.reduce((total, item)=>{
            return total + (item.precio * item.cantidad)
        }, 0)
    },

    // cantidad total de items en el carrito
    getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.cantidad, 0)
    }
}))

export default useCartStore