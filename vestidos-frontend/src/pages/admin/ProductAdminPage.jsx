import { useState, useEffect } from 'react'
import productService from '../../services/productService'

function ProductsAdminPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [form, setForm] = useState({
    nombre: '', descripcion: '', precio: '', stock: '',
    talla: '', color: '', material: '', imagenUrl: '', categoryId: ''
  })

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = () => {
    productService.getAllProducts()
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setForm({
      nombre: product.nombre,
      descripcion: product.descripcion || '',
      precio: product.precio,
      stock: product.stock,
      talla: product.talla || '',
      color: product.color || '',
      material: product.material || '',
      imagenUrl: product.imagenUrl || '',
      categoryId: product.category?.id || ''
    })
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('¿Seguro que quieres desactivar este vestido?')) {
      productService.deleteProduct(id).then(() => loadProducts())
    }
  }

  const handleSubmit = () => {
    const productData = {
      nombre: form.nombre,
      descripcion: form.descripcion,
      precio: parseFloat(form.precio),
      stock: parseInt(form.stock),
      talla: form.talla,
      color: form.color,
      material: form.material,
      imagenUrl: form.imagenUrl,
      category: { id: parseInt(form.categoryId) }
    }

    if (editingProduct) {
      productService.updateProduct(editingProduct.id, productData)
        .then(() => {
          loadProducts()
          setShowForm(false)
          setEditingProduct(null)
        })
    } else {
      productService.createProduct(productData)
        .then(() => {
          loadProducts()
          setShowForm(false)
        })
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingProduct(null)
    setForm({
      nombre: '', descripcion: '', precio: '', stock: '',
      talla: '', color: '', material: '', imagenUrl: '', categoryId: ''
    })
  }

  if (loading) return <p style={{ padding: '32px' }}>Cargando vestidos...</p>

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1>Gestión de Vestidos</h1>
        <button
          onClick={() => setShowForm(true)}
          style={{ backgroundColor: '#000', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          + Agregar vestido
        </button>
      </div>

      {showForm && (
        <div style={{ border: '1px solid #ccc', padding: '24px', borderRadius: '8px', marginBottom: '24px', backgroundColor: '#f9f9f9' }}>
          <h3>{editingProduct ? 'Editar vestido' : 'Nuevo vestido'}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[
              { label: 'Nombre', name: 'nombre', type: 'text' },
              { label: 'Precio', name: 'precio', type: 'number' },
              { label: 'Stock', name: 'stock', type: 'number' },
              { label: 'Talla', name: 'talla', type: 'text' },
              { label: 'Color', name: 'color', type: 'text' },
              { label: 'Material', name: 'material', type: 'text' },
              { label: 'URL Imagen', name: 'imagenUrl', type: 'text' },
              { label: 'ID Categoría', name: 'categoryId', type: 'number' },
            ].map(field => (
              <div key={field.name}>
                <label style={{ display: 'block', marginBottom: '4px' }}>{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
                />
              </div>
            ))}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '4px' }}>Descripción</label>
              <textarea
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                rows={3}
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <button
              onClick={handleSubmit}
              style={{ backgroundColor: '#000', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              {editingProduct ? 'Guardar cambios' : 'Crear vestido'}
            </button>
            <button
              onClick={handleCancel}
              style={{ backgroundColor: '#ccc', color: '#000', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#000', color: '#fff' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Nombre</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Precio</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Stock</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Talla</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Color</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id} style={{ borderBottom: '1px solid #ccc' }}>
              <td style={{ padding: '12px' }}>{product.nombre}</td>
              <td style={{ padding: '12px' }}>${product.precio}</td>
              <td style={{ padding: '12px' }}>{product.stock}</td>
              <td style={{ padding: '12px' }}>{product.talla}</td>
              <td style={{ padding: '12px' }}>{product.color}</td>
              <td style={{ padding: '12px' }}>
                <button
                  onClick={() => handleEdit(product)}
                  style={{ backgroundColor: '#444', color: '#fff', padding: '6px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '8px' }}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  style={{ backgroundColor: '#ff4444', color: '#fff', padding: '6px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Desactivar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductsAdminPage