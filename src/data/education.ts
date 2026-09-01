export interface EducationItem {
  degree: string
  /** Optional subtitle — stream or specialisation. */
  field?: string
  school: string
  location?: string
  period?: string
}

// School entries deliberately carry no dates or marks: the résumé doesn't list
// them, so there is nothing to source them from.
export const education: EducationItem[] = [
  {
    degree: 'Bachelor of Technology (B.Tech)',
    field: 'Computer Science & Engineering',
    school: 'Gautam Buddha University',
    location: 'Greater Noida, India',
    period: 'Sept 2022 - Jun 2026',
  },
  {
    degree: 'Senior Secondary (Class XII)',
    school: 'VSD Public School',
  },
  {
    degree: 'Secondary (Class X)',
    school: 'VSD Public School',
  },
]
