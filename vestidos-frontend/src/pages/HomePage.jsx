import { useState, useEffect } from 'react'
import productService from '../services/productService'

function HomePage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
      <h1>Tienda de Vestidos</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {products.map(product => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '16px', width: '200px' }}>
            <h3>{product.nombre}</h3>
            <p>{product.descripcion}</p>
            <p><strong>Precio:</strong> ${product.precio}</p>
            <p><strong>Talla:</strong> {product.talla}</p>
            <p><strong>Color:</strong> {product.color}</p>
            <p><strong>Material:</strong> {product.material}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage