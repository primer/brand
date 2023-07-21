import React from 'react'
import {Grid, FAQ, Prose, ProseProps} from '../../..'

type FAQItem = {
  question: string
  answer: ProseProps['html']
}

export type FAQBlockProps = {
  items: FAQItem[]
}

export const FAQBlock = ({items}: FAQBlockProps) => {
  return (
    <Grid>
      <Grid.Column>
        <>
          <FAQ className="custom-colors">
            <FAQ.Heading>Frequently asked questions</FAQ.Heading>
            {items.map(({question, answer}, index) => (
              <FAQ.Item key={index}>
                <FAQ.Question>{question}</FAQ.Question>
                <FAQ.Answer>
                  <Prose html={answer} />
                </FAQ.Answer>
              </FAQ.Item>
            ))}
          </FAQ>
        </>
      </Grid.Column>
    </Grid>
  )
}
