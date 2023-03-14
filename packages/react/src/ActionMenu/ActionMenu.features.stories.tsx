import {ComponentMeta} from '@storybook/react'
import React from 'react'
import {userEvent, within, waitFor} from '@storybook/testing-library'
import {expect} from '@storybook/jest'
import {ActionMenu} from './ActionMenu'
import {countries} from '../test-utils/fixtures/data'
import {Heading, Stack, Text, OrderedList} from '../'

import styles from './ActionMenu.stories.module.css'

export default {
  title: 'Components/ActionMenu/Features',
  component: ActionMenu
} as ComponentMeta<typeof ActionMenu>

export const SingleSelection = () => {
  const [selectedItem, setSelectedItem] = React.useState('Copilot')

  return (
    <ActionMenu onSelect={newValue => setSelectedItem(newValue)}>
      <ActionMenu.Button aria-label="GitHub feature">{selectedItem}</ActionMenu.Button>
      <ActionMenu.Overlay>
        <ActionMenu.Item value="Copilot" selected={'Copilot' === selectedItem}>
          Copilot
        </ActionMenu.Item>
        <ActionMenu.Item value="Codespaces" selected={'Codespaces' === selectedItem}>
          Codespaces
        </ActionMenu.Item>
        <ActionMenu.Item value="CodeQL" selected={'CodeQL' === selectedItem}>
          CodeQL
        </ActionMenu.Item>
      </ActionMenu.Overlay>
    </ActionMenu>
  )
}

export const InStack = () => {
  const [selectedOne, setSelectedOne] = React.useState('Copilot')
  const [selectedTwo, setSelectedTwo] = React.useState('Afghanistan')

  return (
    <Stack direction="horizontal">
      <ActionMenu onSelect={newValue => setSelectedOne(newValue)}>
        <ActionMenu.Button aria-label="GitHub feature">{selectedOne}</ActionMenu.Button>
        <ActionMenu.Overlay>
          <ActionMenu.Item value="Copilot" selected={'Copilot' === selectedOne}>
            Copilot
          </ActionMenu.Item>
          <ActionMenu.Item value="Codespaces" selected={'Codespaces' === selectedOne}>
            Codespaces
          </ActionMenu.Item>
          <ActionMenu.Item value="CodeQL" selected={'CodeQL' === selectedOne}>
            CodeQL
          </ActionMenu.Item>
        </ActionMenu.Overlay>
      </ActionMenu>
      <ActionMenu onSelect={newValue => setSelectedTwo(newValue)} selectionVariant="single">
        <ActionMenu.Button aria-label="Country">{selectedTwo}</ActionMenu.Button>
        <ActionMenu.Overlay>
          {countries.map((country, index) => (
            <ActionMenu.Item key={index} value={country} selected={country === selectedTwo}>
              {country}
            </ActionMenu.Item>
          ))}
        </ActionMenu.Overlay>
      </ActionMenu>
    </Stack>
  )
}

export const OpenByDefault = () => {
  const [selectedItem, setSelectedItem] = React.useState('Copilot')

  return (
    <ActionMenu onSelect={newValue => setSelectedItem(newValue)} open>
      <ActionMenu.Button aria-label="GitHub feature">{selectedItem}</ActionMenu.Button>
      <ActionMenu.Overlay>
        <ActionMenu.Item value="Copilot" selected={'Copilot' === selectedItem}>
          Copilot
        </ActionMenu.Item>
        <ActionMenu.Item value="Codespaces" selected={'Codespaces' === selectedItem}>
          Codespaces
        </ActionMenu.Item>
        <ActionMenu.Item value="CodeQL" selected={'CodeQL' === selectedItem}>
          CodeQL
        </ActionMenu.Item>
      </ActionMenu.Overlay>
    </ActionMenu>
  )
}

export const TruncationOfLongValues = () => {
  const [selected, setSelected] = React.useState('Europe, Middle East and Africa')

  return (
    <ActionMenu onSelect={newValue => setSelected(newValue)}>
      <ActionMenu.Button aria-label="GitHub feature">{selected}</ActionMenu.Button>
      <ActionMenu.Overlay>
        <ActionMenu.Item
          value="Europe, Middle East and Africa"
          selected={'Europe, Middle East and Africa' === selected}
        >
          Europe, Middle East and Africa
        </ActionMenu.Item>
        <ActionMenu.Item value="Americas" selected={'Americas' === selected}>
          Americas
        </ActionMenu.Item>
        <ActionMenu.Item value="Asia Pacific" selected={'Asia Pacific' === selected}>
          Asia Pacific
        </ActionMenu.Item>
      </ActionMenu.Overlay>
    </ActionMenu>
  )
}

export const LongerLists = () => {
  const [selectedItem, setSelectedItem] = React.useState('United States')

  return (
    <ActionMenu onSelect={newValue => setSelectedItem(newValue)} selectionVariant="single">
      <ActionMenu.Button aria-label="GitHub feature">{selectedItem}</ActionMenu.Button>
      <ActionMenu.Overlay>
        {countries.map((country, index) => (
          <ActionMenu.Item key={index} value={country} selected={country === selectedItem}>
            {country}
          </ActionMenu.Item>
        ))}
      </ActionMenu.Overlay>
    </ActionMenu>
  )
}

export const LongerListsOpen = () => {
  const [selectedItem, setSelectedItem] = React.useState('United States')

  return (
    <ActionMenu onSelect={newValue => setSelectedItem(newValue)} selectionVariant="single" open>
      <ActionMenu.Button aria-label="Country">{selectedItem}</ActionMenu.Button>
      <ActionMenu.Overlay>
        {countries.map((country, index) => (
          <ActionMenu.Item key={index} value={country} selected={country === selectedItem}>
            {country}
          </ActionMenu.Item>
        ))}
      </ActionMenu.Overlay>
    </ActionMenu>
  )
}

LongerListsOpen.storyName = 'Longer lists (open)'

export const MenuAlignment = () => {
  const [selectedItem, setSelectedItem] = React.useState('United States')

  return (
    <div style={{marginLeft: 150}}>
      <ActionMenu onSelect={newValue => setSelectedItem(newValue)} selectionVariant="single" open menuAlignment="end">
        <ActionMenu.Button aria-label="Country">{selectedItem}</ActionMenu.Button>
        <ActionMenu.Overlay>
          {countries.map((country, index) => (
            <ActionMenu.Item key={index} value={country} selected={country === selectedItem}>
              {country}
            </ActionMenu.Item>
          ))}
        </ActionMenu.Overlay>
      </ActionMenu>
    </div>
  )
}

MenuAlignment.storyName = 'Menu alignment (end)'

export const DisabledMenu = () => {
  const [selectedItem] = React.useState('Copilot')

  return (
    <ActionMenu selectionVariant="single" disabled>
      <ActionMenu.Button aria-label="GitHub feature">Open menu</ActionMenu.Button>
      <ActionMenu.Overlay>
        <ActionMenu.Item value="Copilot" selected={'Copilot' === selectedItem}>
          Copilot
        </ActionMenu.Item>
        <ActionMenu.Item value="Codespaces" selected={'Codespaces' === selectedItem}>
          Codespaces
        </ActionMenu.Item>
        <ActionMenu.Item value="CodeQL" selected={'CodeQL' === selectedItem}>
          CodeQL
        </ActionMenu.Item>
      </ActionMenu.Overlay>
    </ActionMenu>
  )
}

export const DisabledItem = () => {
  const [selectedItem, setSelectedItem] = React.useState('Copilot')

  return (
    <ActionMenu onSelect={newValue => setSelectedItem(newValue)} selectionVariant="single" open>
      <ActionMenu.Button aria-label="GitHub feature">{selectedItem}</ActionMenu.Button>
      <ActionMenu.Overlay>
        <ActionMenu.Item value="Copilot" selected={'Copilot' === selectedItem}>
          Copilot
        </ActionMenu.Item>
        <ActionMenu.Item value="Codespaces" selected={'Codespaces' === selectedItem} disabled>
          Codespaces
        </ActionMenu.Item>
        <ActionMenu.Item value="CodeQL" selected={'CodeQL' === selectedItem}>
          CodeQL
        </ActionMenu.Item>
      </ActionMenu.Overlay>
    </ActionMenu>
  )
}

const possibleKeysToUnicode = {
  arrowup: `&#x2191;`,
  arrowdown: `&#x2193;`,
  enter: `&#x23CE;`,
  escape: `&#x238B;`,
  tab: '&#x21E5;',
  none: ''
}

export const KeyboardNavigation = () => {
  const [selectedItem, setSelectedItem] = React.useState('Copilot')

  return (
    <Stack direction="horizontal" gap="spacious" alignItems="flex-start">
      <ActionMenu onSelect={newValue => setSelectedItem(newValue)}>
        <ActionMenu.Button aria-label="GitHub feature">{selectedItem}</ActionMenu.Button>
        <ActionMenu.Overlay>
          <ActionMenu.Item
            value="Copilot"
            selected={'Copilot' === selectedItem}
            data-testid={`${ActionMenu.testIds.item}-1`}
          >
            Copilot
          </ActionMenu.Item>
          <ActionMenu.Item
            value="Codespaces"
            selected={'Codespaces' === selectedItem}
            data-testid={`${ActionMenu.testIds.item}-2`}
          >
            Codespaces
          </ActionMenu.Item>
          <ActionMenu.Item
            value="CodeQL"
            selected={'CodeQL' === selectedItem}
            data-testid={`${ActionMenu.testIds.item}-3`}
          >
            CodeQL
          </ActionMenu.Item>
        </ActionMenu.Overlay>
      </ActionMenu>
      <div className={styles.StoryInfo}>
        <Stack direction="vertical" alignItems="flex-start" justifyContent="flex-start">
          <Heading as="h6">WAI-ARIA keyboard support</Heading>
          <OrderedList>
            <OrderedList.Item>Tab focusses menu button</OrderedList.Item>
            <OrderedList.Item>Enter / space opens menu, with active focus on first menu item</OrderedList.Item>
            <OrderedList.Item>Down arrow navigates forward through children</OrderedList.Item>
            <OrderedList.Item>Up arrow navigates backwards through children</OrderedList.Item>
            <OrderedList.Item>Escape closes the menu with focus returned to the menu button</OrderedList.Item>
          </OrderedList>
          <Text as="p" size="200" weight="medium">
            Active key press:
          </Text>
          <Text as="p" id="active-key" className={styles.ActiveKey} size="400" weight="medium" />
        </Stack>
      </div>
    </Stack>
  )
}
KeyboardNavigation.storyName = 'Keyboard navigation (autoplays)'
KeyboardNavigation.play = async ({canvasElement}) => {
  const activeKeyEl = document.getElementById('active-key')

  activeKeyEl ? (activeKeyEl.style.visibility = 'hidden') : null
  const canvas = within(canvasElement)
  const button = canvas.getByRole('button')
  const delay = async (ms = 1000) => await new Promise(resolve => setTimeout(resolve, ms))
  // eslint-disable-next-line github/no-inner-html
  const showEntity = char => (activeKeyEl ? (activeKeyEl.innerHTML = char) : null)

  showEntity(possibleKeysToUnicode['none'])

  await delay()

  activeKeyEl ? (activeKeyEl.style.visibility = 'visible') : null
  showEntity(possibleKeysToUnicode['tab'])

  userEvent.tab()
  expect(document.activeElement).toBe(button)

  await delay()
  showEntity(possibleKeysToUnicode['enter'])
  await userEvent.keyboard('{enter}')
  await waitFor(() => expect(canvas.getByRole('menu')).toBeVisible())

  const firstItem = canvas.getByTestId(`${ActionMenu.testIds.item}-1`)
  const secondItem = canvas.getByTestId(`${ActionMenu.testIds.item}-2`)
  const lastItem = canvas.getByTestId(`${ActionMenu.testIds.item}-3`)

  expect(document.activeElement).toBe(firstItem)
  await delay()

  for (let i = 0; i < 2; i++) {
    showEntity(possibleKeysToUnicode['arrowdown'])
    userEvent.keyboard('{arrowdown}')
    const currentItem = canvas.getByTestId(`${ActionMenu.testIds.item}-${i + 2}`)
    await waitFor(() => currentItem)
    expect(document.activeElement).toBe(currentItem)
    await waitFor(() => currentItem)
    await delay()
  }

  userEvent.keyboard('{arrowdown}')
  expect(document.activeElement).toBe(firstItem) // loop back to first item

  await delay()

  showEntity(possibleKeysToUnicode['arrowup'])
  userEvent.keyboard('{arrowup}')
  expect(document.activeElement).toBe(lastItem)

  await delay()
  userEvent.keyboard('{arrowup}')
  expect(document.activeElement).toBe(secondItem)

  await delay()
  userEvent.keyboard('{arrowup}')
  expect(document.activeElement).toBe(firstItem)

  await delay()
  showEntity(possibleKeysToUnicode['escape'])
  userEvent.keyboard('{escape}')
  expect(document.activeElement).toBe(button)

  await delay()
  showEntity(possibleKeysToUnicode['none'])
  activeKeyEl ? (activeKeyEl.style.visibility = 'hidden') : null
}
