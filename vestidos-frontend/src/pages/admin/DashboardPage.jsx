import useAuthStore from '../../store/authStore'
import { useNavigate } from 'react-router-dom'

function DashboardPage() {
  const user = useAuthStore(state => state.user)
  const navigate = useNavigate()

  return (
    <div style={{ padding: '32px' }}>
      <h1>Panel Admin</h1>
      <p>Bienvenido, {user?.nombre}</p>

      <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
        <div
          onClick={() => navigate('/admin/products')}
          style={{ border: '1px solid #ccc', padding: '24px', borderRadius: '8px', cursor: 'pointer', width: '200px', textAlign: 'center' }}
        >
          <h2>👗</h2>
          <h3>Productos</h3>
          <p>Gestionar vestidos</p>
        </div>

        <div
          onClick={() => navigate('/admin/orders')}
          style={{ border: '1px solid #ccc', padding: '24px', borderRadius: '8px', cursor: 'pointer', width: '200px', textAlign: 'center' }}
        >
          <h2>📦</h2>
          <h3>Pedidos</h3>
          <p>Ver pedidos</p>
        </div>

        <div
          onClick={() => navigate('/admin/users')}
          style={{ border: '1px solid #ccc', padding: '24px', borderRadius: '8px', cursor: 'pointer', width: '200px', textAlign: 'center' }}
        >
          <h2>👥</h2>
          <h3>Usuarios</h3>
          <p>Ver clientes</p>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage