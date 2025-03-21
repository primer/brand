import type {Metadata} from 'next'
import Theme, {getPageMap} from '@primer/doctocat-nextjs'

import type {FC, ReactNode} from 'react'
import '@primer/doctocat-nextjs/css/global.css'
import '../src/global.css'

// eslint-disable-next-line i18n-text/no-en
const siteTitle = process.env.NEXT_PUBLIC_SITE_TITLE || 'Example Site'

export const metadata: Metadata = {
  title: {
    absolute: '',
    template: `%s - ${siteTitle}`,
  },
}

const RootLayout: FC<{children: ReactNode}> = async ({children}) => {
  const pageMap = await getPageMap()
  return (
    <html
      lang="en"
      dir="ltr"
      // Hacks to suppress hydration errors. TODO: Remove this once we have a better solution.
      className="js-focus-visible"
      data-js-focus-visible=""
    >
      <body>
        <Theme pageMap={pageMap}>{children}</Theme>
      </body>
    </html>
  )
}

export default RootLayout
