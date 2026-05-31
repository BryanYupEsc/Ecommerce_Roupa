import { useNavigate } from 'react-router-dom'
import useCartStore from '../store/cartStore'
import useAuthStore from '../store/authStore'

function Navbar() {
  const navigate = useNavigate()
  const items = useCartStore(state => state.items)
  const totalItems = items.reduce((total, item) => total + item.cantidad, 0)
  const user = useAuthStore(state => state.user)
  const logout = useAuthStore(state => state.logout)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 32px',
      backgroundColor: '#000',
      color: '#fff',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <h2
        onClick={() => navigate('/')}
        style={{ cursor: 'pointer', margin: 0 }}
      >
        👗 Vestidos
      </h2>

      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <span onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          Inicio
        </span>

        {user?.rol === 'ADMIN' && (
          <span onClick={() => navigate('/admin')} style={{ cursor: 'pointer' }}>
            Admin
          </span>
        )}

        <span onClick={() => navigate('/cart')} style={{ cursor: 'pointer' }}>
          🛒 {totalItems}
        </span>

        {user ? (
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span>Hola, {user.nombre}</span>
            <span onClick={handleLogout} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
              Salir
            </span>
          </div>
        ) : (
          <span onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>
            Iniciar sesión
          </span>
        )}
      </div>
    </nav>
  )
}

export default Navbar