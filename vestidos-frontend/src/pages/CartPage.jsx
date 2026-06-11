import useCartStore from '../store/cartStore'
import { useNavigate } from 'react-router-dom'

function CartPage() {
  const items = useCartStore(state => state.items)
  const removeItem = useCartStore(state => state.removeItem)
  const updateCantidad = useCartStore(state => state.updateCantidad)
  const getTotal = useCartStore(state => state.getTotal)
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '70vh', gap: '24px' }}>
        <p style={{ fontFamily: 'var(--font-titulo)', fontSize: '48px', fontWeight: 300, letterSpacing: '4px' }}>Tu carrito está vacío</p>
        <div style={{ height: '1px', width: '60px', backgroundColor: 'var(--dorado)' }}></div>
        <button onClick={() => navigate('/')} className="btn-primary">Ver Colección</button>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 32px' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <p style={{ color: 'var(--dorado)', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '12px' }}>Tu selección</p>
        <h1 className="titulo-elegante" style={{ fontSize: '42px' }}>Carrito</h1>
        <div style={{ height: '1px', width: '60px', backgroundColor: 'var(--dorado)', margin: '20px auto 0' }}></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '60px', alignItems: 'start' }}>

        {/* Items */}
        <div>
          {items.map(item => (
            <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '100px 1fr auto', gap: '24px', alignItems: 'center', padding: '24px 0', borderBottom: '1px solid var(--gris-medio)' }}>
              {/* Imagen */}
              <div style={{ backgroundColor: 'var(--gris-claro)', aspectRatio: '3/4', overflow: 'hidden' }}>
                {item.imagenUrl ? (
                  <img src={item.imagenUrl} alt={item.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>👗</div>
                )}
              </div>

              {/* Info */}
              <div>
                <h3 style={{ fontFamily: 'var(--font-titulo)', fontSize: '22px', fontWeight: 400, marginBottom: '8px' }}>{item.nombre}</h3>
                <p style={{ fontSize: '11px', letterSpacing: '1px', color: 'var(--gris-texto)', marginBottom: '16px' }}>
                  Talla: {item.talla} · Color: {item.color}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <button onClick={() => updateCantidad(item.id, item.cantidad - 1)} style={{ width: '32px', height: '32px', border: '1px solid var(--gris-medio)', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '16px' }}>−</button>
                  <span style={{ fontSize: '13px', letterSpacing: '2px', minWidth: '20px', textAlign: 'center' }}>{item.cantidad}</span>
                  <button onClick={() => updateCantidad(item.id, item.cantidad + 1)} style={{ width: '32px', height: '32px', border: '1px solid var(--gris-medio)', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '16px' }}>+</button>
                </div>
              </div>

              {/* Precio y eliminar */}
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontFamily: 'var(--font-titulo)', fontSize: '22px', marginBottom: '12px' }}>
                  R$ {(item.precio * item.cantidad).toFixed(2)}
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gris-texto)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Resumen */}
        <div style={{ backgroundColor: 'var(--gris-claro)', padding: '40px', position: 'sticky', top: '90px' }}>
          <h3 style={{ fontFamily: 'var(--font-titulo)', fontSize: '24px', fontWeight: 400, letterSpacing: '2px', marginBottom: '32px' }}>Resumen</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gris-texto)' }}>Subtotal</span>
            <span style={{ fontFamily: 'var(--font-titulo)', fontSize: '18px' }}>R$ {getTotal().toFixed(2)}</span>
          </div>
          <div style={{ height: '1px', backgroundColor: 'var(--gris-medio)', margin: '24px 0' }}></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
            <span style={{ fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>Total</span>
            <span style={{ fontFamily: 'var(--font-titulo)', fontSize: '24px' }}>R$ {getTotal().toFixed(2)}</span>
          </div>
          <button onClick={() => navigate('/checkout')} className="btn-primary" style={{ width: '100%', padding: '18px', fontSize: '11px', letterSpacing: '3px' }}>
            Finalizar Compra
          </button>
          <button onClick={() => navigate('/')} className="btn-secondary" style={{ width: '100%', padding: '18px', fontSize: '11px', letterSpacing: '3px', marginTop: '12px' }}>
            Seguir Comprando
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartPage