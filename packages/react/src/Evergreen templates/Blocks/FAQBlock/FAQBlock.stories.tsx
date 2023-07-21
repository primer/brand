import React from 'react'
import {Meta} from '@storybook/react'

import {FAQBlock} from './FAQBlock'

export default {
  title: 'Evergreen templates/Blocks/FAQ',
  component: FAQBlock,
} as Meta<typeof FAQBlock>

export const Default = () => (
  <FAQBlock
    items={[
      {
        question: "What's included in the GitHub for Startups offer?",
        answer:
          ' <p> All GitHub for Startups companies receive up to 20 seats of GitHub Enterprise for free for year one and 50% off year two. Learn more about the features and capabilities of GitHub Enterprise <a href="https://www.github.com" target="_blank" rel="noreferrer"> here </a> . </p>',
      },
      {
        question: 'Who is eligible to apply?',
        answer:
          ' <p>Startups who meet the following criteria are eligible to apply for the program:</p> <ol> <li> <Text size="300" variant="muted"> Must be associated with a current GitHub for Startups partner. </Text> </li> <li> <Text size="300" variant="muted"> Self-funded or funded (Seed-Series A) </Text> </li> <li> <Text size="300" variant="muted"> Not a current GitHub Enterprise customer </Text> </li> <li> <Text size="300" variant="muted"> Must not have previously received credits for GitHub Enterprise </Text> </li> </ol> ',
      },
      {
        question: 'What if my startup is not eligible? Are there other resources for me?',
        answer:
          ' <p> If you’re not currently eligible for the GitHub for Startups but would like to try GitHub Enterprise, please feel to sign up for a trial <a href="https://www.github.com" target="_blank" rel="noreferrer"> here </a> . </p> ',
      },
      {
        question: 'How can my organization become a GitHub for Startups partner?',
        answer:
          ' <p> Any investor, accelerator, or startup support organization is eligible to apply for the GitHub for Startups program. </p> <p> <a href="https://www.github.com" target="_blank" rel="noreferrer"> Apply here </a> . </p> ',
      },
    ]}
  />
)
