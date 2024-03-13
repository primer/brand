# Doctocat Template

## Getting Started

1. Install dependencies

```bash
npm i
```

Follow these additional steps if you're experiencing errors during the installation process relating to `vips/vips8` [^1].

```bash
brew reinstall vips
xcode-select --install
brew install gcc
brew reinstall vips
brew info vips
npm i
```

2. Build the site (this only needs to be done once)

`npm run build`

3. Run the development server

`npm run develop`

[^1]: https://github.com/gatsbyjs/gatsby/discussions/29891#discussioncomment-419102
