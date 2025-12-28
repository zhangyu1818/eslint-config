// Invalid Tailwind CSS usage that should trigger linting errors

import type { FC } from 'react'

// better-tailwindcss/no-duplicate-classes - duplicate classes
export const DuplicateClasses: FC = () => {
  return <div className="p-4 p-4 bg-white">Duplicate padding</div>
}

// better-tailwindcss/no-unnecessary-whitespace - extra whitespace
export const ExtraWhitespace: FC = () => {
  return <div className="p-4  bg-white">Extra spaces</div>
}

// better-tailwindcss/no-conflicting-classes - conflicting classes
export const ConflictingClasses: FC = () => {
  return <div className="flex block">Conflicting display</div>
}
