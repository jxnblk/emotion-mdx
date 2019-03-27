
# emotion-mdx

A fine blend of [Emotion][], theming, [MDX][], and React components

**WIP/Experimental**

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

The `styles` prop adds styles to child MDX elements, using `@emotion/styled`.

```jsx
<ComponentProvider
  styles={{
    h1: {
      fontSize: 48,
      color: 'tomato',
    },
  }}
/>
```

Each style can pick up values from the `theme` object by passing a function.

```jsx
<ComponentProvider
  theme={{
    colors: {
      primary: 'tomato',
    }
  }}
  styles={{
    h1: props => ({
      color: props.theme.colors.primary,
    })
  }}
/>
```

## Transforming Styles

A `transform` function can be provided to transform the style object based on props.
This can be used with libraries like [Styled System][] to quickly add theme-derived styles.

```jsx
const customTransform = style => props => {
  const color = props.theme.colors[style.color] || style.color
  const transformed = {
    ...style,
    color,
  }
  return transformed
}

export default props =>
  <ComponentProvider
    transform={customTransform}
    theme={{
      colors: {
        primary: 'tomato',
      },
    }}
    styles={{
      h1: {
        color: 'primary'
      }
    }}
  />
```


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

## Styled Components

The `Styled` component can be imported directly and works similarly to the `useComponents` hook.

```jsx
import React from 'react'
import { Styled } from 'emotion-mdx'

export default props =>
  <Styled.div>
    <Styled.h1>Hello</Styled.h1>
  </Styled.div>
```

## Theming

Emotion MDX can be used to create isolated "theme" layout components for MDX documents.
These component can encapsulate typography styles that will only apply to MDX elements.

```jsx
// example MDX theme
import React from 'react'
import { ComponentProvider } from 'emotion-mdx'

const components = {
  // MDX-specific component
  wrapper: {
    fontFamily: 'Roboto, system-ui, sans-serif',
    lineHeight: 1.5,
  },
  h1: {
    fontSize: 48,
    fontWeight: 900,
    lineHeight: 1.25,
  },
  h2: {
    fontSize: 32,
    lineHeight: 1.25,
  }
}

export default props =>
  <ComponentProvider
    {...props}
    components={components}
  />
```

```mdx
// example mdx file
import Theme from './theme'
export default Theme

# Hello

## We're styled!
```

MIT License

[mdx]: https://mdxjs.com
[emotion]: https://emotion.sh
[styled system]: https://styled-system.com

