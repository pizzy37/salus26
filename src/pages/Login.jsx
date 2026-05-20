import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { authAPI, setToken } from '../api'
import backgroundImage from './images/test4.png'

export default function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm]   = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      setError('Veuillez remplir tous les champs.')
      return
    }
    setLoading(true)
    try {
      const res = await authAPI.login({
        email:    form.email,
        password: form.password,
      })
      setToken(res.data.token)
      // Redirection selon le rôle
      if (res.data.user.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/profile')
      }
    } catch (err) {
      setError(err.message || 'Identifiants incorrects.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', position: 'relative',
      fontFamily: 'Rajdhani,sans-serif',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1.5rem',
    }}>
      {/* Background */}
      <div style={{ position: 'fixed', inset: 0, backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(5,5,16,0.85)', backdropFilter: 'blur(2px)', zIndex: 1 }} />

      {/* Card */}
      <div style={{
        position: 'relative', zIndex: 2,
        width: '100%', maxWidth: '460px',
        background: 'rgba(13,13,31,0.7)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(168,85,247,0.25)',
        borderRadius: '20px', overflow: 'hidden',
      }}>

        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(6,182,212,0.08))',
          borderBottom: '1px solid rgba(168,85,247,0.2)',
          padding: '2rem', textAlign: 'center',
        }}>
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
            fontFamily: 'Orbitron,sans-serif', fontSize: '1.5rem', fontWeight: 700,
            background: 'linear-gradient(135deg, #f0f0ff, #a855f7)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            marginBottom: '0.3rem',
          }}>
            SALUS
          </h1>
          <p style={{ color: '#8888aa', fontSize: '0.9rem' }}>Connexion à votre espace</p>
        </div>

        {/* Body */}
        <div style={{ padding: '2rem' }}>

          {/* Email */}
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ display: 'block', color: '#8888aa', fontSize: '0.75rem', fontFamily: 'Orbitron,sans-serif', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
              EMAIL
            </label>
            <input
              type="email" name="email"
              placeholder="votre@email.com"
              value={form.email} onChange={handleChange}
              style={{
                width: '100%', background: 'rgba(168,85,247,0.06)',
                border: '1px solid rgba(168,85,247,0.2)', borderRadius: '8px',
                padding: '0.8rem 1rem', color: '#f0f0ff',
                fontFamily: 'Rajdhani,sans-serif', fontSize: '1rem',
                outline: 'none', boxSizing: 'border-box',
              }}
              onFocus={e => e.target.style.borderColor = '#a855f7'}
              onBlur={e  => e.target.style.borderColor = 'rgba(168,85,247,0.2)'}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: '#8888aa', fontSize: '0.75rem', fontFamily: 'Orbitron,sans-serif', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
              MOT DE PASSE
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'} name="password"
                placeholder="••••••••"
                value={form.password} onChange={handleChange}
                style={{
                  width: '100%', background: 'rgba(168,85,247,0.06)',
                  border: '1px solid rgba(168,85,247,0.2)', borderRadius: '8px',
                  padding: '0.8rem 3rem 0.8rem 1rem', color: '#f0f0ff',
                  fontFamily: 'Rajdhani,sans-serif', fontSize: '1rem',
                  outline: 'none', boxSizing: 'border-box',
                }}
                onFocus={e => e.target.style.borderColor = '#a855f7'}
                onBlur={e  => e.target.style.borderColor = 'rgba(168,85,247,0.2)'}
              />
              <button onClick={() => setShowPassword(!showPassword)} style={{
                position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', color: '#8888aa', cursor: 'pointer',
              }}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div style={{ textAlign: 'right', marginTop: '0.5rem' }}>
              <a href="#" style={{ color: '#a855f7', fontSize: '0.8rem', textDecoration: 'none' }}>
                Mot de passe oublié ?
              </a>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1.2rem',
              display: 'flex', alignItems: 'center', gap: '8px',
              color: '#ef4444', fontSize: '0.9rem',
            }}>
              <AlertCircle size={16} /> {error}
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit} disabled={loading}
            style={{
              width: '100%',
              background: loading ? 'rgba(168,85,247,0.3)' : 'linear-gradient(135deg, #a855f7, #7c3aed)',
              border: 'none', borderRadius: '8px', padding: '0.9rem',
              color: '#fff', fontFamily: 'Orbitron,sans-serif',
              fontSize: '0.8rem', letterSpacing: '0.1em',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: loading ? 'none' : '0 0 20px rgba(168,85,247,0.4)',
              transition: 'all 0.3s',
            }}
          >
            {loading ? 'CONNEXION EN COURS...' : 'SE CONNECTER'}
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem 0' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(168,85,247,0.2)' }} />
            <span style={{ color: '#8888aa', fontSize: '0.8rem' }}>ou</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(168,85,247,0.2)' }} />
          </div>

          <p style={{ textAlign: 'center', color: '#8888aa', fontSize: '0.9rem' }}>
            Pas encore de compte ?{' '}
            <a href="/signup" style={{ color: '#a855f7', textDecoration: 'none', fontWeight: 600 }}>
              S'inscrire
            </a>
          </p>
          <p style={{ textAlign: 'center', marginTop: '0.7rem' }}>
            <a href="/" style={{ color: '#06b6d4', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>
              Accueil
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
