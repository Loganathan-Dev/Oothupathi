import React from 'react'

const Logo = ({ size = 48, showText = true, variant = 'default' }) => {
  const colors = {
    default: { bg: '#4F46E5', text: '#4F46E5', accent: '#F97316' },
    light: { bg: '#FFFFFF', text: '#FFFFFF', accent: '#FB923C' },
    dark: { bg: '#1E1B4B', text: '#1E1B4B', accent: '#F97316' },
  }

  const c = colors[variant] || colors.default

  return (
    <div className="flex items-center gap-3">
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Gradient background */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#4F46E5" />
          </linearGradient>
          <linearGradient id="flameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FB923C" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>
        </defs>

        {/* Rounded square background */}
        <rect
          x="5"
          y="5"
          width="90"
          height="90"
          rx="22"
          fill="url(#logoGradient)"
        />

        {/* Inner circle - "O" for Oothupathi */}
        <circle
          cx="50"
          cy="50"
          r="30"
          stroke="white"
          strokeWidth="6"
          fill="none"
          opacity="0.9"
        />

        {/* Flame / Sambrani symbol inside */}
        <path
          d="M50 30 
             C 45 38, 42 42, 42 48 
             C 42 54, 46 58, 50 58 
             C 54 58, 58 54, 58 48 
             C 58 42, 55 38, 50 30 Z"
          fill="url(#flameGradient)"
        />

        {/* Smoke dots above */}
        <circle cx="50" cy="24" r="1.5" fill="white" opacity="0.5" />
        <circle cx="54" cy="20" r="1" fill="white" opacity="0.4" />
        <circle cx="46" cy="22" r="1" fill="white" opacity="0.4" />

        {/* Leaf accent (herbal) */}
        <path
          d="M70 70 
             C 75 68, 78 65, 78 60 
             C 75 62, 72 65, 70 70 Z"
          fill="white"
          opacity="0.7"
        />
      </svg>

      {showText && (
        <div className="leading-tight">
          <h1
            className="font-heading font-bold tracking-tight"
            style={{
              color: variant === 'light' ? '#FFFFFF' : '#0F172A',
              fontSize: size * 0.42,
              lineHeight: 1.1,
            }}
          >
            Oothupathi
          </h1>
          <p
            className="tracking-widest uppercase font-medium"
            style={{
              color: variant === 'light' ? '#C7D2FE' : '#64748B',
              fontSize: size * 0.15,
              letterSpacing: '0.15em',
            }}
          >
            Sambrani & Herbal
          </p>
        </div>
      )}
    </div>
  )
}

export default Logo
