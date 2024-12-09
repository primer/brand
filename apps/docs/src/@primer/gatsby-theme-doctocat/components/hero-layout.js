import React from 'react'
import {Head, Header, Hero, Sidebar} from '@primer/gatsby-theme-doctocat'
import PageFooter from '@primer/gatsby-theme-doctocat/src/components/page-footer'
import {Stack} from '@primer/react-brand'
import styles from './hero-layout.module.css'

function HeroLayout({children, pageContext}) {
  let {additionalContributors} = pageContext.frontmatter

  if (!additionalContributors) {
    additionalContributors = []
  }

  return (
    <div className={styles.HeroPageWrapper}>
      <Head />
      <Header />
      <div className={styles.HeroLayoutWrapper}>
        <div className={styles.HeroLayoutSidebarWrapper}>
          <Sidebar />
        </div>
        <main id="skip-nav" className={styles.HeroLayoutMain}>
          <div className={styles.LandingPageLayout}>
            <Stack gap={{narrow: 'spacious', regular: 'normal'}}>
              <Hero />
              {children}
              <PageFooter
                editUrl={pageContext.editUrl}
                contributors={pageContext.contributors.concat(
                  additionalContributors.map((login) => ({login})),
                )}
              />
            </Stack>
          </div>
        </main>
      </div>
    </div>
  )
}

export default HeroLayout
