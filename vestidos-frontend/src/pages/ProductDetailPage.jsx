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
      .catch(() => setLoading(false))
  }, [id])

  const handleAddToCart = () => {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <p style={{ fontFamily: 'var(--font-titulo)', fontSize: '24px', letterSpacing: '4px', color: 'var(--gris-texto)' }}>CARGANDO...</p>
    </div>
  )

  if (!product) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <p style={{ fontFamily: 'var(--font-titulo)', fontSize: '24px', letterSpacing: '4px' }}>Vestido no encontrado</p>
    </div>
  )

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 32px' }}>

      {/* Breadcrumb */}
      <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span
          onClick={() => navigate('/')}
          style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer', color: 'var(--gris-texto)' }}
        >
          Colección
        </span>
        <span style={{ color: 'var(--gris-texto)' }}>→</span>
        <span style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--dorado)' }}>
          {product.nombre}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>

        {/* Imagen */}
        <div style={{ position: 'relative', backgroundColor: 'var(--gris-claro)', aspectRatio: '3/4', overflow: 'hidden' }}>
          {product.imagenUrl ? (
            <img
              src={product.imagenUrl}
              alt={product.nombre}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '80px' }}>
              👗
            </div>
          )}
          {product.category && (
            <div style={{
              position: 'absolute', top: '20px', left: '20px',
              backgroundColor: 'var(--negro)', color: 'var(--dorado)',
              padding: '6px 16px', fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase'
            }}>
              {product.category.nombre}
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ paddingTop: '20px' }}>
          <p style={{ color: 'var(--dorado)', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '16px' }}>
            Exclusivo
          </p>
          <h1 style={{ fontFamily: 'var(--font-titulo)', fontSize: '48px', fontWeight: 300, letterSpacing: '2px', marginBottom: '8px' }}>
            {product.nombre}
          </h1>
          <div style={{ height: '1px', width: '60px', backgroundColor: 'var(--dorado)', margin: '20px 0' }}></div>
          <p style={{ fontFamily: 'var(--font-titulo)', fontSize: '36px', marginBottom: '32px', color: 'var(--negro)' }}>
            R$ {product.precio}
          </p>

          <p style={{ fontSize: '13px', lineHeight: '1.8', color: 'var(--gris-texto)', marginBottom: '40px', letterSpacing: '0.5px' }}>
            {product.descripcion}
          </p>

          {/* Detalles */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', backgroundColor: 'var(--gris-medio)', marginBottom: '40px' }}>
            {[
              { label: 'Talla', value: product.talla },
              { label: 'Color', value: product.color },
              { label: 'Material', value: product.material },
              { label: 'Disponibles', value: `${product.stock} unidades` },
            ].map(item => (
              <div key={item.label} style={{ backgroundColor: 'var(--blanco)', padding: '16px 20px' }}>
                <p style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gris-texto)', marginBottom: '4px' }}>
                  {item.label}
                </p>
                <p style={{ fontSize: '13px', fontWeight: 500, letterSpacing: '1px' }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={handleAddToCart}
            className="btn-primary"
            style={{
              width: '100%',
              padding: '18px',
              fontSize: '11px',
              letterSpacing: '3px',
              backgroundColor: added ? 'var(--dorado)' : 'var(--negro)',
              color: added ? 'var(--negro)' : 'var(--blanco)'
            }}
          >
            {added ? '✓ AÑADIDO AL CARRITO' : 'AÑADIR AL CARRITO'}
          </button>

          <button
            onClick={() => navigate('/')}
            className="btn-secondary"
            style={{ width: '100%', padding: '18px', fontSize: '11px', letterSpacing: '3px', marginTop: '12px' }}
          >
            SEGUIR VIENDO
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage