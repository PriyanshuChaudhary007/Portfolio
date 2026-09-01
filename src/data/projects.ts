export type ProjectLinkType = 'github' | 'npm' | 'demo'

export interface ProjectLink {
  label: string
  href: string
  type: ProjectLinkType
}

export interface Project {
  id: string
  name: string
  tagline: string
  category: string
  problem: string
  highlights: string[]
  tech: string[]
  links: ProjectLink[]
  install?: string
}

// Shipped projects only. Every link points at a live deployment or a real
// repository — no invented demos or metrics.
export const projects: Project[] = [
  {
    id: 'alphacare',
    name: 'AlphaCare',
    tagline: 'A voice-first AI health assistant for real-time consultations.',
    category: 'AI · Healthcare',
    problem:
      'Immediate, low-stakes health guidance is hard to reach. AlphaCare gives people a digital companion they can simply talk to for round-the-clock answers.',
    highlights: [
      'Real-time health consultations through natural, voice-based interactions.',
      'Integrated Google Gemini with the Vapi voice API for intelligent, conversational responses.',
      'Led the back-end development connecting the AI and voice layers.',
      'Designed as a 24/7, voice-first experience to make health information more accessible.',
    ],
    tech: ['Next.js', 'React.js', 'TypeScript', 'Node.js', 'Firebase', 'Tailwind CSS', 'Google Gemini', 'Vapi API'],
    links: [
      { label: 'View repository', href: 'https://github.com/PriyanshuChaudhary007/alphacare', type: 'github' },
    ],
  },
  {
    id: 'ui-library',
    name: 'React UI Component Library',
    tagline: 'Describe a React component in plain English, preview it live, publish it to npm.',
    category: 'Open Source · Developer Tools',
    problem:
      'Repetitive UI work slows teams down. This library pairs a set of reusable components with generated ones built on demand, so a one-off component is a sentence rather than an afternoon.',
    highlights: [
      'Prompts go through OpenRouter and come back as strict JSON — name, code and props — rendered live in a react-live sandbox.',
      'Credit-based access: accounts start with 150 credits and each generation spends 50, topped up through Razorpay with server-side signature verification.',
      'Google sign-in with Firebase on the client and an httpOnly JWT cookie from the API, shared across both deployed domains.',
      'An admin publish flow writes an approved component into the library package, rebuilds it and ships a patch release to npm.',
    ],
    tech: ['React.js', 'Vite', 'Redux Toolkit', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'Firebase Auth', 'Razorpay', 'npm'],
    install: 'npm i virtual-ui-com-lib',
    links: [
      { label: 'Live demo', href: 'https://virtual-ui-client.vercel.app', type: 'demo' },
      { label: 'View repository', href: 'https://github.com/PriyanshuChaudhary007/virtual-ui', type: 'github' },
      { label: 'View on npm', href: 'https://www.npmjs.com/package/virtual-ui-com-lib', type: 'npm' },
    ],
  },
  {
    id: 'taskflow',
    name: 'TaskFlow',
    tagline: 'A MERN task manager built to stay fast once the list gets long.',
    category: 'Full Stack · Productivity',
    problem:
      'Task apps tend to be either too bare to rely on or too heavy to open quickly. TaskFlow keeps a growing list readable with search, filters and pagination doing the work instead of endless scrolling.',
    highlights: [
      'JWT authentication with bcrypt-hashed passwords, enforced by both client route guards and API middleware.',
      'Full task CRUD with one-click pending ↔ completed toggling, priority levels and overdue detection on due dates.',
      'Debounced search plus status and priority filters, four sort orders, and paginated results at nine tasks a page.',
      'Axios interceptors handling token injection and 401s, with validation and error toasts on both sides of the stack.',
    ],
    tech: ['React.js', 'React Router', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'CSS Modules'],
    links: [
      { label: 'Live demo', href: 'https://taskflow-navy-one.vercel.app', type: 'demo' },
      { label: 'View repository', href: 'https://github.com/PriyanshuChaudhary007/taskflow', type: 'github' },
    ],
  },
]
