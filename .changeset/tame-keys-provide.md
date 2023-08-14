---
'@primer/react-brand': minor
---

Use VideoPlayer component to render hosted videos

```jsx
<VideoPlayer title="GitHub media player">
  <VideoPlayer.Source src="https://github.githubassets.com/images/modules/growth/actions/ci-cd-actions.h264.mp4" />
  <VideoPlayer.Track
    src="https://raw.githubusercontent.com/JoshBowdenConcepts/Subtitles-Example/main/sample.vtt"
    srcLang="en"
    label="English"
  />
</VideoPlayer>
```
