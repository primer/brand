/**
 * All types relating to the Catalog
 */

export type CatalogProp = {
  name: string
  type?: string
  /** Allowed string-literal values, when the prop is an enum. */
  enum?: string[]
  required?: boolean
  default?: string
  /** One-line prop description from its JSDoc, when documented in source. */
  description?: string
}

export type CatalogExample = {
  title: string
  /** Source snippet (JSX), when one could be extracted. */
  code?: string
  /** Where the snippet came from: an authored JSDoc `@example`, a tested Storybook story, or a docs page. */
  source: 'jsdoc' | 'story' | 'docs'
  /** Storybook story id, when the example comes from a story. */
  storyId?: string
}

export type CatalogComponent = {
  /** Public name, e.g. `Hero`. */
  name: string
  /** Package the component is imported from. */
  module: string
  /** Compound sub-components, e.g. `['Hero.Heading', 'Hero.Description']`. */
  subcomponents: string[]
  props: CatalogProp[]
  examples: CatalogExample[]
  /** One-line summary for listings, when available. */
  description?: string
  /** Search keywords from the component's docs page, used to improve relevance ranking. */
  keywords?: string[]
  /** A usage caveat from the component's JSDoc `@remarks` (e.g. a non-obvious prop interaction). */
  note?: string
}

export type CatalogAsset = {
  name: string
  module: string
  kind: 'icon' | 'illustration'
}

export type CatalogToken = {
  name: string
  value: string
  group: string
}

// We add full page recipes from packages/react to the catalog to enrich the examples agents have available to them.
export type CatalogRecipe = {
  /** The export/file name, e.g. `FlexSuiteAIOverview`. */
  name: string
  /** A human-readable label for ranking and display, e.g. `Overview / landing page`. */
  title: string
  /** Page-level keywords used to match a build goal. */
  keywords: string[]
  /** The recipe's full source `.tsx`. */
  source: string
}

export type Catalog = {
  /** Package whose API this catalog describes. */
  brandPackage: string
  /** Version of `@primer/react-brand` the catalog was generated from. */
  generatedFromVersion: string
  generatedAt: string
  components: CatalogComponent[]
  assets: CatalogAsset[]
  tokens: CatalogToken[]
  recipes: CatalogRecipe[]
}

export function emptyCatalog(): Catalog {
  return {
    brandPackage: '@primer/react-brand',
    generatedFromVersion: 'unknown',
    generatedAt: new Date(0).toISOString(),
    components: [],
    assets: [],
    tokens: [],
    recipes: [],
  }
}
