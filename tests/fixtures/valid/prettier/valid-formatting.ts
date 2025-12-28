export const greeting = 'Hello, World!'

export function add(a: number, b: number): number {
  return a + b
}

export const user = {
  name: 'John',
  age: 30,
}

export const numbers = [1, 2, 3, 4, 5]

export const longString =
  'This is a very long string that should be properly formatted by Prettier'

export const multilineObject = {
  age: 30,
  email: 'john@example.com',
  firstName: 'John',
  lastName: 'Doe',
}

export const multilineArray = ['first', 'second', 'third', 'fourth', 'fifth']

export function complexFunction(
  param1: string,
  param2: number,
  param3: boolean,
): string {
  if (param3) {
    return `${param1}: ${param2}`
  }
  return param1
}
