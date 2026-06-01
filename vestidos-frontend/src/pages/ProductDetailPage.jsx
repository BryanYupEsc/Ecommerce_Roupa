import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import productService from '../services/productService'
import useCartStore from '../store/cartStore'


function ProductDetailPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [added, setAdded] = useState(false)
    const addItem = useCartStore(state => state.addItem)


    useEffect(() => {
        productService.getProductById(id)
            .then(data => {
                setProduct(data)
                setLoading(false)
            })
            .catch(()=> {
                setLoading(false)
            })
    }, [id])

    const handleAddToCart = () => {
        addItem(product)
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
    }

    if (loading) return <p style={{ padding: '32px'}}>Cargando...</p>
    if (!product) return <p style={{ padding: '32px'}}>Vestido no encontrado</p>

    return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px' }}>
      <button
        onClick={() => navigate('/')}
        style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '16px', marginBottom: '24px' }}
      >
        ← Volver al catálogo
      </button>

      <div style={{ display: 'flex', gap: '32px' }}>

        {/* Imagen */}
        <div style={{ width: '350px', height: '400px', backgroundColor: '#f0f0f0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {product.imagenUrl ? (
            <img src={product.imagenUrl} alt={product.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
          ) : (
            <span style={{ fontSize: '80px' }}>👗</span>
          )}
        </div>

        {/* Información */}
        <div style={{ flex: 1 }}>
          <h1 style={{ marginBottom: '8px' }}>{product.nombre}</h1>
          <p style={{ color: '#666', marginBottom: '16px' }}>{product.category?.nombre}</p>
          <h2 style={{ fontSize: '28px', marginBottom: '24px' }}>${product.precio}</h2>

          <div style={{ marginBottom: '16px' }}>
            <p><strong>Descripción:</strong></p>
            <p style={{ color: '#444' }}>{product.descripcion}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
            <div style={{ backgroundColor: '#f9f9f9', padding: '12px', borderRadius: '4px' }}>
              <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>TALLA</p>
              <p style={{ margin: 0, fontWeight: 'bold' }}>{product.talla}</p>
            </div>
            <div style={{ backgroundColor: '#f9f9f9', padding: '12px', borderRadius: '4px' }}>
              <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>COLOR</p>
              <p style={{ margin: 0, fontWeight: 'bold' }}>{product.color}</p>
            </div>
            <div style={{ backgroundColor: '#f9f9f9', padding: '12px', borderRadius: '4px' }}>
              <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>MATERIAL</p>
              <p style={{ margin: 0, fontWeight: 'bold' }}>{product.material}</p>
            </div>
            <div style={{ backgroundColor: '#f9f9f9', padding: '12px', borderRadius: '4px' }}>
              <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>STOCK</p>
              <p style={{ margin: 0, fontWeight: 'bold' }}>{product.stock} disponibles</p>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            style={{ width: '100%', padding: '14px', backgroundColor: added ? '#444' : '#000', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', transition: 'background-color 0.3s' }}
          >
            {added ? '✓ Agregado al carrito' : 'Agregar al carrito'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage