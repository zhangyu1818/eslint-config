// Invalid JavaScript code that should trigger linting errors

// no-var - using var instead of const/let
var oldStyle = 'bad'

// no-console - console.log is not allowed
console.log('This should error')

// eqeqeq - using == instead of ===
if (oldStyle == 'bad') {
  // no-debugger
  debugger
}

// prefer-const - should use const
let shouldBeConst = 'immutable'
shouldBeConst = 'still immutable'

export { oldStyle, shouldBeConst }
