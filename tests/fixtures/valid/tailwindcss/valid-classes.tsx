// Valid Tailwind CSS usage that should pass all linting rules

import type { FC } from 'react'

export const Card: FC = () => {
  return (
    <div className="rounded-lg bg-white p-4 shadow-md">
      <h2 className="mb-2 text-xl font-bold">Card Title</h2>
      <p className="text-gray-600">Card content goes here</p>
    </div>
  )
}

export const Button: FC = () => {
  return (
    <button className="rounded bg-blue-500 px-4 py-2 text-white" type="button">
      Click Me
    </button>
  )
}

export const Grid: FC = () => {
  return (
    <div className="grid gap-4">
      <div className="bg-gray-100 p-4">Item 1</div>
      <div className="bg-gray-100 p-4">Item 2</div>
      <div className="bg-gray-100 p-4">Item 3</div>
    </div>
  )
}
