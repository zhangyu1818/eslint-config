// Valid JavaScript code that should pass all linting rules

const greeting = 'Hello, World!'

function add(a, b) {
  return a + b
}

const multiply = (x, y) => x * y

const user = {
  name: 'John',
  age: 30,
  greet() {
    return `Hello, ${this.name}`
  },
}

const numbers = [1, 2, 3, 4, 5]
const doubled = numbers.map((n) => n * 2)
console.warn('Doubled:', doubled)

if (user.age >= 18) {
  console.warn('User is an adult')
}

export { add, greeting, multiply, user }
