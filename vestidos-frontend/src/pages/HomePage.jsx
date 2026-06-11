import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import productService from '../services/productService'
import useCartStore from '../store/cartStore'

function HomePage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const addItem = useCartStore(state => state.addItem)
  const navigate = useNavigate()

  useEffect(() => {
    productService.getAllProducts()
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const heroSlides = [
    { titulo: 'Nueva Colección', subtitulo: 'Elegancia que trasciende', bg: '#0a0a0a' },
    { titulo: 'Vestidos de Noche', subtitulo: 'Para momentos únicos', bg: '#1a1a1a' },
    { titulo: 'Estilo Atemporal', subtitulo: 'Diseños exclusivos', bg: '#111111' },
  ]

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <p style={{ fontFamily: 'var(--font-titulo)', fontSize: '24px', letterSpacing: '4px', color: 'var(--gris-texto)' }}>
        CARGANDO...
      </p>
    </div>
  )

  return (
    <div>

      {/* ===== HERO CARRUSEL ===== */}
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        style={{ height: '85vh' }}
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div style={{
              height: '85vh',
              backgroundColor: slide.bg,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              gap: '24px'
            }}>
              <p style={{
                color: 'var(--dorado)',
                fontSize: '11px',
                letterSpacing: '6px',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-cuerpo)'
              }}>
                Colección 2026
              </p>
              <h1 style={{
                fontFamily: 'var(--font-titulo)',
                color: 'var(--blanco)',
                fontSize: '72px',
                fontWeight: 300,
                letterSpacing: '8px',
                textTransform: 'uppercase'
              }}>
                {slide.titulo}
              </h1>
              <p style={{
                color: 'var(--gris-medio)',
                fontSize: '14px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-cuerpo)',
                fontWeight: 300
              }}>
                {slide.subtitulo}
              </p>
              <div style={{ height: '1px', width: '60px', backgroundColor: 'var(--dorado)', margin: '8px 0' }}></div>
              <button
                className="btn-primary"
                onClick={() => document.getElementById('coleccion').scrollIntoView({ behavior: 'smooth' })}
              >
                Ver Colección
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ===== BANNER TEXTO ===== */}
      <div style={{
        backgroundColor: 'var(--dorado)',
        padding: '16px',
        textAlign: 'center'
      }}>
        <p style={{
          fontFamily: 'var(--font-cuerpo)',
          fontSize: '11px',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          color: 'var(--negro)',
          fontWeight: 500
        }}>
          Envío disponible • Diseños exclusivos • Calidad premium
        </p>
      </div>

      {/* ===== COLECCIÓN ===== */}
      <div id="coleccion" style={{ padding: '80px 48px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p style={{ color: 'var(--dorado)', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '12px' }}>
            Exclusivo
          </p>
          <h2 className="titulo-elegante" style={{ fontSize: '42px' }}>
            Nuestra Colección
          </h2>
          <div style={{ height: '1px', width: '60px', backgroundColor: 'var(--dorado)', margin: '20px auto 0' }}></div>
        </div>

        {/* Grid de productos */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '32px',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {products.map(product => (
            <div
              key={product.id}
              style={{ cursor: 'pointer' }}
              className="product-card"
            >
              {/* Imagen */}
              <div
                onClick={() => navigate(`/products/${product.id}`)}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  backgroundColor: 'var(--gris-claro)',
                  aspectRatio: '3/4'
                }}
              >
                {product.imagenUrl ? (
                  <img
                    src={product.imagenUrl}
                    alt={product.nombre}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.6s ease'
                    }}
                    onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '64px'
                  }}>
                    👗
                  </div>
                )}

                {/* Badge categoría */}
                {product.category && (
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    backgroundColor: 'var(--negro)',
                    color: 'var(--dorado)',
                    padding: '4px 12px',
                    fontSize: '9px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase'
                  }}>
                    {product.category.nombre}
                  </div>
                )}
              </div>

              {/* Info del producto */}
              <div style={{ padding: '16px 0' }}>
                <h3
                  onClick={() => navigate(`/products/${product.id}`)}
                  style={{
                    fontFamily: 'var(--font-titulo)',
                    fontSize: '20px',
                    fontWeight: 400,
                    letterSpacing: '1px',
                    marginBottom: '4px'
                  }}
                >
                  {product.nombre}
                </h3>
                <p style={{ color: 'var(--gris-texto)', fontSize: '11px', letterSpacing: '1px', marginBottom: '8px' }}>
                  {product.talla && `Talla ${product.talla}`} {product.color && `• ${product.color}`}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{
                    fontFamily: 'var(--font-titulo)',
                    fontSize: '20px',
                    color: 'var(--negro)'
                  }}>
                    R$ {product.precio}
                  </p>
                  <button
                    onClick={() => addItem(product)}
                    className="btn-primary"
                    style={{ padding: '10px 20px', fontSize: '9px' }}
                  >
                    Añadir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== REDES SOCIALES ===== */}
      <div style={{
        backgroundColor: 'var(--negro)',
        padding: '80px 48px',
        textAlign: 'center'
      }}>
        <p style={{ color: 'var(--dorado)', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '12px' }}>
          Síguenos
        </p>
        <h2 className="titulo-elegante" style={{ color: 'var(--blanco)', fontSize: '36px', marginBottom: '8px' }}>
          Encuéntranos en Redes
        </h2>
        <div style={{ height: '1px', width: '60px', backgroundColor: 'var(--dorado)', margin: '20px auto 32px' }}></div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/imbryann__/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: '#1a1a1a',
              border: '1px solid #333',
              padding: '16px 32px',
              color: 'var(--blanco)',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              minWidth: '200px'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--dorado)'
              e.currentTarget.style.color = 'var(--dorado)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#333'
              e.currentTarget.style.color = 'var(--blanco)'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.6, marginBottom: '2px' }}>Síguenos en</p>
              <p style={{ fontSize: '13px', letterSpacing: '2px', fontWeight: 500 }}>Instagram</p>
            </div>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/5511988836681"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: '#1a1a1a',
              border: '1px solid #333',
              padding: '16px 32px',
              color: 'var(--blanco)',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              minWidth: '200px'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--dorado)'
              e.currentTarget.style.color = 'var(--dorado)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#333'
              e.currentTarget.style.color = 'var(--blanco)'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.6, marginBottom: '2px' }}>Contáctanos</p>
              <p style={{ fontSize: '13px', letterSpacing: '2px', fontWeight: 500 }}>WhatsApp</p>
            </div>
          </a>
        </div>

        <p style={{ color: 'var(--gris-texto)', fontSize: '11px', letterSpacing: '2px', marginTop: '48px' }}>
          © 2026 VESTIDOS • Todos los derechos reservados
        </p>
      </div>

    </div>
  )
}

export default HomePage