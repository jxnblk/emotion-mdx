import React from 'react'
import { ComponentProvider, Styled } from '../index'
import css from '@styled-system/css'
import Header from './header.mdx'
import Readme from '../README.md'

const Content = props =>
  <ComponentProvider
    {...props}
    theme={{
      styles: {
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
        },
        styles: {
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
        }
      }}
      transform={css}>
      <Header />
      <Content>
        <Readme />
      </Content>
    </ComponentProvider>
  )
}
