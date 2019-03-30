import React, { useContext } from 'react'
import { ThemeProvider } from 'emotion-theming'
import { MDXProvider } from '@mdx-js/react'
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
  'wrapper',
  'inlineCode',
  'thematicBreak',
  // extras
  'div',
]

const aliases = {
  inlineCode: 'code',
  thematicBreak: 'hr',
  wrapper: 'div',
}

const alias = n => aliases[n] || n

// defaults
const components = {}
tags.forEach(tag => {
  components[tag] = styled(alias(tag))()
})

const noop = n => n

const baseContext = {
  theme: {},
  components,
  transform: undefined // noop
}

export const Context = React.createContext(baseContext)

const mergeStyles = (components, styles, transform = noop) => {
  const next = { ...components }
  for (const key in styles) {
    const override = styles[key]
    next[key] = styled(components[key] || alias(key))(transform(override))
  }
  return next
}

const mergeContexts = (outer = baseContext, inner) => {
  const transform = inner.transform || outer.transform
  const theme = merge({}, outer.theme, inner.theme)
  const styles = theme.styles
  return merge({}, outer, {
    transform,
    theme,
    components: mergeStyles(
      merge({}, outer.components, inner.components),
      styles,
      transform
    )
  })
}

export const ComponentProvider = ({
  theme,
  components,
  transform,
  ...props
}) => {
  const outer = useContext(Context)
  const context = mergeContexts(outer, {
    theme,
    components,
    transform,
  })

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
  const context = mergeContexts(outer, {
    theme: {
      styles
    }
  })
  return context.components
}

export const Styled = React.forwardRef(({
  tag = 'div',
  ...props
}, ref) => {
  const components = useComponents()
  const type = components[tag] || 'div'
  return React.createElement(type, {
    ...props,
    ref
  })
})

tags.forEach(tag => {
  Styled[tag] = React.forwardRef((props, ref) =>
    React.createElement(Styled, {
      ref,
      tag,
      ...props,
    })
  )
})
