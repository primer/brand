import React from 'react'
import InlineCode from '@primer/gatsby-theme-doctocat/src/components/inline-code'

export function PropTableValues({
  values,
  addLineBreaks,
  commaSeparated,
  removeApostrophes,
}) {
  const valuesToRender = values.map((value) => {
    if (typeof value === 'string' && !removeApostrophes) {
      return <InlineCode key={value}>&apos;{value}&apos;</InlineCode>
    }
    return <InlineCode key={value}>{value}</InlineCode>
  })

  if (commaSeparated) {
    return (
      <>
        {valuesToRender.reduce((acc, curr) => [acc, ', ', curr])}
        {addLineBreaks && <br />}
      </>
    )
  }

  return (
    <>
      {valuesToRender.map((value) => {
        return (
          <React.Fragment key={value.key}>
            {value}
            {addLineBreaks && <br />}
          </React.Fragment>
        )
      })}
    </>
  )
}
