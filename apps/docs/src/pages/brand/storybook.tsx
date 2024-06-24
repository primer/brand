/**
 * This page is only used during local development to redirect Storybook links to the Storybook dev server
 * On production this directory is redirected to the privately hosted Storybook by primer.style
 */

import {useEffect} from 'react'

const StorybookRedirect = ({location}) => {
  useEffect(() => {
    window.location.replace(`http://localhost:6006${location.search}`)
  }, [])

  return null
}

export default StorybookRedirect
