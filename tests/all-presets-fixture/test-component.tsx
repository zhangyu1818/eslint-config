// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useState } from 'react'

interface TestProps {
  count: number
  name: string
}

export const TestComponent = ({ name, count }: TestProps) => {
  const [value, setValue] = useState(count)

  const handleClick = () => {
    setValue(value + 1)
  }

  return (
    <div>
      <span>{name}</span>
      <span>{value}</span>
      <button type="button" onClick={handleClick}>
        Increment
      </button>
    </div>
  )
}

export default TestComponent
