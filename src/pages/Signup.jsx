import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react'
import { authAPI, setToken } from '../api'
import backgroundImage from './images/test4.png'

export default function Signup() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm,  setShowConfirm]  = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')
  const [success,  setSuccess]  = useState(false)
  const [form, setForm] = useState({
    nom: '', prenom: '', email: '',
    telephone: '', password: '', confirm: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async () => {
    if (!form.nom || !form.prenom || !form.email || !form.telephone || !form.password || !form.confirm) {
      setError('Veuillez remplir tous les champs.'); return
    }
    if (form.password !== form.confirm) {
      setError('Les mots de passe ne correspondent pas.'); return
    }
    if (form.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.'); return
    }
    setLoading(true)
    try {
      const res = await authAPI.register({
        nom:       form.nom,
        prenom:    form.prenom,
        email:     form.email,
        telephone: form.telephone,
        password:  form.password,
      })
      setToken(res.data.token)
      setSuccess(true)
      setTimeout(() => navigate('/profile'), 2000)
    } catch (err) {
      setError(err.message || 'Erreur lors de la création du compte.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div style={{ minHeight: '100vh', position: 'relative', fontFamily: 'Rajdhani,sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
        <div style={{ position: 'fixed', inset: 0, backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(5,5,16,0.85)', backdropFilter: 'blur(2px)', zIndex: 1 }} />
        <div style={{
          position: 'relative', zIndex: 2, textAlign: 'center',
          background: 'rgba(13,13,31,0.7)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(16,185,129,0.3)', borderRadius: '20px',
          padding: '3rem 2rem', maxWidth: '400px', width: '100%',
        }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '50%',
            background: 'rgba(16,185,129,0.15)', border: '2px solid #10b981',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.5rem', boxShadow: '0 0 24px rgba(16,185,129,0.4)',
          }}>
            <CheckCircle size={30} color="#10b981" />
          </div>
          <h2 style={{ fontFamily: 'Orbitron,sans-serif', fontSize: '1.2rem', color: '#10b981', marginBottom: '1rem' }}>
            COMPTE CRÉÉ !
          </h2>
          <p style={{ color: '#8888aa', lineHeight: 1.7 }}>
            Redirection vers votre profil...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh', position: 'relative',
      fontFamily: 'Rajdhani,sans-serif',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1.5rem',
    }}>
      <div style={{ position: 'fixed', inset: 0, backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(5,5,16,0.85)', backdropFilter: 'blur(2px)', zIndex: 1 }} />

      <div style={{
        position: 'relative', zIndex: 2,
        width: '100%', maxWidth: '500px',
        background: 'rgba(13,13,31,0.7)', backdropFilter: 'blur(8px)',
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
            margin: '0 auto 1rem', boxShadow: '0 0 24px rgba(168,85,247,0.5)',
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
          <p style={{ color: '#8888aa', fontSize: '0.9rem' }}>Créer votre compte conducteur</p>
        </div>

        {/* Body */}
        <div style={{ padding: '2rem' }}>

          {/* Nom & Prenom */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.2rem' }}>
            {[
              { label: 'NOM',    name: 'nom',    placeholder: 'Votre nom'    },
              { label: 'PRÉNOM', name: 'prenom', placeholder: 'Votre prénom' },
            ].map(({ label, name, placeholder }) => (
              <div key={name}>
                <label style={{ display: 'block', color: '#8888aa', fontSize: '0.75rem', fontFamily: 'Orbitron,sans-serif', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                  {label}
                </label>
                <input
                  type="text" name={name} placeholder={placeholder}
                  value={form[name]} onChange={handleChange}
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
            ))}
          </div>

          {/* Email & Tel */}
          {[
            { label: 'EMAIL',     name: 'email',     type: 'email', placeholder: 'votre@email.com'  },
            { label: 'TÉLÉPHONE', name: 'telephone', type: 'tel',   placeholder: '+212 6XX XXX XXX' },
          ].map(({ label, name, type, placeholder }) => (
            <div key={name} style={{ marginBottom: '1.2rem' }}>
              <label style={{ display: 'block', color: '#8888aa', fontSize: '0.75rem', fontFamily: 'Orbitron,sans-serif', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                {label}
              </label>
              <input
                type={type} name={name} placeholder={placeholder}
                value={form[name]} onChange={handleChange}
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
          ))}

          {/* Passwords */}
          {[
            { label: 'MOT DE PASSE',           name: 'password', show: showPassword, toggle: () => setShowPassword(!showPassword) },
            { label: 'CONFIRMER MOT DE PASSE', name: 'confirm',  show: showConfirm,  toggle: () => setShowConfirm(!showConfirm)   },
          ].map(({ label, name, show, toggle }) => (
            <div key={name} style={{ marginBottom: '1.2rem' }}>
              <label style={{ display: 'block', color: '#8888aa', fontSize: '0.75rem', fontFamily: 'Orbitron,sans-serif', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                {label}
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={show ? 'text' : 'password'} name={name}
                  placeholder="••••••••"
                  value={form[name]} onChange={handleChange}
                  style={{
                    width: '100%', background: 'rgba(168,85,247,0.06)',
                    border: `1px solid ${form[name] && name === 'confirm' && form.password !== form.confirm ? 'rgba(239,68,68,0.5)' : 'rgba(168,85,247,0.2)'}`,
                    borderRadius: '8px', padding: '0.8rem 3rem 0.8rem 1rem',
                    color: '#f0f0ff', fontFamily: 'Rajdhani,sans-serif',
                    fontSize: '1rem', outline: 'none', boxSizing: 'border-box',
                  }}
                  onFocus={e => e.target.style.borderColor = '#a855f7'}
                  onBlur={e  => e.target.style.borderColor = 'rgba(168,85,247,0.2)'}
                />
                <button onClick={toggle} style={{
                  position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', color: '#8888aa', cursor: 'pointer',
                }}>
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          ))}

          {/* Password strength */}
          {form.password && (
            <div style={{ marginBottom: '1.2rem' }}>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
                {[1,2,3,4].map(i => (
                  <div key={i} style={{
                    flex: 1, height: '4px', borderRadius: '2px',
                    background: form.password.length >= i * 3
                      ? i <= 1 ? '#ef4444' : i <= 2 ? '#f59e0b' : i <= 3 ? '#06b6d4' : '#10b981'
                      : 'rgba(168,85,247,0.15)',
                    transition: 'background 0.3s',
                  }} />
                ))}
              </div>
              <span style={{ fontSize: '0.75rem', color: form.password.length < 4 ? '#ef4444' : form.password.length < 7 ? '#f59e0b' : form.password.length < 10 ? '#06b6d4' : '#10b981' }}>
                {form.password.length < 4 ? 'Très faible' : form.password.length < 7 ? 'Faible' : form.password.length < 10 ? 'Moyen' : 'Fort'}
              </span>
            </div>
          )}

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
              marginBottom: '1.5rem',
            }}
          >
            {loading ? 'CRÉATION EN COURS...' : 'CRÉER MON COMPTE'}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(168,85,247,0.2)' }} />
            <span style={{ color: '#8888aa', fontSize: '0.8rem' }}>ou</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(168,85,247,0.2)' }} />
          </div>

          <p style={{ textAlign: 'center', color: '#8888aa', fontSize: '0.9rem' }}>
            Déjà un compte ?{' '}
            <a href="/login" style={{ color: '#a855f7', textDecoration: 'none', fontWeight: 600 }}>
              Se connecter
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}