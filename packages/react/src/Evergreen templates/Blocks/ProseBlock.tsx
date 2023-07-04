import React from 'react'
import {Grid, Prose, ProseProps} from '../..'

export type ProseBlockProps = {
  html: ProseProps['html']
}

export const ProseBlock = ({html}: ProseBlockProps) => {
  return (
    <Grid>
      <Grid.Column>
        <Prose html={html} />
      </Grid.Column>
    </Grid>
  )
}
