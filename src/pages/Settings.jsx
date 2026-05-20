import { useState, useEffect } from 'react'
import { settingsAPI } from '../api'
import { Shield, Bell, Clock, Power, ChevronRight, CheckCircle, AlertCircle } from 'lucide-react'
import Navbar from '../components/Navbar'
import backgroundImage from './images/test4.png'

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
        - {tag}
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
        width: '52px',
        height: '28px',
        borderRadius: '999px',
        background: value ? color : 'rgba(168,85,247,0.15)',
        border: `1px solid ${value ? color : 'rgba(168,85,247,0.3)'}`,
        cursor: 'pointer',
        position: 'relative',
        transition: 'all 0.3s ease',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '3px',
          left: value ? '26px' : '3px',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: '#fff',
          transition: 'left 0.3s ease',
          boxShadow: value ? `0 0 8px ${color}` : 'none',
        }}
      />
    </div>
  )
}

function SettingRow({ icon: Icon, iconColor, label, desc, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid rgba(168,85,247,0.08)', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
        <div style={{ width: '38px', height: '38px', borderRadius: '9px', background: `${iconColor}15`, border: `1px solid ${iconColor}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon size={17} color={iconColor} />
        </div>
        <div>
          <div style={{ color: '#f0f0ff', fontFamily: 'Rajdhani,sans-serif', fontSize: '1rem', fontWeight: 600 }}>{label}</div>
          <div style={{ color: '#8888aa', fontSize: '0.82rem', fontFamily: 'Rajdhani,sans-serif' }}>{desc}</div>
        </div>
      </div>
      {children}
    </div>
  )
}

export default function Settings() {
  const [settings, setSettings] = useState(null)
  const [initialSettings, setInitialSettings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    settingsAPI
      .get()
      .then((res) => {
        const serverSettings = res?.data?.settings || {}
        const normalized = {
          dispositifActif: serverSettings.dispositif_actif ?? true,
          delaiAnnulation: serverSettings.delai_annulation ?? 30,
          notificationsActives: serverSettings.notifications ?? true,
          notificationSMS: true,
          notificationEmail: false,
          modeTest: false,
        }
        setSettings(normalized)
        setInitialSettings(normalized)
        setLoading(false)
      })
      .catch(() => {
        const defaults = {
          dispositifActif: true,
          delaiAnnulation: 30,
          notificationsActives: true,
          notificationSMS: true,
          notificationEmail: false,
          modeTest: false,
        }
        setSettings(defaults)
        setInitialSettings(defaults)
        setLoading(false)
      })
  }, [])

  const hasUnsavedChanges = !!settings && !!initialSettings && JSON.stringify(settings) !== JSON.stringify(initialSettings)

  const update = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
    setSaved(false)
    setError('')
  }

  const handleDelai = (e) => {
    const val = Number(e.target.value)
    if (val < 5) {
      setError('Le delai minimum est de 5 secondes.')
      return
    }
    if (val > 120) {
      setError('Le delai maximum est de 120 secondes.')
      return
    }
    setError('')
    update('delaiAnnulation', val)
  }

  const handleSave = async () => {
    try {
      await settingsAPI.update({
        dispositif_actif: settings.dispositifActif,
        delai_annulation: settings.delaiAnnulation,
        notifications: settings.notificationsActives,
      })

      setInitialSettings(settings)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      setError(err.message || 'Erreur lors de la sauvegarde.')
    }
  }

  if (loading || !settings) {
    return <div style={{ color: '#fff', padding: '2rem' }}>Chargement...</div>
  }

  return (
    <div style={{ minHeight: '100vh', position: 'relative', fontFamily: 'Rajdhani,sans-serif' }}>
      <div style={{ position: 'fixed', inset: 0, backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', zIndex: 0 }} />
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(5,5,16,0.85)', backdropFilter: 'blur(2px)', zIndex: 1 }} />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <Navbar />

        <div style={{ maxWidth: '750px', margin: '0 auto', padding: '6rem 1.5rem 3rem' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ color: '#a855f7', fontFamily: 'Orbitron,sans-serif', fontSize: '0.7rem', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>- PARAMETRES</div>
            <h1 style={{ fontFamily: 'Orbitron,sans-serif', fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', background: 'linear-gradient(135deg, #f0f0ff, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.5rem' }}>
              Configuration SALUS
            </h1>
            <p style={{ color: '#8888aa', fontSize: '0.95rem' }}>Gerez le comportement de votre dispositif d'urgence.</p>
          </div>

          {saved && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '10px', padding: '0.9rem 1.2rem', marginBottom: '1.5rem', color: '#10b981', fontSize: '0.95rem' }}>
              <CheckCircle size={18} /> Parametres sauvegardes avec succes !
            </div>
          )}

          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px', padding: '0.9rem 1.2rem', marginBottom: '1.5rem', color: '#ef4444', fontSize: '0.95rem' }}>
              <AlertCircle size={18} /> {error}
            </div>
          )}

          {hasUnsavedChanges && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.35)', borderRadius: '10px', padding: '0.9rem 1.2rem', marginBottom: '1.5rem', color: '#06b6d4', fontSize: '0.95rem' }}>
              <AlertCircle size={18} /> Parametres modifies non sauvegardes.
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Card style={{ border: settings.dispositifActif ? '1px solid rgba(16,185,129,0.35)' : '1px solid rgba(239,68,68,0.35)', background: settings.dispositifActif ? 'rgba(16,185,129,0.05)' : 'rgba(239,68,68,0.05)' }}>
              <SectionTitle tag="DISPOSITIF" title="Boitier SALUS" color={settings.dispositifActif ? '#10b981' : '#ef4444'} />
              <SettingRow icon={Power} iconColor={settings.dispositifActif ? '#10b981' : '#ef4444'} label="Activer le dispositif" desc={settings.dispositifActif ? 'Le boitier surveille activement les accidents' : 'Le boitier est desactive - aucune alerte ne sera envoyee'}>
                <Toggle value={settings.dispositifActif} onChange={(v) => update('dispositifActif', v)} color="#10b981" />
              </SettingRow>
            </Card>

            <Card>
              <SectionTitle tag="URGENCE" title="Delai d'annulation" color="#06b6d4" />
              <SettingRow icon={Clock} iconColor="#06b6d4" label="Delai avant envoi du SMS" desc="Temps disponible pour annuler l'alerte apres detection d'un accident">
                <div style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)', borderRadius: '8px', padding: '0.4rem 0.8rem', color: '#06b6d4', fontFamily: 'Orbitron,sans-serif', fontSize: '0.9rem', fontWeight: 700, flexShrink: 0 }}>
                  {settings.delaiAnnulation}s
                </div>
              </SettingRow>

              <div style={{ marginTop: '1rem' }}>
                <input type="range" min="5" max="120" step="5" value={settings.delaiAnnulation} onChange={handleDelai} style={{ width: '100%', accentColor: '#06b6d4', cursor: 'pointer', height: '6px' }} />
              </div>
            </Card>

            <Card>
              <SectionTitle tag="NOTIFICATIONS" title="Alertes & Notifications" color="#a855f7" />
              <SettingRow icon={Bell} iconColor="#a855f7" label="Notifications actives" desc="Activer toutes les notifications de l'application">
                <Toggle value={settings.notificationsActives} onChange={(v) => update('notificationsActives', v)} color="#a855f7" />
              </SettingRow>
              <SettingRow icon={ChevronRight} iconColor="#06b6d4" label="Notification par SMS" desc="Recevoir une confirmation SMS apres chaque alerte">
                <Toggle value={settings.notificationSMS && settings.notificationsActives} onChange={(v) => settings.notificationsActives && update('notificationSMS', v)} color="#06b6d4" />
              </SettingRow>
            </Card>

            <Card style={{ border: '1px solid rgba(245,158,11,0.25)', background: 'rgba(245,158,11,0.04)' }}>
              <SectionTitle tag="DEVELOPPEMENT" title="Mode Test" color="#f59e0b" />
              <SettingRow icon={Shield} iconColor="#f59e0b" label="Activer le mode test" desc="Simuler un accident sans envoyer de vrai SMS aux autorites">
                <Toggle value={settings.modeTest} onChange={(v) => update('modeTest', v)} color="#f59e0b" />
              </SettingRow>
            </Card>

            <button
              onClick={handleSave}
              style={{ width: '100%', background: 'linear-gradient(135deg, #a855f7, #7c3aed)', border: 'none', borderRadius: '10px', padding: '1rem', color: '#fff', fontFamily: 'Orbitron,sans-serif', fontSize: '0.85rem', letterSpacing: '0.1em', cursor: 'pointer', boxShadow: '0 0 20px rgba(168,85,247,0.4)', transition: 'all 0.3s ease' }}
            >
              SAUVEGARDER LES PARAMETRES
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
