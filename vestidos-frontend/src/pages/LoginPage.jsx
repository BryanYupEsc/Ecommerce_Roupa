import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || 'Email o contraseña incorrectos')
      }
      const data = await response.json()
      localStorage.setItem('user', JSON.stringify(data))
      if (data.rol === 'ADMIN') navigate('/admin')
      else navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '14px 0',
    border: 'none',
    borderBottom: '1px solid var(--gris-medio)',
    backgroundColor: 'transparent',
    fontSize: '13px',
    letterSpacing: '1px',
    outline: 'none',
    fontFamily: 'var(--font-cuerpo)',
    color: 'var(--negro)'
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100vh' }}>

      {/* Panel izquierdo decorativo */}
      <div style={{
        backgroundColor: 'var(--negro)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '60px'
      }}>
        <p style={{ color: 'var(--dorado)', fontSize: '11px', letterSpacing: '6px', textTransform: 'uppercase', marginBottom: '24px' }}>
          Bienvenida
        </p>
        <h1 style={{ fontFamily: 'var(--font-titulo)', color: 'var(--blanco)', fontSize: '56px', fontWeight: 300, letterSpacing: '8px', textTransform: 'uppercase', textAlign: 'center' }}>
          VESTIDOS
        </h1>
        <div style={{ height: '1px', width: '60px', backgroundColor: 'var(--dorado)', margin: '24px 0' }}></div>
        <p style={{ color: 'var(--gris-texto)', fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', textAlign: 'center' }}>
          Elegancia que trasciende
        </p>
      </div>

      {/* Panel derecho - formulario */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 60px' }}>
        <h2 style={{ fontFamily: 'var(--font-titulo)', fontSize: '36px', fontWeight: 300, letterSpacing: '4px', marginBottom: '8px' }}>
          Iniciar Sesión
        </h2>
        <div style={{ height: '1px', width: '40px', backgroundColor: 'var(--dorado)', marginBottom: '48px' }}></div>

        {error && (
          <div style={{ backgroundColor: '#fff0f0', border: '1px solid #ffcccc', padding: '12px 16px', marginBottom: '24px', fontSize: '12px', color: '#cc0000', letterSpacing: '1px' }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: '32px' }}>
          <label style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gris-texto)', display: 'block', marginBottom: '8px' }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="tu@email.com"
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: '48px' }}>
          <label style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gris-texto)', display: 'block', marginBottom: '8px' }}>
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            style={inputStyle}
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="btn-primary"
          style={{ width: '100%', padding: '18px', fontSize: '11px', letterSpacing: '3px' }}
        >
          {loading ? 'INGRESANDO...' : 'INGRESAR'}
        </button>

        <p style={{ textAlign: 'center', marginTop: '32px', fontSize: '11px', letterSpacing: '2px', color: 'var(--gris-texto)' }}>
          ¿No tienes cuenta?{' '}
          <span onClick={() => navigate('/register')} style={{ color: 'var(--negro)', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '4px' }}>
            Regístrate
          </span>
        </p>
      </div>
    </div>
  )
}

export default LoginPage