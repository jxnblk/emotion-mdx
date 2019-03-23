
# emotion-mdx

A fine blend of Emotion, theming, MDX, and React components

```sh
npm i emotion-mdx
```

You'll also need the following:

```sh
npm i @emotion/core @emotion/styled emotion-theming @mdx-js/mdx @mdx-js/tag
```

Emotion MDX is a context provider meant to be a complete replacement for both the `MDXProvider` and `ThemeProvider`.
It creates styled MDX components that have access to the Emotion theme object and can be nested to created contextual styles.

```jsx
// basic example
import React from 'react'
import { ComponentProvider } from 'emotion-mdx'
import theme from './theme'
import components from './components'
import Hello from './hello.mdx'

export default props =>
  <ComponentProvider
    theme={theme}
    components={components}>
    <Hello />
  </ComponentProvider>
```

## Styles



## Nesting Providers

The `ComponentProvider` can be nested to make contextual changes to the `theme`, `components`, or `styles`.

## Props

- `theme` (object) Emotion theming object
- `components` (object) React components to render MDX elements
- `styles` (object) Nested style objects for each component, with access to the Emotion `theme` context
- `transform` (function) Optional function to transform styles

## useComponents

The `useComponents` hook will return an object of styled components that can be used outside of an MDX document.

```jsx
import React from 'react'
import { useComponents } from 'emotion-mdx'

export default props => {
  const Styled = useComponents()
  return (
    <>
      <Styled.h1>Hello</Styled.h1>
      <Styled.p>I'm themed</Styled.p>
    </>
  )
}
```

The `useComponents` hook accepts a `styles` object argument to make optional contextual overrides.

```jsx
// with component-level overrides
import React from 'react'
import { useComponents } from 'emotion-mdx'

export default props => {
  const Styled = useComponents({
    // override the h1 component's defaults
    h1: props => ({
      fontSize: props.theme.fontSizes[4],
      color: 'tomato'
    })
  })
  return (
    <>
      <Styled.h1>Hello</Styled.h1>
      <Styled.p>I'm themed</Styled.p>
    </>
  )
}
```

## Theming

- Can be used to create isolated themes for MDX documents

