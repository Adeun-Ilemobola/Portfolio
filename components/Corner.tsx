import React from 'react'

type Variant = 'start' | 'mid' | 'end'

interface CornerProps {
  variant: Variant
  size?: number
  /** bump up the thickness */
  strokeWidth?: number
  color?: string
}

const Corner: React.FC<CornerProps> = ({
  variant,
  size = 24,
  strokeWidth = 4,          // ← thicker by default
  color = 'currentColor',
}) => {
  // pick round caps for start/end, square for mid
  const lineCap = variant === 'mid' ? 'square' : 'round'

  const startPath = `M ${strokeWidth/2},${size - strokeWidth/2}
                     L ${strokeWidth/2},${strokeWidth/2}
                     L ${size - strokeWidth/2},${strokeWidth/2}`

  const midPath = `
    M ${strokeWidth/2},${size - strokeWidth/2}
    L ${strokeWidth/2},${strokeWidth/2}
    M ${strokeWidth/2},${size/2}
    L ${size/2},${size/2}
  `

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap={lineCap}
    >
      {variant === 'start' && <path d={startPath} />}
      {variant === 'mid'   && <path d={midPath} />}
      {variant === 'end'   && (
        <g transform={`rotate(180 ${size/2} ${size/2})`}>
          <path d={startPath} />
        </g>
      )}
    </svg>
  )
}

export default Corner
