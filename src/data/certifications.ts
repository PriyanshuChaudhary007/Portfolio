export interface Certification {
  name: string
  issuer: string
}

export const certifications: Certification[] = [
  { name: 'Google Cloud GenAI', issuer: 'Google Cloud' },
  { name: 'Advanced Software Engineering', issuer: 'Walmart USA · Forage' },
  { name: 'Deloitte Australia — Technology', issuer: 'Forage' },
  { name: 'Generative AI', issuer: 'HP LIFE' },
]

// Real activities from the résumé. Only Ignition was a finalist; the rest are
// hackathons attended, kept factual.
export const achievements: string[] = [
  'Finalist — Ignition, Gautam Buddha University',
  'Hackathons — Hack The Hills 3.0 (IIIT Una), HackStreet 3.0 (JIIT), Code of the Phoenix (IIIT-NR), Hacksagon (ABV-IIITM)',
  'Volunteer — MotoGP Bharat 2023, event & logistics coordination',
]

export const languages: string[] = ['English — Fluent', 'Hindi — Native']
