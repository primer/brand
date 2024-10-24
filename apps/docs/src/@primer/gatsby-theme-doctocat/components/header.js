import React from 'react'
import styles from './header.module.css'
import {MarkGithubIcon} from '@primer/octicons-react'
import {Navigation} from '../../../components/navigation/navigation'
import {SidePanel} from '../../../components/side-panel/side-panel'

export const HEADER_HEIGHT = 56

export default function Header() {
  return (
    <header className={styles.PageHeader}>
      <a href="https://primer.style/" className={styles.SiteTitle}>
        <MarkGithubIcon size={24} />
        <span className={styles.Title}>Primer</span>
      </a>
      <Navigation />
      <div className={styles.SidePanel}>
        <SidePanel />
      </div>
    </header>
  )
}
