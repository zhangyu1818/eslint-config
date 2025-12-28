// Invalid React component that should trigger linting errors

import type { FC } from 'react'

// react/jsx-key - missing key in array
const List: FC = () => {
  const items = ['a', 'b', 'c']
  return (
    <ul>
      {items.map((item) => (
        <li>{item}</li>
      ))}
    </ul>
  )
}

// react/no-unknown-property - invalid HTML attribute
const InvalidAttr: FC = () => <div class="container">Content</div>

// react/self-closing-comp - should be self-closing
const NotSelfClosing: FC = () => <div></div>

// react/jsx-no-target-blank - missing rel="noreferrer"
const UnsafeLink: FC = () => (
  <a href="https://example.com" target="_blank">
    Link
  </a>
)

// react/no-unescaped-entities - unescaped entity
const UnescapedEntity: FC = () => <div>Don't do this</div>

// react/jsx-curly-brace-presence - unnecessary braces
const UnnecessaryBraces: FC = () => <div className={'container'}>Content</div>

// react/no-array-index-key - using index as key
const IndexKey: FC = () => {
  const items = ['a', 'b', 'c']
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  )
}

export {
  IndexKey,
  InvalidAttr,
  List,
  NotSelfClosing,
  UnescapedEntity,
  UnnecessaryBraces,
  UnsafeLink,
}
