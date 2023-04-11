import React from 'react'
import {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'
import {axe, toHaveNoViolations} from 'jest-axe'

import {Image} from './'

expect.extend(toHaveNoViolations)

describe('Image', () => {
  afterEach(cleanup)

  it('no a11y violations', async () => {
    const {container} = render(
      <Image src="https://source.unsplash.com/random" alt="" isPicture={false} aspectRatio={undefined} />
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should pass a custom class to the image when provided', async () => {
    const {container} = render(
      <Image
        src="https://source.unsplash.com/random"
        alt=""
        className="test"
        isPicture={false}
        aspectRatio={undefined}
      />
    )

    expect(container.querySelector('img.test')).toBeInTheDocument()
  })

  it('should return only an img element if no aspectRatio is provided and isPicture is false', async () => {
    const {container} = render(
      <Image src="https://source.unsplash.com/random" alt="" isPicture={false} aspectRatio={undefined} />
    )

    expect(container.querySelector('.Image-container')).not.toBeInTheDocument()
    expect(container.querySelector('span')).not.toBeInTheDocument()
    expect(container.querySelector('picture')).not.toBeInTheDocument()
    expect(container.querySelector('.Image')).toBeInTheDocument()
    expect(container.querySelector('img')).toBeInTheDocument()
  })

  it('should return an img element in a span tag if aspectRatio is provided and isPicture is false', async () => {
    const {container} = render(
      <Image src="https://source.unsplash.com/random" alt="" isPicture={false} aspectRatio={'1:1'} />
    )

    expect(container.querySelector('.Image-container')).toBeInTheDocument()
    expect(container.querySelector('span')).toBeInTheDocument()
    expect(container.querySelector('picture')).not.toBeInTheDocument()
    expect(container.querySelector('.Image')).toBeInTheDocument()
    expect(container.querySelector('img')).toBeInTheDocument()
  })

  it('should return an img element in a picture tag if aspectRatio is provided and isPicture is true', async () => {
    const {container} = render(
      <Image src="https://source.unsplash.com/random" alt="" isPicture={true} aspectRatio={'1:1'} />
    )

    expect(container.querySelector('.Image-container')).toBeInTheDocument()
    expect(container.querySelector('span')).not.toBeInTheDocument()
    expect(container.querySelector('picture')).toBeInTheDocument()
    expect(container.querySelector('.Image')).toBeInTheDocument()
    expect(container.querySelector('img')).toBeInTheDocument()
  })

  it('should have equal height and width if 1:1 ratio is set', async () => {
    const {container} = render(
      <Image src="https://source.unsplash.com/random" alt="" isPicture={false} aspectRatio={'1:1'} />
    )

    expect(container.getAttribute('width')).not.toEqual(0)
    expect(container.getAttribute('width')).toEqual(container.getAttribute('height'))
  })

  it('should create an aspect ratio based on a provided ratio array', async () => {
    const {container} = render(
      <Image src="https://source.unsplash.com/random" alt="" isPicture={false} aspectRatio={[1, 1]} />
    )

    expect(container.getAttribute('width')).not.toEqual(0)
    expect(container.getAttribute('width')).toEqual(container.getAttribute('height'))
  })
})
