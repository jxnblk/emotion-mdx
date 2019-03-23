/** @jsx mdx */
import mdx from '@mdx-js/mdx/create-element'
import React from 'react'
import renderer from 'react-test-renderer'
import {
  ComponentProvider,
} from './index'

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
      styles={{
        h1: {
          color: 'tomato'
        }
      }}>
      <h1>Hello</h1>
    </ComponentProvider>
  )
  expect(json).toMatchSnapshot()
})
