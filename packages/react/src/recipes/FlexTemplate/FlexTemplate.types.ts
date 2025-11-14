import type {ReactNode} from 'react'
import type {CTABannerProps} from '../../CTABanner/CTABanner'
import {BoxSpacingValues} from '../../Box/Box'
import type {Icon} from '@primer/octicons-react'
import {IconColor} from '../../Icon'
import type {ColorMode} from '../../ThemeProvider'
import {TestimonialProps} from '../../Testimonial'
import {LabelProps} from '../../Label'

export type FlexTemplateLink = {
  href: string
  text: string
  openInNewTab?: boolean
}

export type FlexTemplateLabel = {
  text: string
  color?:
    | 'default'
    | 'blue'
    | 'coral'
    | 'green'
    | 'gray'
    | 'indigo'
    | 'lemon'
    | 'lime'
    | 'orange'
    | 'pink'
    | 'purple'
    | 'red'
    | 'teal'
    | 'yellow'
  size?: 'small' | 'medium' | 'large'
}

export type FlexTemplateHero = {
  align?: 'start' | 'center'
  label?: string | FlexTemplateLabel
  heading?: string
  description?: string
  descriptionVariant?: 'default' | 'muted'
  imagePosition?: 'inline-end' | 'block-end'
  imageSrc?: string
  callToActionPrimary?: FlexTemplateLink
  callToActionPrimaryVariant?: 'primary' | 'secondary' | 'accent'
  callToActionSecondary?: FlexTemplateLink
  callToActionSecondaryVariant?: 'primary' | 'secondary' | 'accent'
  hasBorderBottom?: boolean
  image?: {
    description?: string
  }
}

export type FlexTemplateHeroBackgroundImage = {
  image: {
    description?: string
    file: {
      url: string
    }
  }
  focus?: 'center' | 'top' | 'bottom'
  imagePosition?: string
}

export type FlexTemplateSubNav = {
  hasShadow?: boolean
  heading?: FlexTemplateLink
  subheading?: FlexTemplateLink
  links?: FlexTemplateLink[]
}

export type FlexTemplateRiverConfig = {
  type?: 'river' | 'riverBreakout' | 'riverAccordion'
  align?: 'start' | 'center' | 'end'
  ctaVariant?: 'primary' | 'secondary' | 'accent'
  hasCta?: boolean
  hasLeadingVisual?: boolean
  hasShadow?: boolean
  hasTrailingComponent?: boolean
  imageTextRatio?: '50:50' | '60:40'
  hasLabel?: boolean
  labelColor?: string
  labelSize?: 'small' | 'medium' | 'large'
  visualType?: 'image' | 'video'
}

export type FlexTemplateRiverItem = {
  heading?: string
  description?: string
  label?: string
  labelSize?: LabelProps
  labelColor?: LabelProps['color']
  ctaText?: string
  ctaHref?: string
  ctaVariant?: 'primary' | 'secondary' | 'accent'
  imageSrc?: string
  imageAlt?: string
  videoSrc?: string
  videoPoster?: string
  videoSrcHevc?: string
  videoSrcH264?: string
  align?: 'start' | 'center' | 'end'
  imageTextRatio?: '50:50' | '60:40'
  hasShadow?: boolean
  hasLeadingVisual?: boolean
  hasTrailingComponent?: boolean
  visualType?: 'image' | 'video'
  type?: 'river' | 'riverBreakout' | 'riverAccordion'
  a11yHeading?: string
  footnoteId?: string
  footnoteHref?: string
  items?: FlexTemplateRiverAccordionItem[]
}

export type FlexTemplateRiverAccordionItem = {
  heading?: string
  description?: string
  ctaText?: string
  ctaHref?: string
  ctaVariant?: 'default' | 'accent'
  imageSrc?: string
  imageAlt?: string
  footnoteId?: string
  footnoteHref?: string
}

export type FlexTemplateSectionIntro = {
  align?: 'start' | 'center'
  heading?: string
  headingSize?: '1' | '2' | '3' | '4' | '5' | '6'
  description?: string
  label?: string | FlexTemplateLabel
  labelSize?: LabelProps['size']
  labelColor?: LabelProps['color']
  linkText?: string
  linkHref?: string
  linkVariant?: 'default' | 'accent'
  fullWidth?: boolean
}

export type FlexTemplateSectionIntroStackedItem = {
  text: string | ReactNode
}

export type FlexTemplateSectionIntroStacked = {
  heading?: string | ReactNode
  headingSize?: '1' | '2' | '3' | '4' | '5' | '6'
  linkText?: string
  linkHref?: string
  linkVariant?: 'default' | 'accent'
  items?: FlexTemplateSectionIntroStackedItem[]
}

export type FlexTemplateVisualSettings = {
  backgroundColor?: 'default' | 'subtle'
  paddingBlockStart?: 'none' | 'condensed' | 'normal' | 'spacious'
  paddingBlockEnd?: (typeof BoxSpacingValues)[number]
  roundedCorners?: boolean
  verticalGap?: 'none' | 'condensed' | 'normal' | 'spacious'
  hasBorderBottom?: boolean
  enableRiverStoryScroll?: boolean
  testimonialBackgroundImageVariant?: string
  trailingSectionBackgroundColor?: 'default' | 'subtle'
  trailingSectionRoundedCorners?: boolean
  backgroundImage?: {
    file: {
      url: string
    }
  }
  backgroundImagePosition?: string
  backgroundImageSize?: string
}

export type FlexTemplatePillarItem = {
  icon?: Icon | ReactNode
  iconColor?: IconColor
  heading?: string
  title?: string
  headingLevel?: 'h2' | 'h3' | 'h4'
  description?: string
  linkText?: string
  linkHref?: string
  align?: 'start' | 'center'
  hasBorder?: boolean
  backgroundColor?: 'default' | 'inset' | 'subtle' | 'overlay'
}

export type FlexTemplatePillarsConfig = {
  heading?: string
  description?: string
  headingLevel?: 'h2' | 'h3'
  align?: 'start' | 'center'
  itemBackgroundColor?: 'default' | 'inset' | 'subtle' | 'overlay'
  items?: FlexTemplatePillarItem[]
}

export type FlexTemplateCardItem = {
  heading?: string
  description?: string
  href?: string
  imageSrc?: string
  imageAlt?: string
  ctaText?: string
}

export type FlexTemplateCardsConfig = {
  items?: FlexTemplateCardItem[]
}

export type FlexTemplateFeaturedBentoConfig = {
  showIcon?: boolean
  showFootnotes?: boolean
  headingLevel?: 'h2' | 'h3' | 'h4'
  heading?: string
  linkText?: string
  linkHref?: string
  imageSrc?: string
  imageAlt?: string
}

export type FlexTemplateBreakoutBannerConfig = {
  align?: 'start' | 'center'
  showLogo?: boolean
  showFootnotes?: boolean
  headingLevel?: 'h2' | 'h3' | 'h4'
}

export type FlexTemplateProseConfig = {
  content?: string
}

export type FlexTemplateStatisticItem = {
  value?: string
  description?: string
}

export type FlexTemplateStatisticsConfig = {
  count?: number
  variant?: 'default' | 'boxed'
  size?: 'small' | 'medium' | 'large'
  showDescription?: boolean
  descriptionVariant?: 'default' | 'muted'
  showDescriptionFootnotes?: boolean
  items?: FlexTemplateStatisticItem[]
}

export type FlexTemplatePricingOptionsConfig = {
  variant?: 'default' | 'cards'
  align?: 'start' | 'center'
  showFootnotes?: boolean
  showFeatureList?: boolean
  headingLevel?: 'h2' | 'h3' | 'h4'
}

export type FlexTemplateSegmentedControlPanelConfig = Record<string, unknown>

export type FlexTemplateTestimonialItem = {
  quote?: string
  authorName?: string
  authorTitle?: string
  authorImage?: string
}

export type FlexTemplateTestimonialsConfig = {
  testimonialCount?: number
  backgroundImageVariant?: string
  variant?: 'default' | 'frosted-glass'
  displayedAuthorImage?: 'avatar' | 'logo'
  quoteMarkColor?: TestimonialProps['quoteMarkColor']
  items?: FlexTemplateTestimonialItem[]
}

export type FlexTemplateLogoSuiteConfig = {
  heading?: string
}

export type FlexTemplateSection = {
  id: string
  sectionIntro?: FlexTemplateSectionIntro
  sectionIntroStacked?: FlexTemplateSectionIntroStacked
  anchorNav?: boolean
  logoSuite?: FlexTemplateLogoSuiteConfig
  cards?: FlexTemplateCardsConfig
  pillars?: FlexTemplatePillarsConfig
  featuredBento?: FlexTemplateFeaturedBentoConfig
  breakoutBanner?: FlexTemplateBreakoutBannerConfig
  prose?: FlexTemplateProseConfig
  rivers?: FlexTemplateRiverItem[]
  statistics?: FlexTemplateStatisticsConfig
  pricingOptions?: FlexTemplatePricingOptionsConfig
  segmentedControlPanel?: FlexTemplateSegmentedControlPanelConfig
  testimonials?: FlexTemplateTestimonialsConfig
  visualSettings?: FlexTemplateVisualSettings
}

export type FlexTemplateFAQQuestion = {
  question: string
  answer: string | ReactNode
  title?: string
}

export type FlexTemplateFAQBlock = {
  questions: FlexTemplateFAQQuestion[]
}

export type FlexTemplateFAQEntry = {
  title?: string
  heading?: string
  blocks: FlexTemplateFAQBlock[]
}

export type FlexTemplateFAQ = {
  heading?: string
  faqs: FlexTemplateFAQEntry[]
}

export type FlexTemplateFootnote = {
  id: string
  href?: string
  copy: string
}

export type FlexTemplateCTABannerCallToAction = {
  text?: string
  variant?: 'primary' | 'accent'
}

export type FlexTemplateCTABanner = {
  align?: 'start' | 'center'
  heading?: string
  description?: string
  leadingVisual?: string
  callToActionPrimary?: FlexTemplateCTABannerCallToAction
  callToActionSecondary?: FlexTemplateCTABannerCallToAction
  backgroundColor?: CTABannerProps['backgroundColor']
  backgroundImageSrc?: CTABannerProps['backgroundImageSrc']
  sectionIntro?: FlexTemplateSectionIntro
  cards?: FlexTemplateCard[]
}

export type FlexTemplateCard = {
  heading?: string
  description?: string
  href?: string
  imageSrc?: string
  imageAlt?: string
  icon?: string
  ctaText?: string
}

export type FlexTemplateData = {
  hero?: FlexTemplateHero
  heroBackgroundImage?: FlexTemplateHeroBackgroundImage
  subnav?: FlexTemplateSubNav
  sections?: FlexTemplateSection[]
  ctaBanner?: FlexTemplateCTABanner
  ctaBannerCards?: FlexTemplateCard[]
  ctaBannerSectionIntro?: FlexTemplateSectionIntro
  faq?: FlexTemplateFAQ
  footnotes?: FlexTemplateFootnote[]
  visualSettings?: FlexTemplateVisualSettings
}

export type FlexTemplatePageSettings = {
  colorMode?: ColorMode
}

export type FlexTemplatePage = {
  title?: string
  settings?: FlexTemplatePageSettings
  template: FlexTemplateData
}
