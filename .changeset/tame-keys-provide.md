---
'@primer/react-brand': minor
---

Use VideoPlayer component to render hosted videos

```jsx
<VideoPlayer {...args} crossOrigin="anonymous">
  <VideoPlayer.Source src="https://cdn.api.video/vod/vi36GGvd6PoTqViQLxBWwHjJ/mp4/1080/source.mp4" />
  <VideoPlayer.Track src="./sample.vtt" default kind="subtitles" srcLang="en" label="English" />
</VideoPlayer>
```
