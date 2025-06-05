---
'@primer/react-brand': patch
---

Add `Hero.Video` slot to `Hero` for inserting custom videos.

```jsx
<Hero>
  <Hero.Heading>Your super sweet hero heading</Hero.Heading>
  <Hero.Video>
    <VideoPlayer title="Your custom video">
      <VideoPlayer.Source src="./example.mp4" type="video/mp4" />
      <VideoPlayer.Track src="./example.vtt" default />
    </VideoPlayer>
  </Hero.Video>
</Hero>
```

Refer to Storybook for more usage examples.
