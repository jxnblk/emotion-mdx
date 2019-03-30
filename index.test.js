/** @jsx mdx */
import mdx from '@mdx-js/react/create-element'
import renderer from 'react-test-renderer'
import { matchers } from 'jest-emotion'
import {
  ComponentProvider,
  useComponents,
} from './index'

expect.extend(matchers)

const renderJSON = el => renderer.create(el).toJSON()

test('renders', () => {
  const json = renderJSON(
    <ComponentProvider>
      <h1>Hello</h1>
    </ComponentProvider>
  )
  expect(json).toMatchSnapshot()
})

test('renders with styles', () => {
  const json = renderJSON(
    <ComponentProvider
      theme={{
        styles: {
          h1: {
            color: 'tomato'
          }
        }
      }}>
      <h1>Hello</h1>
    </ComponentProvider>
  )
  expect(json).toMatchSnapshot()
})

test('renders with theme', () => {
  const json = renderJSON(
    <ComponentProvider
      theme={{
        colors: {
          highlight: 'tomato',
        },
        styles: {
          h1: props => ({
            color: props.theme.colors.highlight,
          })
        }
      }}>
      <h1>Hello</h1>
    </ComponentProvider>
  )
})

test('renders with useComponents', () => {
  let components
  const Beep = props => {
    components = useComponents()
    return false
  }
  const json = renderJSON(
    <ComponentProvider>
      <Beep />
    </ComponentProvider>
  )
  expect(typeof components).toBe('object')
  expect(components.h1).toBeTruthy()
})

test('creates non-standard components', () => {
  const json = renderJSON(
    <ComponentProvider
      theme={{
        styles: {
          sup: {
            color: 'tomato'
          }
        }
      }}>
      <sup>hey</sup>
    </ComponentProvider>
  )
  expect(json).toMatchSnapshot()
  expect(json).toHaveStyleRule('color', 'tomato')
})
