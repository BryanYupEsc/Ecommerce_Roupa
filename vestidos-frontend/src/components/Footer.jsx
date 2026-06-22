import { useNavigate } from 'react-router-dom'

function Footer() {
  const navigate = useNavigate()

  const columnStyle = { display: 'flex', flexDirection: 'column', gap: '16px' }
  const linkStyle = {
    color: 'var(--gris-medio)',
    fontSize: '12px',
    letterSpacing: '1px',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'color 0.3s'
  }
  const tituloColumna = {
    color: 'var(--dorado)',
    fontSize: '11px',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    marginBottom: '8px',
    fontWeight: 500
  }

  return (
    <footer style={{ backgroundColor: 'var(--negro)', color: 'var(--blanco)', paddingTop: '64px' }}>
      <div className='footer-grid' 
        style={{
        maxWidth: '1300px',
        margin: '0 auto',
        padding: '0 48px',
        display: 'grid',
        gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
        gap: '48px'
      }}>

        {/* Columna marca */}
        <div>
          <h2 style={{
            fontFamily: 'var(--font-titulo)',
            fontSize: '26px',
            fontWeight: 300,
            letterSpacing: '6px',
            textTransform: 'uppercase',
            marginBottom: '16px'
          }}>
            VESTIDOS
          </h2>
          <p style={{ color: 'var(--gris-texto)', fontSize: '12px', lineHeight: '1.8', maxWidth: '280px' }}>
            Elegancia que trasciende. Diseños exclusivos para cada momento especial de tu vida.
          </p>
        </div>

        {/* Columna Tienda */}
        <div style={columnStyle}>
          <p style={tituloColumna}>Tienda</p>
          <span onClick={() => navigate('/')} style={linkStyle} onMouseEnter={e => e.target.style.color = 'var(--dorado)'} onMouseLeave={e => e.target.style.color = 'var(--gris-medio)'}>
            Colección
          </span>
          <span onClick={() => navigate('/')} style={linkStyle} onMouseEnter={e => e.target.style.color = 'var(--dorado)'} onMouseLeave={e => e.target.style.color = 'var(--gris-medio)'}>
            Novedades
          </span>
          <span onClick={() => navigate('/cart')} style={linkStyle} onMouseEnter={e => e.target.style.color = 'var(--dorado)'} onMouseLeave={e => e.target.style.color = 'var(--gris-medio)'}>
            Mi Carrito
          </span>
        </div>

        {/* Columna Ayuda */}
        <div style={columnStyle}>
          <p style={tituloColumna}>Ayuda</p>
          <span style={linkStyle} onMouseEnter={e => e.target.style.color = 'var(--dorado)'} onMouseLeave={e => e.target.style.color = 'var(--gris-medio)'}>
            Guía de Tallas
          </span>
          <span style={linkStyle} onMouseEnter={e => e.target.style.color = 'var(--dorado)'} onMouseLeave={e => e.target.style.color = 'var(--gris-medio)'}>
            Envíos y Entregas
          </span>
          <span style={linkStyle} onMouseEnter={e => e.target.style.color = 'var(--dorado)'} onMouseLeave={e => e.target.style.color = 'var(--gris-medio)'}>
            Cambios y Devoluciones
          </span>
          <span style={linkStyle} onMouseEnter={e => e.target.style.color = 'var(--dorado)'} onMouseLeave={e => e.target.style.color = 'var(--gris-medio)'}>
            Preguntas Frecuentes
          </span>
        </div>

        {/* Columna Contacto */}
        <div style={columnStyle}>
          <p style={tituloColumna}>Contacto</p>
          <a
            href="https://wa.me/11988836681"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
            onMouseEnter={e => e.target.style.color = 'var(--dorado)'}
            onMouseLeave={e => e.target.style.color = 'var(--gris-medio)'}
          >
            WhatsApp
          </a>
          <a
            href="https://instagram.com/TU_USUARIO"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
            onMouseEnter={e => e.target.style.color = 'var(--dorado)'}
            onMouseLeave={e => e.target.style.color = 'var(--gris-medio)'}
          >
            Instagram
          </a>
          <span style={linkStyle} onMouseEnter={e => e.target.style.color = 'var(--dorado)'} onMouseLeave={e => e.target.style.color = 'var(--gris-medio)'}>
            contacto@vestidos.com
          </span>
        </div>
      </div>

      {/* Línea divisoria */}
      <div style={{ height: '1px', backgroundColor: '#222', margin: '48px 0 24px' }}></div>

      {/* Copyright */}
      <div style={{
        maxWidth: '1300px',
        margin: '0 auto',
        padding: '0 48px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <p style={{ color: 'var(--gris-texto)', fontSize: '11px', letterSpacing: '1px' }}>
          © 2026 VESTIDOS · Todos los derechos reservados
        </p>
        <div style={{ display: 'flex', gap: '24px' }}>
          <span style={{ color: 'var(--gris-texto)', fontSize: '11px', letterSpacing: '1px', cursor: 'pointer' }}>
            Términos y Condiciones
          </span>
          <span style={{ color: 'var(--gris-texto)', fontSize: '11px', letterSpacing: '1px', cursor: 'pointer' }}>
            Política de Privacidad
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer