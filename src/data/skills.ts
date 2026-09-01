import type { TechIconName } from './techIcons'

export interface SkillItem {
  name: string
  icon: TechIconName
}

export interface SkillCategory {
  title: string
  note: string
  items: SkillItem[]
}

// The résumé's declared skills plus the tooling actually used in the shipped
// projects (Tailwind, CSS Modules, Redux Toolkit, Vite, Vercel, Mongoose).
export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    note: 'Interfaces & state',
    items: [
      { name: 'HTML5', icon: 'html5' },
      { name: 'CSS3', icon: 'css' },
      { name: 'JavaScript (ES6+)', icon: 'javascript' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'React.js', icon: 'react' },
      { name: 'Next.js', icon: 'nextdotjs' },
      { name: 'Redux Toolkit', icon: 'redux' },
      { name: 'React Router', icon: 'reactrouter' },
      { name: 'Tailwind CSS', icon: 'tailwindcss' },
      { name: 'CSS Modules', icon: 'cssmodules' },
    ],
  },
  {
    title: 'Backend',
    note: 'APIs & auth',
    items: [
      { name: 'Node.js', icon: 'nodedotjs' },
      { name: 'Express.js', icon: 'express' },
      { name: 'RESTful APIs', icon: 'rest' },
      { name: 'JWT Auth', icon: 'jsonwebtokens' },
    ],
  },
  {
    title: 'Database',
    note: 'Data & storage',
    items: [
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'Mongoose', icon: 'mongoose' },
      { name: 'MySQL', icon: 'mysql' },
    ],
  },
  {
    title: 'Languages',
    note: 'Fundamentals',
    items: [
      { name: 'C++', icon: 'cplusplus' },
      { name: 'Python', icon: 'python' },
    ],
  },
  {
    title: 'Tools & Platforms',
    note: 'Day-to-day workflow',
    items: [
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
      { name: 'npm', icon: 'npm' },
      { name: 'Vite', icon: 'vite' },
      { name: 'Vercel', icon: 'vercel' },
      { name: 'Postman', icon: 'postman' },
      { name: 'Firebase', icon: 'firebase' },
      { name: 'Claude Code', icon: 'claude' },
      { name: 'OpenAI Codex', icon: 'openai' },
    ],
  },
]
