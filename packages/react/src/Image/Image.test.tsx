import React from 'react'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom'
import {axe, toHaveNoViolations} from 'jest-axe'

import {Image, ImageBorderRadiusOptions} from './'

expect.extend(toHaveNoViolations)

describe('Image', () => {
  it('no a11y violations', async () => {
    const {container} = render(
      <Image src="/brand/assets/placeholder-600x400.png" alt="alternative text" aspectRatio={undefined} />,
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should pass a custom class to the image when provided', async () => {
    const testClass = 'test'

    const {container} = render(
      <Image
        src="/brand/assets/placeholder-600x400.png"
        alt="alternative text"
        className={testClass}
        aspectRatio={undefined}
      />,
    )

    expect(container.querySelector(`img.${testClass}`)).toBeInTheDocument()
  })

  it('should return only an img element if no aspectRatio is provided and as is not picture', async () => {
    const {container, getByRole} = render(
      <Image src="/brand/assets/placeholder-600x400.png" alt="alternative text" aspectRatio={undefined} />,
    )

    expect(container.querySelector('.Image__container')).not.toBeInTheDocument()
    expect(container.querySelector('span')).not.toBeInTheDocument()
    expect(container.querySelector('picture')).not.toBeInTheDocument()
    expect(container.querySelector('.Image')).toBeInTheDocument()
    expect(getByRole('img')).toBeInTheDocument()
  })

  it('should return an img element in a span tag if aspectRatio is provided and as is not equal to picture', async () => {
    const {container, getByRole} = render(
      <Image src="/brand/assets/placeholder-600x400.png" alt="alternative text" aspectRatio={'1:1'} />,
    )

    expect(container.querySelector('.Image__container')).toBeInTheDocument()
    expect(container.querySelector('span')).toBeInTheDocument()
    expect(container.querySelector('picture')).not.toBeInTheDocument()
    expect(container.querySelector('.Image')).toBeInTheDocument()
    expect(getByRole('img')).toBeInTheDocument()
  })

  it('should return an img element in a picture tag if aspectRatio is provided and picture is set', async () => {
    const {container} = render(
      <Image src="/brand/assets/placeholder-600x400.png" alt="alternative text" as="picture" aspectRatio={'1:1'} />,
    )

    expect(container.querySelector('.Image__container')).toBeInTheDocument()
    expect(container.querySelector('span')).not.toBeInTheDocument()
    expect(container.querySelector('picture')).toBeInTheDocument()
    expect(container.querySelector('.Image')).toBeInTheDocument()
    expect(container.querySelector('img')).toBeInTheDocument()
  })

  it('should return an img element in a picture tag if aspectRatio is not provided and as is equal to picture', async () => {
    const {container} = render(
      <Image src="/brand/assets/placeholder-600x400.png" alt="alternative text" as="picture" />,
    )

    expect(container.querySelector('.Image__container')).toBeInTheDocument()
    expect(container.querySelector('span')).not.toBeInTheDocument()
    expect(container.querySelector('picture')).toBeInTheDocument()
    expect(container.querySelector('.Image')).toBeInTheDocument()
    expect(container.querySelector('img')).toBeInTheDocument()
  })

  it('should use the custom aspect ratio provided in design-tokens', async () => {
    const {container} = render(
      <Image src="/brand/assets/placeholder-600x400.png" alt="alternative text" aspectRatio="custom" />,
    )

    expect(container.querySelector('span')?.classList.contains('Image--aspect-ratio-custom')).toBe(true)
  })

  it('should set the height and width of the image to null if no specific width is set', async () => {
    const testAltText = 'alternative text'
    const {getByAltText} = render(<Image src="/brand/assets/placeholder-600x400.png" alt={testAltText} />)

    expect(getByAltText(testAltText).getAttribute('height')).toEqual(null)
    expect(getByAltText(testAltText).getAttribute('width')).toEqual(null)
  })

  it('should create an img tag with the custom height and width applied as props', async () => {
    const testHeight = 100
    const testWidth = 150
    const testAltText = 'alternative text'
    const {getByAltText} = render(
      <Image src="/brand/assets/placeholder-600x400.png" alt={testAltText} height={testHeight} width={testWidth} />,
    )
    expect(getByAltText(testAltText).getAttribute('height')).toEqual(`${testHeight}`)
    expect(getByAltText(testAltText).getAttribute('width')).toEqual(`${testWidth}`)
  })

  it('should create an picture tag with the custom height and width applied as props', async () => {
    const testHeight = 100
    const testWidth = 150
    const testAltText = 'alternative text'
    const {getByAltText} = render(
      <Image
        as="picture"
        src="/brand/assets/placeholder-600x400.png"
        alt={testAltText}
        height={testHeight}
        width={testWidth}
      />,
    )
    expect(getByAltText(testAltText).getAttribute('height')).toEqual(`${testHeight}`)
    expect(getByAltText(testAltText).getAttribute('width')).toEqual(`${testWidth}`)
  })

  it('should pass loading and decoding properties correctly to the image tag', async () => {
    const testLoading = 'lazy'
    const testDecoding = 'async'
    const testAltText = 'alternative text'
    const {getByAltText} = render(
      <Image
        src="/brand/assets/placeholder-600x400.png"
        alt={testAltText}
        loading={testLoading}
        decoding={testDecoding}
      />,
    )
    expect(getByAltText(testAltText).getAttribute('loading')).toEqual(testLoading)
    expect(getByAltText(testAltText).getAttribute('decoding')).toEqual(testDecoding)
  })

  it('should pass loading and decoding properties correctly to the image tag when there is a span wrapper', async () => {
    const testLoading = 'lazy'
    const testDecoding = 'async'
    const testAltText = 'alternative text'
    const {getByAltText} = render(
      <Image
        src="/brand/assets/placeholder-600x400.png"
        alt={testAltText}
        loading={testLoading}
        decoding={testDecoding}
        aspectRatio="1:1"
      />,
    )
    expect(getByAltText(testAltText).getAttribute('loading')).toEqual(testLoading)
    expect(getByAltText(testAltText).getAttribute('decoding')).toEqual(testDecoding)
  })

  it('should pass loading and decoding properties correctly to the image tag when the picture tag is used', async () => {
    const testLoading = 'lazy'
    const testDecoding = 'async'
    const testAltText = 'alternative text'
    const {getByAltText} = render(
      <Image
        src="/brand/assets/placeholder-600x400.png"
        alt={testAltText}
        loading={testLoading}
        decoding={testDecoding}
        as="picture"
      />,
    )
    expect(getByAltText(testAltText).getAttribute('loading')).toEqual(testLoading)
    expect(getByAltText(testAltText).getAttribute('decoding')).toEqual(testDecoding)
  })

  it('should create a picture element when a custom height and width is provided', async () => {
    const {container} = render(
      <Image
        src="/brand/assets/placeholder-600x400.png"
        alt="alternative text"
        width={200}
        height={200}
        as="picture"
      />,
    )

    // Can't test the actual height and width because without a loading image it's not possible to get the actual height and width
    expect(container.querySelector('picture')).toBeInTheDocument()
  })

  it('should create a span element when a custom height and width is provided and aspectRatio is provided', async () => {
    const {container} = render(
      <Image
        src="/brand/assets/placeholder-600x400.png"
        alt="alternative text"
        width={200}
        height={300}
        aspectRatio="1:1"
      />,
    )

    // Can't test the actual height and width because without a loading image it's not possible to get the actual height and width - can't test that this overrides either because the height and width are not receivable.
    expect(container.querySelector('span')).toBeInTheDocument()
  })

  it('should set the srcSet property correctly on the img component', async () => {
    const testSrcSet = '/brand/assets/placeholder-600x400.png, /brand/assets/placeholder-600x400.png 2x'
    const testAltText = 'alternative text'
    const {getByAltText} = render(
      <Image src="/brand/assets/placeholder-600x400.png" alt={testAltText} srcSet={testSrcSet} />,
    )

    expect(getByAltText(testAltText).getAttribute('srcset')).toEqual(testSrcSet)
  })

  it('should create a source element when as is equal to picture and the srcSet property is set.', async () => {
    const {container} = render(
      <Image
        src="/brand/assets/placeholder-600x400.png"
        as="picture"
        alt="alternative text"
        sources={[
          {
            srcset: '/brand/assets/placeholder-600x400.png',
            media: '(min-width: 600px)',
          },
        ]}
      />,
    )

    expect(container.querySelector('source')).toBeInTheDocument()
  })

  it('should add the appropriate class based on the borderRadius prop', async () => {
    let index = 0
    for (const size of ImageBorderRadiusOptions) {
      const {getAllByRole} = render(
        <Image src="/brand/assets/placeholder-600x400.png" alt="alternative text" borderRadius={size} />,
      )
      expect(getAllByRole('img')[index]).toHaveClass(`Image--borderRadius-${size}`)
      index++
    }
  })
})
