import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function RegisterPage() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmarPassword: ''
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleRegister = async () => {
    setError(null)

    // Validaciones
    if (!form.nombre || !form.email || !form.password) {
      setError('Todos los campos son obligatorios')
      return
    }

    if (form.password !== form.confirmarPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    if (form.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    setLoading(true)

    try {
    const response = await fetch('http://localhost:8080/api/users/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        nombre: form.nombre,
        email: form.email,
        password: form.password
        })
    })

    if (!response.ok) {
    const text = await response.text()
    try {
        const data = JSON.parse(text)
        throw new Error(data.error || 'Error al registrarse')
    } catch {
        throw new Error(text || 'Error al registrarse')
    }
    }

  // Registro exitoso
    setSuccess(true)
    setTimeout(() => navigate('/login'), 2000)

} catch (err) {
    setError(err.message)
} finally {
    setLoading(false)
}
    }

  return (
    <div style={{ maxWidth: '400px', margin: '80px auto', padding: '32px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Crear cuenta</h2>

      {error && (
        <p style={{ color: 'red', textAlign: 'center', marginBottom: '16px' }}>
          {error}
        </p>
      )}

      {success && (
        <p style={{ color: 'green', textAlign: 'center', marginBottom: '16px' }}>
            ✓ Cuenta creada exitosamente. Redirigiendo...
        </p>
        )}

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '6px' }}>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Tu nombre completo"
          style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '6px' }}>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="tu@email.com"
          style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '6px' }}>Contraseña</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Mínimo 6 caracteres"
          style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
        />
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', marginBottom: '6px' }}>Confirmar contraseña</label>
        <input
          type="password"
          name="confirmarPassword"
          value={form.confirmarPassword}
          onChange={handleChange}
          placeholder="Repite tu contraseña"
          style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
        />
      </div>

      <button
        onClick={handleRegister}
        disabled={loading}
        style={{ width: '100%', padding: '12px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}
      >
        {loading ? 'Creando cuenta...' : 'Crear cuenta'}
      </button>

      <p style={{ textAlign: 'center', marginTop: '16px' }}>
        ¿Ya tienes cuenta?{' '}
        <span
          onClick={() => navigate('/login')}
          style={{ cursor: 'pointer', textDecoration: 'underline' }}
        >
          Inicia sesión
        </span>
      </p>
    </div>
  )
}

export default RegisterPage