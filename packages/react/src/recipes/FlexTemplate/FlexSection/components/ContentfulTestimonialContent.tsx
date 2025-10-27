import React from 'react'

import {Testimonial} from '../../../..'

import monaAvatar from '../../../../fixtures/images/avatar-mona.png'

// biome-ignore lint/suspicious/noExplicitAny: TODO - Add proper types for Contentful data
export function ContentfulTestimonialContent({className, size, variant, quoteMarkColor, displayedAuthorImage}: any) {
  return (
    <Testimonial className={className} size={size} variant={variant} quoteMarkColor={quoteMarkColor}>
      <Testimonial.Quote>
        <em>GitHub helps us ensure</em> that we have our security controls baked into our pipelines all the way from the
        first line of code we&apos;re writing.
      </Testimonial.Quote>

      <Testimonial.Name position="Staff Security Engineer">David Ross</Testimonial.Name>

      {displayedAuthorImage === 'logo' ? (
        <Testimonial.Logo>
          <img
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png"
            alt="GitHub logo"
            width={60}
          />
        </Testimonial.Logo>
      ) : displayedAuthorImage === 'avatar' ? (
        <Testimonial.Avatar alt="The testimonial author" src={monaAvatar} />
      ) : /**
       * If neither logo nor author's photo exist or none is selected, we don't render anything.
       */
      null}
    </Testimonial>
  )
}
