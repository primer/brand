import {cssBundleHref} from '@remix-run/css-bundle'
import type {LinksFunction, LoaderArgs} from '@remix-run/node'
import {json} from '@remix-run/node'
import {Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration} from '@remix-run/react'

import {getUser} from '~/session.server'
import primerBrandStyles from '@primer/react-brand/lib/css/main.css'
import stylesheet from '~/tailwind.css'

export const links: LinksFunction = () => [
  {rel: 'stylesheet', href: stylesheet},
  {rel: 'stylesheet', href: primerBrandStyles},
  ...(cssBundleHref ? [{rel: 'stylesheet', href: cssBundleHref}] : []),
]

export const loader = async ({request}: LoaderArgs) => {
  return json({user: await getUser(request)})
}

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
