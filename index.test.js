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
    mdx(ComponentProvider, null,
      mdx('h1', null, 'Hello')
    )
  )
  expect(json).toMatchSnapshot()
})

test('renders with styles', () => {
  const json = renderJSON(
    mdx(ComponentProvider, {
      theme: {
        styles: {
          h1: {
            color: 'tomato'
          }
        }
      }
    },
      mdx('h1', null, 'Hello')
    )
  )
  expect(json).toMatchSnapshot()
})

test('renders with theme', () => {
  const json = renderJSON(
    mdx(ComponentProvider, {
      theme: {
        colors: {
          highlight: 'tomato',
        },
        styles: {
          h1: theme => ({
            color: theme.colors.highlight,
          })
        }
      }
    },
      mdx('h1', null, 'Hello')
    )
  )
})

test('renders with useComponents', () => {
  let components
  const Beep = props => {
    components = useComponents()
    return false
  }
  const json = renderJSON(
    mdx(ComponentProvider, null,
      mdx(Beep)
    )
  )
  expect(typeof components).toBe('object')
  expect(components.h1).toBeTruthy()
})

test('creates non-standard components', () => {
  const json = renderJSON(
    mdx(ComponentProvider, {
      theme: {
        styles: {
          sup: {
            color: 'tomato'
          }
        }
      }
    },
      mdx('sup', null, 'hey')
    )
  )
  expect(json).toMatchSnapshot()
  expect(json).toHaveStyleRule('color', 'tomato')
})
