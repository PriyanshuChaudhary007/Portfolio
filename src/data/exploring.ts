export interface ExploringItem {
  title: string
  detail: string
}

// Grounded in the résumé: Gemini/OpenAI tooling, Vapi voice work, the
// Node/Express/MongoDB stack, and the published npm library.
export const exploring: ExploringItem[] = [
  {
    title: 'Generative AI in products',
    detail: 'Wiring models like Gemini and the OpenAI tools into real user-facing features - not just demos.',
  },
  {
    title: 'Voice interfaces',
    detail: 'Building conversational, voice-first experiences after working with the Vapi API on AlphaCare.',
  },
  {
    title: 'Cleaner backend architecture',
    detail: 'Writing more maintainable Node and Express APIs, and thinking harder about data modelling in MongoDB.',
  },
  {
    title: 'Shipping open source',
    detail: 'Improving my npm component library and learning what it takes to publish tools other developers rely on.',
  },
]
