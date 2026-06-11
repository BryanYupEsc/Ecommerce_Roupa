import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useCartStore from '../store/cartStore'
import useAuthStore from '../store/authStore'

function Navbar() {
  const navigate = useNavigate()
  const items = useCartStore(state => state.items)
  const totalItems = items.reduce((total, item) => total + item.cantidad, 0)
  const user = useAuthStore(state => state.user)
  const logout = useAuthStore(state => state.logout)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav style={{
      backgroundColor: 'var(--negro)',
      padding: '0 48px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '70px',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      borderBottom: '1px solid #222'
    }}>

      {/* Links izquierda */}
      <div style={{ display: 'flex', gap: '32px' }}>
        <span
          onClick={() => navigate('/')}
          style={{ color: 'var(--blanco)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'var(--font-cuerpo)', fontWeight: 400, transition: 'color 0.3s' }}
          onMouseEnter={e => e.target.style.color = 'var(--dorado)'}
          onMouseLeave={e => e.target.style.color = 'var(--blanco)'}
        >
          Colección
        </span>
        {user?.rol === 'ADMIN' && (
          <span
            onClick={() => navigate('/admin')}
            style={{ color: 'var(--dorado)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'var(--font-cuerpo)', fontWeight: 400 }}
          >
            Admin
          </span>
        )}
      </div>

      {/* Logo centro */}
      <div
        onClick={() => navigate('/')}
        style={{ cursor: 'pointer', textAlign: 'center' }}
      >
        <h1 style={{
          fontFamily: 'var(--font-titulo)',
          color: 'var(--blanco)',
          fontSize: '28px',
          fontWeight: 300,
          letterSpacing: '8px',
          textTransform: 'uppercase'
        }}>
          VESTIDOS
        </h1>
        <div style={{ height: '1px', backgroundColor: 'var(--dorado)', marginTop: '2px' }}></div>
      </div>

      {/* Links derecha */}
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        {user ? (
          <>
            <span style={{ color: 'var(--gris-texto)', fontSize: '11px', letterSpacing: '1px' }}>
              {user.nombre}
            </span>
            <span
              onClick={handleLogout}
              style={{ color: 'var(--blanco)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer' }}
              onMouseEnter={e => e.target.style.color = 'var(--dorado)'}
              onMouseLeave={e => e.target.style.color = 'var(--blanco)'}
            >
              Salir
            </span>
          </>
        ) : (
          <span
            onClick={() => navigate('/login')}
            style={{ color: 'var(--blanco)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer' }}
            onMouseEnter={e => e.target.style.color = 'var(--dorado)'}
            onMouseLeave={e => e.target.style.color = 'var(--blanco)'}
          >
            Ingresar
          </span>
        )}

        {/* Carrito */}
        <div
          onClick={() => navigate('/cart')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--blanco)" strokeWidth="1.5">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          {totalItems > 0 && (
            <span style={{
              backgroundColor: 'var(--dorado)',
              color: 'var(--negro)',
              borderRadius: '50%',
              width: '18px',
              height: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
              fontWeight: 600
            }}>
              {totalItems}
            </span>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar