import {NavList} from '@primer/react/drafts'
import {useLocation} from '@reach/router'
import {Link as GatsbyLink, withPrefix} from 'gatsby'
import React from 'react'
import VisuallyHidden from '@primer/gatsby-theme-doctocat/src/components/visually-hidden'
import styles from './nav-items.module.css'

function NavItem({href, children}) {
  const location = useLocation()
  const isCurrent = withPrefix(href) === location.pathname
  return (
    <NavList.Item
      as={GatsbyLink}
      to={href}
      aria-current={isCurrent ? 'page' : null}
    >
      {children}
    </NavList.Item>
  )
}

function NavItems({items}) {
  return (
    <>
      <VisuallyHidden>
        <h3>Site navigation</h3>
      </VisuallyHidden>
      <div className={styles.NavList__Container}>
        <NavList aria-label="Site">
          {items.map((item) => (
            <React.Fragment key={item.title}>
              {item.children ? (
                <NavList.Group title={item.title}>
                  {item.children.map((child) => (
                    <NavItem key={child.title} href={child.url}>
                      {child.title}
                      {child.children ? (
                        <NavList.SubNav>
                          {child.children.map((subChild) => (
                            <NavItem key={subChild.title} href={subChild.url}>
                              {subChild.title}
                            </NavItem>
                          ))}
                        </NavList.SubNav>
                      ) : null}
                    </NavItem>
                  ))}
                </NavList.Group>
              ) : (
                <NavItem href={item.url}>{item.title}</NavItem>
              )}
            </React.Fragment>
          ))}
        </NavList>
      </div>
    </>
  )
}

export default NavItems
