export interface ExperienceItem {
  role: string
  company: string
  location: string
  period: string
  current: boolean
  points: string[]
}

export const experience: ExperienceItem[] = [
  {
    role: 'Full Stack Developer Intern',
    company: 'Correm Advisory India Pvt. Ltd.',
    location: 'New Delhi',
    period: 'May 2026 — Present',
    current: true,
    points: [
      'Contributing to full-stack development across the frontend and backend of internal business applications.',
      'Collaborating with the engineering team to design, build, test and refine features in a fast-paced, agile environment.',
    ],
  },
]
