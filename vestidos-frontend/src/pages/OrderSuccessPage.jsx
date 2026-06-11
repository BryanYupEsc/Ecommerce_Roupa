import { useParams, useNavigate } from 'react-router-dom'

function OrderSuccessPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', padding: '60px 32px', textAlign: 'center' }}>
      <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--negro)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--dorado)" strokeWidth="2">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>

      <p style={{ color: 'var(--dorado)', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '16px' }}>
        Confirmado
      </p>
      <h1 className="titulo-elegante" style={{ fontSize: '48px', marginBottom: '8px' }}>
        ¡Pedido Realizado!
      </h1>
      <div style={{ height: '1px', width: '60px', backgroundColor: 'var(--dorado)', margin: '20px auto' }}></div>
      <p style={{ color: 'var(--gris-texto)', fontSize: '13px', letterSpacing: '1px', marginBottom: '8px' }}>
        Tu pedido #{id} fue registrado correctamente.
      </p>
      <p style={{ color: 'var(--gris-texto)', fontSize: '13px', letterSpacing: '1px', marginBottom: '48px' }}>
        Nos pondremos en contacto contigo pronto.
      </p>

      <button onClick={() => navigate('/')} className="btn-primary" style={{ padding: '18px 48px', fontSize: '11px', letterSpacing: '3px' }}>
        Seguir Comprando
      </button>
    </div>
  )
}

export default OrderSuccessPage