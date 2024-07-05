import React from 'react'
import {UnderlineNav} from '@primer/react'
import {Link as GatsbyLink, navigate} from 'gatsby'

export function TabbedPageNav({
  items,
  currentTab,
  setCurrentTab,
}: {
  items: {
    title: string
    url: string
  }[]
  currentTab?: string
  setCurrentTab: (tab: string) => void
}) {
  return (
    <UnderlineNav>
      {items.map((item) => (
        <UnderlineNav.Link
          key={item.title}
          as={GatsbyLink}
          to={item.url}
          selected={currentTab === item.title }
          onClick={(e) => {
            setCurrentTab(item.title)

            // update hash without triggering scroll
            window.history.pushState(null, '', item.url)
            e.preventDefault()
          }}
        >
          {item.title}
        </UnderlineNav.Link>
      ))}
    </UnderlineNav>
  )
}
