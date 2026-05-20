const BASE_URL = 'http://localhost:5000/api'

// ── TOKEN ─────────────────────────────────────────────────────
export const getToken = ()        => localStorage.getItem('token')
export const setToken = (token)   => localStorage.setItem('token', token)
export const removeToken = ()     => localStorage.removeItem('token')

// ── BASE FETCH ────────────────────────────────────────────────
async function request(endpoint, options = {}) {
  const token = getToken()

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  const data = await res.json()

  if (!res.ok) {
    if (res.status === 401) {
      removeToken()
      if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    throw new Error(data.message || 'Erreur serveur')
  }

  return data
}

// ── AUTH ──────────────────────────────────────────────────────
export const authAPI = {
  register: (body) => request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(body),
  }),

  login: (body) => request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(body),
  }),

  logout: () => request('/auth/logout', {
    method: 'POST',
  }),
}

// ── PROFILE ───────────────────────────────────────────────────
export const profileAPI = {
  get:    ()     => request('/profile'),
  update: (body) => request('/profile', {
    method: 'PUT',
    body: JSON.stringify(body),
  }),
}

// ── VEHICLE ───────────────────────────────────────────────────
export const vehicleAPI = {
  get:    ()     => request('/vehicle'),
  update: (body) => request('/vehicle', {
    method: 'PUT',
    body: JSON.stringify(body),
  }),
}

// ── MEDICAL ───────────────────────────────────────────────────
export const medicalAPI = {
  get:    ()     => request('/medical'),
  update: (body) => request('/medical', {
    method: 'PUT',
    body: JSON.stringify(body),
  }),
}

// ── EMERGENCY CONTACT ─────────────────────────────────────────
export const emergencyContactAPI = {
  get:    ()     => request('/emergency-contact'),
  update: (body) => request('/emergency-contact', {
    method: 'PUT',
    body: JSON.stringify(body),
  }),
}

// ── ALERTS ───────────────────────────────────────────────────
export const alertsAPI = {
  create: (body) => request('/alerts', {
    method: 'POST',
    body: JSON.stringify(body),
  }),
  cancel: (id)   => request(`/alerts/${id}/cancel`, {
    method: 'PUT',
  }),
}

// ── SETTINGS ─────────────────────────────────────────────────
export const settingsAPI = {
  get:    ()     => request('/settings'),
  update: (body) => request('/settings', {
    method: 'PUT',
    body: JSON.stringify(body),
  }),
}

// ── ADMIN ─────────────────────────────────────────────────────
export const adminAPI = {
  getUsers:    ()   => request('/admin/users'),
  getUser:     (id) => request(`/admin/users/${id}`),
  deleteUser:  (id) => request(`/admin/users/${id}`, { method: 'DELETE' }),
  getAlerts:   ()   => request('/admin/alerts'),
  getAlert:    (id) => request(`/admin/alerts/${id}`),
  getStats:    ()   => request('/admin/stats'),
}
