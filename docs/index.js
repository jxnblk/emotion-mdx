import React from 'react'
import { Link } from 'gatsby'
import { ComponentProvider, useComponents } from '../index'
import {
  compose,
  space,
  color,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
} from 'styled-system'
import pick from 'lodash.pick'
import Hello from './hello.mdx'
import Readme from '../README.md'

const system = compose(
  props => props,
  space,
  color,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight
)

const systemProps = [
  'theme',
  'm', 'mt', 'mr', 'mb', 'ml', 'mx', 'my',
  'p', 'pt', 'pr', 'pb', 'pl', 'px', 'py',
  'margin',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'padding',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
  'fontFamily',
  'fontSize',
  'fontWeight',
  'lineHeight',
  'color',
  'bg',
  'backgroundColor',
]

const notEmpty = n => Object.keys(n).length > 0

const deepSystem = style => props => {
  const theme = props.theme || props
  const styleProps = pick(props, systemProps)
  const styles = [
    ...system({ theme, ...style, ...styleProps })
  ]
  for (const key in style) {
    const val = style[key]
    if (!val || typeof val !== 'object') continue
    styles.push({
      [key]: deepSystem(val)(props)
    })
  }
  // console.log(style, styles)
  return styles.filter(Boolean).filter(notEmpty)
}

const Header = props => {
  const UI = useComponents()
  return (
    <UI.root>
      <UI.h1>Hello header</UI.h1>
      <UI.h2>Hello header</UI.h2>
    </UI.root>
  )
}

const components = {
  a: ({ href, ...props }) => <Link {...props} to={href} />
}

export default props => {
  return (
    <ComponentProvider
      components={components}
      styles={{
        wrapper: {
          maxWidth: 768,
          margin: 'auto',
          padding: 32,
        },
        a: {
          color: 'tomato',
        },
        h1: {
          color: 'tomato',
        }
      }}
      transform={deepSystem}>
      <Header />
      <Hello />
      <Readme />
    </ComponentProvider>
  )
}
