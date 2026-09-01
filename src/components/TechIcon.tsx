import type { SVGProps } from 'react'
import { techIcons, type TechIcon as TechIconShape, type TechIconName } from '../data/techIcons'

interface TechIconProps extends SVGProps<SVGSVGElement> {
  name: TechIconName
}

const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

// Renders a single-path 24x24 glyph at the current font size, inheriting colour
// from its parent so chips can restyle it on hover.
export function TechIcon({ name, ...rest }: TechIconProps) {
  const icon: TechIconShape = techIcons[name]

  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      aria-hidden="true"
      {...(icon.stroke ? strokeProps : { fill: 'currentColor' })}
      {...rest}
    >
      <path d={icon.d} />
    </svg>
  )
}
