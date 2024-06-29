export const sharedArgTypes = {
  variant: {
    control: 'inline-radio',
    options: ['use-case', 'industry', 'size'],
    name: 'align',
    table: {
      category: 'Intro',
    },
  },
  /**
   * Hero
   */
  heroLabel: {
    control: 'text',
    name: 'label',
    table: {
      category: 'Hero',
    },
  },
  heroTitle: {
    control: 'text',
    name: 'title',
    table: {
      category: 'Hero',
    },
  },
  heroDescription: {
    control: 'text',
    name: 'description',
    table: {
      category: 'Hero',
    },
  },
  heroCtaTextPrimary: {
    control: 'text',
    name: 'primary CTA text',
    table: {
      category: 'Hero',
    },
  },
  heroCtaTextSecondary: {
    control: 'text',
    name: 'secondary CTA text',
    table: {
      category: 'Hero',
    },
  },
  /**
   * Editorial intro
   */
  introVariant: {
    control: 'inline-radio',
    options: ['pillars', 'editorial prose', 'editorial list'],
    name: 'align',
    table: {
      category: 'Intro',
    },
  },
  sectionIntroText: {
    control: 'text',
    name: 'text',
    table: {
      category: 'Intro',
    },
  },

  /**
   * Logobar
   */
  logobarVisible: {
    control: 'boolean',
    name: 'Logobar visible',
    table: {
      category: 'Optional',
    },
  },

  /**
   * Rivers
   */
  riverVisible: {
    control: 'boolean',
    name: 'Rivers visible',
    table: {
      category: 'Optional',
    },
  },

  /**
   * Customer story (Bento)
   */
  customerStoryVisible: {
    control: 'boolean',
    name: 'Customer story visible',
    table: {
      category: 'Optional',
    },
  },

  /**
   * Statistics
   * */
  statisticsVisible: {
    control: 'boolean',
    name: 'Statistics visible',
    table: {
      category: 'Optional',
    },
  },

  /**
   * Testimonials
   */
  testimonialsVisible: {
    control: 'boolean',
    name: 'Testimonials visible',
    table: {
      category: 'Optional',
    },
  },

  /**
   * FAQ
   * */
  faqVisible: {
    control: 'boolean',
    name: 'FAQ visible',
    table: {
      category: 'Optional',
    },
  },
}
