import { useState } from 'react'
import { Shield, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
// Import de la même image de fond que Home
import backgroundImage from './images/test4.png'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = () => {
    if (!form.email || !form.password) { 
      setError('Veuillez remplir tous les champs.')
      return 
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setError('Identifiants incorrects. Réessayez.')
    }, 1500)
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      position: 'relative',
    }}>
      {/* Background image overlay - exactement comme Home */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        zIndex: 0,
      }} />
      
      {/* Dark overlay for better readability */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(5, 5, 16, 0.85)',
        backdropFilter: 'blur(2px)',
        zIndex: 1,
      }} />

      {/* Content wrapper */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <Navbar />

        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '84px 1.5rem 2rem',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'Rajdhani,sans-serif',
        }}>

          {/* Background grid - exactement comme Home */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `
              linear-gradient(rgba(168,85,247,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(168,85,247,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            pointerEvents: 'none',
          }} />

          {/* Glow orbs - exactement comme Home */}
          <div style={{
            position: 'absolute', top: '10%', left: '5%',
            width: '400px', height: '400px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: '10%', right: '5%',
            width: '350px', height: '350px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Card */}
          <div style={{
            width: '100%',
            maxWidth: '460px',
            background: 'rgba(13,13,31,0.95)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(168,85,247,0.25)',
            borderRadius: '20px',
            overflow: 'hidden',
            position: 'relative',
            zIndex: 1,
          }}>

            {/* Card header */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(6,182,212,0.08))',
              borderBottom: '1px solid rgba(168,85,247,0.2)',
              padding: '2rem',
              textAlign: 'center',
            }}>
              {/* Logo */}
              <div style={{
                width: '56px', height: '56px', borderRadius: '14px',
                background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1rem',
                boxShadow: '0 0 24px rgba(168,85,247,0.5)',
              }}>
                <Shield size={26} color="#fff" />
              </div>

              <h1 style={{
                fontFamily: 'Orbitron,sans-serif',
                fontSize: '1.5rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #f0f0ff, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '0.3rem',
              }}>
                SALUS
              </h1>
              <p style={{ color: '#8888aa', fontSize: '0.9rem' }}>
                Connexion à votre espace
              </p>
            </div>

            {/* Card body */}
            <div style={{ padding: '2rem' }}>

              {/* Email */}
              <div style={{ marginBottom: '1.2rem' }}>
                <label style={{
                  display: 'block',
                  color: '#8888aa',
                  fontSize: '0.75rem',
                  fontFamily: 'Orbitron,sans-serif',
                  letterSpacing: '0.1em',
                  marginBottom: '0.5rem',
                }}>
                  EMAIL
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="votre@email.com"
                  value={form.email}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    background: 'rgba(168,85,247,0.06)',
                    border: '1px solid rgba(168,85,247,0.2)',
                    borderRadius: '8px',
                    padding: '0.8rem 1rem',
                    color: '#f0f0ff',
                    fontFamily: 'Rajdhani,sans-serif',
                    fontSize: '1rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = '#a855f7'}
                  onBlur={e => e.target.style.borderColor = 'rgba(168,85,247,0.2)'}
                />
              </div>

              {/* Password */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  color: '#8888aa',
                  fontSize: '0.75rem',
                  fontFamily: 'Orbitron,sans-serif',
                  letterSpacing: '0.1em',
                  marginBottom: '0.5rem',
                }}>
                  MOT DE PASSE
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      background: 'rgba(168,85,247,0.06)',
                      border: '1px solid rgba(168,85,247,0.2)',
                      borderRadius: '8px',
                      padding: '0.8rem 3rem 0.8rem 1rem',
                      color: '#f0f0ff',
                      fontFamily: 'Rajdhani,sans-serif',
                      fontSize: '1rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor = '#a855f7'}
                    onBlur={e => e.target.style.borderColor = 'rgba(168,85,247,0.2)'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute', right: '12px', top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none', border: 'none',
                      color: '#8888aa', cursor: 'pointer',
                      display: 'flex', alignItems: 'center',
                    }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {/* Forgot password */}
                <div style={{ textAlign: 'right', marginTop: '0.5rem' }}>
                  <a href="#" style={{
                    color: '#a855f7',
                    fontSize: '0.8rem',
                    textDecoration: 'none',
                    fontFamily: 'Rajdhani,sans-serif',
                  }}>
                    Mot de passe oublié ?
                  </a>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div style={{
                  background: 'rgba(239,68,68,0.1)',
                  border: '1px solid rgba(239,68,68,0.3)',
                  borderRadius: '8px',
                  padding: '0.75rem 1rem',
                  marginBottom: '1.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#ef4444',
                  fontSize: '0.9rem',
                }}>
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}

              {/* Submit button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  width: '100%',
                  background: loading
                    ? 'rgba(168,85,247,0.3)'
                    : 'linear-gradient(135deg, #a855f7, #7c3aed)',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.9rem',
                  color: '#fff',
                  fontFamily: 'Orbitron,sans-serif',
                  fontSize: '0.8rem',
                  letterSpacing: '0.1em',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: loading ? 'none' : '0 0 20px rgba(168,85,247,0.4)',
                  transition: 'all 0.3s ease',
                }}
              >
                {loading ? 'CONNEXION EN COURS...' : 'SE CONNECTER'}
              </button>

              {/* Divider */}
              <div style={{
                display: 'flex', alignItems: 'center',
                gap: '1rem', margin: '1.5rem 0',
              }}>
                <div style={{ flex: 1, height: '1px', background: 'rgba(168,85,247,0.2)' }} />
                <span style={{ color: '#8888aa', fontSize: '0.8rem' }}>ou</span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(168,85,247,0.2)' }} />
              </div>

              {/* Signup link */}
              <p style={{ textAlign: 'center', color: '#8888aa', fontSize: '0.9rem' }}>
                Pas encore de compte ?{' '}
                <button 
                  onClick={() => navigate('/signup')}
                  style={{
                    color: '#a855f7',
                    background: 'none',
                    border: 'none',
                    textDecoration: 'none',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: 'inherit',
                    padding: 0,
                  }}
                  onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                  onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
                >
                  S'inscrire
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
