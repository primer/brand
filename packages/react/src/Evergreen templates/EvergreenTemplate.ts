import {ThemeProviderProps} from '../ThemeProvider'
import {Colors} from '../constants'
import {ContentStackBlockProps} from './Blocks/ContentStackBlock'
import {FAQBlockProps} from './Blocks/FAQBlock'
import {FeaturedMediaBlockProps} from './Blocks/FeaturedMediaBlock'
import {HeaderActionsBlockProps} from './Blocks/HeaderActionsBlock'
import {HeaderHeroBlockProps} from './Blocks/HeaderHeroBlock'
import {ProseBlockProps} from './Blocks/ProseBlock'
import {ShowcaseBlockProps} from './Blocks/ShowcaseBlock'

export type Block =
  | ContentStackBlockProps
  | FAQBlockProps
  | FeaturedMediaBlockProps
  | HeaderActionsBlockProps
  | HeaderHeroBlockProps
  | ProseBlockProps
  | ShowcaseBlockProps

export type Slot = Block | Block[] | React.ReactNode

export type Section = {
  id?: string
  title?: string
  description?: string
  isRootSection?: boolean
  blocks?: {
    [key: string]: Block
  }
}

export type Theme = {
  colorMode?: ThemeProviderProps['colorMode']
  accentColor?: (typeof Colors)[number]
  background?: {
    color?: string
    image?: {
      src: string
      repeat?: boolean
      size?: string
      position?: string
    }
  }
}

export type Navigation = {
  items?: {
    href: string
    title: string
  }[]
}

export type SiteMetadata = {
  title: string
}

export type Settings = {
  showHeader?: boolean
  showFooter?: boolean
}

export type Content = {
  sections: {
    [key: string]: Section
  }
  slots?: {
    [key: string]: Slot
  }
}

export type EvergreenTemplate = {
  siteMetadata: SiteMetadata
  theme: Theme
  navigation: Navigation
  settings?: Settings
  content: Content
}
