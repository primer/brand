import React from 'react'
import {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'
import {axe} from 'jest-axe'

import {VideoPlayer} from '.'

describe('VideoPlayer', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('has no a11y violations', async () => {
    const {container} = render(
      <VideoPlayer
        poster="https://github.githubassets.com/images/icons/media-player/poster.jpg"
        title="Hello world"
        crossOrigin="anonymous"
      >
        <VideoPlayer.Source src="https://cdn.api.video/vod/vi36GGvd6PoTqViQLxBWwHjJ/mp4/1080/source.mp4" />
        <VideoPlayer.Track
          src="https://raw.githubusercontent.com/github/media-players/214239b96a3e5fdb8517ee851fe49891c5ffafbd/assets/video/sample.vtt?token=GHSAT0AAAAAABZPYVSCU2JY3J5ZQALKAPTYZGPVCFA"
          default
          kind="subtitles"
          srcLang="en"
          label="English"
        />
      </VideoPlayer>,
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('renders correctly into the document', () => {
    const testTitle = 'Hello world'
    const {getByTitle} = render(
      <VideoPlayer
        poster="https://github.githubassets.com/images/icons/media-player/poster.jpg"
        title={testTitle}
        crossOrigin="anonymous"
      >
        <VideoPlayer.Source src="https://cdn.api.video/vod/vi36GGvd6PoTqViQLxBWwHjJ/mp4/1080/source.mp4" />
        <VideoPlayer.Track
          src="https://raw.githubusercontent.com/github/media-players/214239b96a3e5fdb8517ee851fe49891c5ffafbd/assets/video/sample.vtt?token=GHSAT0AAAAAABZPYVSCU2JY3J5ZQALKAPTYZGPVCFA"
          default
          kind="subtitles"
          srcLang="en"
          label="English"
        />
      </VideoPlayer>,
    )

    const textEl = getByTitle(testTitle)

    expect(textEl).toBeInTheDocument()
  })
})
