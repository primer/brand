---
'@primer/react-brand': minor
'@primer/brand-primitives': patch
---

Added new `MediaPlaylist` component, which can be used for presenting a list of YouTube videos.

```tsx
<MediaPlaylist>
  <MediaPlaylist.Heading>Latest videos</MediaPlaylist.Heading>
  <MediaPlaylist.Item thumbnail={<img src="thumbnail.jpg" alt="" />}>
    <MediaPlaylist.ItemHeading title="Getting More from Every Copilot Interaction" description="10:57" />
    <MediaPlaylist.ItemContent>
      <Text as="p" variant="muted">
        See workflows for scoping context, choosing the right mode, and getting more focused Copilot answers.
      </Text>
    </MediaPlaylist.ItemContent>
    <MediaPlaylist.ItemMedia>
      <iframe
        title="Getting More from Every Copilot Interaction"
        src="https://www.youtube-nocookie.com/embed/ITxzBiTBZW0"
      />
    </MediaPlaylist.ItemMedia>
  </MediaPlaylist.Item>
</MediaPlaylist>
```

🔗 [See `MediaPlaylist` documentation for more usage examples](https://primer.style/brand/components/MediaPlaylist)
