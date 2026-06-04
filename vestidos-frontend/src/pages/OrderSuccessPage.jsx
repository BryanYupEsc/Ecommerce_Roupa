import { useParams, useNavigate } from 'react-router-dom'

function OrderSuccessPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <div style={{ maxWidth: '500px', margin: '80px auto', padding: '32px', textAlign: 'center', border: '1px solid #ccc', borderRadius: '8px' }}>
      <div style={{ fontSize: '60px', marginBottom: '16px' }}>✅</div>
      <h1 style={{ marginBottom: '8px' }}>¡Pedido confirmado!</h1>
      <p style={{ color: '#666', marginBottom: '8px' }}>Tu pedido #{id} fue registrado correctamente.</p>
      <p style={{ color: '#666', marginBottom: '32px' }}>Nos pondremos en contacto contigo pronto.</p>

      <button
        onClick={() => navigate('/')}
        style={{ backgroundColor: '#000', color: '#fff', padding: '12px 24px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}
      >
        Seguir comprando
      </button>
    </div>
  )
}

export default OrderSuccessPage