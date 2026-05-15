import { useState } from 'react'
import { Shield, User, Car, Heart, Phone, Edit3, Save, X, CheckCircle } from 'lucide-react'
import Navbar from '../components/Navbar'
import backgroundImage from './images/test4.png'

// ── MOCK DATA (à remplacer par les vraies données backend) ──
const INITIAL_DATA = {
  nom: 'Dupont',
  prenom: 'Jean',
  email: 'jean.dupont@email.com',
  telephone: '+212 612 345 678',
  immatriculation: 'A-12345-B',
  couleur: 'Rouge',
  permis: 'B-123456-789',
  groupeSanguin: 'A+',
  maladie: 'Diabète type 2',
  contactNom: 'Marie Dupont',
  contactTel: '+212 698 765 432',
}

// ── COMPONENTS ───────────────────────────────────────────────
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

function Field({ label, value, name, editing, onChange, type = 'text' }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{
        display: 'block',
        color: '#8888aa',
        fontSize: '0.7rem',
        fontFamily: 'Orbitron,sans-serif',
        letterSpacing: '0.1em',
        marginBottom: '0.4rem',
      }}>
        {label}
      </label>
      {editing ? (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          style={{
            width: '100%',
            background: 'rgba(168,85,247,0.08)',
            border: '1px solid rgba(168,85,247,0.4)',
            borderRadius: '8px',
            padding: '0.7rem 1rem',
            color: '#f0f0ff',
            fontFamily: 'Rajdhani,sans-serif',
            fontSize: '1rem',
            outline: 'none',
            boxSizing: 'border-box',
            transition: 'border-color 0.2s',
          }}
          onFocus={e => e.target.style.borderColor = '#a855f7'}
          onBlur={e => e.target.style.borderColor = 'rgba(168,85,247,0.4)'}
        />
      ) : (
        <div style={{
          padding: '0.7rem 1rem',
          background: 'rgba(168,85,247,0.04)',
          border: '1px solid rgba(168,85,247,0.15)',
          borderRadius: '8px',
          color: '#f0f0ff',
          fontFamily: 'Rajdhani,sans-serif',
          fontSize: '1rem',
        }}>
          {value || <span style={{ color: '#666688' }}>Non renseigné</span>}
        </div>
      )}
    </div>
  )
}

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

// ── MAIN PAGE ─────────────────────────────────────────────────
export default function Profile() {
  const [data, setData] = useState(INITIAL_DATA)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(INITIAL_DATA)
  const [saved, setSaved] = useState(false)

  const handleChange = (e) => {
    setDraft({ ...draft, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    setData(draft)
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleCancel = () => {
    setDraft(data)
    setEditing(false)
  }

  const handleEdit = () => {
    setDraft(data)
    setEditing(true)
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

        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '6rem 1.5rem 3rem' }}>

          {/* ── HEADER ── */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
              {/* Avatar */}
              <div style={{
                width: '72px', height: '72px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Orbitron,sans-serif', fontWeight: 700, fontSize: '1.3rem', color: '#fff',
                boxShadow: '0 0 24px rgba(168,85,247,0.5)',
                flexShrink: 0,
              }}>
                {data.prenom[0]}{data.nom[0]}
              </div>
              <div>
                <h1 style={{
                  fontFamily: 'Orbitron,sans-serif',
                  fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
                  background: 'linear-gradient(135deg, #f0f0ff, #a855f7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '0.3rem',
                }}>
                  {data.prenom} {data.nom}
                </h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} />
                  <span style={{ color: '#10b981', fontFamily: 'Orbitron,sans-serif', fontSize: '0.7rem', letterSpacing: '0.1em' }}>
                    CONDUCTEUR ACTIF
                  </span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {editing ? (
                <>
                  <button onClick={handleCancel} style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    background: 'rgba(239,68,68,0.1)',
                    border: '1px solid rgba(239,68,68,0.3)',
                    borderRadius: '8px',
                    padding: '0.6rem 1.2rem',
                    color: '#ef4444',
                    fontFamily: 'Orbitron,sans-serif',
                    fontSize: '0.7rem', letterSpacing: '0.08em',
                    cursor: 'pointer',
                  }}>
                    <X size={14} /> ANNULER
                  </button>
                  <button onClick={handleSave} style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.6rem 1.2rem',
                    color: '#fff',
                    fontFamily: 'Orbitron,sans-serif',
                    fontSize: '0.7rem', letterSpacing: '0.08em',
                    cursor: 'pointer',
                    boxShadow: '0 0 14px rgba(168,85,247,0.4)',
                  }}>
                    <Save size={14} /> SAUVEGARDER
                  </button>
                </>
              ) : (
                <button onClick={handleEdit} style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  background: 'rgba(168,85,247,0.1)',
                  border: '1px solid rgba(168,85,247,0.35)',
                  borderRadius: '8px',
                  padding: '0.6rem 1.2rem',
                  color: '#a855f7',
                  fontFamily: 'Orbitron,sans-serif',
                  fontSize: '0.7rem', letterSpacing: '0.08em',
                  cursor: 'pointer',
                }}>
                  <Edit3 size={14} /> MODIFIER
                </button>
              )}
            </div>
          </div>

          {/* ── SUCCESS TOAST ── */}
          {saved && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: 'rgba(16,185,129,0.1)',
              border: '1px solid rgba(16,185,129,0.3)',
              borderRadius: '10px',
              padding: '0.9rem 1.2rem',
              marginBottom: '1.5rem',
              color: '#10b981',
              fontSize: '0.95rem',
            }}>
              <CheckCircle size={18} />
              Profil mis à jour avec succès !
            </div>
          )}

          {/* ── GRID ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>

            {/* Infos personnelles */}
            <Card>
              <SectionTitle tag="INFORMATIONS" title="Données Personnelles" color="#a855f7" />
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.2rem' }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '8px',
                  background: 'rgba(168,85,247,0.15)',
                  border: '1px solid rgba(168,85,247,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <User size={16} color="#a855f7" />
                </div>
                <span style={{ color: '#c0c0d8', fontSize: '0.85rem' }}>Identité du conducteur</span>
              </div>
              <Field label="NOM"    name="nom"    value={editing ? draft.nom    : data.nom}    editing={editing} onChange={handleChange} />
              <Field label="PRÉNOM" name="prenom" value={editing ? draft.prenom : data.prenom} editing={editing} onChange={handleChange} />
              <Field label="EMAIL"  name="email"  value={editing ? draft.email  : data.email}  editing={editing} onChange={handleChange} type="email" />
              <Field label="TÉLÉPHONE" name="telephone" value={editing ? draft.telephone : data.telephone} editing={editing} onChange={handleChange} type="tel" />
            </Card>

            {/* Véhicule */}
            <Card>
              <SectionTitle tag="VÉHICULE" title="Données du Véhicule" color="#06b6d4" />
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.2rem' }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '8px',
                  background: 'rgba(6,182,212,0.15)',
                  border: '1px solid rgba(6,182,212,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Car size={16} color="#06b6d4" />
                </div>
                <span style={{ color: '#c0c0d8', fontSize: '0.85rem' }}>Informations véhicule</span>
              </div>
              <Field label="IMMATRICULATION" name="immatriculation" value={editing ? draft.immatriculation : data.immatriculation} editing={editing} onChange={handleChange} />
              <Field label="COULEUR"         name="couleur"         value={editing ? draft.couleur         : data.couleur}         editing={editing} onChange={handleChange} />
              <Field label="N° PERMIS"       name="permis"          value={editing ? draft.permis          : data.permis}          editing={editing} onChange={handleChange} />
            </Card>

            {/* Données médicales */}
            <Card style={{ border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.05)' }}>
              <SectionTitle tag="MÉDICAL" title="Données Médicales" color="#ef4444" />
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.2rem' }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '8px',
                  background: 'rgba(239,68,68,0.15)',
                  border: '1px solid rgba(239,68,68,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Heart size={16} color="#ef4444" />
                </div>
                <span style={{ color: '#c0c0d8', fontSize: '0.85rem' }}>Critique pour les secours</span>
              </div>

              {/* Groupe sanguin badge */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{
                  display: 'block', color: '#8888aa',
                  fontSize: '0.7rem', fontFamily: 'Orbitron,sans-serif',
                  letterSpacing: '0.1em', marginBottom: '0.4rem',
                }}>
                  GROUPE SANGUIN
                </label>
                {editing ? (
                  <select
                    name="groupeSanguin"
                    value={draft.groupeSanguin}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      background: 'rgba(239,68,68,0.08)',
                      border: '1px solid rgba(239,68,68,0.3)',
                      borderRadius: '8px',
                      padding: '0.7rem 1rem',
                      color: '#f0f0ff',
                      fontFamily: 'Rajdhani,sans-serif',
                      fontSize: '1rem',
                      outline: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(g => (
                      <option key={g} value={g} style={{ background: '#0d0d1f' }}>{g}</option>
                    ))}
                  </select>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      background: 'rgba(239,68,68,0.15)',
                      border: '1px solid rgba(239,68,68,0.4)',
                      borderRadius: '8px',
                      padding: '0.5rem 1.2rem',
                      color: '#ef4444',
                      fontFamily: 'Orbitron,sans-serif',
                      fontWeight: 700,
                      fontSize: '1.2rem',
                    }}>
                      {data.groupeSanguin}
                    </div>
                    <span style={{ color: '#c0c0d8', fontSize: '0.85rem' }}>Groupe sanguin</span>
                  </div>
                )}
              </div>

              <Field
                label="MALADIE CHRONIQUE"
                name="maladie"
                value={editing ? draft.maladie : data.maladie}
                editing={editing}
                onChange={handleChange}
              />
            </Card>

            {/* Contact urgence */}
            <Card style={{ border: '1px solid rgba(245,158,11,0.25)', background: 'rgba(245,158,11,0.04)' }}>
              <SectionTitle tag="URGENCE" title="Contact en cas d'urgence" color="#f59e0b" />
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.2rem' }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '8px',
                  background: 'rgba(245,158,11,0.15)',
                  border: '1px solid rgba(245,158,11,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Phone size={16} color="#f59e0b" />
                </div>
                <span style={{ color: '#c0c0d8', fontSize: '0.85rem' }}>Proche à contacter</span>
              </div>
              <Field label="NOM DU PROCHE"      name="contactNom" value={editing ? draft.contactNom : data.contactNom} editing={editing} onChange={handleChange} />
              <Field label="TÉLÉPHONE DU PROCHE" name="contactTel" value={editing ? draft.contactTel : data.contactTel} editing={editing} onChange={handleChange} type="tel" />
            </Card>

          </div>

          {/* ── STATUS SALUS ── */}
          <div style={{ marginTop: '1.5rem' }}>
            <Card>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '10px',
                    background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 0 14px rgba(168,85,247,0.4)',
                  }}>
                    <Shield size={20} color="#fff" />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Orbitron,sans-serif', fontSize: '0.85rem', color: '#f0f0ff', marginBottom: '2px' }}>
                      Boîtier SALUS
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b981' }} />
                      <span style={{ color: '#10b981', fontSize: '0.75rem', fontFamily: 'Orbitron,sans-serif', letterSpacing: '0.08em' }}>
                        CONNECTÉ
                      </span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '2rem' }}>
                  {[
                    { label: 'GPS',        status: 'ACTIF',    color: '#10b981' },
                    { label: 'GYROSCOPE',  status: 'ACTIF',    color: '#10b981' },
                    { label: 'SMS',        status: 'PRÊT',     color: '#06b6d4' },
                  ].map(({ label, status, color }) => (
                    <div key={label} style={{ textAlign: 'center' }}>
                      <div style={{ color: '#8888aa', fontFamily: 'Orbitron,sans-serif', fontSize: '0.6rem', letterSpacing: '0.1em', marginBottom: '4px' }}>
                        {label}
                      </div>
                      <div style={{ color, fontFamily: 'Orbitron,sans-serif', fontSize: '0.7rem', letterSpacing: '0.08em' }}>
                        {status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

        </div>
      </div>
    </div>
  )
}
