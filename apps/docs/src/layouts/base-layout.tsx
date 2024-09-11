import {Box as PRCBox} from '@primer/react'
import React from 'react'
import Head from '@primer/gatsby-theme-doctocat/src/components/head'
import Sidebar from '@primer/gatsby-theme-doctocat/src/components/sidebar'

export function BaseLayout({title, description, children}) {
  return (
    <PRCBox sx={{flexDirection: 'column', minHeight: '100vh', display: 'flex', color: 'inherit'}}>
      <Head title={title} description={description} />
      <div>Header goes here</div>
      <PRCBox
        sx={{
          zIndex: 0,
          flex: '1 1 auto',
          flexDirection: 'row',
          display: 'flex',
        }}
      >
        <PRCBox sx={{display: ['none', null, null, 'block']}}>
          <Sidebar />
        </PRCBox>
        <PRCBox as="main" sx={{minWidth: 0, width: '100%'}} id="skip-nav">
          Testing whether this update affects site render
          {children}
        </PRCBox>
      </PRCBox>
    </PRCBox>
  )
}
