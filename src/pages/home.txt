import { useState, useEffect } from 'react'
import { Shield, Zap, MapPin, Smartphone, Users, Mail, ChevronDown, Activity } from 'lucide-react'
import Navbar from '../components/Navbar'
// Import de l'image depuis pages/images/
import backgroundImage from './images/test4.png'

// ── DATA ────────────────────────────────────────────────────────────────
const TEAM = [
  { name: 'Oumaima HONNIT',           role: 'Team Leader',   initials: 'OH', color: '#a855f7' },
  { name: 'Oumaima KASSIMI ALAOUI',   role: 'Développeuse',  initials: 'OK', color: '#06b6d4' },
  { name: 'Youssra BENCHRIFA',        role: 'Développeuse',  initials: 'YB', color: '#ec4899' },
  { name: 'Fatima Zahra EL MARZOUKI', role: 'Développeuse',  initials: 'FZ', color: '#f59e0b' },
  { name: 'Hani EZ-ZHAR',             role: 'Développeur',   initials: 'HE', color: '#10b981' },
  { name: 'Mohammed Adam ELKHADRI',   role: 'Développeur',   initials: 'MA', color: '#ef4444' },
  { name: 'Ismail AIT BAALI',         role: 'Développeur',   initials: 'IA', color: '#06b6d4' },
  { name: 'Membre 8',                 role: 'Développeur',   initials: 'M8', color: '#a855f7' },
  { name: 'Membre 9',                 role: 'Développeur',   initials: 'M9', color: '#f59e0b' },
  { name: 'Membre 10',                role: 'Développeur',   initials: 'M0', color: '#10b981' },
]

const FEATURES = [
  { icon: Zap,        title: 'Détection Automatique', desc: "Détection d'accident via gyroscope intégré en temps réel." },
  { icon: MapPin,     title: 'Localisation GPS',      desc: 'Transmission instantanée des coordonnées GPS aux secours.' },
  { icon: Smartphone, title: 'Application Mobile',    desc: "Contrôle total via l'app Salus — annulation en un clic." },
  { icon: Shield,     title: 'Données Sécurisées',    desc: 'Informations médicales chiffrées et transmises aux autorités.' },
  { icon: Activity,   title: "SMS d'Urgence",         desc: 'Alerte automatique envoyée avec toutes les infos vitales.' },
  { icon: Users,      title: 'Contact Proche',        desc: 'Notification simultanée d\'un proche de confiance.' },
]

// ── COMPONENTS ───────────────────────────────────────────────────────────
function GlowLine() {
  return (
    <div style={{
      height: '1px',
      background: 'linear-gradient(90deg, transparent, #a855f7, #06b6d4, transparent)',
      width: '100%',
      opacity: 0.6,
    }} />
  )
}

function StatCard({ value, label }) {
  return (
    <div style={{
      background: 'rgba(168,85,247,0.1)',
      backdropFilter: 'blur(5px)',
      border: '1px solid rgba(168,85,247,0.25)',
      borderRadius: '12px',
      padding: '1.5rem',
      textAlign: 'center',
      flex: 1,
      minWidth: '130px',
    }}>
      <div style={{ fontFamily: 'Orbitron,sans-serif', fontSize: '2rem', fontWeight: 700, color: '#a855f7' }}>
        {value}
      </div>
      <div style={{ color: '#8888aa', fontSize: '0.85rem', marginTop: '4px', fontFamily: 'Rajdhani,sans-serif' }}>
        {label}
      </div>
    </div>
  )
}

function FeatureCard({ icon: Icon, title, desc }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(168,85,247,0.15)' : 'rgba(13,13,31,0.7)',
        backdropFilter: 'blur(8px)',
        border: `1px solid ${hovered ? 'rgba(168,85,247,0.6)' : 'rgba(168,85,247,0.2)'}`,
        borderRadius: '14px',
        padding: '1.8rem',
        transition: 'all 0.3s ease',
        cursor: 'default',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      <div style={{
        width: '48px', height: '48px', borderRadius: '10px',
        background: 'rgba(168,85,247,0.15)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '1rem',
        border: '1px solid rgba(168,85,247,0.3)',
      }}>
        <Icon size={22} color="#a855f7" />
      </div>
      <h3 style={{ fontFamily: 'Orbitron,sans-serif', fontSize: '0.85rem', color: '#f0f0ff', marginBottom: '0.6rem', letterSpacing: '0.05em' }}>
        {title}
      </h3>
      <p style={{ color: '#8888aa', fontSize: '0.95rem', lineHeight: 1.6, fontFamily: 'Rajdhani,sans-serif' }}>
        {desc}
      </p>
    </div>
  )
}

function TeamCard({ member }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'rgba(13,13,31,0.7)',
        backdropFilter: 'blur(8px)',
        border: `1px solid ${hovered ? member.color + '88' : 'rgba(168,85,247,0.15)'}`,
        borderRadius: '14px',
        padding: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateX(6px)' : 'translateX(0)',
      }}
    >
      <div style={{
        width: '52px', height: '52px', borderRadius: '50%',
        background: member.color + '22',
        border: `2px solid ${member.color}66`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Orbitron,sans-serif', fontWeight: 700, fontSize: '0.85rem',
        color: member.color,
        flexShrink: 0,
      }}>
        {member.initials}
      </div>
      <div>
        <div style={{ fontWeight: 600, fontSize: '1rem', color: '#f0f0ff', fontFamily: 'Rajdhani,sans-serif' }}>
          {member.name}
        </div>
        <div style={{ fontSize: '0.8rem', color: member.color, fontFamily: 'Orbitron,sans-serif', letterSpacing: '0.05em' }}>
          {member.role}
        </div>
      </div>
    </div>
  )
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────
export default function Home() {
  const [dots, setDots] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(d => d.length >= 3 ? '' : d + '.')
    }, 500)
    return () => clearInterval(interval)
  }, [])

  const section = {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '5rem 1.5rem',
  }

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

        {/* ── HERO ── */}
        <section style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '84px 1.5rem 2rem',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Background grid */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `
              linear-gradient(rgba(168,85,247,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(168,85,247,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            pointerEvents: 'none',
          }} />

          {/* Glow orbs */}
          <div style={{
            position: 'absolute', top: '20%', left: '15%',
            width: '300px', height: '300px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: '20%', right: '15%',
            width: '250px', height: '250px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(168,85,247,0.15)',
            backdropFilter: 'blur(5px)',
            border: '1px solid rgba(168,85,247,0.35)',
            borderRadius: '999px',
            padding: '6px 18px',
            marginBottom: '2rem',
            fontSize: '0.8rem',
            color: '#a855f7',
            fontFamily: 'Orbitron,sans-serif',
            letterSpacing: '0.1em',
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#a855f7', display: 'inline-block' }} />
            FSR ROBOTIC CLUB — 2024
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: 'Orbitron,sans-serif',
            fontSize: 'clamp(3rem, 10vw, 7rem)',
            fontWeight: 900,
            lineHeight: 1,
            marginBottom: '0.5rem',
            background: 'linear-gradient(135deg, #f0f0ff 30%, #a855f7 70%, #06b6d4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em',
          }}>
            SALUS
          </h1>

          <div style={{
            fontFamily: 'Orbitron,sans-serif',
            fontSize: 'clamp(0.7rem, 2vw, 1rem)',
            color: '#06b6d4',
            letterSpacing: '0.4em',
            marginBottom: '2rem',
          }}>
            SYSTÈME D'ALERTE D'URGENCE INTELLIGENT{dots}
          </div>

          <p style={{
            maxWidth: '600px',
            color: '#c0c0d8',
            fontSize: '1.1rem',
            lineHeight: 1.8,
            marginBottom: '3rem',
            fontFamily: 'Rajdhani,sans-serif',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          }}>
            Un dispositif embarqué qui détecte automatiquement les accidents de la route
            et alerte les secours avec votre localisation et vos données médicales en temps réel.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '4rem' }}>
            <button style={{
              background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
              border: 'none',
              borderRadius: '8px',
              padding: '0.85rem 2rem',
              color: '#fff',
              fontFamily: 'Orbitron,sans-serif',
              fontSize: '0.8rem',
              letterSpacing: '0.08em',
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(168,85,247,0.4)',
            }}>
              DÉCOUVRIR LE PROJET
            </button>
            <button style={{
              background: 'rgba(6,182,212,0.1)',
              backdropFilter: 'blur(5px)',
              border: '1px solid rgba(6,182,212,0.5)',
              borderRadius: '8px',
              padding: '0.85rem 2rem',
              color: '#06b6d4',
              fontFamily: 'Orbitron,sans-serif',
              fontSize: '0.8rem',
              letterSpacing: '0.08em',
              cursor: 'pointer',
            }}>
              VOIR L'ÉQUIPE
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%', maxWidth: '600px' }}>
            <StatCard value="10"   label="Membres" />
            <StatCard value="3"    label="Modules" />
            <StatCard value="24/7" label="Disponibilité" />
            <StatCard value="<3s"  label="Temps d'alerte" />
          </div>

          {/* Scroll indicator */}
          <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', color: '#8888aa' }}>
            <ChevronDown size={24} />
          </div>
        </section>

        <GlowLine />

        {/* ── ABOUT ── */}
        <section style={section}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div>
              <div style={{ color: '#a855f7', fontFamily: 'Orbitron,sans-serif', fontSize: '0.75rem', letterSpacing: '0.2em', marginBottom: '1rem' }}>
                — À PROPOS DU PROJET
              </div>
              <h2 style={{ fontFamily: 'Orbitron,sans-serif', fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', marginBottom: '1.5rem', lineHeight: 1.2 }}>
                Sauver des vies grâce à la <span style={{ color: '#a855f7' }}>technologie</span>
              </h2>
              <p style={{ color: '#c0c0d8', lineHeight: 1.8, marginBottom: '1rem', fontSize: '1rem' }}>
                Salus est un dispositif conçu pour être intégré dans les véhicules afin d'envoyer
                un signal d'alerte aux autorités en cas d'accident.
              </p>
              <p style={{ color: '#c0c0d8', lineHeight: 1.8, fontSize: '1rem' }}>
                Ce signal est accompagné de la localisation du conducteur et de ses informations
                personnelles : plaque d'immatriculation, couleur et type de véhicule, nom, prénom,
                groupe sanguin et données médicales.
              </p>
            </div>

            {/* Objectives card */}
            <div style={{
              background: 'rgba(10,10,26,0.7)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(168,85,247,0.25)',
              borderRadius: '14px',
              overflow: 'hidden',
            }}>
              <div style={{
                background: 'rgba(168,85,247,0.1)',
                padding: '0.75rem 1rem',
                borderBottom: '1px solid rgba(168,85,247,0.15)',
              }}>
                <span style={{ color: '#a855f7', fontFamily: 'Orbitron,sans-serif', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
                  OBJECTIFS DU PROJET
                </span>
              </div>
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { color: '#a855f7', text: "Réduire le temps d'intervention des secours" },
                  { color: '#06b6d4', text: 'Améliorer le taux de survie des victimes' },
                  { color: '#10b981', text: 'Détection et alerte en temps réel' },
                  { color: '#f59e0b', text: 'Contrôle facile pour le conducteur' },
                  { color: '#ef4444', text: 'Sécurité et confidentialité des données' },
                ].map(({ color, text }) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
                    <span style={{ color: '#d0d0e8', fontFamily: 'Rajdhani,sans-serif', fontSize: '0.95rem' }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <GlowLine />

        {/* ── FEATURES ── */}
        <section style={section}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ color: '#06b6d4', fontFamily: 'Orbitron,sans-serif', fontSize: '0.75rem', letterSpacing: '0.2em', marginBottom: '1rem' }}>
              — FONCTIONNALITÉS
            </div>
            <h2 style={{ fontFamily: 'Orbitron,sans-serif', fontSize: 'clamp(1.5rem, 4vw, 2.2rem)' }}>
              Tout ce dont vous avez besoin
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem' }}>
            {FEATURES.map(f => <FeatureCard key={f.title} {...f} />)}
          </div>
        </section>

        <GlowLine />

        {/* ── TEAM ── */}
        <section style={section}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ color: '#a855f7', fontFamily: 'Orbitron,sans-serif', fontSize: '0.75rem', letterSpacing: '0.2em', marginBottom: '1rem' }}>
              — NOTRE ÉQUIPE
            </div>
            <h2 style={{ fontFamily: 'Orbitron,sans-serif', fontSize: 'clamp(1.5rem, 4vw, 2.2rem)' }}>
              Les cerveaux derrière <span style={{ color: '#a855f7' }}>SALUS</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            {TEAM.map(m => <TeamCard key={m.name} member={m} />)}
          </div>
        </section>

        <GlowLine />

        {/* ── CONTACT ── */}
        <section style={section}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ color: '#06b6d4', fontFamily: 'Orbitron,sans-serif', fontSize: '0.75rem', letterSpacing: '0.2em', marginBottom: '1rem' }}>
              — CONTACT
            </div>
            <h2 style={{ fontFamily: 'Orbitron,sans-serif', fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', marginBottom: '1rem' }}>
              Nous contacter
            </h2>
            <p style={{ color: '#c0c0d8', maxWidth: '500px', margin: '0 auto' }}>
              Une question sur le projet ? Une opportunité de collaboration ? Écrivez-nous.
            </p>
          </div>

          <div style={{ maxWidth: '580px', margin: '0 auto' }}>
            <div style={{
              background: 'rgba(13,13,31,0.7)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(168,85,247,0.2)',
              borderRadius: '16px',
              padding: '2rem',
            }}>
              {[
                { label: 'Nom complet', type: 'text',  placeholder: 'Votre nom' },
                { label: 'Email',       type: 'email', placeholder: 'votre@email.com' },
              ].map(({ label, type, placeholder }) => (
                <div key={label} style={{ marginBottom: '1.2rem' }}>
                  <label style={{ display: 'block', color: '#c0c0d8', fontSize: '0.8rem', fontFamily: 'Orbitron,sans-serif', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
                    {label}
                  </label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    style={{
                      width: '100%',
                      background: 'rgba(168,85,247,0.08)',
                      border: '1px solid rgba(168,85,247,0.2)',
                      borderRadius: '8px',
                      padding: '0.75rem 1rem',
                      color: '#f0f0ff',
                      fontFamily: 'Rajdhani,sans-serif',
                      fontSize: '1rem',
                      outline: 'none',
                    }}
                  />
                </div>
              ))}

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', color: '#c0c0d8', fontSize: '0.8rem', fontFamily: 'Orbitron,sans-serif', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Votre message..."
                  style={{
                    width: '100%',
                    background: 'rgba(168,85,247,0.08)',
                    border: '1px solid rgba(168,85,247,0.2)',
                    borderRadius: '8px',
                    padding: '0.75rem 1rem',
                    color: '#f0f0ff',
                    fontFamily: 'Rajdhani,sans-serif',
                    fontSize: '1rem',
                    resize: 'vertical',
                    outline: 'none',
                  }}
                />
              </div>

              <button style={{
                width: '100%',
                background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
                border: 'none',
                borderRadius: '8px',
                padding: '0.9rem',
                color: '#fff',
                fontFamily: 'Orbitron,sans-serif',
                fontSize: '0.85rem',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 0 20px rgba(168,85,247,0.35)',
              }}>
                <Mail size={16} />
                ENVOYER LE MESSAGE
              </button>
            </div>

            {/* Social */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1.5rem' }}>
              {[
                { label: 'GitHub',  href: 'https://github.com' },
                { label: 'Email',   href: 'mailto:salus@fsr.ac.ma' },
              ].map(({ label, href }) => (
                <a key={label} href={href} style={{
                  color: '#c0c0d8',
                  textDecoration: 'none',
                  fontFamily: 'Rajdhani,sans-serif',
                  fontSize: '0.95rem',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#a855f7'}
                onMouseLeave={e => e.currentTarget.style.color = '#c0c0d8'}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <GlowLine />
        <footer style={{ textAlign: 'center', padding: '2rem', color: '#c0c0d8', fontFamily: 'Rajdhani,sans-serif', fontSize: '0.9rem' }}>
          <span style={{ color: '#a855f7', fontFamily: 'Orbitron,sans-serif', fontSize: '0.8rem' }}>SALUS</span>
          {' '}— FSR Robotic Club © 2024. Tous droits réservés.
        </footer>

        <style>{`
          @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
          @keyframes bounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(8px)} }
        `}</style>
      </div>
    </div>
  )
}
