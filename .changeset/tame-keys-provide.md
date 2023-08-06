---
'@primer/react-brand': minor
---

Use VideoPlayer component to render hosted videos

```jsx
<VideoPlayer title="HLS On Demand Demo" crossOrigin="anonymous">
  <VideoPlayer.Source src="https://cdn.api.video/vod/vi36GGvd6PoTqViQLxBWwHjJ/mp4/1080/source.mp4" />
  <VideoPlayer.Track
    src="https://raw.githubusercontent.com/JoshBowdenConcepts/Subtitles-Example/main/sample.vtt"
    default
    kind="subtitles"
    srcLang="en"
    label="English"
  />
</VideoPlayer>
```
