import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useCartStore from '../store/cartStore'
import useAuthStore from '../store/authStore'
import Logo from './Logo'

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
    setMenuOpen(false)
  }

  return (
    <nav style={{
      backgroundColor: 'var(--negro)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      borderBottom: '1px solid #222'
    }}>
      {/* Barra principal */}
      <div style={{
        padding: '0 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '64px'
      }}>
        {/* Botón hamburguesa - solo en móvil */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            color: 'var(--blanco)'
          }}
          className="hamburger-btn"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {menuOpen
              ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
              : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
            }
          </svg>
        </button>

        {/* Links izquierda - solo desktop */}
        <div className="nav-links-desktop" style={{ display: 'flex', gap: '32px' }}>
          <span
            onClick={() => navigate('/')}
            style={{ color: 'var(--blanco)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer' }}
            onMouseEnter={e => e.target.style.color = 'var(--dorado)'}
            onMouseLeave={e => e.target.style.color = 'var(--blanco)'}
          >
            Colección
          </span>
          {user?.rol === 'ADMIN' && (
            <span
              onClick={() => navigate('/admin')}
              style={{ color: 'var(--dorado)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer' }}
            >
              Admin
            </span>
          )}
        </div>

        {/* Logo centro */}
        <div onClick={() => navigate('/')} style={{ cursor: 'pointer', textAlign: 'center', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          <h1 style={{
            fontFamily: 'var(--font-titulo)',
            color: 'var(--blanco)',
            fontSize: '22px',
            fontWeight: 300,
            letterSpacing: '6px',
            textTransform: 'uppercase',
            margin: 0
          }}>
            <Logo />
          </h1>
          <div style={{ height: '1px', backgroundColor: 'var(--dorado)', marginTop: '2px' }}></div>
        </div>

        {/* Iconos derecha */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          {/* Carrito */}
          <div onClick={() => navigate('/cart')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
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

          {/* Usuario - solo desktop */}
          <div className="nav-user-desktop" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            {user ? (
              <span
                onClick={handleLogout}
                style={{ color: 'var(--blanco)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer' }}
                onMouseEnter={e => e.target.style.color = 'var(--dorado)'}
                onMouseLeave={e => e.target.style.color = 'var(--blanco)'}
              >
                Salir
              </span>
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
          </div>

          {/* Hamburguesa placeholder para centrar logo */}
          <div className="hamburger-placeholder" style={{ display: 'none', width: '22px' }}></div>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {menuOpen && (
        <div style={{
          backgroundColor: 'var(--negro)',
          borderTop: '1px solid #222',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <span onClick={() => { navigate('/'); setMenuOpen(false) }} style={{ color: 'var(--blanco)', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer' }}>
            Colección
          </span>
          {user?.rol === 'ADMIN' && (
            <span onClick={() => { navigate('/admin'); setMenuOpen(false) }} style={{ color: 'var(--dorado)', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer' }}>
              Admin
            </span>
          )}
          {user ? (
            <>
              <span style={{ color: 'var(--gris-texto)', fontSize: '12px' }}>{user.nombre}</span>
              <span onClick={handleLogout} style={{ color: 'var(--blanco)', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer' }}>
                Salir
              </span>
            </>
          ) : (
            <>
              <span onClick={() => { navigate('/login'); setMenuOpen(false) }} style={{ color: 'var(--blanco)', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer' }}>
                Ingresar
              </span>
              <span onClick={() => { navigate('/register'); setMenuOpen(false) }} style={{ color: 'var(--blanco)', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer' }}>
                Registrarse
              </span>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar