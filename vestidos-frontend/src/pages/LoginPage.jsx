import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleLogin = async (e) => {
      e.preventDefault()
      setLoading(true)
      setError(null)

      try {
        const response = await fetch('http://localhost:8080/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        })

      // Si hay error leemos como texto, si es exitoso como JSON
        if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || 'Email o contraseña incorrectos')
        }

        const data = await response.json()
        localStorage.setItem('user', JSON.stringify(data))

        if (data.rol === 'ADMIN') {
          navigate('/admin')
        } else {
          navigate('/')
        }

      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    //comenzacmo con el return
    return (
        <div style={{ maxWidth: '400px', margin: '80px auto', padding: '32px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '24px'}}>Iniciar Sesion</h2>
            {error &&(
                <p style={{color: 'red', textAlign: 'center', marginBottom: '16px'}}>
                    {error}
                </p>
            )}

            <div style={{ marginBottom: '16px'}}>
                <label style={{display:'block', marginBottom: '6px'}}> Email</label>
                <input 
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tu@email.com"
                style={{width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box'}} 
                />
            </div>

            <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '6px' }}>Contraseña</label>
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
                />
            </div>

            <button 
            onClick={handleLogin}
            disabled={loading}
            style={{width:'100%', padding: '12px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer',fontSize: '16px'}}
            >
                {loading? 'entrando...' : 'Entrar'}
            </button>

            <p style={{ textAlign: 'center', marginTop: '16px'}}>
                No tienes cuenta?{''}
                <span
                onClick={() => navigate('/register')}
                style={{ cursor: 'pointer', textDecoration: 'underline'}}
                >
                    Registrate
                </span>
            </p>
        </div>
    )
}

export default LoginPage