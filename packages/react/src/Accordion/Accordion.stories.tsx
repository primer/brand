import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {Accordion, AccordionHeadingProps, AccordionRootProps, AccordionToggleColors} from '.'
import {useTranslation} from 'react-i18next'

type AccordionStoryProps = AccordionRootProps & Pick<AccordionHeadingProps, 'toggleColor'>

const meta: Meta<AccordionStoryProps> = {
  title: 'Components/Accordion',
  component: Accordion,
  args: {
    open: false,
    variant: 'default',
    disableAnimation: false,
    toggleColor: undefined,
  },
  argTypes: {
    open: {
      name: 'Open',
      control: {
        type: 'boolean',
      },
    },
    variant: {
      name: 'Variant',
      options: ['default', 'emphasis'],
      control: {type: 'inline-radio'},
    },
    disableAnimation: {
      name: 'Disable animation',
      control: {
        type: 'boolean',
      },
    },
    toggleColor: {
      name: 'Toggle color',
      options: AccordionToggleColors,
      control: {type: 'select'},
    },
  },
}
export default meta

type Story = StoryObj<AccordionStoryProps>

export const Default: Story = {
  render: function Component({toggleColor, ...props}) {
    const {t} = useTranslation('Accordion')

    return (
      <Accordion {...props}>
        <Accordion.Heading toggleColor={toggleColor}>{t('heading')}</Accordion.Heading>
        <Accordion.Content>
          <p>{t('description')}</p>
          <p>{t('description')}</p>
        </Accordion.Content>
      </Accordion>
    )
  },
}
