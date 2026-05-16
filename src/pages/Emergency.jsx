import { useState, useEffect, useRef } from 'react'
import { Shield, MapPin, Phone, X, AlertTriangle, CheckCircle } from 'lucide-react'
import Navbar from '../components/Navbar'
import backgroundImage from './images/test4.png'

// ── MOCK DATA ─────────────────────────────────────────────────
const DRIVER = {
  nom: 'Dupont',
  prenom: 'Jean',
  groupeSanguin: 'A+',
  maladie: 'Diabète type 2',
  immatriculation: 'A-12345-B',
  couleur: 'Rouge',
  contactNom: 'Marie Dupont',
  contactTel: '+212 698 765 432',
  latitude: 33.9716,
  longitude: -6.8498,
}

const DELAI_DEFAUT = 30

// ── COMPONENTS ───────────────────────────────────────────────
function InfoBadge({ label, value, color = '#a855f7' }) {
  return (
    <div style={{
      background: `${color}10`,
      border: `1px solid ${color}30`,
      borderRadius: '10px',
      padding: '0.75rem 1rem',
      flex: 1,
      minWidth: '120px',
    }}>
      <div style={{ color: '#8888aa', fontFamily: 'Orbitron,sans-serif', fontSize: '0.6rem', letterSpacing: '0.1em', marginBottom: '4px' }}>
        {label}
      </div>
      <div style={{ color, fontFamily: 'Rajdhani,sans-serif', fontSize: '1rem', fontWeight: 600 }}>
        {value}
      </div>
    </div>
  )
}

// ── MAIN PAGE ─────────────────────────────────────────────────
export default function Emergency() {
  const [phase, setPhase] = useState('normal') // normal | accident | cancelled | sent
  const [countdown, setCountdown] = useState(DELAI_DEFAUT)
  const [flash, setFlash] = useState(false)
  const intervalRef = useRef(null)
  const flashRef = useRef(null)

  // Countdown logic
  useEffect(() => {
    if (phase === 'accident') {
      setCountdown(DELAI_DEFAUT)
      intervalRef.current = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current)
            setPhase('sent')
            return 0
          }
          return prev - 1
        })
      }, 1000)

      // Flash effect
      flashRef.current = setInterval(() => {
        setFlash(f => !f)
      }, 600)
    } else {
      clearInterval(intervalRef.current)
      clearInterval(flashRef.current)
      setFlash(false)
    }
    return () => {
      clearInterval(intervalRef.current)
      clearInterval(flashRef.current)
    }
  }, [phase])

  const handleSimulate = () => setPhase('accident')
  const handleCancel   = () => setPhase('cancelled')
  const handleReset    = () => { setPhase('normal'); setCountdown(DELAI_DEFAUT) }

  const progress = ((DELAI_DEFAUT - countdown) / DELAI_DEFAUT) * 100

  // ── CANCELLED SCREEN ──
  if (phase === 'cancelled') {
    return (
      <div style={{ minHeight: '100vh', position: 'relative', fontFamily: 'Rajdhani,sans-serif' }}>
        <div style={{ position: 'fixed', inset: 0, backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(5,5,16,0.9)', backdropFilter: 'blur(2px)', zIndex: 1 }} />
        <div style={{ position: 'relative', zIndex: 2, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div style={{
            textAlign: 'center',
            background: 'rgba(13,13,31,0.8)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(16,185,129,0.3)',
            borderRadius: '20px',
            padding: '3rem 2rem',
            maxWidth: '420px', width: '100%',
          }}>
            <div style={{
              width: '72px', height: '72px', borderRadius: '50%',
              background: 'rgba(16,185,129,0.15)',
              border: '2px solid #10b981',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.5rem',
              boxShadow: '0 0 24px rgba(16,185,129,0.4)',
            }}>
              <CheckCircle size={34} color="#10b981" />
            </div>
            <h2 style={{ fontFamily: 'Orbitron,sans-serif', fontSize: '1.3rem', color: '#10b981', marginBottom: '1rem' }}>
              ALERTE ANNULÉE
            </h2>
            <p style={{ color: '#8888aa', lineHeight: 1.7, marginBottom: '2rem' }}>
              Vous avez annulé l'alerte d'urgence. Aucun SMS n'a été envoyé aux autorités.
            </p>
            <button onClick={handleReset} style={{
              width: '100%',
              background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
              border: 'none', borderRadius: '10px',
              padding: '0.9rem', color: '#fff',
              fontFamily: 'Orbitron,sans-serif', fontSize: '0.8rem',
              letterSpacing: '0.1em', cursor: 'pointer',
              boxShadow: '0 0 20px rgba(168,85,247,0.4)',
            }}>
              RETOUR AU TABLEAU DE BORD
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── SENT SCREEN ──
  if (phase === 'sent') {
    return (
      <div style={{ minHeight: '100vh', position: 'relative', fontFamily: 'Rajdhani,sans-serif' }}>
        <div style={{ position: 'fixed', inset: 0, backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(5,5,16,0.9)', backdropFilter: 'blur(2px)', zIndex: 1 }} />
        <div style={{ position: 'relative', zIndex: 2, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div style={{
            textAlign: 'center',
            background: 'rgba(13,13,31,0.8)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(239,68,68,0.4)',
            borderRadius: '20px',
            padding: '3rem 2rem',
            maxWidth: '420px', width: '100%',
          }}>
            <div style={{
              width: '72px', height: '72px', borderRadius: '50%',
              background: 'rgba(239,68,68,0.15)',
              border: '2px solid #ef4444',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.5rem',
              boxShadow: '0 0 24px rgba(239,68,68,0.5)',
            }}>
              <Phone size={34} color="#ef4444" />
            </div>
            <h2 style={{ fontFamily: 'Orbitron,sans-serif', fontSize: '1.3rem', color: '#ef4444', marginBottom: '1rem' }}>
              SMS ENVOYÉ
            </h2>
            <p style={{ color: '#8888aa', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Les secours ont été alertés. Un SMS d'urgence avec votre localisation et vos données a été transmis aux autorités.
            </p>
            <div style={{
              background: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.2)',
              borderRadius: '10px',
              padding: '1rem',
              marginBottom: '2rem',
              textAlign: 'left',
            }}>
              {[
                { label: 'Position', value: `${DRIVER.latitude}, ${DRIVER.longitude}` },
                { label: 'Conducteur', value: `${DRIVER.prenom} ${DRIVER.nom}` },
                { label: 'Véhicule', value: `${DRIVER.couleur} — ${DRIVER.immatriculation}` },
                { label: 'Groupe sanguin', value: DRIVER.groupeSanguin },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#8888aa', fontFamily: 'Orbitron,sans-serif', fontSize: '0.65rem', letterSpacing: '0.08em' }}>{label}</span>
                  <span style={{ color: '#f0f0ff', fontFamily: 'Rajdhani,sans-serif', fontSize: '0.9rem' }}>{value}</span>
                </div>
              ))}
            </div>
            <button onClick={handleReset} style={{
              width: '100%',
              background: 'rgba(168,85,247,0.1)',
              border: '1px solid rgba(168,85,247,0.3)',
              borderRadius: '10px',
              padding: '0.9rem', color: '#a855f7',
              fontFamily: 'Orbitron,sans-serif', fontSize: '0.8rem',
              letterSpacing: '0.1em', cursor: 'pointer',
            }}>
              RETOUR AU TABLEAU DE BORD
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── NORMAL SCREEN ──
  return (
    <div style={{ minHeight: '100vh', position: 'relative', fontFamily: 'Rajdhani,sans-serif' }}>

      {/* Background */}
      <div style={{ position: 'fixed', inset: 0, backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />

      {/* Overlay — vire au rouge si accident */}
      <div style={{
        position: 'fixed', inset: 0,
        background: phase === 'accident'
          ? flash ? 'rgba(180,0,0,0.75)' : 'rgba(120,0,0,0.85)'
          : 'rgba(5,5,16,0.85)',
        backdropFilter: 'blur(2px)',
        zIndex: 1,
        transition: 'background 0.3s ease',
      }} />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <Navbar />

        <div style={{ maxWidth: '750px', margin: '0 auto', padding: '6rem 1.5rem 3rem' }}>

          {/* ── NORMAL PHASE ── */}
          {phase === 'normal' && (
            <>
              {/* Status bar */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: 'rgba(13,13,31,0.7)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(16,185,129,0.3)',
                borderRadius: '14px',
                padding: '1rem 1.5rem',
                marginBottom: '2rem',
                flexWrap: 'wrap', gap: '1rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
                  <span style={{ fontFamily: 'Orbitron,sans-serif', fontSize: '0.75rem', color: '#10b981', letterSpacing: '0.1em' }}>
                    DISPOSITIF ACTIF
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  {[
                    { label: 'GPS',       color: '#10b981' },
                    { label: 'GYROSCOPE', color: '#10b981' },
                    { label: 'SMS',       color: '#06b6d4' },
                  ].map(({ label, color }) => (
                    <div key={label} style={{ textAlign: 'center' }}>
                      <div style={{ color: '#8888aa', fontFamily: 'Orbitron,sans-serif', fontSize: '0.55rem', letterSpacing: '0.1em' }}>{label}</div>
                      <div style={{ color, fontFamily: 'Orbitron,sans-serif', fontSize: '0.65rem' }}>ACTIF</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Driver card */}
              <div style={{
                background: 'rgba(13,13,31,0.7)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(168,85,247,0.2)',
                borderRadius: '16px',
                padding: '1.8rem',
                marginBottom: '1.5rem',
              }}>
                <div style={{ color: '#a855f7', fontFamily: 'Orbitron,sans-serif', fontSize: '0.7rem', letterSpacing: '0.2em', marginBottom: '1rem' }}>
                  — CONDUCTEUR
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{
                    width: '56px', height: '56px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Orbitron,sans-serif', fontWeight: 700, fontSize: '1rem', color: '#fff',
                    boxShadow: '0 0 16px rgba(168,85,247,0.5)',
                  }}>
                    {DRIVER.prenom[0]}{DRIVER.nom[0]}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Orbitron,sans-serif', fontSize: '1rem', color: '#f0f0ff' }}>
                      {DRIVER.prenom} {DRIVER.nom}
                    </div>
                    <div style={{ color: '#8888aa', fontSize: '0.85rem' }}>{DRIVER.immatriculation} — {DRIVER.couleur}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  <InfoBadge label="GROUPE SANGUIN" value={DRIVER.groupeSanguin} color="#ef4444" />
                  <InfoBadge label="MALADIE"        value={DRIVER.maladie}       color="#f59e0b" />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <InfoBadge label="CONTACT URGENCE" value={DRIVER.contactNom}  color="#06b6d4" />
                  <InfoBadge label="TÉLÉPHONE"        value={DRIVER.contactTel} color="#06b6d4" />
                </div>
              </div>

              {/* Location */}
              <div style={{
                background: 'rgba(13,13,31,0.7)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(6,182,212,0.2)',
                borderRadius: '16px',
                padding: '1.2rem 1.5rem',
                marginBottom: '2rem',
                display: 'flex', alignItems: 'center', gap: '12px',
              }}>
                <MapPin size={20} color="#06b6d4" />
                <div>
                  <div style={{ color: '#8888aa', fontFamily: 'Orbitron,sans-serif', fontSize: '0.6rem', letterSpacing: '0.1em' }}>LOCALISATION ACTUELLE</div>
                  <div style={{ color: '#06b6d4', fontFamily: 'Rajdhani,sans-serif', fontSize: '1rem' }}>
                    {DRIVER.latitude}, {DRIVER.longitude}
                  </div>
                </div>
              </div>

              {/* Simulate button */}
              <button
                onClick={handleSimulate}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #ef4444, #b91c1c)',
                  border: 'none', borderRadius: '14px',
                  padding: '1.2rem',
                  color: '#fff',
                  fontFamily: 'Orbitron,sans-serif',
                  fontSize: '1rem',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  boxShadow: '0 0 30px rgba(239,68,68,0.5)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                }}
              >
                <AlertTriangle size={20} />
                SIMULER UN ACCIDENT
              </button>
            </>
          )}

          {/* ── ACCIDENT PHASE ── */}
          {phase === 'accident' && (
            <div style={{ textAlign: 'center' }}>

              {/* Alert header */}
              <div style={{ marginBottom: '2rem' }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '10px',
                  background: 'rgba(239,68,68,0.2)',
                  border: '2px solid #ef4444',
                  borderRadius: '999px',
                  padding: '0.6rem 1.5rem',
                  marginBottom: '1.5rem',
                  boxShadow: '0 0 30px rgba(239,68,68,0.4)',
                }}>
                  <AlertTriangle size={18} color="#ef4444" />
                  <span style={{ fontFamily: 'Orbitron,sans-serif', fontSize: '0.8rem', color: '#ef4444', letterSpacing: '0.15em' }}>
                    ACCIDENT DÉTECTÉ
                  </span>
                </div>

                <h1 style={{
                  fontFamily: 'Orbitron,sans-serif',
                  fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                  color: '#fff',
                  marginBottom: '0.5rem',
                  textShadow: '0 0 20px rgba(239,68,68,0.8)',
                }}>
                  ALERTE D'URGENCE
                </h1>
                <p style={{ color: '#ffaaaa', fontSize: '1rem' }}>
                  Un SMS sera envoyé aux autorités dans :
                </p>
              </div>

              {/* Countdown */}
              <div style={{ position: 'relative', display: 'inline-block', marginBottom: '2.5rem' }}>
                {/* Circle progress */}
                <svg width="220" height="220" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="110" cy="110" r="95" fill="none" stroke="rgba(239,68,68,0.15)" strokeWidth="10" />
                  <circle
                    cx="110" cy="110" r="95" fill="none"
                    stroke="#ef4444" strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 95}`}
                    strokeDashoffset={`${2 * Math.PI * 95 * (progress / 100)}`}
                    style={{ transition: 'stroke-dashoffset 1s linear', filter: 'drop-shadow(0 0 8px #ef4444)' }}
                  />
                </svg>
                {/* Number */}
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{
                    fontFamily: 'Orbitron,sans-serif',
                    fontSize: 'clamp(3.5rem, 10vw, 5rem)',
                    fontWeight: 900,
                    color: '#fff',
                    textShadow: '0 0 30px rgba(239,68,68,0.9)',
                    lineHeight: 1,
                  }}>
                    {countdown}
                  </span>
                  <span style={{ fontFamily: 'Orbitron,sans-serif', fontSize: '0.7rem', color: '#ffaaaa', letterSpacing: '0.1em' }}>
                    SECONDES
                  </span>
                </div>
              </div>

              {/* Driver info recap */}
              <div style={{
                background: 'rgba(0,0,0,0.4)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: '14px',
                padding: '1.2rem',
                marginBottom: '2rem',
                display: 'flex', gap: '0.75rem', flexWrap: 'wrap',
                justifyContent: 'center',
              }}>
                <InfoBadge label="CONDUCTEUR"    value={`${DRIVER.prenom} ${DRIVER.nom}`} color="#fff" />
                <InfoBadge label="GROUPE SANGUIN" value={DRIVER.groupeSanguin}             color="#ef4444" />
                <InfoBadge label="VÉHICULE"       value={DRIVER.immatriculation}           color="#f59e0b" />
              </div>

              {/* CANCEL BUTTON — very big */}
              <button
                onClick={handleCancel}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  color: '#fff',
                  fontFamily: 'Orbitron,sans-serif',
                  fontSize: 'clamp(1rem, 3vw, 1.3rem)',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  boxShadow: '0 0 40px rgba(16,185,129,0.6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                  animation: 'pulsebtn 1s infinite',
                }}
              >
                <X size={28} />
                ANNULER L'ALERTE — JE VAIS BIEN
              </button>

              <p style={{ color: '#ffaaaa', fontSize: '0.85rem', marginTop: '1rem', fontFamily: 'Rajdhani,sans-serif' }}>
                Si vous ne répondez pas, les secours seront automatiquement contactés.
              </p>
            </div>
          )}

        </div>
      </div>

      <style>{`
        @keyframes pulsebtn {
          0%, 100% { box-shadow: 0 0 40px rgba(16,185,129,0.6); transform: scale(1); }
          50%       { box-shadow: 0 0 60px rgba(16,185,129,0.9); transform: scale(1.02); }
        }
      `}</style>
    </div>
  )
}