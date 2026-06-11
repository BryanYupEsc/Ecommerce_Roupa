import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

function PaymentSuccessPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [whatsappUrl, setWhatsappUrl] = useState('')

  const orderId = searchParams.get('external_reference')
  const paymentStatus = searchParams.get('collection_status')

  useEffect(() => {
    if (orderId) {
      // Traemos los detalles del pedido para el mensaje de WhatsApp
      Promise.all([
        fetch(`http://localhost:8080/api/orders/${orderId}`).then(r => r.json()),
        fetch(`http://localhost:8080/api/orders/${orderId}/items`).then(r => r.json())
      ]).then(([order, items]) => {
        let mensaje = `🛍️ *PEDIDO #${orderId} - PAGO CONFIRMADO* ✅\n\n`
        mensaje += `👤 *Cliente:* ${order.user?.nombre}\n`
        mensaje += `📧 *Email:* ${order.user?.email}\n`
        mensaje += `📍 *Dirección:* ${order.direccion}\n\n`
        mensaje += `*VESTIDOS:*\n`
        items.forEach(item => {
          mensaje += `• ${item.product?.nombre} (x${item.cantidad}) - R$ ${item.subtotal}\n`
          mensaje += `  Talla: ${item.product?.talla} · Color: ${item.product?.color}\n`
        })
        mensaje += `\n💰 *TOTAL PAGADO: R$ ${order.total}*\n\n`
        mensaje += `Por favor confirmar disponibilidad y detalles de entrega. ¡Gracias! 🙏`

        const numero = 'TU_NUMERO'
        setWhatsappUrl(`https://wa.me/${5511988836681}?text=${encodeURIComponent(mensaje)}`)
      })
    }
  }, [orderId])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', padding: '60px 32px', textAlign: 'center' }}>

      <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--negro)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--dorado)" strokeWidth="2">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>

      <p style={{ color: 'var(--dorado)', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '16px' }}>
        Pago confirmado
      </p>
      <h1 className="titulo-elegante" style={{ fontSize: '48px', marginBottom: '8px' }}>
        ¡Gracias por tu compra!
      </h1>
      <div style={{ height: '1px', width: '60px', backgroundColor: 'var(--dorado)', margin: '20px auto' }}></div>
      <p style={{ color: 'var(--gris-texto)', fontSize: '13px', letterSpacing: '1px', marginBottom: '8px' }}>
        Tu pedido #{orderId} fue pagado correctamente.
      </p>
      <p style={{ color: 'var(--gris-texto)', fontSize: '13px', letterSpacing: '1px', marginBottom: '48px' }}>
        Ahora confirma tu pedido por WhatsApp para coordinar la entrega.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '400px' }}>
        {whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: '#25D366',
              color: '#fff',
              padding: '18px 32px',
              fontSize: '11px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              fontFamily: 'var(--font-cuerpo)',
              fontWeight: 500
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Confirmar por WhatsApp
          </a>
        )}

        <button
          onClick={() => navigate('/')}
          className="btn-primary"
          style={{ padding: '18px', fontSize: '11px', letterSpacing: '3px' }}
        >
          Seguir Comprando
        </button>
      </div>
    </div>
  )
}

export default PaymentSuccessPage