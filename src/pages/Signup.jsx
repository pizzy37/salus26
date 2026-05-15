import { useState } from 'react'
import { Shield, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
// Import de la même image de fond que Home
import backgroundImage from './images/test4.png'

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    password: '',
    confirm: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = () => {
    if (!form.nom || !form.prenom || !form.email || !form.telephone || !form.password || !form.confirm) {
      setError('Veuillez remplir tous les champs.')
      return
    }
    if (form.password !== form.confirm) {
      setError('Les mots de passe ne correspondent pas.')
      return
    }
    if (form.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
    }, 1500)
  }

  // ── SUCCESS SCREEN ──
  if (success) {
    return (
      <div style={{ 
        minHeight: '100vh',
        position: 'relative',
      }}>
        {/* Background image overlay */}
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

        <div style={{ position: 'relative', zIndex: 2 }}>
          <Navbar />
          
          <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '84px 1.5rem 2rem',
            fontFamily: 'Rajdhani,sans-serif',
          }}>
            <div style={{
              textAlign: 'center',
              background: 'rgba(13,13,31,0.95)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(16,185,129,0.3)',
              borderRadius: '20px',
              padding: '3rem 2rem',
              maxWidth: '400px',
              width: '100%',
            }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '50%',
                background: 'rgba(16,185,129,0.15)',
                border: '2px solid #10b981',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1.5rem',
              }}>
                <CheckCircle size={30} color="#10b981" />
              </div>
              <h2 style={{
                fontFamily: 'Orbitron,sans-serif',
                fontSize: '1.2rem',
                color: '#10b981',
                marginBottom: '1rem',
              }}>
                COMPTE CRÉÉ !
              </h2>
              <p style={{ color: '#8888aa', lineHeight: 1.7, marginBottom: '2rem' }}>
                Votre compte conducteur a été créé avec succès. Vous pouvez maintenant vous connecter.
              </p>
              <button 
                onClick={() => navigate('/login')}
                style={{
                  display: 'block',
                  width: '100%',
                  background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.9rem',
                  color: '#fff',
                  fontFamily: 'Orbitron,sans-serif',
                  fontSize: '0.8rem',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  boxShadow: '0 0 20px rgba(168,85,247,0.4)',
                }}>
                SE CONNECTER
              </button>
            </div>
          </div>
        </div>
      </div>
    )
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
            maxWidth: '500px',
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
                Créer votre compte conducteur
              </p>
            </div>

            {/* Card body */}
            <div style={{ padding: '2rem' }}>

              {/* Nom & Prénom */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.2rem' }}>
                {[
                  { label: 'NOM',    name: 'nom',    placeholder: 'Votre nom' },
                  { label: 'PRÉNOM', name: 'prenom', placeholder: 'Votre prénom' },
                ].map(({ label, name, placeholder }) => (
                  <div key={name}>
                    <label style={{
                      display: 'block',
                      color: '#8888aa',
                      fontSize: '0.75rem',
                      fontFamily: 'Orbitron,sans-serif',
                      letterSpacing: '0.1em',
                      marginBottom: '0.5rem',
                    }}>
                      {label}
                    </label>
                    <input
                      type="text"
                      name={name}
                      placeholder={placeholder}
                      value={form[name]}
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
                ))}
              </div>

              {/* Email & Telephone */}
              {[
                { label: 'EMAIL',     name: 'email',     type: 'email', placeholder: 'votre@email.com' },
                { label: 'TÉLÉPHONE', name: 'telephone', type: 'tel',   placeholder: '+212 6XX XXX XXX' },
              ].map(({ label, name, type, placeholder }) => (
                <div key={name} style={{ marginBottom: '1.2rem' }}>
                  <label style={{
                    display: 'block',
                    color: '#8888aa',
                    fontSize: '0.75rem',
                    fontFamily: 'Orbitron,sans-serif',
                    letterSpacing: '0.1em',
                    marginBottom: '0.5rem',
                  }}>
                    {label}
                  </label>
                  <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={form[name]}
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
              ))}

              {/* Password */}
              {[
                { label: 'MOT DE PASSE',        name: 'password', show: showPassword, toggle: () => setShowPassword(!showPassword), placeholder: '••••••••' },
                { label: 'CONFIRMER MOT DE PASSE', name: 'confirm', show: showConfirm,  toggle: () => setShowConfirm(!showConfirm),   placeholder: '••••••••' },
              ].map(({ label, name, show, toggle, placeholder }) => (
                <div key={name} style={{ marginBottom: '1.2rem' }}>
                  <label style={{
                    display: 'block',
                    color: '#8888aa',
                    fontSize: '0.75rem',
                    fontFamily: 'Orbitron,sans-serif',
                    letterSpacing: '0.1em',
                    marginBottom: '0.5rem',
                  }}>
                    {label}
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={show ? 'text' : 'password'}
                      name={name}
                      placeholder={placeholder}
                      value={form[name]}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        background: 'rgba(168,85,247,0.06)',
                        border: `1px solid ${form[name] && name === 'confirm' && form.password !== form.confirm ? 'rgba(239,68,68,0.5)' : 'rgba(168,85,247,0.2)'}`,
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
                      onClick={toggle}
                      style={{
                        position: 'absolute', right: '12px', top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none', border: 'none',
                        color: '#8888aa', cursor: 'pointer',
                        display: 'flex', alignItems: 'center',
                      }}
                    >
                      {show ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              ))}

              {/* Password strength */}
              {form.password && (
                <div style={{ marginBottom: '1.2rem' }}>
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} style={{
                        flex: 1, height: '4px', borderRadius: '2px',
                        background: form.password.length >= i * 3
                          ? i <= 1 ? '#ef4444'
                            : i <= 2 ? '#f59e0b'
                              : i <= 3 ? '#06b6d4'
                                : '#10b981'
                          : 'rgba(168,85,247,0.15)',
                        transition: 'background 0.3s',
                      }} />
                    ))}
                  </div>
                  <span style={{
                    fontSize: '0.75rem',
                    color: form.password.length < 4 ? '#ef4444'
                      : form.password.length < 7 ? '#f59e0b'
                        : form.password.length < 10 ? '#06b6d4'
                          : '#10b981',
                  }}>
                    {form.password.length < 4 ? 'Très faible'
                      : form.password.length < 7 ? 'Faible'
                        : form.password.length < 10 ? 'Moyen'
                          : 'Fort'}
                  </span>
                </div>
              )}

              {/* Error */}
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

              {/* Submit */}
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
                  marginBottom: '1.5rem',
                }}
              >
                {loading ? 'CRÉATION EN COURS...' : 'CRÉER MON COMPTE'}
              </button>

              {/* Divider */}
              <div style={{
                display: 'flex', alignItems: 'center',
                gap: '1rem', marginBottom: '1.5rem',
              }}>
                <div style={{ flex: 1, height: '1px', background: 'rgba(168,85,247,0.2)' }} />
                <span style={{ color: '#8888aa', fontSize: '0.8rem' }}>ou</span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(168,85,247,0.2)' }} />
              </div>

              {/* Login link */}
              <p style={{ textAlign: 'center', color: '#8888aa', fontSize: '0.9rem' }}>
                Déjà un compte ?{' '}
                <button 
                  onClick={() => navigate('/login')}
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
                  Se connecter
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
