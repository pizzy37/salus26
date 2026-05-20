import { useState } from 'react'
import { Shield, Menu, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getToken, removeToken } from '../api'

const LINKS = [
  { label: 'Accueil', path: '/' },
  { label: 'Fonctionnalites', path: '/#features' },
  { label: 'Equipe', path: '/#team' },
  { label: 'Contact', path: '/#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const token = getToken()
  const isAuthenticated = Boolean(token)
  let userRole = null
  try {
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]))
      userRole = payload?.role || null
    }
  } catch (_) {
    userRole = null
  }
  const isAdmin = userRole === 'admin'

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 999,
        background: 'rgba(5,5,16,0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(168,85,247,0.2)',
        padding: '0 1.5rem',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '8px',
            background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 14px rgba(168,85,247,0.5)',
          }}>
            <Shield size={18} color="#fff" />
          </div>
          <span style={{
            fontFamily: 'Orbitron,sans-serif',
            fontWeight: 700,
            fontSize: '1.1rem',
            background: 'linear-gradient(135deg, #f0f0ff, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            SALUS
          </span>
        </div>

        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-nav">
          {LINKS.map(({ label, path }) => (
            <a
              key={label}
              href={path}
              style={{
                color: '#8888aa',
                textDecoration: 'none',
                fontFamily: 'Rajdhani,sans-serif',
                fontSize: '0.95rem',
                fontWeight: 500,
                letterSpacing: '0.05em',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#a855f7'}
              onMouseLeave={e => e.currentTarget.style.color = '#8888aa'}
              onClick={e => {
                e.preventDefault()
                navigate(path)
              }}
            >
              {label}
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {!isAuthenticated ? (
            <>
              <button onClick={() => navigate('/login')} style={{ background: 'transparent', border: '1px solid rgba(168,85,247,0.4)', borderRadius: '8px', padding: '0.5rem 1.2rem', color: '#a855f7', fontFamily: 'Orbitron,sans-serif', fontSize: '0.7rem', letterSpacing: '0.08em', cursor: 'pointer' }}>
                CONNEXION
              </button>
              <button onClick={() => navigate('/signup')} style={{ background: 'linear-gradient(135deg, #a855f7, #7c3aed)', border: 'none', borderRadius: '8px', padding: '0.5rem 1.2rem', color: '#fff', fontFamily: 'Orbitron,sans-serif', fontSize: '0.7rem', letterSpacing: '0.08em', cursor: 'pointer', boxShadow: '0 0 14px rgba(168,85,247,0.35)' }}>
                INSCRIPTION
              </button>
            </>
          ) : (
            <>
              {!isAdmin && (
                <>
                  <button onClick={() => navigate('/profile')} style={{ background: 'transparent', border: '1px solid rgba(168,85,247,0.4)', borderRadius: '8px', padding: '0.5rem 1rem', color: '#a855f7', fontFamily: 'Orbitron,sans-serif', fontSize: '0.7rem', letterSpacing: '0.08em', cursor: 'pointer' }}>
                    PROFIL
                  </button>
                  <button onClick={() => navigate('/settings')} style={{ background: 'transparent', border: '1px solid rgba(6,182,212,0.4)', borderRadius: '8px', padding: '0.5rem 1rem', color: '#06b6d4', fontFamily: 'Orbitron,sans-serif', fontSize: '0.7rem', letterSpacing: '0.08em', cursor: 'pointer' }}>
                    PARAMETRES
                  </button>
                </>
              )}
              <button
                onClick={() => {
                  removeToken()
                  navigate('/login')
                }}
                style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', color: '#fff', fontFamily: 'Orbitron,sans-serif', fontSize: '0.7rem', letterSpacing: '0.08em', cursor: 'pointer' }}
              >
                DECONNEXION
              </button>
            </>
          )}

          <button onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', color: '#a855f7', cursor: 'pointer', display: 'none' }} className="burger">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .burger { display: block !important; }
        }
      `}</style>
    </>
  )
}
