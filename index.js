import React, { useContext } from 'react'
import { ThemeProvider } from 'emotion-theming'
import { MDXProvider } from '@mdx-js/tag'
import styled from '@emotion/styled'
import merge from 'lodash.merge'

const tags = [
  'p',
  'a',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'img',
  'pre',
  'code',
  'ol',
  'ul',
  'li',
  'blockquote',
  'hr',
  'em',
  'table',
  'tr',
  'th',
  'td',
  'em',
  'strong',
  'delete',
  // mdx
  // 'inlineCode',
  // 'thematicBreak',
]

// defaults
const theme = {
  colors: {
    text: '#345',
    background: '#fff',
    link: '#07c',
  },
}

const components = {
  root: styled.div(),
  wrapper: styled.div(),
}
tags.forEach(tag => {
  components[tag] = styled(tag)()
})

const noop = n => n

const baseContext = {
  theme,
  components,
  transform: noop
}

const Context = React.createContext(baseContext)

const mergeStyles = (components, styles, transform = noop) => {
  for (const key in styles) {
    const override = styles[key]
    components[key] = styled(components[key] || key)(transform(override))
  }
  return components
}

const mergeContexts = (outer = baseContext, inner, styles) => ({
  ...outer,
  theme: merge({}, outer.theme, inner.theme),
  components: mergeStyles(
    merge({}, outer.components, inner.components),
    styles,
    inner.transform || outer.transform
  )
})

export const ComponentProvider = ({
  theme,
  components,
  styles,
  transform = noop,
  ...props
}) => {
  const outer = useContext(Context)
  const context = mergeContexts(outer, {
    theme,
    components,
    transform,
  }, styles)

  return (
    <ThemeProvider theme={context.theme}>
      <MDXProvider components={context.components}>
        <Context.Provider value={context}>
          {props.children}
        </Context.Provider>
      </MDXProvider>
    </ThemeProvider>
  )
}

export const useComponents = (styles = {}) => {
  const outer = useContext(Context)
  const context = mergeContexts(outer, {}, styles)
  return context.components
}
