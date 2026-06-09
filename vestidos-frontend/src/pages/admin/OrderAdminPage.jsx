import { useState, useEffect } from "react";


function OrderAdminPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = () =>{
        fetch('http://localhost:8080/api/orders')
        .then(res => res.json())
        .then(data => {
            setOrders(data);
            setLoading(false);
        })
    }

    const handleUpdateEstado = ( orderId, nuevoEstado)=>{
        fetch(`http://localhost:8080/api/orders/${orderId}/estado?estado=${nuevoEstado}`,{
            method: 'PUT'
            })
            .then(()=> loadOrders())
    }

    const getEstadoColor = (estado) => {
        switch(estado){
            case 'PENDIENTE':  return '#FFA500'
            case 'PAGADO':     return '#2196F3'
            case 'ENVIADO':    return '#9C27B0'
            case 'ENTREGADO':  return '#4CAF50'
            case 'CANCELADO':  return '#F44336'
            default:           return '#999'
        }
    }
    if(loading) return <p style={{padding: '32px'}}>Cargando pedidos...</p>

    return(
        <div style={{ padding: '32px' }}>
        <h1 style={{ marginBottom: '24px' }}>Gestión de Pedidos</h1>

        {orders.length === 0 ? (
        <p style={{ color: '#666' }}>No hay pedidos todavía.</p>
        ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
            <tr style={{ backgroundColor: '#000', color: '#fff' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>ID</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Cliente</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Dirección</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Total</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Fecha</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Estado</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Acciones</th>
            </tr>
            </thead>
            <tbody>
            {orders.map(order => (
                <tr key={order.id} style={{ borderBottom: '1px solid #ccc' }}>
                <td style={{ padding: '12px' }}>#{order.id}</td>
                <td style={{ padding: '12px' }}>
                    <p style={{ margin: 0, fontWeight: 'bold' }}>{order.user?.nombre}</p>
                    <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>{order.user?.email}</p>
                </td>
                <td style={{ padding: '12px', fontSize: '13px' }}>{order.direccion}</td>
                <td style={{ padding: '12px', fontWeight: 'bold' }}>${order.total}</td>
                <td style={{ padding: '12px', fontSize: '13px' }}>
                    {new Date(order.creadoEn).toLocaleDateString('es-BR')}
                </td>
                <td style={{ padding: '12px' }}>
                    <span style={{
                    backgroundColor: getEstadoColor(order.estado),
                    color: '#fff',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                    }}>
                    {order.estado}
                    </span>
                </td>
                <td style={{ padding: '12px' }}>
                    <select
                    value={order.estado}
                    onChange={(e) => handleUpdateEstado(order.id, e.target.value)}
                    style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc', cursor: 'pointer' }}
                    >
                    <option value="PENDIENTE">PENDIENTE</option>
                    <option value="PAGADO">PAGADO</option>
                    <option value="ENVIADO">ENVIADO</option>
                    <option value="ENTREGADO">ENTREGADO</option>
                    <option value="CANCELADO">CANCELADO</option>
                    </select>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        )}
    </div>
    )
}

export default OrderAdminPage