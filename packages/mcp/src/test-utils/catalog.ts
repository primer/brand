import {createLogger} from '../logger.js'
import type {BrandInstall} from '../brand/resolve-install.js'
import type {DocsSource} from '../brand/docs-source.js'
import type {Catalog} from '../catalog/types.js'
import type {ToolContext} from '../tools/types.js'

/** A small, deterministic catalog used across unit tests. */
export function makeCatalog(overrides: Partial<Catalog> = {}): Catalog {
  return {
    brandPackage: '@primer/react-brand',
    generatedFromVersion: '0.69.0',
    generatedAt: '2026-06-24T00:00:00.000Z',
    components: [
      {
        name: 'Hero',
        module: '@primer/react-brand',
        subcomponents: ['Hero.Heading', 'Hero.Description', 'Hero.PrimaryAction'],
        props: [
          {
            name: 'align',
            type: "'start' | 'center'",
            enum: ['start', 'center'],
            required: false,
            description: 'Horizontal alignment of the hero content.',
          },
          {name: 'variant', type: 'HeroVariant', required: false},
        ],
        examples: [
          {
            title: 'Hero example',
            source: 'story',
            code: '<Hero align="center"><Hero.Heading>Build like the best</Hero.Heading></Hero>',
          },
        ],
        description: 'Prominent banner for the top of a landing page',
        note: 'Use one Hero per page, at the very top.',
      },
      {
        name: 'CTABanner',
        module: '@primer/react-brand',
        subcomponents: ['CTABanner.Heading', 'CTABanner.ButtonGroup'],
        props: [],
        examples: [
          {
            title: 'CTABanner example',
            source: 'story',
            code: `<CTABanner>
  <CTABanner.Heading>Build with the best</CTABanner.Heading>
  <CTABanner.ButtonGroup>
    <Button>Get started</Button>
  </CTABanner.ButtonGroup>
</CTABanner>`,
          },
        ],
      },
      {name: 'Pillar', module: '@primer/react-brand', subcomponents: [], props: [], examples: []},
      {name: 'SectionIntro', module: '@primer/react-brand', subcomponents: [], props: [], examples: []},
      {name: 'River', module: '@primer/react-brand', subcomponents: [], props: [], examples: []},
      {name: 'Stack', module: '@primer/react-brand', subcomponents: [], props: [], examples: []},
      {
        name: 'PricingOptions',
        module: '@primer/react-brand',
        subcomponents: [],
        props: [],
        examples: [
          {
            title: 'PricingOptions example',
            source: 'story',
            code: `<PricingOptions>
  <PricingOptions.Item>
    <PricingOptions.Heading>Pro</PricingOptions.Heading>
    <PricingOptions.Price trailingText="per month">10</PricingOptions.Price>
  </PricingOptions.Item>
</PricingOptions>`,
          },
        ],
        description: 'Pricing tiers and plan comparison',
        keywords: ['plans', 'billing'],
      },
    ],
    assets: [
      {name: 'ArrowRightIcon', module: '@primer/octicons-react', kind: 'icon'},
      {name: 'ShieldIcon', module: '@primer/octicons-react', kind: 'icon'},
      {name: 'CopilotIcon', module: '@primer/octovisuals-react', kind: 'illustration'},
    ],
    tokens: [
      {name: '--brand-color-accent-primary', value: 'var(--base-color-scale-green-7)', group: 'functional'},
      {name: '--base-size-32', value: '2rem', group: 'base'},
      {name: '--brand-color-border-default', value: 'var(--base-color-scale-gray-4)', group: 'functional'},
      {name: '--brand-borderWidth-thin', value: 'max(1px, 0.0625rem)', group: 'functional'},
      {name: '--brand-color-canvas-default', value: 'var(--base-color-scale-white-0)', group: 'functional'},
      {name: '--brand-color-neutral-emphasis', value: 'var(--base-color-scale-gray-6)', group: 'functional'},
    ],
    recipes: [
      {
        name: 'FlexSuiteAIOverview',
        title: 'Product feature overview landing page',
        keywords: [
          'product feature',
          'feature',
          'overview',
          'landing',
          'landing page',
          'homepage',
          'home',
          'product page',
          'marketing page',
          'full page',
          'template',
        ],
        source: '<Box>{/* overview recipe source */}</Box>',
      },
      {
        name: 'FlexSuiteSecurityCategory',
        title: 'Product feature category landing page',
        keywords: [
          'product feature',
          'feature',
          'category',
          'landing page',
          'solution',
          'solutions',
          'use case',
          'topic',
          'full page',
          'template',
        ],
        source: '<Box>{/* category recipe source */}</Box>',
      },
      {
        name: 'FlexSuiteAIDetailsPlaylist',
        title: 'Product feature details landing page',
        keywords: [
          'product feature',
          'feature',
          'details',
          'detail',
          'landing page',
          'media',
          'video',
          'playlist',
          'watch',
          'full page',
          'template',
        ],
        source: '<Box>{/* details recipe source */}</Box>',
      },
    ],
    ...overrides,
  }
}

const noopDocs: DocsSource = {
  origin: 'none',
  version: '0.69.0',
  index: async () => [],
  read: async () => null,
}

const installedBrand: BrandInstall = {
  found: true,
  version: '0.69.0',
  packageDir: '/fake/node_modules/@primer/react-brand',
  docsDir: null,
  llmsPath: null,
}

export function makeContext(overrides: Partial<ToolContext> = {}): ToolContext {
  const catalog = overrides.catalog ?? makeCatalog()
  return {
    catalog,
    brand: installedBrand,
    docs: noopDocs,
    logger: createLogger(false),
    assets: catalog.assets,
    assetsOrigin: 'snapshot',
    assetGenerator: {available: false},
    ...overrides,
  }
}
