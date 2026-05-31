import useCartStore from "../store/cartStore"
import { useNavigate } from "react-router-dom"

function CartPage(){
    const items = useCartStore(state => state.items)
    const removeItem = useCartStore(state => state.removeItem)
    const updateCantidad = useCartStore(state => state.updateCantidad)
    const getTotal = useCartStore(state => state.getTotal)
    const navigate = useNavigate()

    if (items.lenght === 0) {
        return (
            <div style={{ padding: "32px", textAlign: "center" }}>
                <h2>Tu carrito esta vacio</h2>
                <button
                onClick={()=> navigate("/")}
                style={{backgroundColo: "#000", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "4px", cursor: "pointer", marginTop: "16px"}}
                >
                    Ver Vestidos
                </button>
            </div>
        )
    }

    return(
        <div style={{ padding: "32px", maxWidth: "800px", margin: "0 auto"}}>
            <h1> Tu Carrito </h1>

            {items.map(item =>(
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #ccc', padding: '16px', borderRadius: '8px', marginBottom: '12px' }}>
                    <div>
                        <h3>{item.nombre}</h3>
                        <p>Talla: {item.talla} | Color: {item.color}</p>
                        <p>Precio Unitario: ${item.precio}</p>
                    </div>

                    <div style={{display: "flex", alignItems: "center", gap: "8px"}}>
                        <button 
                            onClick={()=> updateCantidad(item.id, item.cantidad - 1)}
                            style={{ padding: "4px 10px", fontSize: "16px", cursor: "pointer"}}
                        >
                            -
                        </button>
                        <span>{item.cantidad}</span>
                        <button onClick={()=> updateCantidad(item.id, item.cantidad + 1)}
                            style={{ padding: "4px 10px", fontSize: "16px", cursor: "pointer"}}
                        >
                            +
                        </button>
                    </div>
                    <div style={{textAlign: "right"}}>
                        <p><strong>${(item.precio * item.cantidad).toFixed(2)}</strong></p>
                        <button 
                            onClick={()=> removeItem(item.id)}
                            style={{ backgroundColor: '#ff4444', color: '#fff', padding: '6px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '8px' }}
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            ))}
            <div style={{ textAlign: "right", marginTop: "24px", borderTop: "1px solid #ccc", paddingTop:"16px"}}>
                <h2>Total: ${getTotal().toFixed(2)}</h2>
                <button
                    onClick={()=> navigate("/")}
                    style={{ backgroundColor: '#ccc', color: '#000', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '12px' }}
                >
                    Seguir comprando
                </button>
                <button
                    onClick={()=> navigate("/checkout")}
                    style={{ backgroundColor: '#000', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Finalizar Compra
                </button>
            </div>
        </div>
    )
}

export default CartPage