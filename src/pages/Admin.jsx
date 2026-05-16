import { useState } from 'react'
import { Shield, Users, AlertTriangle, Activity, Eye, Trash2, CheckCircle, Clock, XCircle, MapPin, Search, Filter } from 'lucide-react'
import Navbar from '../components/Navbar'
import backgroundImage from './images/test4.png'

// ── MOCK DATA (à remplacer par les vraies données API) ────────
const MOCK_USERS = [
  {
    id: 1, nom: 'Dupont', prenom: 'Jean', email: 'jean.dupont@email.com',
    telephone: '+212 612 345 678', role: 'conducteur',
    created_at: '2024-01-15',
    vehicle: { immatriculation: 'A-12345-B', couleur: 'Rouge', type_vehicule: 'Berline' },
    medical: { groupe_sanguin: 'A+', maladie_chronique: 'Diabète type 2' },
  },
  {
    id: 2, nom: 'Alaoui', prenom: 'Sara', email: 'sara.alaoui@email.com',
    telephone: '+212 698 765 432', role: 'conducteur',
    created_at: '2024-02-20',
    vehicle: { immatriculation: 'B-67890-C', couleur: 'Bleu', type_vehicule: 'SUV' },
    medical: { groupe_sanguin: 'O+', maladie_chronique: 'Aucune' },
  },
  {
    id: 3, nom: 'Benchrifa', prenom: 'Youssef', email: 'youssef.b@email.com',
    telephone: '+212 661 234 567', role: 'conducteur',
    created_at: '2024-03-10',
    vehicle: { immatriculation: 'C-11111-D', couleur: 'Blanc', type_vehicule: 'Citadine' },
    medical: { groupe_sanguin: 'B-', maladie_chronique: 'Asthme' },
  },
  {
    id: 4, nom: 'El Fassi', prenom: 'Nadia', email: 'nadia.elfassi@email.com',
    telephone: '+212 677 890 123', role: 'conducteur',
    created_at: '2024-03-25',
    vehicle: { immatriculation: 'D-22222-E', couleur: 'Noir', type_vehicule: 'SUV' },
    medical: { groupe_sanguin: 'AB+', maladie_chronique: 'Aucune' },
  },
]

const MOCK_ALERTS = [
  {
    id: 1, user_id: 1,
    conducteur: 'Jean Dupont', immatriculation: 'A-12345-B',
    latitude: 33.9716, longitude: -6.8498,
    statut: 'sent', created_at: '2024-04-10 14:32:00', cancelled_at: null,
  },
  {
    id: 2, user_id: 2,
    conducteur: 'Sara Alaoui', immatriculation: 'B-67890-C',
    latitude: 34.0209, longitude: -6.8416,
    statut: 'cancelled', created_at: '2024-04-11 09:15:00', cancelled_at: '2024-04-11 09:15:22',
  },
  {
    id: 3, user_id: 3,
    conducteur: 'Youssef Benchrifa', immatriculation: 'C-11111-D',
    latitude: 33.8869, longitude: -6.9022,
    statut: 'sent', created_at: '2024-04-12 17:45:00', cancelled_at: null,
  },
  {
    id: 4, user_id: 4,
    conducteur: 'Nadia El Fassi', immatriculation: 'D-22222-E',
    latitude: 33.9500, longitude: -6.8700,
    statut: 'pending', created_at: '2024-04-13 08:00:00', cancelled_at: null,
  },
]

// ── COMPONENTS ───────────────────────────────────────────────
function Card({ children, style = {} }) {
  return (
    <div style={{
      background: 'rgba(13,13,31,0.7)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(168,85,247,0.2)',
      borderRadius: '16px',
      padding: '1.5rem',
      ...style,
    }}>
      {children}
    </div>
  )
}

function StatCard({ icon: Icon, label, value, color, sub }) {
  return (
    <div style={{
      background: 'rgba(13,13,31,0.7)',
      backdropFilter: 'blur(8px)',
      border: `1px solid ${color}30`,
      borderRadius: '14px',
      padding: '1.5rem',
      flex: 1, minWidth: '160px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '10px',
          background: `${color}15`,
          border: `1px solid ${color}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={18} color={color} />
        </div>
        <span style={{ color, fontFamily: 'Orbitron,sans-serif', fontSize: '0.6rem', letterSpacing: '0.1em' }}>
          TOTAL
        </span>
      </div>
      <div style={{ fontFamily: 'Orbitron,sans-serif', fontSize: '2rem', fontWeight: 700, color, marginBottom: '4px' }}>
        {value}
      </div>
      <div style={{ color: '#8888aa', fontFamily: 'Rajdhani,sans-serif', fontSize: '0.85rem' }}>
        {label}
      </div>
      {sub && (
        <div style={{ color: '#666688', fontFamily: 'Rajdhani,sans-serif', fontSize: '0.75rem', marginTop: '4px' }}>
          {sub}
        </div>
      )}
    </div>
  )
}

function StatusBadge({ statut }) {
  const config = {
    sent:      { color: '#ef4444', bg: 'rgba(239,68,68,0.1)',    border: 'rgba(239,68,68,0.3)',    label: 'ENVOYÉ',   Icon: CheckCircle },
    cancelled: { color: '#10b981', bg: 'rgba(16,185,129,0.1)',   border: 'rgba(16,185,129,0.3)',   label: 'ANNULÉ',   Icon: XCircle     },
    pending:   { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',   border: 'rgba(245,158,11,0.3)',   label: 'EN COURS', Icon: Clock       },
  }
  const { color, bg, border, label, Icon } = config[statut] || config.pending
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '5px',
      background: bg, border: `1px solid ${border}`,
      borderRadius: '999px', padding: '3px 10px',
      color, fontFamily: 'Orbitron,sans-serif', fontSize: '0.6rem', letterSpacing: '0.08em',
    }}>
      <Icon size={11} />
      {label}
    </div>
  )
}

// ── USER DETAIL MODAL ─────────────────────────────────────────
function UserModal({ user, onClose }) {
  if (!user) return null
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.7)',
      backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1.5rem',
    }}
    onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#0d0d1f',
          border: '1px solid rgba(168,85,247,0.3)',
          borderRadius: '20px',
          padding: '2rem',
          maxWidth: '500px', width: '100%',
          maxHeight: '85vh', overflowY: 'auto',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Orbitron,sans-serif', fontWeight: 700, color: '#fff',
              boxShadow: '0 0 14px rgba(168,85,247,0.5)',
            }}>
              {user.prenom[0]}{user.nom[0]}
            </div>
            <div>
              <div style={{ fontFamily: 'Orbitron,sans-serif', fontSize: '0.9rem', color: '#f0f0ff' }}>
                {user.prenom} {user.nom}
              </div>
              <div style={{ color: '#8888aa', fontSize: '0.8rem' }}>{user.email}</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#8888aa', cursor: 'pointer' }}>
            <XCircle size={22} />
          </button>
        </div>

        {/* Sections */}
        {[
          {
            title: 'INFORMATIONS PERSONNELLES', color: '#a855f7',
            rows: [
              { label: 'Téléphone', value: user.telephone },
              { label: 'Rôle',      value: user.role },
              { label: 'Inscrit le', value: user.created_at },
            ]
          },
          {
            title: 'VÉHICULE', color: '#06b6d4',
            rows: [
              { label: 'Immatriculation', value: user.vehicle.immatriculation },
              { label: 'Couleur',         value: user.vehicle.couleur },
              { label: 'Type',            value: user.vehicle.type_vehicule },
            ]
          },
          {
            title: 'DONNÉES MÉDICALES', color: '#ef4444',
            rows: [
              { label: 'Groupe sanguin',    value: user.medical.groupe_sanguin },
              { label: 'Maladie chronique', value: user.medical.maladie_chronique },
            ]
          },
        ].map(({ title, color, rows }) => (
          <div key={title} style={{
            background: `${color}08`,
            border: `1px solid ${color}20`,
            borderRadius: '12px', padding: '1.2rem',
            marginBottom: '1rem',
          }}>
            <div style={{ color, fontFamily: 'Orbitron,sans-serif', fontSize: '0.65rem', letterSpacing: '0.15em', marginBottom: '0.8rem' }}>
              {title}
            </div>
            {rows.map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#8888aa', fontFamily: 'Rajdhani,sans-serif', fontSize: '0.85rem' }}>{label}</span>
                <span style={{ color: '#f0f0ff', fontFamily: 'Rajdhani,sans-serif', fontSize: '0.9rem', fontWeight: 600 }}>{value}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── MAIN PAGE ─────────────────────────────────────────────────
export default function Admin() {
  const [tab, setTab]               = useState('dashboard')
  const [users, setUsers]           = useState(MOCK_USERS)
  const [alerts]                    = useState(MOCK_ALERTS)
  const [selectedUser, setSelectedUser] = useState(null)
  const [searchUser, setSearchUser] = useState('')
  const [searchAlert, setSearchAlert] = useState('')
  const [filterStatut, setFilterStatut] = useState('all')
  const [confirmDelete, setConfirmDelete] = useState(null)

  const filteredUsers = users.filter(u =>
    `${u.nom} ${u.prenom} ${u.email}`.toLowerCase().includes(searchUser.toLowerCase())
  )

  const filteredAlerts = alerts.filter(a => {
    const matchSearch = a.conducteur.toLowerCase().includes(searchAlert.toLowerCase()) ||
                        a.immatriculation.toLowerCase().includes(searchAlert.toLowerCase())
    const matchFilter = filterStatut === 'all' || a.statut === filterStatut
    return matchSearch && matchFilter
  })

  const handleDelete = (id) => {
    setUsers(prev => prev.filter(u => u.id !== id))
    setConfirmDelete(null)
  }

  const stats = {
    totalUsers:     users.length,
    totalAlerts:    alerts.length,
    alertsSent:     alerts.filter(a => a.statut === 'sent').length,
    alertsCancelled: alerts.filter(a => a.statut === 'cancelled').length,
    alertsPending:  alerts.filter(a => a.statut === 'pending').length,
  }

  const TABS = [
    { id: 'dashboard', label: 'Dashboard'   },
    { id: 'users',     label: 'Conducteurs' },
    { id: 'alerts',    label: 'Alertes'     },
  ]

  return (
    <div style={{ minHeight: '100vh', position: 'relative', fontFamily: 'Rajdhani,sans-serif' }}>

      {/* Background */}
      <div style={{ position: 'fixed', inset: 0, backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(5,5,16,0.85)', backdropFilter: 'blur(2px)', zIndex: 1 }} />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <Navbar />

        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '6rem 1.5rem 3rem' }}>

          {/* ── HEADER ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '12px',
              background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 20px rgba(168,85,247,0.5)',
            }}>
              <Shield size={22} color="#fff" />
            </div>
            <div>
              <div style={{ color: '#a855f7', fontFamily: 'Orbitron,sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em' }}>
                — ADMINISTRATION
              </div>
              <h1 style={{
                fontFamily: 'Orbitron,sans-serif',
                fontSize: 'clamp(1.1rem, 3vw, 1.6rem)',
                background: 'linear-gradient(135deg, #f0f0ff, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Tableau de Bord Admin
              </h1>
            </div>
          </div>

          {/* ── TABS ── */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            {TABS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                style={{
                  background: tab === id ? 'linear-gradient(135deg, #a855f7, #7c3aed)' : 'rgba(168,85,247,0.07)',
                  border: `1px solid ${tab === id ? 'transparent' : 'rgba(168,85,247,0.2)'}`,
                  borderRadius: '8px',
                  padding: '0.6rem 1.4rem',
                  color: tab === id ? '#fff' : '#8888aa',
                  fontFamily: 'Orbitron,sans-serif',
                  fontSize: '0.7rem', letterSpacing: '0.08em',
                  cursor: 'pointer',
                  boxShadow: tab === id ? '0 0 14px rgba(168,85,247,0.3)' : 'none',
                  transition: 'all 0.2s',
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* ══════════════════════════════════════════════
              TAB — DASHBOARD
          ══════════════════════════════════════════════ */}
          {tab === 'dashboard' && (
            <>
              {/* Stats */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                <StatCard icon={Users}         label="Conducteurs inscrits" value={stats.totalUsers}      color="#a855f7" sub="Tous actifs" />
                <StatCard icon={AlertTriangle} label="Alertes totales"      value={stats.totalAlerts}     color="#ef4444" sub={`${stats.alertsSent} envoyées`} />
                <StatCard icon={CheckCircle}   label="Alertes annulées"     value={stats.alertsCancelled} color="#10b981" sub="Par le conducteur" />
                <StatCard icon={Activity}      label="En cours"             value={stats.alertsPending}   color="#f59e0b" sub="Temps réel" />
              </div>

              {/* Recent alerts */}
              <Card style={{ marginBottom: '1.5rem' }}>
                <div style={{ color: '#a855f7', fontFamily: 'Orbitron,sans-serif', fontSize: '0.7rem', letterSpacing: '0.2em', marginBottom: '1.2rem' }}>
                  — ALERTES RÉCENTES
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {alerts.slice(0, 3).map(alert => (
                    <div key={alert.id} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '0.9rem 1rem',
                      background: 'rgba(168,85,247,0.05)',
                      border: '1px solid rgba(168,85,247,0.1)',
                      borderRadius: '10px',
                      flexWrap: 'wrap', gap: '0.5rem',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <AlertTriangle size={16} color="#ef4444" />
                        <div>
                          <div style={{ color: '#f0f0ff', fontFamily: 'Rajdhani,sans-serif', fontSize: '0.95rem', fontWeight: 600 }}>
                            {alert.conducteur}
                          </div>
                          <div style={{ color: '#8888aa', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <MapPin size={11} />
                            {alert.latitude}, {alert.longitude}
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ color: '#8888aa', fontSize: '0.75rem', fontFamily: 'Rajdhani,sans-serif' }}>
                          {alert.created_at}
                        </span>
                        <StatusBadge statut={alert.statut} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Recent users */}
              <Card>
                <div style={{ color: '#06b6d4', fontFamily: 'Orbitron,sans-serif', fontSize: '0.7rem', letterSpacing: '0.2em', marginBottom: '1.2rem' }}>
                  — DERNIERS CONDUCTEURS INSCRITS
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {users.slice(0, 3).map(user => (
                    <div key={user.id} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '0.9rem 1rem',
                      background: 'rgba(6,182,212,0.04)',
                      border: '1px solid rgba(6,182,212,0.1)',
                      borderRadius: '10px',
                      flexWrap: 'wrap', gap: '0.5rem',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '36px', height: '36px', borderRadius: '50%',
                          background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontFamily: 'Orbitron,sans-serif', fontSize: '0.75rem', color: '#fff', fontWeight: 700,
                        }}>
                          {user.prenom[0]}{user.nom[0]}
                        </div>
                        <div>
                          <div style={{ color: '#f0f0ff', fontFamily: 'Rajdhani,sans-serif', fontSize: '0.95rem', fontWeight: 600 }}>
                            {user.prenom} {user.nom}
                          </div>
                          <div style={{ color: '#8888aa', fontSize: '0.8rem' }}>{user.email}</div>
                        </div>
                      </div>
                      <div style={{ color: '#8888aa', fontSize: '0.75rem' }}>
                        Inscrit le {user.created_at}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </>
          )}

          {/* ══════════════════════════════════════════════
              TAB — USERS
          ══════════════════════════════════════════════ */}
          {tab === 'users' && (
            <Card>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ color: '#a855f7', fontFamily: 'Orbitron,sans-serif', fontSize: '0.7rem', letterSpacing: '0.2em' }}>
                  — CONDUCTEURS ({filteredUsers.length})
                </div>
                {/* Search */}
                <div style={{ position: 'relative' }}>
                  <Search size={15} color="#8888aa" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    placeholder="Rechercher un conducteur..."
                    value={searchUser}
                    onChange={e => setSearchUser(e.target.value)}
                    style={{
                      background: 'rgba(168,85,247,0.06)',
                      border: '1px solid rgba(168,85,247,0.2)',
                      borderRadius: '8px',
                      padding: '0.6rem 1rem 0.6rem 2.2rem',
                      color: '#f0f0ff',
                      fontFamily: 'Rajdhani,sans-serif',
                      fontSize: '0.9rem',
                      outline: 'none',
                      width: '220px',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {filteredUsers.map(user => (
                  <div key={user.id} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '1rem 1.2rem',
                    background: 'rgba(168,85,247,0.04)',
                    border: '1px solid rgba(168,85,247,0.12)',
                    borderRadius: '12px',
                    flexWrap: 'wrap', gap: '0.75rem',
                    transition: 'border-color 0.2s',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '42px', height: '42px', borderRadius: '50%',
                        background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'Orbitron,sans-serif', fontSize: '0.8rem', color: '#fff', fontWeight: 700,
                        flexShrink: 0,
                      }}>
                        {user.prenom[0]}{user.nom[0]}
                      </div>
                      <div>
                        <div style={{ color: '#f0f0ff', fontFamily: 'Rajdhani,sans-serif', fontSize: '1rem', fontWeight: 600 }}>
                          {user.prenom} {user.nom}
                        </div>
                        <div style={{ color: '#8888aa', fontSize: '0.82rem' }}>{user.email}</div>
                        <div style={{ color: '#666688', fontSize: '0.75rem' }}>
                          {user.vehicle.immatriculation} — {user.vehicle.couleur} — {user.medical.groupe_sanguin}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {/* View */}
                      <button
                        onClick={() => setSelectedUser(user)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '5px',
                          background: 'rgba(6,182,212,0.1)',
                          border: '1px solid rgba(6,182,212,0.3)',
                          borderRadius: '7px', padding: '0.5rem 0.9rem',
                          color: '#06b6d4', fontFamily: 'Orbitron,sans-serif',
                          fontSize: '0.6rem', letterSpacing: '0.08em', cursor: 'pointer',
                        }}
                      >
                        <Eye size={13} /> VOIR
                      </button>
                      {/* Delete */}
                      <button
                        onClick={() => setConfirmDelete(user.id)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '5px',
                          background: 'rgba(239,68,68,0.1)',
                          border: '1px solid rgba(239,68,68,0.3)',
                          borderRadius: '7px', padding: '0.5rem 0.9rem',
                          color: '#ef4444', fontFamily: 'Orbitron,sans-serif',
                          fontSize: '0.6rem', letterSpacing: '0.08em', cursor: 'pointer',
                        }}
                      >
                        <Trash2 size={13} /> SUPPRIMER
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* ══════════════════════════════════════════════
              TAB — ALERTS
          ══════════════════════════════════════════════ */}
          {tab === 'alerts' && (
            <Card>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ color: '#ef4444', fontFamily: 'Orbitron,sans-serif', fontSize: '0.7rem', letterSpacing: '0.2em' }}>
                  — ALERTES ({filteredAlerts.length})
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {/* Search */}
                  <div style={{ position: 'relative' }}>
                    <Search size={15} color="#8888aa" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      placeholder="Rechercher..."
                      value={searchAlert}
                      onChange={e => setSearchAlert(e.target.value)}
                      style={{
                        background: 'rgba(168,85,247,0.06)',
                        border: '1px solid rgba(168,85,247,0.2)',
                        borderRadius: '8px',
                        padding: '0.6rem 1rem 0.6rem 2.2rem',
                        color: '#f0f0ff',
                        fontFamily: 'Rajdhani,sans-serif',
                        fontSize: '0.9rem', outline: 'none', width: '180px',
                      }}
                    />
                  </div>
                  {/* Filter */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Filter size={14} color="#8888aa" />
                    <select
                      value={filterStatut}
                      onChange={e => setFilterStatut(e.target.value)}
                      style={{
                        background: 'rgba(168,85,247,0.06)',
                        border: '1px solid rgba(168,85,247,0.2)',
                        borderRadius: '8px',
                        padding: '0.6rem 0.8rem',
                        color: '#f0f0ff',
                        fontFamily: 'Rajdhani,sans-serif',
                        fontSize: '0.9rem', outline: 'none', cursor: 'pointer',
                      }}
                    >
                      <option value="all"       style={{ background: '#0d0d1f' }}>Tous</option>
                      <option value="sent"      style={{ background: '#0d0d1f' }}>Envoyé</option>
                      <option value="cancelled" style={{ background: '#0d0d1f' }}>Annulé</option>
                      <option value="pending"   style={{ background: '#0d0d1f' }}>En cours</option>
                    </select>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {filteredAlerts.map(alert => (
                  <div key={alert.id} style={{
                    padding: '1rem 1.2rem',
                    background: 'rgba(239,68,68,0.04)',
                    border: '1px solid rgba(239,68,68,0.12)',
                    borderRadius: '12px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.6rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <AlertTriangle size={16} color="#ef4444" />
                        <span style={{ color: '#f0f0ff', fontFamily: 'Rajdhani,sans-serif', fontSize: '1rem', fontWeight: 600 }}>
                          {alert.conducteur}
                        </span>
                        <span style={{ color: '#8888aa', fontSize: '0.82rem' }}>
                          {alert.immatriculation}
                        </span>
                      </div>
                      <StatusBadge statut={alert.statut} />
                    </div>
                    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#06b6d4', fontSize: '0.82rem' }}>
                        <MapPin size={13} />
                        {alert.latitude}, {alert.longitude}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#8888aa', fontSize: '0.82rem' }}>
                        <Clock size={13} />
                        {alert.created_at}
                      </div>
                      {alert.cancelled_at && (
                        <div style={{ color: '#10b981', fontSize: '0.82rem' }}>
                          Annulée à : {alert.cancelled_at}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

        </div>
      </div>

      {/* ── USER DETAIL MODAL ── */}
      {selectedUser && (
        <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}

      {/* ── CONFIRM DELETE MODAL ── */}
      {confirmDelete && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100,
          background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1.5rem',
        }}>
          <div style={{
            background: '#0d0d1f',
            border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: '16px', padding: '2rem',
            maxWidth: '380px', width: '100%', textAlign: 'center',
          }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '50%',
              background: 'rgba(239,68,68,0.15)',
              border: '2px solid #ef4444',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1rem',
            }}>
              <Trash2 size={24} color="#ef4444" />
            </div>
            <h3 style={{ fontFamily: 'Orbitron,sans-serif', fontSize: '1rem', color: '#f0f0ff', marginBottom: '0.75rem' }}>
              CONFIRMER LA SUPPRESSION
            </h3>
            <p style={{ color: '#8888aa', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Cette action est irréversible. Le compte conducteur et toutes ses données seront supprimés.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={() => setConfirmDelete(null)}
                style={{
                  flex: 1, background: 'rgba(168,85,247,0.1)',
                  border: '1px solid rgba(168,85,247,0.3)',
                  borderRadius: '8px', padding: '0.8rem',
                  color: '#a855f7', fontFamily: 'Orbitron,sans-serif',
                  fontSize: '0.7rem', letterSpacing: '0.08em', cursor: 'pointer',
                }}
              >
                ANNULER
              </button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                style={{
                  flex: 1, background: 'linear-gradient(135deg, #ef4444, #b91c1c)',
                  border: 'none', borderRadius: '8px', padding: '0.8rem',
                  color: '#fff', fontFamily: 'Orbitron,sans-serif',
                  fontSize: '0.7rem', letterSpacing: '0.08em', cursor: 'pointer',
                  boxShadow: '0 0 14px rgba(239,68,68,0.4)',
                }}
              >
                SUPPRIMER
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}