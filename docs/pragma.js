/** @jsx mdx */
import mdx from '@mdx-js/react/create-element'
import { ComponentProvider } from '../index'

export default props =>
  <ComponentProvider
    theme={{
      styles: {
        h1: {
          color: 'tomato'
        }
      }
    }}>
    <h1>Hello</h1>
    <p>These elements are rendered with the MDX pragma. Neat!</p>
  </ComponentProvider>
