/**
 * Created using npx create-remix
 * Modified to add Primer Brand stylesheet
 */
import {Links, Meta, Outlet, Scripts, ScrollRestoration} from '@remix-run/react'
import primerBrandStyles from '@primer/react-brand/lib/css/main.css'
import stylesheet from '~/tailwind.css'

export const links: LinksFunction = () => [
  {rel: 'stylesheet', href: stylesheet},
  {rel: 'stylesheet', href: primerBrandStyles},
  ...(cssBundleHref ? [{rel: 'stylesheet', href: cssBundleHref}] : []),
]

export function Layout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
