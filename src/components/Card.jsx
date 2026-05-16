export default function Card({ children, style = {}, variant = 'default' }) {
  const variants = {
    default: {
      background: 'rgba(13,13,31,0.7)',
      border: '1px solid rgba(168,85,247,0.2)',
    },
    medical: {
      background: 'rgba(239,68,68,0.05)',
      border: '1px solid rgba(239,68,68,0.3)',
    },
    success: {
      background: 'rgba(16,185,129,0.05)',
      border: '1px solid rgba(16,185,129,0.3)',
    },
    warning: {
      background: 'rgba(245,158,11,0.05)',
      border: '1px solid rgba(245,158,11,0.25)',
    },
    cyan: {
      background: 'rgba(6,182,212,0.05)',
      border: '1px solid rgba(6,182,212,0.25)',
    },
  }

  return (
    <div style={{
      ...variants[variant],
      backdropFilter: 'blur(8px)',
      borderRadius: '16px',
      padding: '1.8rem',
      ...style,
    }}>
      {children}
    </div>
  )
}