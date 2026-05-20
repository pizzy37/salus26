import { useState, useEffect } from 'react'
import { Shield, User, Car, Heart, Phone, Edit3, Save, X, CheckCircle, AlertCircle, Loader, Plus } from 'lucide-react'
import Navbar from '../components/Navbar'
import { profileAPI, vehicleAPI, medicalAPI, emergencyContactAPI } from '../api'
import backgroundImage from './images/test4.png'

// ── CONSTANTS ─────────────────────────────────────────────────
const BLOOD_GROUPS = ['A_plus','A_minus','B_plus','B_minus','AB_plus','AB_minus','O_plus','O_minus']
const BLOOD_LABELS = { A_plus:'A+', A_minus:'A-', B_plus:'B+', B_minus:'B-', AB_plus:'AB+', AB_minus:'AB-', O_plus:'O+', O_minus:'O-' }
const SEXE_OPTIONS  = [{ value: 'homme', label: 'Homme' }, { value: 'femme', label: 'Femme' }, { value: 'autre', label: 'Autre' }]
const PERMIS_OPTIONS = ['A','B','C','D','EB','EC']

const EMPTY_CONTACT = { nom_proche: '', telephone_proche: '', groupe_sanguin: '' }
const DEFAULT_CONTACTS = [
  { ...EMPTY_CONTACT, ordre: 1 },
  { ...EMPTY_CONTACT, ordre: 2 },
  { ...EMPTY_CONTACT, ordre: 3 },
  { ...EMPTY_CONTACT, ordre: 4 },
]

const unwrap = (payload, key) => payload?.[key] ?? payload ?? {}

// ── SMALL COMPONENTS ──────────────────────────────────────────
function Card({ children, style = {} }) {
  return (
    <div style={{
      background: 'rgba(13,13,31,0.7)', backdropFilter: 'blur(8px)',
      border: '1px solid rgba(168,85,247,0.2)', borderRadius: '16px',
      padding: '1.8rem', ...style,
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

function Field({ label, value, name, editing, onChange, type = 'text', required = false }) {
  const safeValue = value ?? ''
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', color: '#8888aa', fontSize: '0.7rem', fontFamily: 'Orbitron,sans-serif', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
        {label}{required && editing && <span style={{ color: '#ef4444', marginLeft: '4px' }}>*</span>}
      </label>
      {editing ? (
        <input
          type={type} name={name} value={safeValue} onChange={onChange}
          style={{
            width: '100%', background: 'rgba(168,85,247,0.08)',
            border: '1px solid rgba(168,85,247,0.4)', borderRadius: '8px',
            padding: '0.7rem 1rem', color: '#f0f0ff',
            fontFamily: 'Rajdhani,sans-serif', fontSize: '1rem',
            outline: 'none', boxSizing: 'border-box',
          }}
          onFocus={e => e.target.style.borderColor = '#a855f7'}
          onBlur={e  => e.target.style.borderColor = 'rgba(168,85,247,0.4)'}
        />
      ) : (
        <div style={{
          padding: '0.7rem 1rem', background: 'rgba(168,85,247,0.04)',
          border: '1px solid rgba(168,85,247,0.15)', borderRadius: '8px',
          color: '#f0f0ff', fontFamily: 'Rajdhani,sans-serif', fontSize: '1rem',
        }}>
          {safeValue || <span style={{ color: '#666688' }}>Non renseigné</span>}
        </div>
      )}
    </div>
  )
}

function SelectField({ label, value, name, editing, onChange, options, color = '#a855f7' }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', color: '#8888aa', fontSize: '0.7rem', fontFamily: 'Orbitron,sans-serif', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
        {label}
      </label>
      {editing ? (
        <select
          name={name} value={value || ''}
          onChange={onChange}
          style={{
            width: '100%', background: `${color}10`,
            border: `1px solid ${color}40`, borderRadius: '8px',
            padding: '0.7rem 1rem', color: '#f0f0ff',
            fontFamily: 'Rajdhani,sans-serif', fontSize: '1rem',
            outline: 'none', cursor: 'pointer', boxSizing: 'border-box',
          }}
        >
          <option value="" style={{ background: '#0d0d1f' }}>— Choisir —</option>
          {options.map(opt => (
            <option key={opt.value ?? opt} value={opt.value ?? opt} style={{ background: '#0d0d1f' }}>
              {opt.label ?? opt}
            </option>
          ))}
        </select>
      ) : (
        <div style={{
          padding: '0.7rem 1rem', background: 'rgba(168,85,247,0.04)',
          border: '1px solid rgba(168,85,247,0.15)', borderRadius: '8px',
          color: '#f0f0ff', fontFamily: 'Rajdhani,sans-serif', fontSize: '1rem',
        }}>
          {(options.find(o => (o.value ?? o) === value)?.label ?? value) || <span style={{ color: '#666688' }}>Non renseigné</span>}
        </div>
      )}
    </div>
  )
}

// ── CONTACT CARD ──────────────────────────────────────────────
function ContactCard({ contact, index, editing, onChange, color }) {
  const isFirst    = index === 0
  const isFilled   = contact.nom_proche || contact.telephone_proche
  const borderColor = isFirst
    ? 'rgba(245,158,11,0.4)'
    : isFilled ? 'rgba(168,85,247,0.3)' : 'rgba(168,85,247,0.1)'

  return (
    <div style={{
      background: isFirst ? 'rgba(245,158,11,0.05)' : 'rgba(168,85,247,0.03)',
      border: `1px solid ${borderColor}`,
      borderRadius: '12px',
      padding: '1.2rem',
    }}>
      {/* Contact header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
        <div style={{
          width: '28px', height: '28px', borderRadius: '50%',
          background: isFirst ? 'rgba(245,158,11,0.2)' : 'rgba(168,85,247,0.1)',
          border: `1px solid ${isFirst ? 'rgba(245,158,11,0.4)' : 'rgba(168,85,247,0.25)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Orbitron,sans-serif', fontSize: '0.7rem', fontWeight: 700,
          color: isFirst ? '#f59e0b' : '#a855f7',
          flexShrink: 0,
        }}>
          {index + 1}
        </div>
        <span style={{
          fontFamily: 'Orbitron,sans-serif', fontSize: '0.6rem',
          color: isFirst ? '#f59e0b' : '#8888aa',
          letterSpacing: '0.08em',
          lineHeight: 1.3,
        }}>
          {isFirst ? 'PRINCIPAL — OBLIGATOIRE' : `CONTACT ${index + 1} — OPTIONNEL`}
        </span>
      </div>

      {/* Nom */}
      <div style={{ marginBottom: '0.75rem' }}>
        <label style={{ display: 'block', color: '#8888aa', fontSize: '0.65rem', fontFamily: 'Orbitron,sans-serif', letterSpacing: '0.1em', marginBottom: '0.35rem' }}>
          NOM DU PROCHE {isFirst && editing && <span style={{ color: '#ef4444' }}>*</span>}
        </label>
        {editing ? (
          <input
            type="text" value={contact.nom_proche || ''}
            onChange={e => onChange(index, 'nom_proche', e.target.value)}
            placeholder={isFirst ? 'Nom obligatoire' : 'Optionnel'}
            style={{
              width: '100%', background: 'rgba(168,85,247,0.08)',
              border: `1px solid ${isFirst && !contact.nom_proche ? 'rgba(239,68,68,0.4)' : 'rgba(168,85,247,0.3)'}`,
              borderRadius: '8px', padding: '0.65rem 0.9rem',
              color: '#f0f0ff', fontFamily: 'Rajdhani,sans-serif',
              fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box',
            }}
          />
        ) : (
          <div style={{ padding: '0.65rem 0.9rem', background: 'rgba(168,85,247,0.04)', border: '1px solid rgba(168,85,247,0.12)', borderRadius: '8px', color: '#f0f0ff', fontFamily: 'Rajdhani,sans-serif', fontSize: '0.95rem' }}>
            {contact.nom_proche || <span style={{ color: '#666688' }}>Non renseigné</span>}
          </div>
        )}
      </div>

      {/* Téléphone */}
      <div style={{ marginBottom: '0.75rem' }}>
        <label style={{ display: 'block', color: '#8888aa', fontSize: '0.65rem', fontFamily: 'Orbitron,sans-serif', letterSpacing: '0.1em', marginBottom: '0.35rem' }}>
          TÉLÉPHONE {isFirst && editing && <span style={{ color: '#ef4444' }}>*</span>}
        </label>
        {editing ? (
          <input
            type="tel" value={contact.telephone_proche || ''}
            onChange={e => onChange(index, 'telephone_proche', e.target.value)}
            placeholder="+212 6XX XXX XXX"
            style={{
              width: '100%', background: 'rgba(168,85,247,0.08)',
              border: `1px solid ${isFirst && !contact.telephone_proche ? 'rgba(239,68,68,0.4)' : 'rgba(168,85,247,0.3)'}`,
              borderRadius: '8px', padding: '0.65rem 0.9rem',
              color: '#f0f0ff', fontFamily: 'Rajdhani,sans-serif',
              fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box',
            }}
          />
        ) : (
          <div style={{ padding: '0.65rem 0.9rem', background: 'rgba(168,85,247,0.04)', border: '1px solid rgba(168,85,247,0.12)', borderRadius: '8px', color: '#f0f0ff', fontFamily: 'Rajdhani,sans-serif', fontSize: '0.95rem' }}>
            {contact.telephone_proche || <span style={{ color: '#666688' }}>Non renseigné</span>}
          </div>
        )}
      </div>

      {/* Groupe sanguin */}
      <div>
        <label style={{ display: 'block', color: '#8888aa', fontSize: '0.65rem', fontFamily: 'Orbitron,sans-serif', letterSpacing: '0.1em', marginBottom: '0.35rem' }}>
          GROUPE SANGUIN
        </label>
        {editing ? (
          <select
            value={contact.groupe_sanguin || ''}
            onChange={e => onChange(index, 'groupe_sanguin', e.target.value)}
            style={{
              width: '100%', background: 'rgba(239,68,68,0.06)',
              border: '1px solid rgba(239,68,68,0.25)', borderRadius: '8px',
              padding: '0.65rem 0.9rem', color: '#f0f0ff',
              fontFamily: 'Rajdhani,sans-serif', fontSize: '0.95rem',
              outline: 'none', cursor: 'pointer', boxSizing: 'border-box',
            }}
          >
            <option value="" style={{ background: '#0d0d1f' }}>— Inconnu —</option>
            {BLOOD_GROUPS.map(g => (
              <option key={g} value={g} style={{ background: '#0d0d1f' }}>{BLOOD_LABELS[g]}</option>
            ))}
          </select>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {contact.groupe_sanguin ? (
              <div style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '6px', padding: '0.3rem 0.8rem', color: '#ef4444', fontFamily: 'Orbitron,sans-serif', fontWeight: 700, fontSize: '1rem' }}>
                {BLOOD_LABELS[contact.groupe_sanguin]}
              </div>
            ) : (
              <div style={{ padding: '0.65rem 0.9rem', background: 'rgba(168,85,247,0.04)', border: '1px solid rgba(168,85,247,0.12)', borderRadius: '8px', color: '#666688', fontFamily: 'Rajdhani,sans-serif', fontSize: '0.95rem' }}>
                Non renseigné
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ── MAIN PAGE ─────────────────────────────────────────────────
export default function Profile() {
  const [loading,  setLoading]  = useState(true)
  const [saving,   setSaving]   = useState(false)
  const [editing,  setEditing]  = useState(false)
  const [saved,    setSaved]    = useState(false)
  const [error,    setError]    = useState('')

  const [profile,  setProfile]  = useState({})
  const [vehicle,  setVehicle]  = useState({})
  const [medical,  setMedical]  = useState({})
  const [contacts, setContacts] = useState(DEFAULT_CONTACTS)

  const [draftProfile,  setDraftProfile]  = useState({})
  const [draftVehicle,  setDraftVehicle]  = useState({})
  const [draftMedical,  setDraftMedical]  = useState({})
  const [draftContacts, setDraftContacts] = useState(DEFAULT_CONTACTS)

  // ── FETCH ──
  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true)
      try {
        const [p, v, m, c] = await Promise.all([
          profileAPI.get(),
          vehicleAPI.get(),
          medicalAPI.get(),
          emergencyContactAPI.get(),
        ])
        const profileData  = unwrap(p.data, 'profile')
        const vehicleData  = unwrap(v.data, 'vehicle')
        const medicalData  = unwrap(m.data, 'medicalData')

        // Normaliser les contacts : toujours 4 entrées
        const rawContacts  = Array.isArray(c.data) ? c.data : (c.data?.emergencyContacts ?? [])
        const contactData  = DEFAULT_CONTACTS.map((def, i) => ({ ...def, ...(rawContacts[i] ?? {}) }))

        setProfile(profileData);  setDraftProfile(profileData)
        setVehicle(vehicleData);  setDraftVehicle(vehicleData)
        setMedical(medicalData);  setDraftMedical(medicalData)
        setContacts(contactData); setDraftContacts(contactData)
      } catch (err) {
        setError('Erreur lors du chargement des données.')
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  const handleEdit = () => {
    setDraftProfile(profile); setDraftVehicle(vehicle)
    setDraftMedical(medical); setDraftContacts(contacts)
    setEditing(true)
  }

  const handleCancel = () => {
    setDraftProfile(profile); setDraftVehicle(vehicle)
    setDraftMedical(medical); setDraftContacts(contacts)
    setEditing(false); setError('')
  }

  const handleContactChange = (index, field, value) => {
    const updated = draftContacts.map((c, i) => i === index ? { ...c, [field]: value } : c)
    setDraftContacts(updated)
  }

  const handleSave = async () => {
    // Validation contact principal
    if (!draftContacts[0].nom_proche || !draftContacts[0].telephone_proche) {
      setError('Le contact principal (nom + téléphone) est obligatoire.')
      return
    }
    setSaving(true); setError('')
    try {
      const [p, v, m, c] = await Promise.all([
        profileAPI.update(draftProfile),
        vehicleAPI.update(draftVehicle),
        medicalAPI.update(draftMedical),
        emergencyContactAPI.update(draftContacts),
      ])
      setProfile(unwrap(p.data, 'profile'))
      setVehicle(unwrap(v.data, 'vehicle'))
      setMedical(unwrap(m.data, 'medicalData'))
      const saved = Array.isArray(c.data) ? c.data : (c.data?.emergencyContacts ?? [])
      setContacts(DEFAULT_CONTACTS.map((def, i) => ({ ...def, ...(saved[i] ?? {}) })))
      setEditing(false); setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      setError(err.message || 'Erreur lors de la sauvegarde.')
    } finally {
      setSaving(false)
    }
  }

  // ── LOADING ──
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', position: 'relative' }}>
        <div style={{ position: 'fixed', inset: 0, backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', zIndex: 0 }} />
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(5,5,16,0.85)', backdropFilter: 'blur(2px)', zIndex: 1 }} />
        <div style={{ position: 'relative', zIndex: 2, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <Loader size={40} color="#a855f7" style={{ animation: 'spin 1s linear infinite', marginBottom: '1rem' }} />
            <p style={{ color: '#8888aa', fontFamily: 'Orbitron,sans-serif', fontSize: '0.75rem', letterSpacing: '0.1em' }}>CHARGEMENT...</p>
          </div>
        </div>
        <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', position: 'relative', fontFamily: 'Rajdhani,sans-serif' }}>
      <div style={{ position: 'fixed', inset: 0, backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(5,5,16,0.85)', backdropFilter: 'blur(2px)', zIndex: 1 }} />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <Navbar />
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '6rem 1.5rem 3rem' }}>

          {/* ── HEADER ── */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
              <div style={{
                width: '72px', height: '72px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Orbitron,sans-serif', fontWeight: 700, fontSize: '1.3rem', color: '#fff',
                boxShadow: '0 0 24px rgba(168,85,247,0.5)',
              }}>
                {profile.prenom?.[0]}{profile.nom?.[0]}
              </div>
              <div>
                <h1 style={{
                  fontFamily: 'Orbitron,sans-serif', fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
                  background: 'linear-gradient(135deg, #f0f0ff, #a855f7)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.3rem',
                }}>
                  {profile.prenom} {profile.nom}
                </h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} />
                  <span style={{ color: '#10b981', fontFamily: 'Orbitron,sans-serif', fontSize: '0.7rem', letterSpacing: '0.1em' }}>
                    CONDUCTEUR ACTIF
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {editing ? (
                <>
                  <button onClick={handleCancel} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', padding: '0.6rem 1.2rem', color: '#ef4444', fontFamily: 'Orbitron,sans-serif', fontSize: '0.7rem', letterSpacing: '0.08em', cursor: 'pointer' }}>
                    <X size={14} /> ANNULER
                  </button>
                  <button onClick={handleSave} disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: saving ? 'rgba(168,85,247,0.3)' : 'linear-gradient(135deg, #a855f7, #7c3aed)', border: 'none', borderRadius: '8px', padding: '0.6rem 1.2rem', color: '#fff', fontFamily: 'Orbitron,sans-serif', fontSize: '0.7rem', letterSpacing: '0.08em', cursor: saving ? 'not-allowed' : 'pointer', boxShadow: '0 0 14px rgba(168,85,247,0.4)' }}>
                    <Save size={14} /> {saving ? 'SAUVEGARDE...' : 'SAUVEGARDER'}
                  </button>
                </>
              ) : (
                <button onClick={handleEdit} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.35)', borderRadius: '8px', padding: '0.6rem 1.2rem', color: '#a855f7', fontFamily: 'Orbitron,sans-serif', fontSize: '0.7rem', letterSpacing: '0.08em', cursor: 'pointer' }}>
                  <Edit3 size={14} /> MODIFIER
                </button>
              )}
            </div>
          </div>

          {/* ── TOASTS ── */}
          {saved && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '10px', padding: '0.9rem 1.2rem', marginBottom: '1.5rem', color: '#10b981', fontSize: '0.95rem' }}>
              <CheckCircle size={18} /> Profil mis à jour avec succès !
            </div>
          )}
          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px', padding: '0.9rem 1.2rem', marginBottom: '1.5rem', color: '#ef4444', fontSize: '0.95rem' }}>
              <AlertCircle size={18} /> {error}
            </div>
          )}

          {/* ── GRID ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>

            {/* ── DONNÉES PERSONNELLES ── */}
            <Card>
              <SectionTitle tag="INFORMATIONS" title="Données Personnelles" color="#a855f7" />
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.2rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={16} color="#a855f7" />
                </div>
                <span style={{ color: '#c0c0d8', fontSize: '0.85rem' }}>Identité du conducteur</span>
              </div>

              {/* Nom + Prénom sur une ligne */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <Field label="NOM"    name="nom"    value={editing ? draftProfile.nom    : profile.nom}    editing={editing} onChange={e => setDraftProfile({...draftProfile, [e.target.name]: e.target.value})} required />
                <Field label="PRÉNOM" name="prenom" value={editing ? draftProfile.prenom : profile.prenom} editing={editing} onChange={e => setDraftProfile({...draftProfile, [e.target.name]: e.target.value})} required />
              </div>

              <Field label="EMAIL"    name="email"    value={editing ? draftProfile.email    : profile.email}    editing={editing} onChange={e => setDraftProfile({...draftProfile, [e.target.name]: e.target.value})} type="email" />
              <Field label="TÉLÉPHONE" name="telephone" value={editing ? draftProfile.telephone : profile.telephone} editing={editing} onChange={e => setDraftProfile({...draftProfile, [e.target.name]: e.target.value})} type="tel" />
              <Field label="ADRESSE DE RÉSIDENCE" name="adresse" value={editing ? draftProfile.adresse : profile.adresse} editing={editing} onChange={e => setDraftProfile({...draftProfile, [e.target.name]: e.target.value})} />

              {/* Sexe + Âge sur une ligne */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <SelectField
                  label="SEXE" name="sexe"
                  value={editing ? draftProfile.sexe : profile.sexe}
                  editing={editing}
                  onChange={e => setDraftProfile({...draftProfile, sexe: e.target.value})}
                  options={SEXE_OPTIONS}
                  color="#a855f7"
                />
                <Field
                  label="ÂGE" name="age" type="number"
                  value={editing ? draftProfile.age : profile.age}
                  editing={editing}
                  onChange={e => setDraftProfile({...draftProfile, age: e.target.value})}
                />
              </div>

              <SelectField
                label="TYPE DE PERMIS" name="type_permis"
                value={editing ? draftProfile.type_permis : profile.type_permis}
                editing={editing}
                onChange={e => setDraftProfile({...draftProfile, type_permis: e.target.value})}
                options={PERMIS_OPTIONS}
                color="#a855f7"
              />
            </Card>

            {/* ── VÉHICULE ── */}
            <Card>
              <SectionTitle tag="VÉHICULE" title="Données du Véhicule" color="#06b6d4" />
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.2rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Car size={16} color="#06b6d4" />
                </div>
                <span style={{ color: '#c0c0d8', fontSize: '0.85rem' }}>Informations véhicule</span>
              </div>
              <Field label="IMMATRICULATION" name="immatriculation" value={editing ? draftVehicle.immatriculation : vehicle.immatriculation} editing={editing} onChange={e => setDraftVehicle({...draftVehicle, [e.target.name]: e.target.value})} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <Field label="MARQUE / MODÈLE" name="modele" value={editing ? draftVehicle.modele : vehicle.modele} editing={editing} onChange={e => setDraftVehicle({...draftVehicle, [e.target.name]: e.target.value})} />
                <Field label="COULEUR"         name="couleur" value={editing ? draftVehicle.couleur : vehicle.couleur} editing={editing} onChange={e => setDraftVehicle({...draftVehicle, [e.target.name]: e.target.value})} />
              </div>
              <Field label="TYPE VÉHICULE" name="type_vehicule" value={editing ? draftVehicle.type_vehicule : vehicle.type_vehicule} editing={editing} onChange={e => setDraftVehicle({...draftVehicle, [e.target.name]: e.target.value})} />
              <Field label="N° PERMIS"     name="numero_permis" value={editing ? draftVehicle.numero_permis : vehicle.numero_permis} editing={editing} onChange={e => setDraftVehicle({...draftVehicle, [e.target.name]: e.target.value})} />
            </Card>

            {/* ── MÉDICAL ── */}
            <Card style={{ border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.05)' }}>
              <SectionTitle tag="MÉDICAL" title="Données Médicales" color="#ef4444" />
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.2rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Heart size={16} color="#ef4444" />
                </div>
                <span style={{ color: '#c0c0d8', fontSize: '0.85rem' }}>Critique pour les secours</span>
              </div>

              {/* Groupe sanguin */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: '#8888aa', fontSize: '0.7rem', fontFamily: 'Orbitron,sans-serif', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
                  GROUPE SANGUIN
                </label>
                {editing ? (
                  <select
                    value={draftMedical.groupe_sanguin || ''}
                    onChange={e => setDraftMedical({...draftMedical, groupe_sanguin: e.target.value})}
                    style={{ width: '100%', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', padding: '0.7rem 1rem', color: '#f0f0ff', fontFamily: 'Rajdhani,sans-serif', fontSize: '1rem', outline: 'none', cursor: 'pointer' }}
                  >
                    <option value="" style={{ background: '#0d0d1f' }}>— Choisir —</option>
                    {BLOOD_GROUPS.map(g => (
                      <option key={g} value={g} style={{ background: '#0d0d1f' }}>{BLOOD_LABELS[g]}</option>
                    ))}
                  </select>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)', borderRadius: '8px', padding: '0.5rem 1.2rem', color: '#ef4444', fontFamily: 'Orbitron,sans-serif', fontWeight: 700, fontSize: '1.2rem' }}>
                      {BLOOD_LABELS[medical.groupe_sanguin] || '—'}
                    </div>
                  </div>
                )}
              </div>
              <Field label="MALADIE CHRONIQUE" name="maladie_chronique" value={editing ? draftMedical.maladie_chronique : medical.maladie_chronique} editing={editing} onChange={e => setDraftMedical({...draftMedical, [e.target.name]: e.target.value})} />
            </Card>

          </div>

          {/* ── CONTACTS URGENCE — pleine largeur sous le grid ── */}
          <div style={{ marginTop: '1.5rem' }}>
            <Card style={{ border: '1px solid rgba(245,158,11,0.25)', background: 'rgba(245,158,11,0.03)' }}>
              <SectionTitle tag="URGENCE" title="Contacts en cas d'urgence" color="#f59e0b" />
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.2rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Phone size={16} color="#f59e0b" />
                </div>
                <span style={{ color: '#c0c0d8', fontSize: '0.85rem' }}>
                  1 contact obligatoire — 3 optionnels
                </span>
              </div>

              {/* ── 4 contacts en grille horizontale ── */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                {(editing ? draftContacts : contacts).map((contact, index) => (
                  <ContactCard
                    key={index}
                    contact={contact}
                    index={index}
                    editing={editing}
                    onChange={handleContactChange}
                    color="#f59e0b"
                  />
                ))}
              </div>
            </Card>
          </div>

          {/* ── STATUS SALUS ── */}
          <div style={{ marginTop: '1.5rem' }}>
            <Card>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'linear-gradient(135deg, #a855f7, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 14px rgba(168,85,247,0.4)' }}>
                    <Shield size={20} color="#fff" />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Orbitron,sans-serif', fontSize: '0.85rem', color: '#f0f0ff', marginBottom: '2px' }}>Boîtier SALUS</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b981' }} />
                      <span style={{ color: '#10b981', fontSize: '0.75rem', fontFamily: 'Orbitron,sans-serif', letterSpacing: '0.08em' }}>CONNECTÉ</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '2rem' }}>
                  {[
                    { label: 'GPS',       status: 'ACTIF', color: '#10b981' },
                    { label: 'GYROSCOPE', status: 'ACTIF', color: '#10b981' },
                    { label: 'SMS',       status: 'PRÊT',  color: '#06b6d4' },
                  ].map(({ label, status, color }) => (
                    <div key={label} style={{ textAlign: 'center' }}>
                      <div style={{ color: '#8888aa', fontFamily: 'Orbitron,sans-serif', fontSize: '0.6rem', letterSpacing: '0.1em', marginBottom: '4px' }}>{label}</div>
                      <div style={{ color, fontFamily: 'Orbitron,sans-serif', fontSize: '0.7rem' }}>{status}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

        </div>
      </div>
      <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
    </div>
  )
}