// Valid React component that should pass all linting rules

import { useState, type FC, type ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  disabled?: boolean
  onClick: () => void
}

export const Button: FC<ButtonProps> = ({ children, disabled, onClick }) => {
  return (
    <button disabled={disabled} type="button" onClick={onClick}>
      {children}
    </button>
  )
}

interface CounterProps {
  initialCount?: number
}

const Counter: FC<CounterProps> = ({ initialCount = 0 }) => {
  const [count, setCount] = useState(initialCount)

  return (
    <div>
      <p>Count: {count}</p>
      <Button onClick={() => setCount(count + 1)}>Increment</Button>
    </div>
  )
}

export default Counter
