import { useState, useEffect } from 'react'
import productService from '../services/productService'
import useCartStore from '../store/cartStore'

function HomePage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const addItem = useCartStore(state => state.addItem)
  const items = useCartStore(state => state.items)
  const totalItems = items.reduce((total, item) => total + item.cantidad, 0)

  useEffect(() => {
    productService.getAllProducts()
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
      .catch(err => {
        setError('Error al cargar los vestidos')
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Cargando vestidos...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px' }}>
        <h1>Tienda de Vestidos</h1>
        <p>🛒 {totalItems} items en el carrito</p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', padding: '16px' }}>
        {products.map(product => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '16px', width: '200px', borderRadius: '8px' }}>
            <h3>{product.nombre}</h3>
            <p>{product.descripcion}</p>
            <p><strong>Precio:</strong> ${product.precio}</p>
            <p><strong>Talla:</strong> {product.talla}</p>
            <p><strong>Color:</strong> {product.color}</p>
            <p><strong>Material:</strong> {product.material}</p>
            <button
              onClick={() => addItem(product)}
              style={{ backgroundColor: '#000', color: '#fff', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%' }}
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage