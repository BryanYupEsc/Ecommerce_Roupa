import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function RegisterPage() {
  const [form, setForm] = useState({ nombre: '', email: '', password: '', confirmarPassword: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleRegister = async () => {
    setError(null)
    if (!form.nombre || !form.email || !form.password) { setError('Todos los campos son obligatorios'); return }
    if (form.password !== form.confirmarPassword) { setError('Las contraseñas no coinciden'); return }
    if (form.password.length < 6) { setError('La contraseña debe tener al menos 6 caracteres'); return }
    setLoading(true)
    try {
      const response = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: form.nombre, email: form.email, password: form.password })
      })
      if (!response.ok) {
        const text = await response.text()
        throw new Error(text || 'Error al registrarse')
      }
      navigate('/login')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%', padding: '14px 0', border: 'none',
    borderBottom: '1px solid var(--gris-medio)', backgroundColor: 'transparent',
    fontSize: '13px', letterSpacing: '1px', outline: 'none',
    fontFamily: 'var(--font-cuerpo)', color: 'var(--negro)'
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100vh' }}>
      <div style={{ backgroundColor: 'var(--negro)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '60px' }}>
        <p style={{ color: 'var(--dorado)', fontSize: '11px', letterSpacing: '6px', textTransform: 'uppercase', marginBottom: '24px' }}>Nueva cuenta</p>
        <h1 style={{ fontFamily: 'var(--font-titulo)', color: 'var(--blanco)', fontSize: '56px', fontWeight: 300, letterSpacing: '8px', textTransform: 'uppercase', textAlign: 'center' }}>VESTIDOS</h1>
        <div style={{ height: '1px', width: '60px', backgroundColor: 'var(--dorado)', margin: '24px 0' }}></div>
        <p style={{ color: 'var(--gris-texto)', fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', textAlign: 'center' }}>Únete a nuestra comunidad</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 60px' }}>
        <h2 style={{ fontFamily: 'var(--font-titulo)', fontSize: '36px', fontWeight: 300, letterSpacing: '4px', marginBottom: '8px' }}>Crear Cuenta</h2>
        <div style={{ height: '1px', width: '40px', backgroundColor: 'var(--dorado)', marginBottom: '48px' }}></div>

        {error && (
          <div style={{ backgroundColor: '#fff0f0', border: '1px solid #ffcccc', padding: '12px 16px', marginBottom: '24px', fontSize: '12px', color: '#cc0000', letterSpacing: '1px' }}>
            {error}
          </div>
        )}

        {[
          { label: 'Nombre', name: 'nombre', type: 'text', placeholder: 'Tu nombre completo' },
          { label: 'Email', name: 'email', type: 'email', placeholder: 'tu@email.com' },
          { label: 'Contraseña', name: 'password', type: 'password', placeholder: 'Mínimo 6 caracteres' },
          { label: 'Confirmar Contraseña', name: 'confirmarPassword', type: 'password', placeholder: 'Repite tu contraseña' },
        ].map(field => (
          <div key={field.name} style={{ marginBottom: '32px' }}>
            <label style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gris-texto)', display: 'block', marginBottom: '8px' }}>
              {field.label}
            </label>
            <input type={field.type} name={field.name} value={form[field.name]} onChange={handleChange} placeholder={field.placeholder} style={inputStyle} />
          </div>
        ))}

        <button onClick={handleRegister} disabled={loading} className="btn-primary" style={{ width: '100%', padding: '18px', fontSize: '11px', letterSpacing: '3px' }}>
          {loading ? 'CREANDO CUENTA...' : 'CREAR CUENTA'}
        </button>

        <p style={{ textAlign: 'center', marginTop: '32px', fontSize: '11px', letterSpacing: '2px', color: 'var(--gris-texto)' }}>
          ¿Ya tienes cuenta?{' '}
          <span onClick={() => navigate('/login')} style={{ color: 'var(--negro)', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '4px' }}>
            Inicia sesión
          </span>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage