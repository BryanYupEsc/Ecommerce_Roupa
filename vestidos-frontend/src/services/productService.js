import api from './api'

const productService = {

  // Traer todos los vestidos
  getAllProducts: async () => {
    const response = await api.get('/products')
    return response.data
  },

  // Traer un vestido por id
  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`)
    return response.data
  },

  // Traer vestidos por categoría
  getProductsByCategory: async (categoryId) => {
    const response = await api.get(`/products/category/${categoryId}`)
    return response.data
  },

  // Traer vestidos por talla
  getProductsByTalla: async (talla) => {
    const response = await api.get(`/products/talla/${talla}`)
    return response.data
  },

  // Crear vestido (admin)
  createProduct: async (product) => {
    const response = await api.post('/products', product)
    return response.data
  },

  // Actualizar vestido (admin)
  updateProduct: async (id, product) => {
    const response = await api.put(`/products/${id}`, product)
    return response.data
  },

  // Eliminar vestido (admin)
  deleteProduct: async (id) => {
    const response = await api.delete(`/products/${id}`)
    return response.data
  }
}

export default productService