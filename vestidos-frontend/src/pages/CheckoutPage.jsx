import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useCartStore from '../store/cartStore'
import useAuthStore from '../store/authStore'

function CheckoutPage() {
  // Traemos los datos del carrito y del usuario logueado
  const items = useCartStore(state => state.items)
  const getTotal = useCartStore(state => state.getTotal)
  const clearCart = useCartStore(state => state.clearCart)
  const user = useAuthStore(state => state.user)
  const navigate = useNavigate()

  const [direccion, setDireccion] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Si el carrito está vacío redirige al inicio
  if (items.length === 0) {
    return (
      <div style={{ padding: '32px', textAlign: 'center' }}>
        <h2>No tienes productos en el carrito</h2>
        <button
          onClick={() => navigate('/')}
          style={{ backgroundColor: '#000', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '16px' }}
        >
          Ver vestidos
        </button>
      </div>
    )
  }

  // Si no está logueado lo manda al login
  if (!user) {
    return (
      <div style={{ padding: '32px', textAlign: 'center' }}>
        <h2>Debes iniciar sesión para comprar</h2>
        <button
          onClick={() => navigate('/login')}
          style={{ backgroundColor: '#000', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '16px' }}
        >
          Iniciar sesión
        </button>
      </div>
    )
  }

  const handleConfirmar = async () => {
    if (!direccion.trim()) {
      setError('La dirección de entrega es obligatoria')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Creamos el pedido en el backend
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

      if (!orderResponse.ok) {
        throw new Error('Error al crear el pedido')
      }

      const order = await orderResponse.json()

      // Guardamos cada vestido del carrito como order_item
      for (const item of items) {
        await fetch('http://localhost:8080/api/orders/' + order.id + '/items', {
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

      // Vaciamos el carrito
      clearCart()

      // Redirigimos a página de confirmación
      navigate('/order-success/' + order.id)

    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px' }}>
      <h1 style={{ marginBottom: '24px' }}>Confirmar pedido</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>

        {/* Resumen del carrito */}
        <div>
          <h3 style={{ marginBottom: '16px' }}>Tu pedido</h3>
          {items.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #eee' }}>
              <div>
                <p style={{ margin: 0, fontWeight: 'bold' }}>{item.nombre}</p>
                <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                  Talla: {item.talla} | x{item.cantidad}
                </p>
              </div>
              <p style={{ margin: 0, fontWeight: 'bold' }}>
                ${(item.precio * item.cantidad).toFixed(2)}
              </p>
            </div>
          ))}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', paddingTop: '16px', borderTop: '2px solid #000' }}>
            <h3>Total</h3>
            <h3>${getTotal().toFixed(2)}</h3>
          </div>
        </div>

        {/* Formulario de entrega */}
        <div>
          <h3 style={{ marginBottom: '16px' }}>Datos de entrega</h3>

          <div style={{ marginBottom: '16px', backgroundColor: '#f9f9f9', padding: '12px', borderRadius: '4px' }}>
            <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>COMPRANDO COMO</p>
            <p style={{ margin: 0, fontWeight: 'bold' }}>{user.nombre}</p>
            <p style={{ margin: 0, fontSize: '14px', color: '#444' }}>{user.email}</p>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '6px' }}>
              Dirección de entrega
            </label>
            <textarea
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              placeholder="Calle, número, ciudad..."
              rows={4}
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', resize: 'none' }}
            />
          </div>

          {error && (
            <p style={{ color: 'red', marginBottom: '16px' }}>{error}</p>
          )}

          <button
            onClick={handleConfirmar}
            disabled={loading}
            style={{ width: '100%', padding: '14px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}
          >
            {loading ? 'Procesando...' : 'Confirmar pedido'}
          </button>

          <button
            onClick={() => navigate('/cart')}
            style={{ width: '100%', padding: '12px', backgroundColor: 'transparent', color: '#000', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', fontSize: '14px', marginTop: '12px' }}
          >
            Volver al carrito
          </button>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage