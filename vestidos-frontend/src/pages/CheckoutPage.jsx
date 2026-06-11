import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useCartStore from '../store/cartStore'
import useAuthStore from '../store/authStore'

initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY)

function CheckoutPage() {
  const items = useCartStore(state => state.items)
  const getTotal = useCartStore(state => state.getTotal)
  const clearCart = useCartStore(state => state.clearCart)
  const user = useAuthStore(state => state.user)
  const navigate = useNavigate()

  const [direccion, setDireccion] = useState('')
  const [preferenceId, setPreferenceId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [orderId, setOrderId] = useState(null)

  if (items.length === 0 && !preferenceId) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '70vh', gap: '24px' }}>
        <p className="titulo-elegante" style={{ fontSize: '36px' }}>Tu carrito está vacío</p>
        <button onClick={() => navigate('/')} className="btn-primary">Ver Colección</button>
      </div>
    )
  }

  if (!user) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '70vh', gap: '24px' }}>
        <p className="titulo-elegante" style={{ fontSize: '36px' }}>Debes iniciar sesión</p>
        <button onClick={() => navigate('/login')} className="btn-primary">Iniciar Sesión</button>
      </div>
    )
  }

  const handleGenerarPago = async () => {
    if (!direccion.trim()) {
      setError('La dirección de entrega es obligatoria')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Primero creamos el pedido en la BD
      const orderResponse = await fetch('http://localhost:8080/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: { id: user.id },
          total: getTotal(),
          direccion: direccion,
          estado: 'PENDIENTE'
        })
      })

      const order = await orderResponse.json()
      setOrderId(order.id)

      // Guardamos los items del pedido
      for (const item of items) {
        await fetch(`http://localhost:8080/api/orders/${order.id}/items`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            order: { id: order.id },
            product: { id: item.id },
            cantidad: item.cantidad,
            precioUnit: item.precio,
            subtotal: item.precio * item.cantidad
          })
        })
      }

      // Creamos la preferencia de MercadoPago
      // Creamos la preferencia de MercadoPago
      const mpResponse = await fetch('http://localhost:8080/api/payment/create-preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          orderId: order.id
        })
      })

      console.log('MP Status:', mpResponse.status)
      const mpData = await mpResponse.json()
      console.log('MP Data:', mpData)

      if (!mpResponse.ok) {
        throw new Error(mpData || 'Error en MercadoPago')
      }

    setPreferenceId(mpData.id)
    

    } catch (error) {
      setError('Error al procesar el pago. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%', padding: '14px 0', border: 'none',
    borderBottom: '1px solid var(--gris-medio)', backgroundColor: 'transparent',
    fontSize: '13px', letterSpacing: '1px', outline: 'none',
    fontFamily: 'var(--font-cuerpo)', color: 'var(--negro)',
    resize: 'none'
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 32px' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <p style={{ color: 'var(--dorado)', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '12px' }}>
          Último paso
        </p>
        <h1 className="titulo-elegante" style={{ fontSize: '42px' }}>Finalizar Compra</h1>
        <div style={{ height: '1px', width: '60px', backgroundColor: 'var(--dorado)', margin: '20px auto 0' }}></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '60px', alignItems: 'start' }}>

        {/* Formulario */}
        <div>
          <h3 style={{ fontFamily: 'var(--font-titulo)', fontSize: '24px', fontWeight: 400, letterSpacing: '2px', marginBottom: '32px' }}>
            Datos de Entrega
          </h3>

          <div style={{ backgroundColor: 'var(--gris-claro)', padding: '20px 24px', marginBottom: '32px' }}>
            <p style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gris-texto)', marginBottom: '4px' }}>
              Comprando como
            </p>
            <p style={{ fontFamily: 'var(--font-titulo)', fontSize: '20px' }}>{user.nombre}</p>
            <p style={{ fontSize: '12px', color: 'var(--gris-texto)' }}>{user.email}</p>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <label style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gris-texto)', display: 'block', marginBottom: '8px' }}>
              Dirección de entrega
            </label>
            <textarea
              value={direccion}
              onChange={e => setDireccion(e.target.value)}
              placeholder="Calle, número, barrio, ciudad..."
              rows={3}
              style={inputStyle}
            />
          </div>

          {error && (
            <div style={{ backgroundColor: '#fff0f0', border: '1px solid #ffcccc', padding: '12px 16px', marginBottom: '24px', fontSize: '12px', color: '#cc0000', letterSpacing: '1px' }}>
              {error}
            </div>
          )}

          {/* Botón pagar o widget MP */}
          {!preferenceId ? (
            <button
              onClick={handleGenerarPago}
              disabled={loading}
              className="btn-primary"
              style={{ width: '100%', padding: '18px', fontSize: '11px', letterSpacing: '3px' }}
            >
              {loading ? 'PROCESANDO...' : 'PROCEDER AL PAGO'}
            </button>
          ) : (
            <div>
              <div style={{ backgroundColor: '#f0fff4', border: '1px solid #25D366', padding: '16px', marginBottom: '16px', borderRadius: '4px' }}>
      <p style={{ fontSize: '11px', letterSpacing: '1px', color: '#1a7a3c', marginBottom: '4px', fontWeight: 600 }}>
        ✓ Pedido #{orderId} registrado
      </p>
      <p style={{ fontSize: '11px', color: '#1a7a3c' }}>
        Completa el pago abajo. Después vuelve aquí y haz clic en el botón verde de WhatsApp.
      </p>
    </div>

    <Wallet initialization={{ preferenceId }} />

    <div style={{ height: '1px', backgroundColor: 'var(--gris-medio)', margin: '24px 0' }}></div>

    <p style={{ fontSize: '11px', letterSpacing: '1px', color: 'var(--gris-texto)', textAlign: 'center', marginBottom: '16px' }}>
      ¿Ya completaste el pago? Confirma tu pedido:
    </p>

    <button
      onClick={() => {
        clearCart()
        navigate(`/payment-success?external_reference=${orderId}`)
      }}
      style={{
        width: '100%',
        padding: '18px',
        backgroundColor: '#25D366',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        fontSize: '11px',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        fontFamily: 'var(--font-cuerpo)',
        fontWeight: 500
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      Ya Pagué — Confirmar por WhatsApp
    </button>
            </div>
          )}
        </div>

        {/* Resumen */}
        <div style={{ backgroundColor: 'var(--gris-claro)', padding: '40px', position: 'sticky', top: '90px' }}>
          <h3 style={{ fontFamily: 'var(--font-titulo)', fontSize: '24px', fontWeight: 400, letterSpacing: '2px', marginBottom: '32px' }}>
            Tu Pedido
          </h3>
          {items.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--gris-medio)' }}>
              <div>
                <p style={{ fontSize: '12px', letterSpacing: '1px', marginBottom: '2px' }}>{item.nombre}</p>
                <p style={{ fontSize: '10px', color: 'var(--gris-texto)' }}>x{item.cantidad} · {item.talla} · {item.color}</p>
              </div>
              <p style={{ fontFamily: 'var(--font-titulo)', fontSize: '16px' }}>R$ {(item.precio * item.cantidad).toFixed(2)}</p>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
            <span style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>Total</span>
            <span style={{ fontFamily: 'var(--font-titulo)', fontSize: '24px' }}>R$ {getTotal().toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage