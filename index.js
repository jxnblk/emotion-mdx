import React, { useContext } from 'react'
import { jsx, ThemeContext } from '@emotion/core'
import { MDXProvider } from '@mdx-js/react'
import merge from 'lodash.merge'

const styled = (Tag, opts) => (style) =>
  React.forwardRef((props, ref) => (
    jsx(Tag, {
      ...props,
      ref,
      css: style
    })
  ))

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

const Context = React.createContext(baseContext)

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
    React.createElement(ThemeContext.Provider, { value: context.theme },
      React.createElement(MDXProvider, { components: context.components },
        React.createElement(Context.Provider, { value: context },
          props.children
        )
      )
    )
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
