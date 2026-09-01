export interface SocialLink {
  label: string
  href: string
  handle: string
}

export const profile = {
  name: 'Priyanshu Chaudhary',
  role: 'Full Stack Developer',
  location: 'Noida, India',
  email: 'priyanshuchaudhary1008@gmail.com',
  phone: '+91 63973 54006',
  phoneHref: 'tel:+916397354006',
  github: 'https://github.com/PriyanshuChaudhary007',
  linkedin: 'https://www.linkedin.com/in/priyanshuchaudhary007',
  resumeUrl: '/Priyanshu-Chaudhary-Resume.pdf',

  // Short, specific tagline shown under the name in the hero.
  tagline:
    'Full stack developer building practical web applications — and exploring how generative AI fits into real products.',

  // A couple of natural paragraphs for the About section (written in first person).
  about: [
    "I'm a full stack developer with a Computer Science background and a MERN-focused toolkit. I like owning features end to end — designing a clean React or Next.js interface, wiring up the Node.js and Express APIs behind it, and modelling the data in MongoDB so the whole thing holds together.",
    "Right now I'm a Full Stack Developer Intern at Correm Advisory, working on internal business applications with the engineering team. Outside of that I've shipped a voice-based healthcare assistant, a MERN task manager, and an AI component generator that publishes straight to npm — so a fair bit of what I build ends up involving generative AI.",
    "I care about writing code that other people can actually read and maintain, and I'd rather ship something practical than over-engineer it.",
  ],
} as const

// Tech highlighted in the hero — a focused subset, not the full skills list.
export const heroStack = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'MongoDB',
  'Tailwind CSS',
] as const
