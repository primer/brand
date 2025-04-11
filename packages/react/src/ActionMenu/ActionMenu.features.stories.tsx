import {Meta} from '@storybook/react'
import React from 'react'
import {expect, userEvent, within, waitFor} from '@storybook/test'
import {ActionMenu, actionMenuOverlaySides, ActionMenuProps, ActionMenuSizes} from './ActionMenu'
import {countries} from '../test-utils/fixtures/data'
import {Heading, Stack, Text, OrderedList, Box, Grid, Section, ThemeProvider, Button, ButtonVariants, Hero} from '../'

import styles from './ActionMenu.stories.module.css'
import {VisualStudioCodeLogo} from '../fixtures/third-party-logos/VisualStudioCodeLogo'
import {VisualStudioLogo} from '../fixtures/third-party-logos/VisualStudioLogo'
import {JetBrainsLogo} from '../fixtures/third-party-logos/JetBrainsLogo'
import {NeoVimLogo} from '../fixtures/third-party-logos/NeoVimLogo'

export default {
  title: 'Components/ActionMenu/Features',
  component: ActionMenu,
} as Meta<typeof ActionMenu>

export const SingleSelection = () => {
  const [selectedItem, setSelectedItem] = React.useState('Copilot')

  return (
    <ActionMenu onSelect={newValue => setSelectedItem(newValue)} selectionVariant="single">
      <ActionMenu.Button>{selectedItem}</ActionMenu.Button>
      <ActionMenu.Overlay aria-label="GitHub features">
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

export const SingleSelectionSmallOpen = () => {
  const [selectedItem, setSelectedItem] = React.useState('Copilot')

  return (
    <ActionMenu size="small" onSelect={newValue => setSelectedItem(newValue)} selectionVariant="single" open>
      <ActionMenu.Button>{selectedItem}</ActionMenu.Button>
      <ActionMenu.Overlay aria-label="GitHub features">
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

export const SplitButtonMode = () => {
  /**
   * TODO: Only show examples for action menu button variants that are design approved
   */
  const filteredButtonsVariants = ButtonVariants.filter(variant => !['accent', 'secondary'].includes(variant))

  return (
    <>
      <ThemeProvider colorMode="light">
        <Section backgroundColor="subtle">
          <Stack direction="vertical">
            {filteredButtonsVariants.map(variant => (
              <Stack
                direction={{
                  narrow: 'vertical',
                  regular: 'horizontal',
                  wide: 'horizontal',
                }}
                gap={{
                  narrow: 'condensed',
                  regular: 'condensed',
                  wide: 112,
                }}
                key={variant}
              >
                {ActionMenuSizes.map(size => (
                  <ActionMenu mode="split-button" size={size} key={size}>
                    <ActionMenu.Button variant={variant} as="a" href="#vscode" leadingVisual={<VisualStudioCodeLogo />}>
                      Install Copilot in Visual Studio Code
                    </ActionMenu.Button>
                    <ActionMenu.Overlay aria-label="Alternative editors">
                      <ActionMenu.Item as="a" href="#0" leadingVisual={<VisualStudioCodeLogo />}>
                        Visual Studio Code
                      </ActionMenu.Item>
                      <ActionMenu.Item as="a" href="#1" leadingVisual={<VisualStudioLogo />}>
                        Visual Studio
                      </ActionMenu.Item>
                      <ActionMenu.Item as="a" href="#2" leadingVisual={<NeoVimLogo />}>
                        Neovim
                      </ActionMenu.Item>
                      <ActionMenu.Item as="a" href="#3" leadingVisual={<JetBrainsLogo />}>
                        JetBrains
                      </ActionMenu.Item>
                    </ActionMenu.Overlay>
                  </ActionMenu>
                ))}
              </Stack>
            ))}
          </Stack>
        </Section>
      </ThemeProvider>
      <ThemeProvider colorMode="dark">
        <Section backgroundColor="subtle">
          <Stack direction="vertical">
            {filteredButtonsVariants.map(variant => (
              <Stack
                direction={{
                  narrow: 'vertical',
                  regular: 'horizontal',
                  wide: 'horizontal',
                }}
                gap={{
                  narrow: 'condensed',
                  regular: 'condensed',
                  wide: 112,
                }}
                key={variant}
              >
                {ActionMenuSizes.map(size => (
                  <ActionMenu mode="split-button" size={size} key={size}>
                    <ActionMenu.Button variant={variant} as="a" href="#vscode" leadingVisual={<VisualStudioCodeLogo />}>
                      Install Copilot in Visual Studio Code
                    </ActionMenu.Button>
                    <ActionMenu.Overlay aria-label="Alternative editors">
                      <ActionMenu.Item as="a" href="#0" leadingVisual={<VisualStudioCodeLogo />}>
                        Visual Studio Code
                      </ActionMenu.Item>
                      <ActionMenu.Item as="a" href="#1" leadingVisual={<VisualStudioLogo />}>
                        Visual Studio
                      </ActionMenu.Item>
                      <ActionMenu.Item as="a" href="#2" leadingVisual={<NeoVimLogo />}>
                        Neovim
                      </ActionMenu.Item>
                      <ActionMenu.Item as="a" href="#3" leadingVisual={<JetBrainsLogo />}>
                        JetBrains
                      </ActionMenu.Item>
                    </ActionMenu.Overlay>
                  </ActionMenu>
                ))}
              </Stack>
            ))}
          </Stack>
        </Section>
      </ThemeProvider>
    </>
  )
}

export const SplitButtonModeInHero = () => {
  return (
    <ThemeProvider colorMode="dark">
      <Section backgroundColor="subtle">
        <Hero
          align="center"
          trailingComponent={() => (
            <Stack direction={{narrow: 'vertical', regular: 'horizontal'}} gap="condensed" padding="none">
              <ActionMenu mode="split-button">
                <ActionMenu.Button variant="primary" as="a" href="#vscode" leadingVisual={<VisualStudioCodeLogo />}>
                  Install Copilot in Visual Studio Code
                </ActionMenu.Button>
                <ActionMenu.Overlay aria-label="Alternative editors">
                  <ActionMenu.Item as="a" href="#0" leadingVisual={<VisualStudioCodeLogo />}>
                    Visual Studio Code
                  </ActionMenu.Item>
                  <ActionMenu.Item as="a" href="#1" leadingVisual={<VisualStudioLogo />}>
                    Visual Studio
                  </ActionMenu.Item>
                  <ActionMenu.Item as="a" href="#2" leadingVisual={<NeoVimLogo />}>
                    Neovim
                  </ActionMenu.Item>
                  <ActionMenu.Item as="a" href="#3" leadingVisual={<JetBrainsLogo />}>
                    JetBrains
                  </ActionMenu.Item>
                </ActionMenu.Overlay>
              </ActionMenu>
              <Button variant="secondary">See plans & pricing</Button>
            </Stack>
          )}
        >
          <Hero.Label>Label</Hero.Label>
          <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
          <Hero.Description>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
            turpis felis nam pulvinar risus elementum.
          </Hero.Description>
        </Hero>
      </Section>
    </ThemeProvider>
  )
}

export const InStack = () => {
  const [selectedOne, setSelectedOne] = React.useState('Copilot')
  const [selectedTwo, setSelectedTwo] = React.useState('Afghanistan')

  return (
    <Stack direction="horizontal">
      <ActionMenu onSelect={newValue => setSelectedOne(newValue)} selectionVariant="single">
        <ActionMenu.Button>{selectedOne}</ActionMenu.Button>
        <ActionMenu.Overlay aria-label="GitHub features">
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
        <ActionMenu.Button>{selectedTwo}</ActionMenu.Button>
        <ActionMenu.Overlay aria-label="Countries">
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

export const Sizes = () => {
  const sizes = ['small', 'medium'] as ActionMenuProps['size'][]

  return (
    <Stack direction="horizontal" alignItems="center" gap={112}>
      {sizes.map(size => (
        <ActionMenu key={size?.toString()} size={size}>
          <ActionMenu.Button>{size}</ActionMenu.Button>
          <ActionMenu.Overlay aria-label="GitHub features">
            <ActionMenu.Item value="Copilot">Copilot</ActionMenu.Item>
            <ActionMenu.Item value="Copilot">Advanced Security</ActionMenu.Item>
          </ActionMenu.Overlay>
        </ActionMenu>
      ))}
    </Stack>
  )
}

export const OpenByDefault = () => {
  const [selectedItem, setSelectedItem] = React.useState('Copilot')

  return (
    <ActionMenu onSelect={newValue => setSelectedItem(newValue)} selectionVariant="single" open>
      <ActionMenu.Button>{selectedItem}</ActionMenu.Button>
      <ActionMenu.Overlay aria-label="GitHub features">
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

export const LongerButtonText = () => {
  const [selected, setSelected] = React.useState('Europe, Middle East and Africa')

  return (
    <ActionMenu onSelect={newValue => setSelected(newValue)} selectionVariant="single">
      <ActionMenu.Button>{selected}</ActionMenu.Button>
      <ActionMenu.Overlay aria-label="GitHub features">
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
      <ActionMenu.Button>{selectedItem}</ActionMenu.Button>
      <ActionMenu.Overlay aria-label="GitHub features">
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
      <ActionMenu.Button>{selectedItem}</ActionMenu.Button>
      <ActionMenu.Overlay aria-label="Countries">
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
      <ActionMenu onSelect={newValue => setSelectedItem(newValue)} selectionVariant="single" menuAlignment="end" open>
        <ActionMenu.Button>{selectedItem}</ActionMenu.Button>
        <ActionMenu.Overlay aria-label="Countries">
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
      <ActionMenu.Button>Open menu</ActionMenu.Button>
      <ActionMenu.Overlay aria-label="GitHub features">
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

export const AnchoredPositioning = () => {
  return (
    <Box style={{height: '90dvh', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
      <ActionMenu selectionVariant="single" open>
        <ActionMenu.Button>Open menu</ActionMenu.Button>
        <ActionMenu.Overlay aria-label="GitHub features">
          <ActionMenu.Item value="Copilot">Copilot</ActionMenu.Item>
          <ActionMenu.Item value="Codespaces">Codespaces</ActionMenu.Item>
          <ActionMenu.Item value="CodeQL">CodeQL</ActionMenu.Item>
        </ActionMenu.Overlay>
      </ActionMenu>
    </Box>
  )
}

export const AnchoredPositioningOverrides = () => {
  return (
    <Grid enableOverlay>
      {actionMenuOverlaySides.map(side => (
        <Grid.Column key={side} span={{large: 4}}>
          <Stack direction="vertical" padding="condensed">
            <ActionMenu selectionVariant="single" menuSide={side}>
              <ActionMenu.Button>Open menu</ActionMenu.Button>
              <ActionMenu.Overlay aria-label="GitHub features">
                <ActionMenu.Item value="Copilot">Copilot</ActionMenu.Item>
                <ActionMenu.Item value="Codespaces">Codespaces</ActionMenu.Item>
                <ActionMenu.Item value="CodeQL">CodeQL</ActionMenu.Item>
              </ActionMenu.Overlay>
            </ActionMenu>
            <Text>{side}</Text>
          </Stack>
        </Grid.Column>
      ))}
    </Grid>
  )
}

export const DisabledItem = () => {
  const [selectedItem, setSelectedItem] = React.useState('Copilot')

  return (
    <ActionMenu onSelect={newValue => setSelectedItem(newValue)} selectionVariant="single" open>
      <ActionMenu.Button>{selectedItem}</ActionMenu.Button>
      <ActionMenu.Overlay aria-label="GitHub features">
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
  none: '',
}

export const KeyboardNavigation = () => {
  const [selectedItem, setSelectedItem] = React.useState('Copilot')

  return (
    <Stack direction="horizontal" gap="spacious" alignItems="flex-start">
      <ActionMenu onSelect={newValue => setSelectedItem(newValue)} selectionVariant="single">
        <ActionMenu.Button>{selectedItem}</ActionMenu.Button>
        <ActionMenu.Overlay aria-label="GitHub features">
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
  // Delays are only used for visual purposes to make the test easier to follow
  const delay = async (ms = 1000) => await new Promise(resolve => setTimeout(resolve, ms))

  const pressKey = async (key: string) => {
    const activeKeyEl = document.getElementById('active-key')

    if (!activeKeyEl) {
      return
    }

    // eslint-disable-next-line github/no-inner-html
    activeKeyEl.innerHTML = possibleKeysToUnicode[key]

    if (key === 'tab') {
      await userEvent.tab()
      return
    }

    await userEvent.keyboard(`{${key}}`)
  }

  const canvas = within(canvasElement)
  const button = canvas.getByRole('button')

  await delay()

  await pressKey('tab')
  expect(document.activeElement).toBe(button)
  await delay()

  await pressKey('enter')
  await waitFor(() => expect(canvas.getByRole('menu')).toBeVisible())
  await delay()

  const menuItems = canvas.getAllByRole('menuitemradio')

  expect(document.activeElement).toBe(menuItems[0])

  await pressKey('arrowdown')
  expect(document.activeElement).toBe(menuItems[1])
  await delay()

  await pressKey('arrowdown')
  expect(document.activeElement).toBe(menuItems[2])
  await delay()

  await pressKey('arrowdown')
  expect(document.activeElement).toBe(menuItems[0])
  await delay()

  await pressKey('arrowup')
  expect(document.activeElement).toBe(menuItems[2])
  await delay()

  await pressKey('arrowup')
  expect(document.activeElement).toBe(menuItems[1])
  await delay()

  await pressKey('arrowup')
  expect(document.activeElement).toBe(menuItems[0])
  await delay()

  await pressKey('escape')
  expect(document.activeElement).toBe(button)
}
