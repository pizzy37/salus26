import { useState } from 'react'
import { Shield, Bell, Clock, Power, ChevronRight, CheckCircle, AlertCircle } from 'lucide-react'
import Navbar from '../components/Navbar'
import backgroundImage from './images/test4.png'

// ── COMPONENTS ───────────────────────────────────────────────

function Card({ children, style = {} }) {
  return (
    <div style={{
      background: 'rgba(13,13,31,0.7)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(168,85,247,0.2)',
      borderRadius: '16px',
      padding: '1.8rem',
      ...style,
    }}>
      {children}
    </div>
  )
}

function SectionTitle({ color = '#a855f7', tag, title }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div style={{ color, fontFamily: 'Orbitron,sans-serif', fontSize: '0.7rem', letterSpacing: '0.2em', marginBottom: '0.4rem' }}>
        — {tag}
      </div>
      <h2 style={{ fontFamily: 'Orbitron,sans-serif', fontSize: '1rem', color: '#f0f0ff', letterSpacing: '0.05em' }}>
        {title}
      </h2>
    </div>
  )
}

function Toggle({ value, onChange, color = '#a855f7' }) {
  return (
    <div
      onClick={() => onChange(!value)}
      style={{
        width: '52px', height: '28px',
        borderRadius: '999px',
        background: value ? color : 'rgba(168,85,247,0.15)',
        border: `1px solid ${value ? color : 'rgba(168,85,247,0.3)'}`,
        cursor: 'pointer',
        position: 'relative',
        transition: 'all 0.3s ease',
        flexShrink: 0,
      }}
    >
      <div style={{
        position: 'absolute',
        top: '3px',
        left: value ? '26px' : '3px',
        width: '20px', height: '20px',
        borderRadius: '50%',
        background: '#fff',
        transition: 'left 0.3s ease',
        boxShadow: value ? `0 0 8px ${color}` : 'none',
      }} />
    </div>
  )
}

function SettingRow({ icon: Icon, iconColor, label, desc, children }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem 0',
      borderBottom: '1px solid rgba(168,85,247,0.08)',
      gap: '1rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
        <div style={{
          width: '38px', height: '38px', borderRadius: '9px',
          background: `${iconColor}15`,
          border: `1px solid ${iconColor}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Icon size={17} color={iconColor} />
        </div>
        <div>
          <div style={{ color: '#f0f0ff', fontFamily: 'Rajdhani,sans-serif', fontSize: '1rem', fontWeight: 600 }}>
            {label}
          </div>
          <div style={{ color: '#8888aa', fontSize: '0.82rem', fontFamily: 'Rajdhani,sans-serif' }}>
            {desc}
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}

// ── MAIN PAGE ─────────────────────────────────────────────────
export default function Settings() {
  const [settings, setSettings] = useState({
    dispositifActif: true,
    delaiAnnulation: 30,
    notificationsActives: true,
    notificationSMS: true,
    notificationEmail: false,
    modeTest: false,
  })
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const update = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
    setSaved(false)
    setError('')
  }

  const handleDelai = (e) => {
    const val = Number(e.target.value)
    if (val < 5)  { setError('Le délai minimum est de 5 secondes.');  return }
    if (val > 120) { setError('Le délai maximum est de 120 secondes.'); return }
    setError('')
    update('delaiAnnulation', val)
  }

  const handleSave = () => {
    if (settings.delaiAnnulation < 5 || settings.delaiAnnulation > 120) {
      setError('Le délai doit être entre 5 et 120 secondes.')
      return
    }
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div style={{ minHeight: '100vh', position: 'relative', fontFamily: 'Rajdhani,sans-serif' }}>

      {/* Background */}
      <div style={{
        position: 'fixed', inset: 0,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: 0,
      }} />
      <div style={{
        position: 'fixed', inset: 0,
        background: 'rgba(5,5,16,0.85)',
        backdropFilter: 'blur(2px)',
        zIndex: 1,
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <Navbar />

        <div style={{ maxWidth: '750px', margin: '0 auto', padding: '6rem 1.5rem 3rem' }}>

          {/* ── HEADER ── */}
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ color: '#a855f7', fontFamily: 'Orbitron,sans-serif', fontSize: '0.7rem', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>
              — PARAMÈTRES
            </div>
            <h1 style={{
              fontFamily: 'Orbitron,sans-serif',
              fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
              background: 'linear-gradient(135deg, #f0f0ff, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '0.5rem',
            }}>
              Configuration SALUS
            </h1>
            <p style={{ color: '#8888aa', fontSize: '0.95rem' }}>
              Gérez le comportement de votre dispositif d'urgence.
            </p>
          </div>

          {/* ── TOAST ── */}
          {saved && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: 'rgba(16,185,129,0.1)',
              border: '1px solid rgba(16,185,129,0.3)',
              borderRadius: '10px',
              padding: '0.9rem 1.2rem',
              marginBottom: '1.5rem',
              color: '#10b981', fontSize: '0.95rem',
            }}>
              <CheckCircle size={18} />
              Paramètres sauvegardés avec succès !
            </div>
          )}

          {error && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: '10px',
              padding: '0.9rem 1.2rem',
              marginBottom: '1.5rem',
              color: '#ef4444', fontSize: '0.95rem',
            }}>
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* ── DISPOSITIF ── */}
            <Card style={{
              border: settings.dispositifActif
                ? '1px solid rgba(16,185,129,0.35)'
                : '1px solid rgba(239,68,68,0.35)',
              background: settings.dispositifActif
                ? 'rgba(16,185,129,0.05)'
                : 'rgba(239,68,68,0.05)',
            }}>
              <SectionTitle
                tag="DISPOSITIF"
                title="Boîtier SALUS"
                color={settings.dispositifActif ? '#10b981' : '#ef4444'}
              />

              <SettingRow
                icon={Power}
                iconColor={settings.dispositifActif ? '#10b981' : '#ef4444'}
                label="Activer le dispositif"
                desc={settings.dispositifActif
                  ? 'Le boîtier surveille activement les accidents'
                  : 'Le boîtier est désactivé — aucune alerte ne sera envoyée'}
              >
                <Toggle
                  value={settings.dispositifActif}
                  onChange={v => update('dispositifActif', v)}
                  color="#10b981"
                />
              </SettingRow>

              {/* Status indicator */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                marginTop: '1rem',
                padding: '0.75rem 1rem',
                background: settings.dispositifActif
                  ? 'rgba(16,185,129,0.08)'
                  : 'rgba(239,68,68,0.08)',
                borderRadius: '8px',
                border: `1px solid ${settings.dispositifActif ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}`,
              }}>
                <div style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: settings.dispositifActif ? '#10b981' : '#ef4444',
                  boxShadow: `0 0 8px ${settings.dispositifActif ? '#10b981' : '#ef4444'}`,
                }} />
                <span style={{
                  fontFamily: 'Orbitron,sans-serif',
                  fontSize: '0.7rem',
                  letterSpacing: '0.1em',
                  color: settings.dispositifActif ? '#10b981' : '#ef4444',
                }}>
                  {settings.dispositifActif ? 'SYSTÈME ACTIF — SURVEILLANCE EN COURS' : 'SYSTÈME DÉSACTIVÉ'}
                </span>
              </div>
            </Card>

            {/* ── DÉLAI ── */}
            <Card>
              <SectionTitle tag="URGENCE" title="Délai d'annulation" color="#06b6d4" />

              <SettingRow
                icon={Clock}
                iconColor="#06b6d4"
                label="Délai avant envoi du SMS"
                desc="Temps disponible pour annuler l'alerte après détection d'un accident"
              >
                <div style={{
                  background: 'rgba(6,182,212,0.1)',
                  border: '1px solid rgba(6,182,212,0.3)',
                  borderRadius: '8px',
                  padding: '0.4rem 0.8rem',
                  color: '#06b6d4',
                  fontFamily: 'Orbitron,sans-serif',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  flexShrink: 0,
                }}>
                  {settings.delaiAnnulation}s
                </div>
              </SettingRow>

              {/* Slider */}
              <div style={{ marginTop: '1rem' }}>
                <input
                  type="range"
                  min="5"
                  max="120"
                  step="5"
                  value={settings.delaiAnnulation}
                  onChange={handleDelai}
                  style={{
                    width: '100%',
                    accentColor: '#06b6d4',
                    cursor: 'pointer',
                    height: '6px',
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.4rem' }}>
                  <span style={{ color: '#8888aa', fontSize: '0.75rem', fontFamily: 'Orbitron,sans-serif' }}>5s</span>
                  <span style={{ color: '#8888aa', fontSize: '0.75rem', fontFamily: 'Orbitron,sans-serif' }}>120s</span>
                </div>

                {/* Presets */}
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                  {[10, 20, 30, 60, 90].map(v => (
                    <button
                      key={v}
                      onClick={() => update('delaiAnnulation', v)}
                      style={{
                        background: settings.delaiAnnulation === v
                          ? 'rgba(6,182,212,0.2)'
                          : 'rgba(168,85,247,0.05)',
                        border: `1px solid ${settings.delaiAnnulation === v ? '#06b6d4' : 'rgba(168,85,247,0.2)'}`,
                        borderRadius: '6px',
                        padding: '0.4rem 0.9rem',
                        color: settings.delaiAnnulation === v ? '#06b6d4' : '#8888aa',
                        fontFamily: 'Orbitron,sans-serif',
                        fontSize: '0.7rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      {v}s
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            {/* ── NOTIFICATIONS ── */}
            <Card>
              <SectionTitle tag="NOTIFICATIONS" title="Alertes & Notifications" color="#a855f7" />

              <SettingRow
                icon={Bell}
                iconColor="#a855f7"
                label="Notifications actives"
                desc="Activer toutes les notifications de l'application"
              >
                <Toggle
                  value={settings.notificationsActives}
                  onChange={v => update('notificationsActives', v)}
                  color="#a855f7"
                />
              </SettingRow>

              <SettingRow
                icon={ChevronRight}
                iconColor="#06b6d4"
                label="Notification par SMS"
                desc="Recevoir une confirmation SMS après chaque alerte"
              >
                <Toggle
                  value={settings.notificationSMS && settings.notificationsActives}
                  onChange={v => settings.notificationsActives && update('notificationSMS', v)}
                  color="#06b6d4"
                />
              </SettingRow>

              <SettingRow
                icon={ChevronRight}
                iconColor="#f59e0b"
                label="Notification par Email"
                desc="Recevoir un rapport par email après chaque alerte"
              >
                <Toggle
                  value={settings.notificationEmail && settings.notificationsActives}
                  onChange={v => settings.notificationsActives && update('notificationEmail', v)}
                  color="#f59e0b"
                />
              </SettingRow>
            </Card>

            {/* ── MODE TEST ── */}
            <Card style={{ border: '1px solid rgba(245,158,11,0.25)', background: 'rgba(245,158,11,0.04)' }}>
              <SectionTitle tag="DÉVELOPPEMENT" title="Mode Test" color="#f59e0b" />

              <SettingRow
                icon={Shield}
                iconColor="#f59e0b"
                label="Activer le mode test"
                desc="Simuler un accident sans envoyer de vrai SMS aux autorités"
              >
                <Toggle
                  value={settings.modeTest}
                  onChange={v => update('modeTest', v)}
                  color="#f59e0b"
                />
              </SettingRow>

              {settings.modeTest && (
                <div style={{
                  marginTop: '1rem',
                  padding: '0.75rem 1rem',
                  background: 'rgba(245,158,11,0.08)',
                  border: '1px solid rgba(245,158,11,0.25)',
                  borderRadius: '8px',
                  color: '#f59e0b',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <AlertCircle size={16} />
                  Mode test activé — aucun SMS réel ne sera envoyé.
                </div>
              )}
            </Card>

            {/* ── SAVE BUTTON ── */}
            <button
              onClick={handleSave}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
                border: 'none',
                borderRadius: '10px',
                padding: '1rem',
                color: '#fff',
                fontFamily: 'Orbitron,sans-serif',
                fontSize: '0.85rem',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                boxShadow: '0 0 20px rgba(168,85,247,0.4)',
                transition: 'all 0.3s ease',
              }}
            >
              SAUVEGARDER LES PARAMÈTRES
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}