import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import productService from '../services/productService'
import useCartStore from '../store/cartStore'

function HomePage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const addItem = useCartStore(state => state.addItem)
  const navigate = useNavigate()

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
      <div style={{ padding: '16px' }}>
        <h1>Tienda de Vestidos</h1>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', padding: '16px' }}>
        {products.map(product => (
          <div
            key={product.id}
            style={{ border: '1px solid #ccc', padding: '16px', width: '200px', borderRadius: '8px', cursor: 'pointer' }}
          >
            <div onClick={() => navigate(`/products/${product.id}`)}>
              <h3>{product.nombre}</h3>
              <p style={{ fontSize: '12px', color: '#666' }}>{product.descripcion}</p>
              <p><strong>${product.precio}</strong></p>
              <p>Talla: {product.talla} | Color: {product.color}</p>
            </div>
            <button
              onClick={() => addItem(product)}
              style={{ backgroundColor: '#000', color: '#fff', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%', marginTop: '8px' }}
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