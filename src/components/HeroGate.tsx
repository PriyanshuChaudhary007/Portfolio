import gateArt from '../assets/shadow-gate.webp'

// Decorative hero artwork. The illustration ships on a solid black background,
// so it is masked to a circle and sits inside a dark "gate": on the dark theme
// the two blacks meet invisibly, and on the light theme the gate reads as a
// deliberate portal rather than a black square dropped on cream.
//
// Every moving layer is a sibling, not a wrapper, so each one can animate on its
// own clock without fighting over a shared transform. All of it is defined in
// index.css and pauses under prefers-reduced-motion.
export function HeroGate() {
  return (
    <div className="gate w-[15rem] sm:w-[18rem] lg:w-full">
      <span aria-hidden="true" className="gate-glow" />
      <span aria-hidden="true" className="gate-void" />
      <span aria-hidden="true" className="gate-ring" />
      <img
        src={gateArt}
        alt="Illustration of a lone hunter drawing a blade inside a swirling blue gate, shadow soldiers rising behind him"
        width={2000}
        height={749}
        decoding="async"
        className="gate-art"
      />
      <span aria-hidden="true" className="gate-rim" />
      <span aria-hidden="true" className="gate-scan" />
      <span aria-hidden="true" className="gate-sheen" />
    </div>
  )
}
