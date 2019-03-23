import React from 'react'
import { ComponentProvider } from '../index'
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
import Header from './header.mdx'
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
  return styles.filter(Boolean).filter(notEmpty)
}

/*
const _Header = props => {
  const UI = useComponents()
  return (
    <UI.root>
      <UI.h1>Hello header</UI.h1>
      <UI.h2>Hello header</UI.h2>
    </UI.root>
  )
}
*/

const Content = props =>
  <ComponentProvider
    {...props}
    styles={{
      wrapper: {
        maxWidth: 1024,
        margin: 'auto',
        px: 32,
        py: 64,
      },
      h1: {
        fontSize: [5, 6, 7],
      },
      p: {
        fontSize: [2, 3],
      }
    }}
  />

export default props => {
  return (
    <ComponentProvider
      theme={{
        colors: {
          link: '#07c',
          gray: '#f0f6ff',
        }
      }}
      styles={{
        a: {
          color: 'link',
        },
        code: {
          fontFamily: 'Menlo, monospace',
          fontSize: 16,
        },
        pre: {
          fontFamily: 'Menlo, monospace',
          fontSize: 16,
          p: 2,
          color: 'link',
          bg: 'gray',
          overflowX: 'auto',
        },
        inlineCode: {
          fontFamily: 'Menlo, monospace',
          fontSize: 16,
          color: 'link',
        }
      }}
      transform={deepSystem}>
      <Header />
      <Content>
        <Readme />
      </Content>
    </ComponentProvider>
  )
}
