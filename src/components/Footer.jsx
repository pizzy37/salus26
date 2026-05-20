import { Shield, Mail, GitBranch } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{
      position: 'relative',
      zIndex: 2,
      borderTop: '1px solid rgba(168,85,247,0.15)',
      background: 'rgba(5,5,16,0.8)',
      backdropFilter: 'blur(8px)',
      padding: '2.5rem 1.5rem',
      fontFamily: 'Rajdhani,sans-serif',
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2rem',
        marginBottom: '2rem',
      }}>

        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
            <div style={{
              width: '34px', height: '34px', borderRadius: '8px',
              background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 12px rgba(168,85,247,0.4)',
            }}>
              <Shield size={16} color="#fff" />
            </div>
            <span style={{
              fontFamily: 'Orbitron,sans-serif',
              fontWeight: 700, fontSize: '1rem',
              background: 'linear-gradient(135deg, #f0f0ff, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              SALUS
            </span>
          </div>
          <p style={{ color: '#8888aa', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: '220px' }}>
            Système d'alerte d'urgence intelligent pour la sécurité routière.
          </p>
        </div>

        {/* Projet */}
        <div>
          <div style={{ color: '#a855f7', fontFamily: 'Orbitron,sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', marginBottom: '1rem' }}>
            PROJET
          </div>
          {[
            { label: 'À propos',       href: '/#about'    },
            { label: 'Fonctionnalités', href: '/#features' },
            { label: 'Notre équipe',   href: '/#team'     },
            { label: 'Contact',        href: '/#contact'  },
          ].map(({ label, href }) => (
            <a key={label} href={href} style={{
              display: 'block',
              color: '#8888aa',
              textDecoration: 'none',
              fontSize: '0.9rem',
              marginBottom: '0.5rem',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#a855f7'}
            onMouseLeave={e => e.currentTarget.style.color = '#8888aa'}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Application */}
        <div>
          <div style={{ color: '#06b6d4', fontFamily: 'Orbitron,sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', marginBottom: '1rem' }}>
            APPLICATION
          </div>
          {[
            { label: 'Connexion',    href: '/login'     },
            { label: 'Inscription',  href: '/signup'    },
            { label: 'Mon profil',   href: '/profile'   },
            { label: 'Paramètres',   href: '/settings'  },
            { label: 'Urgence',      href: '/emergency' },
          ].map(({ label, href }) => (
            <a key={label} href={href} style={{
              display: 'block',
              color: '#8888aa',
              textDecoration: 'none',
              fontSize: '0.9rem',
              marginBottom: '0.5rem',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#06b6d4'}
            onMouseLeave={e => e.currentTarget.style.color = '#8888aa'}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Contact */}
        <div>
          <div style={{ color: '#f59e0b', fontFamily: 'Orbitron,sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', marginBottom: '1rem' }}>
            CONTACT
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { Icon: Mail,      label: 'salus@fsr.ac.ma',    href: 'mailto:salus@fsr.ac.ma', color: '#a855f7' },
              { Icon: GitBranch, label: 'github.com/salus',   href: 'https://github.com',     color: '#8888aa' },
            ].map(({ Icon, label, href, color }) => (
              <a key={label} href={href} style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                color: '#8888aa', textDecoration: 'none',
                fontSize: '0.9rem', transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = color}
              onMouseLeave={e => e.currentTarget.style.color = '#8888aa'}
              >
                <Icon size={15} />
                {label}
              </a>
            ))}
          </div>

          {/* FSR badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'rgba(168,85,247,0.08)',
            border: '1px solid rgba(168,85,247,0.2)',
            borderRadius: '999px',
            padding: '4px 12px',
            marginTop: '1rem',
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#a855f7' }} />
            <span style={{ color: '#a855f7', fontFamily: 'Orbitron,sans-serif', fontSize: '0.6rem', letterSpacing: '0.1em' }}>
              SALUS 26
            </span>
          </div>
        </div> 

      </div> 

      {/* Bottom bar */}
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        paddingTop: '1.5rem',
        borderTop: '1px solid rgba(168,85,247,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
      }}>
        <span style={{ color: '#666688', fontSize: '0.82rem' }}>
          © 2026 <span style={{ color: '#a855f7', fontFamily: 'Orbitron,sans-serif', fontSize: '0.75rem' }}>SALUS</span> —  Tous droits réservés.
        </span>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {['Confidentialité', 'Conditions'].map(label => (
            <a key={label} href="#" style={{
              color: '#666688', textDecoration: 'none',
              fontSize: '0.82rem', transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#a855f7'}
            onMouseLeave={e => e.currentTarget.style.color = '#666688'}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}