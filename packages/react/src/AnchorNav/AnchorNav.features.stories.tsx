import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {expect, userEvent, waitFor, within} from 'storybook/test'
import {useTranslation} from 'react-i18next'
import {MINIMAL_VIEWPORTS} from 'storybook/viewport'

import {AnchorNav, AnchorNavProps} from '.'
import {Heading, SubNav, Text} from '../'
import {RedlineBackground} from '../component-helpers'
import styles from './AnchorNav.stories.module.css'

const meta = {
  title: 'Components/AnchorNav/Features',
  component: AnchorNav,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AnchorNav>

export default meta
type Story = StoryObj<AnchorNavProps>

export const FewerAnchorLinks: Story = {
  name: 'Fewer anchor links',
  render: function RenderFewerAnchorLinks(args) {
    const {t: translate} = useTranslation('AnchorNav')
    const sections = ['overview', 'features', 'pricing']

    return (
      <>
        <AnchorNav
          {...args}
          menuLabels={{
            activeLabel: translate('active_label'),
            navigationLabel: translate('navigation_label'),
            overflowMenuLabel: translate('overflow_menu_label'),
            ...args.menuLabels,
          }}
        >
          {sections.map(section => (
            <AnchorNav.Link key={section} href={`#${section}`} target="_self">
              {translate(section)}
            </AnchorNav.Link>
          ))}
          <AnchorNav.Action href="#" target="_self">
            {translate('sign_up')}
          </AnchorNav.Action>
        </AnchorNav>
        {sections.map(section => (
          <section key={section} id={section} className={styles.section}>
            <Heading as="h2" size="5">
              {translate(section)}
            </Heading>
            <Text as="p">{translate('section_body')}</Text>
          </section>
        ))}
      </>
    )
  },
}

export const WithSubNav: Story = {
  name: 'With SubNav',
  render: function RenderWithSubNav(args) {
    const {t: translate} = useTranslation('AnchorNav')
    const {t: translateSubNav} = useTranslation('SubNav')
    const sections = ['overview', 'features', 'security', 'pricing', 'faq']

    return (
      <>
        <div className={styles.subNavContainer}>
          <SubNav
            menuLabels={{
              menuLabel: translateSubNav('menu_label'),
              closeLabel: translateSubNav('close_label'),
              activeLabel: translateSubNav('active_label'),
              closeActiveLabel: translateSubNav('close_active_label'),
              overflowMenuLabel: translateSubNav('overflow_menu_label'),
            }}
          >
            <SubNav.Heading href="#" target="_self">
              {translateSubNav('ai')}
            </SubNav.Heading>
            <SubNav.Link href="#" target="_self" aria-current="page">
              {translateSubNav('copilot_in_vs_code')}
            </SubNav.Link>
            <SubNav.Link href="#" target="_self">
              {translateSubNav('agents_on_github')}
            </SubNav.Link>
            <SubNav.Link href="#" target="_self">
              {translateSubNav('copilot_cli')}
            </SubNav.Link>
            <SubNav.Action href="#" target="_self">
              {translate('sign_up')}
            </SubNav.Action>
          </SubNav>
        </div>
        <AnchorNav
          {...args}
          menuLabels={{
            activeLabel: translate('active_label'),
            navigationLabel: translate('navigation_label'),
            overflowMenuLabel: translate('overflow_menu_label'),
            ...args.menuLabels,
          }}
        >
          {sections.map(section => (
            <AnchorNav.Link key={section} href={`#${section}`} target="_self">
              {translate(section)}
            </AnchorNav.Link>
          ))}
          <AnchorNav.Action href="#" target="_self">
            {translate('sign_up')}
          </AnchorNav.Action>
        </AnchorNav>
        {sections.map(section => (
          <section key={section} id={section} className={styles.section}>
            <Heading as="h2" size="5">
              {translate(section)}
            </Heading>
            <Text as="p">{translate('section_body')}</Text>
          </section>
        ))}
      </>
    )
  },
}

export const ShorterLabels: Story = {
  name: 'Shorter labels',
  render: function RenderShorterLabels(args) {
    const {t: translate} = useTranslation('AnchorNav')
    const sections = ['ai', 'docs', 'plans', 'teams', 'faq']

    return (
      <>
        <AnchorNav
          {...args}
          menuLabels={{
            activeLabel: translate('active_label'),
            navigationLabel: translate('navigation_label'),
            overflowMenuLabel: translate('overflow_menu_label'),
            ...args.menuLabels,
          }}
        >
          {sections.map(section => (
            <AnchorNav.Link key={section} href={`#${section}`} target="_self">
              {translate(section)}
            </AnchorNav.Link>
          ))}
          <AnchorNav.Action href="#" target="_self">
            {translate('sign_up')}
          </AnchorNav.Action>
        </AnchorNav>
        {sections.map(section => (
          <section key={section} id={section} className={styles.section}>
            <Heading as="h2" size="5">
              {translate(section)}
            </Heading>
            <Text as="p">{translate('section_body')}</Text>
          </section>
        ))}
      </>
    )
  },
}

export const LongerLabels: Story = {
  name: 'Longer labels',
  render: function RenderLongerLabels(args) {
    const {t: translate} = useTranslation('AnchorNav')
    const sections = ['supply_chain_security', 'code_review', 'continuous_integration']

    return (
      <>
        <AnchorNav
          {...args}
          menuLabels={{
            activeLabel: translate('active_label'),
            navigationLabel: translate('navigation_label'),
            overflowMenuLabel: translate('overflow_menu_label'),
            ...args.menuLabels,
          }}
        >
          {sections.map(section => (
            <AnchorNav.Link key={section} href={`#${section}`} target="_self">
              {translate(section)}
            </AnchorNav.Link>
          ))}
          <AnchorNav.Action href="#" target="_self">
            {translate('get_started')}
          </AnchorNav.Action>
        </AnchorNav>
        {sections.map(section => (
          <section key={section} id={section} className={styles.section}>
            <Heading as="h2" size="5">
              {translate(section)}
            </Heading>
            <Text as="p">{translate('section_body')}</Text>
          </section>
        ))}
      </>
    )
  },
}

export const WithoutAction: Story = {
  name: 'Without action',
  render: function RenderWithoutAction(args) {
    const {t: translate} = useTranslation('AnchorNav')
    const sections = ['overview', 'features', 'security', 'pricing', 'faq']

    return (
      <>
        <AnchorNav
          {...args}
          menuLabels={{
            activeLabel: translate('active_label'),
            navigationLabel: translate('navigation_label'),
            overflowMenuLabel: translate('overflow_menu_label'),
            ...args.menuLabels,
          }}
        >
          {sections.map(section => (
            <AnchorNav.Link key={section} href={`#${section}`} target="_self">
              {translate(section)}
            </AnchorNav.Link>
          ))}
        </AnchorNav>
        {sections.map(section => (
          <section key={section} id={section} className={styles.section}>
            <Heading as="h2" size="5">
              {translate(section)}
            </Heading>
            <Text as="p">{translate('section_body')}</Text>
          </section>
        ))}
      </>
    )
  },
}

export const MaximumLinks: Story = {
  name: 'Maximum links',
  render: function RenderMaximumLinks(args) {
    const {t: translate} = useTranslation('AnchorNav')
    const sections = [
      'overview',
      'features',
      'security',
      'integrations',
      'pricing',
      'customers',
      'resources',
      'support',
      'faq',
    ]

    return (
      <>
        <AnchorNav
          {...args}
          menuLabels={{
            activeLabel: translate('active_label'),
            navigationLabel: translate('navigation_label'),
            overflowMenuLabel: translate('overflow_menu_label'),
            ...args.menuLabels,
          }}
        >
          {sections.map(section => (
            <AnchorNav.Link key={section} href={`#${section}`} target="_self">
              {translate(section)}
            </AnchorNav.Link>
          ))}
          <AnchorNav.Action href="#" target="_self">
            {translate('sign_up')}
          </AnchorNav.Action>
        </AnchorNav>
        {sections.map(section => (
          <section key={section} id={section} className={styles.section}>
            <Heading as="h2" size="5">
              {translate(section)}
            </Heading>
            <Text as="p">{translate('section_body')}</Text>
          </section>
        ))}
      </>
    )
  },
}

export const MaximumLinksLocalizedTablet: Story = {
  name: 'Maximum links (localized)',
  parameters: {
    viewport: {
      options: MINIMAL_VIEWPORTS,
    },
  },
  globals: {
    viewport: {value: 'tablet'},
    locale: 'de',
  },
  render: function RenderMaximumLinksLocalized(args) {
    const {t: translate} = useTranslation('AnchorNav')
    const sections = [
      'overview',
      'features',
      'security',
      'integrations',
      'pricing',
      'customers',
      'resources',
      'support',
      'faq',
    ]

    return (
      <>
        <AnchorNav
          {...args}
          menuLabels={{
            activeLabel: translate('active_label'),
            navigationLabel: translate('navigation_label'),
            overflowMenuLabel: translate('overflow_menu_label'),
            ...args.menuLabels,
          }}
        >
          {sections.map(section => (
            <AnchorNav.Link key={section} href={`#${section}`} target="_self">
              {translate(section)}
            </AnchorNav.Link>
          ))}
          <AnchorNav.Action href="#" target="_self">
            {translate('sign_up')}
          </AnchorNav.Action>
        </AnchorNav>
        {sections.map(section => (
          <section key={section} id={section} className={styles.section}>
            <Heading as="h2" size="5">
              {translate(section)}
            </Heading>
            <Text as="p">{translate('section_body')}</Text>
          </section>
        ))}
      </>
    )
  },
}

export const OverflowMenu: Story = {
  name: 'Overflow menu',
  parameters: {
    viewport: {
      options: MINIMAL_VIEWPORTS,
    },
  },
  globals: {
    viewport: {value: 'desktop'},
  },
  render: function RenderOverflowMenu(args) {
    const {t: translate} = useTranslation('AnchorNav')
    const sections = [
      'overview',
      'supply_chain_security',
      'code_review',
      'continuous_integration',
      'enterprise_administration',
      'developer_productivity',
      'pricing',
      'resources',
      'faq',
    ]

    return (
      <>
        <AnchorNav
          {...args}
          menuLabels={{
            activeLabel: translate('active_label'),
            navigationLabel: translate('navigation_label'),
            overflowMenuLabel: translate('overflow_menu_label'),
            ...args.menuLabels,
          }}
        >
          {sections.map(section => (
            <AnchorNav.Link key={section} href={`#${section}`} target="_self">
              {translate(section)}
            </AnchorNav.Link>
          ))}
          <AnchorNav.Action href="#" target="_self">
            {translate('get_started')}
          </AnchorNav.Action>
        </AnchorNav>
        {sections.map(section => (
          <section key={section} id={section} className={styles.section}>
            <Heading as="h2" size="5">
              {translate(section)}
            </Heading>
            <Text as="p">{translate('section_body')}</Text>
          </section>
        ))}
      </>
    )
  },
}

export const OverflowMenuOpen: Story = {
  name: 'Overflow menu open',
  parameters: {
    axe: {waitForPlay: true},
    viewport: {
      options: MINIMAL_VIEWPORTS,
    },
  },
  globals: {
    viewport: {value: 'desktop'},
  },
  render: function RenderOverflowMenuOpen(args) {
    const {t: translate} = useTranslation('AnchorNav')
    const sections = [
      'overview',
      'supply_chain_security',
      'code_review',
      'continuous_integration',
      'enterprise_administration',
      'developer_productivity',
      'pricing',
      'resources',
      'faq',
    ]

    return (
      <>
        <AnchorNav
          {...args}
          menuLabels={{
            activeLabel: translate('active_label'),
            navigationLabel: translate('navigation_label'),
            overflowMenuLabel: translate('overflow_menu_label'),
            ...args.menuLabels,
          }}
        >
          {sections.map(section => (
            <AnchorNav.Link key={section} href={`#${section}`} target="_self">
              {translate(section)}
            </AnchorNav.Link>
          ))}
          <AnchorNav.Action href="#" target="_self">
            {translate('get_started')}
          </AnchorNav.Action>
        </AnchorNav>
        {/* A single section keeps the page within the viewport, so full-page screenshots don't resize it and close the menu. */}
        <section id={sections[0]} className={styles.section}>
          <Heading as="h2" size="5">
            {translate(sections[0])}
          </Heading>
          <Text as="p">{translate('section_body')}</Text>
        </section>
      </>
    )
  },
  play: async ({canvasElement}) => {
    canvasElement.removeAttribute('data-axe-ready')
    const canvas = within(canvasElement)
    await canvasElement.ownerDocument.fonts.ready
    // Waits for the story's translations to load before the nav renders.
    const overflowButton = await canvas.findByTestId(AnchorNav.testIds.overflowButton)
    await waitFor(() => {
      expect(overflowButton).toBeVisible()
      expect(overflowButton).toHaveAttribute('popovertarget')
    })
    await userEvent.click(overflowButton)

    const overflowMenu = canvas.getByTestId(AnchorNav.testIds.overflowMenu)
    const nav = canvas.getByRole('navigation')
    await waitFor(() => {
      expect(overflowButton).toHaveAttribute('aria-expanded', 'true')
      expect(overflowMenu.matches(':popover-open')).toBe(true)
      expect(within(overflowMenu).getAllByRole('link').length).toBeGreaterThan(0)
      // The menu's top border sits on the bar's bottom border.
      const navBorderTop = nav.getBoundingClientRect().bottom - parseFloat(getComputedStyle(nav).borderBlockEndWidth)
      expect(overflowMenu.getBoundingClientRect().top).toBeCloseTo(navBorderTop, 0)
    })
    canvasElement.setAttribute('data-axe-ready', 'true')
  },
}

export const NarrowView: Story = {
  name: 'Narrow view, menu closed (mobile)',
  globals: {
    viewport: {value: 'iphonexr'},
  },
  render: function RenderNarrowView(args) {
    const {t: translate} = useTranslation('AnchorNav')
    const sections = ['overview', 'features', 'security', 'pricing', 'faq']

    return (
      <>
        <AnchorNav
          {...args}
          menuLabels={{
            activeLabel: translate('active_label'),
            navigationLabel: translate('navigation_label'),
            overflowMenuLabel: translate('overflow_menu_label'),
            ...args.menuLabels,
          }}
        >
          {sections.map(section => (
            <AnchorNav.Link key={section} href={`#${section}`} target="_self">
              {translate(section)}
            </AnchorNav.Link>
          ))}
          <AnchorNav.Action href="#" target="_self">
            {translate('sign_up')}
          </AnchorNav.Action>
        </AnchorNav>
        {sections.map(section => (
          <section key={section} id={section} className={styles.section}>
            <Heading as="h2" size="5">
              {translate(section)}
            </Heading>
            <Text as="p">{translate('section_body')}</Text>
          </section>
        ))}
      </>
    )
  },
}

export const NarrowViewMenuOpen: Story = {
  name: 'Narrow view, menu open (mobile)',
  globals: {
    viewport: {value: 'iphonexr'},
  },
  parameters: {
    axe: {
      timeout: 5000,
    },
  },
  render: function RenderNarrowViewMenuOpen(args) {
    const {t: translate} = useTranslation('AnchorNav')
    const sections = ['overview', 'features', 'security', 'pricing', 'faq']

    return (
      <>
        <AnchorNav
          {...args}
          menuLabels={{
            activeLabel: translate('active_label'),
            navigationLabel: translate('navigation_label'),
            overflowMenuLabel: translate('overflow_menu_label'),
            ...args.menuLabels,
          }}
        >
          {sections.map(section => (
            <AnchorNav.Link key={section} href={`#${section}`} target="_self">
              {translate(section)}
            </AnchorNav.Link>
          ))}
          <AnchorNav.Action href="#" target="_self">
            {translate('sign_up')}
          </AnchorNav.Action>
        </AnchorNav>
        {sections.map(section => (
          <section key={section} id={section} className={styles.section}>
            <Heading as="h2" size="5">
              {translate(section)}
            </Heading>
            <Text as="p">{translate('section_body')}</Text>
          </section>
        ))}
      </>
    )
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)
    await userEvent.click(await canvas.findByTestId(AnchorNav.testIds.menuButton))
    await expect(canvas.getByTestId(AnchorNav.testIds.menuLinks)).toBeVisible()
  },
}

export const NarrowViewMaximumLinksMenuOpen: Story = {
  name: 'Narrow view, maximum links, menu open (mobile)',
  globals: {
    viewport: {value: 'iphonexr'},
  },
  parameters: {
    axe: {
      timeout: 5000,
    },
  },
  render: function RenderNarrowViewMaximumLinksMenuOpen(args) {
    const {t: translate} = useTranslation('AnchorNav')
    const sections = [
      'overview',
      'features',
      'security',
      'integrations',
      'pricing',
      'customers',
      'resources',
      'support',
      'faq',
    ]

    return (
      <>
        <AnchorNav
          {...args}
          menuLabels={{
            activeLabel: translate('active_label'),
            navigationLabel: translate('navigation_label'),
            overflowMenuLabel: translate('overflow_menu_label'),
            ...args.menuLabels,
          }}
        >
          {sections.map(section => (
            <AnchorNav.Link key={section} href={`#${section}`} target="_self">
              {translate(section)}
            </AnchorNav.Link>
          ))}
          <AnchorNav.Action href="#" target="_self">
            {translate('sign_up')}
          </AnchorNav.Action>
        </AnchorNav>
        {sections.map(section => (
          <section key={section} id={section} className={styles.section}>
            <Heading as="h2" size="5">
              {translate(section)}
            </Heading>
            <Text as="p">{translate('section_body')}</Text>
          </section>
        ))}
      </>
    )
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)
    await userEvent.click(await canvas.findByTestId(AnchorNav.testIds.menuButton))
    await expect(canvas.getByTestId(AnchorNav.testIds.menuLinks)).toBeVisible()
  },
}

export const NarrowViewActionFolded: Story = {
  name: 'Narrow view, action folded (mobile)',
  globals: {
    viewport: {value: 'iphonexr'},
  },
  render: function RenderNarrowViewActionFolded(args) {
    const {t: translate} = useTranslation('AnchorNav')
    const sections = ['supply_chain_security', 'code_review', 'continuous_integration', 'developer_productivity']

    return (
      <>
        <AnchorNav
          {...args}
          menuLabels={{
            activeLabel: translate('active_label'),
            navigationLabel: translate('navigation_label'),
            overflowMenuLabel: translate('overflow_menu_label'),
            ...args.menuLabels,
          }}
        >
          {sections.map(section => (
            <AnchorNav.Link key={section} href={`#${section}`} target="_self">
              {translate(section)}
            </AnchorNav.Link>
          ))}
          <AnchorNav.Action href="#" target="_self">
            {translate('start_free_trial')}
          </AnchorNav.Action>
        </AnchorNav>
        {sections.map(section => (
          <section key={section} id={section} className={styles.section}>
            <Heading as="h2" size="5">
              {translate(section)}
            </Heading>
            <Text as="p">{translate('section_body')}</Text>
          </section>
        ))}
      </>
    )
  },
}

export const RegularView: Story = {
  name: 'Regular view (tablet)',
  globals: {
    viewport: {value: 'ipad10p'},
  },
  render: function RenderRegularView(args) {
    const {t: translate} = useTranslation('AnchorNav')
    const sections = ['overview', 'features', 'security', 'pricing', 'faq']

    return (
      <>
        <AnchorNav
          {...args}
          menuLabels={{
            activeLabel: translate('active_label'),
            navigationLabel: translate('navigation_label'),
            overflowMenuLabel: translate('overflow_menu_label'),
            ...args.menuLabels,
          }}
        >
          {sections.map(section => (
            <AnchorNav.Link key={section} href={`#${section}`} target="_self">
              {translate(section)}
            </AnchorNav.Link>
          ))}
          <AnchorNav.Action href="#" target="_self">
            {translate('sign_up')}
          </AnchorNav.Action>
        </AnchorNav>
        {sections.map(section => (
          <section key={section} id={section} className={styles.section}>
            <Heading as="h2" size="5">
              {translate(section)}
            </Heading>
            <Text as="p">{translate('section_body')}</Text>
          </section>
        ))}
      </>
    )
  },
}

export const RegularViewOverflowMenuLocalized: Story = {
  name: 'Regular view, localized overflow menu open (tablet)',
  parameters: {
    axe: {waitForPlay: true},
  },
  globals: {
    viewport: {value: 'ipad10p'},
    locale: 'de',
  },
  render: function RenderRegularViewOverflowMenuLocalized(args) {
    const {t: translate} = useTranslation('AnchorNav')
    const sections = [
      'overview',
      'features',
      'security',
      'integrations',
      'pricing',
      'customers',
      'resources',
      'support',
      'faq',
    ]

    return (
      <>
        <AnchorNav
          {...args}
          menuLabels={{
            activeLabel: translate('active_label'),
            navigationLabel: translate('navigation_label'),
            overflowMenuLabel: translate('overflow_menu_label'),
            ...args.menuLabels,
          }}
        >
          {sections.map(section => (
            <AnchorNav.Link key={section} href={`#${section}`} target="_self">
              {translate(section)}
            </AnchorNav.Link>
          ))}
          <AnchorNav.Action href="#" target="_self">
            {translate('sign_up')}
          </AnchorNav.Action>
        </AnchorNav>
        {sections.map(section => (
          <section key={section} id={section} className={styles.section}>
            <Heading as="h2" size="5">
              {translate(section)}
            </Heading>
            <Text as="p">{translate('section_body')}</Text>
          </section>
        ))}
      </>
    )
  },
  play: async ({canvasElement}) => {
    canvasElement.removeAttribute('data-axe-ready')
    const canvas = within(canvasElement)
    await canvasElement.ownerDocument.fonts.ready
    // Waits for the story's translations to load before the nav renders.
    const overflowButton = await canvas.findByTestId(AnchorNav.testIds.overflowButton)
    await waitFor(() => {
      expect(overflowButton).toBeVisible()
      expect(overflowButton).toHaveAttribute('popovertarget')
    })
    await userEvent.click(overflowButton)

    const overflowMenu = canvas.getByTestId(AnchorNav.testIds.overflowMenu)
    const nav = canvas.getByRole('navigation')
    await waitFor(() => {
      expect(overflowButton).toHaveAttribute('aria-expanded', 'true')
      expect(overflowMenu.matches(':popover-open')).toBe(true)
      expect(within(overflowMenu).getAllByRole('link').length).toBeGreaterThan(0)
      // The menu's top border sits on the bar's bottom border.
      const navBorderTop = nav.getBoundingClientRect().bottom - parseFloat(getComputedStyle(nav).borderBlockEndWidth)
      expect(overflowMenu.getBoundingClientRect().top).toBeCloseTo(navBorderTop, 0)
    })
    canvasElement.setAttribute('data-axe-ready', 'true')
  },
}

export const HideUntilSticky: Story = {
  name: 'Hide until sticky',
  args: {
    hideUntilSticky: true,
  },
  render: function RenderHideUntilSticky(args) {
    const {t: translate} = useTranslation('AnchorNav')
    const sections = ['overview', 'features', 'security', 'pricing', 'faq']

    return (
      <>
        <RedlineBackground height={100} />
        <AnchorNav
          {...args}
          menuLabels={{
            activeLabel: translate('active_label'),
            navigationLabel: translate('navigation_label'),
            overflowMenuLabel: translate('overflow_menu_label'),
            ...args.menuLabels,
          }}
        >
          {sections.map(section => (
            <AnchorNav.Link key={section} href={`#${section}`} target="_self">
              {translate(section)}
            </AnchorNav.Link>
          ))}
          <AnchorNav.Action href="#" target="_self">
            {translate('sign_up')}
          </AnchorNav.Action>
        </AnchorNav>
        {sections.map(section => (
          <section key={section} id={section} className={styles.section}>
            <Heading as="h2" size="5">
              {translate(section)}
            </Heading>
            <Text as="p">{translate('section_body')}</Text>
          </section>
        ))}
      </>
    )
  },
}

export const AnchorNavPrimaryActions: Story = {
  name: 'With optional primary CTA',
  render: function RenderAnchorNavPrimaryActions(args) {
    const {t: translate} = useTranslation('AnchorNav')
    const sections = ['overview', 'features', 'pricing']

    return (
      <>
        <AnchorNav
          {...args}
          menuLabels={{
            activeLabel: translate('active_label'),
            navigationLabel: translate('navigation_label'),
            overflowMenuLabel: translate('overflow_menu_label'),
            ...args.menuLabels,
          }}
        >
          {sections.map(section => (
            <AnchorNav.Link key={section} href={`#${section}`} target="_self">
              {translate(section)}
            </AnchorNav.Link>
          ))}
          <AnchorNav.Action variant="primary" href="#" target="_self">
            {translate('get_started')}
          </AnchorNav.Action>
        </AnchorNav>
        {sections.map(section => (
          <section key={section} id={section} className={styles.section}>
            <Heading as="h2" size="5">
              {translate(section)}
            </Heading>
            <Text as="p">{translate('section_body')}</Text>
          </section>
        ))}
      </>
    )
  },
}
