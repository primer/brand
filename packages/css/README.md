<p align="center">
  <img width="300px" src="https://user-images.githubusercontent.com/4608155/127241386-f11da52d-00d9-4366-b01c-6f4c1ebcf7f2.png">
</p>

<h1 align="center">Primer Brand CSS</h1>

<p align="center"><strong>CSS for Primer Brand components</strong>
</p>

<p align="center">⚠️ For use by GitHub Staff only</p>

<p align="center">
<a aria-label="npm package" href="https://www.npmjs.com/package/@primer/react-brand">
    <img alt="" src="https://img.shields.io/npm/v/@primer/react-brand.svg">
  </a>
  <a aria-label="build status" href="https://github.com/primer/brand/actions/workflows/ci.yml">
    <img alt="" src="https://github.com/primer/brand/actions/workflows/ci.yml/badge.svg">
  </a>
  <img src="https://img.shields.io/badge/status-experimental-red" alt="status: experimental">
</p>

<p align="center">
    <a href="https://primer.github.io/brand/" target="_blank">https://primer.style/brand</a>
</p>

## Install

```sh
npm install --save @primer/brand-css
```

## Usage

CSS for all Primer Brand components are available in the following directory: `@primer/brand-css/components`

Import specific stylsheets like this:

```scss
@import '@primer/brand-css/components/Button/Button.css';
```

Refer to Primer Brand Documentation for a full list of available components.

## Development

The stylesheets in this package are programmatically built from the source code of the Primer Brand's React component library. Any style updates or modifications should be made to the original stylesheets (in `packages/react`), as any updates to the built CSS files will be overwritten.
