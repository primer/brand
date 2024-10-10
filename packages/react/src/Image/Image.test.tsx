import React from 'react'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom'
import {axe, toHaveNoViolations} from 'jest-axe'

import {Image, ImageAspectRatio, ImageBorderRadiusOptions} from './'

expect.extend(toHaveNoViolations)

describe('Image', () => {
  it('should have no a11y violations', async () => {
    const {container} = render(
      <Image src="https://via.placeholder.com/600x400/d3d9df/d3d9df.png" alt="alternative text" />,
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should render an img element', () => {
    const {getByAltText} = render(
      <Image src="https://via.placeholder.com/600x400/d3d9df/d3d9df.png" alt="alternative text" />,
    )

    const imageElement = getByAltText('alternative text')

    expect(imageElement).toBeInTheDocument()
    expect(imageElement.tagName).toBe('IMG')
  })

  it('should apply animation styles when `animate` is provided', () => {
    const {getByRole} = render(
      <Image src="https://via.placeholder.com/600x400/d3d9df/d3d9df.png" alt="alternative text" animate="scale-in" />,
    )

    const imageElement = getByRole('img')

    expect(imageElement).toHaveClass('Animation')
    expect(imageElement).toHaveClass('Animation--scale-in')
  })

  it('should forward the `className` prop to the image', () => {
    const testClass = 'test'

    const {getByRole} = render(
      <Image
        src="https://via.placeholder.com/600x400/d3d9df/d3d9df.png"
        alt="alternative text"
        className={testClass}
      />,
    )

    expect(getByRole('img')).toHaveClass(testClass)
  })

  it('should forward the `style` prop to the image', () => {
    const {getByRole} = render(
      <Image
        src="https://via.placeholder.com/600x400/d3d9df/d3d9df.png"
        alt="alternative text"
        style={{background: 'red'}}
      />,
    )

    expect(getByRole('img')).toHaveStyle({background: 'red'})
  })

  it('should forward the `alt` prop to the image', () => {
    const {getByAltText} = render(
      <Image src="https://via.placeholder.com/600x400/d3d9df/d3d9df.png" alt="alternative text" />,
    )

    expect(getByAltText('alternative text')).toBeInTheDocument()
  })

  it.each(ImageBorderRadiusOptions)('should add the appropriate class when `borderRadius="%s"`', size => {
    const {getByRole} = render(
      <Image src="https://via.placeholder.com/600x400/d3d9df/d3d9df.png" alt="alternative text" borderRadius={size} />,
    )
    expect(getByRole('img')).toHaveClass(`Image--borderRadius-${size}`)
  })

  it.each<{aspectRatio: ImageAspectRatio; classSuffix: string}>([
    {aspectRatio: '1:1', classSuffix: '1-1'},
    {aspectRatio: '16:9', classSuffix: '16-9'},
    {aspectRatio: '16:10', classSuffix: '16-10'},
    {aspectRatio: '4:3', classSuffix: '4-3'},
    {aspectRatio: 'custom', classSuffix: 'custom'},
  ])('should add the appropriate class when `aspectRatio="$aspectRatio"`', ({aspectRatio, classSuffix}) => {
    const {getByRole} = render(
      <Image
        src="https://via.placeholder.com/600x400/d3d9df/d3d9df.png"
        alt="alternative text"
        aspectRatio={aspectRatio}
      />,
    )

    expect(getByRole('img')).toHaveClass(`Image--aspectRatio-${classSuffix}`)
  })
})
