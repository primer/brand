import {Box, TextInput} from '@primer/react'
import {Text, Stack} from '@primer/react-brand'
import {SearchIcon} from '@primer/octicons-react'
import React, {useState} from 'react'
import navItems from '../nav.yml'
import {HEADER_HEIGHT} from './header'
import NavItems from './nav-items'

function usePersistentScroll(id) {
  const ref = React.useRef()

  const handleScroll = React.useCallback(
    // Save scroll position in session storage on every scroll change
    (event) => window.sessionStorage.setItem(id, event.target.scrollTop),
    [id],
  )

  React.useLayoutEffect(() => {
    // Restore scroll position when component mounts
    const scrollPosition = window.sessionStorage.getItem(id)
    if (scrollPosition && ref.current) {
      ref.current.scrollTop = scrollPosition
    }
  }, [id])

  // Return props to spread onto the scroll container
  return {
    ref,
    onScroll: handleScroll,
  }
}

function Sidebar({hideBorder}) {
  const scrollContainerProps = usePersistentScroll('sidebar')
  const [filter, setFilter] = useState('')

  const handleFilterChange = (e) => {
    setFilter(e.target.value.toLowerCase())
  }

  const filterNavItems = (item) => {
    if (item.title.toLowerCase().includes(filter)) {
      return true
    }
    if (item.children) {
      // Filter children that match the filter
      const filteredChildren = item.children.filter((child) =>
        child.title.toLowerCase().includes(filter),
      )
      // If there are any matching children, return a new item with filtered children
      if (filteredChildren.length > 0) {
        return {
          ...item,
          children: filteredChildren,
        }
      }
    }
    return false
  }

  const filteredNavItems = navItems
    .map((item) => {
      if (filterNavItems(item)) {
        return item.children
          ? {...item, children: item.children.filter(filterNavItems)}
          : item
      }
      return null
    })
    .filter(Boolean)

  return (
    <Box
      sx={{
        position: 'sticky',
        top: HEADER_HEIGHT,
        height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        width: 280,
        fontFamily: 'var(--brand-fontStack-sansSerif)',
      }}
    >
      <Box
        {...scrollContainerProps}
        style={{overflow: 'auto'}}
        sx={{
          borderWidth: 0,
          borderRightWidth: hideBorder ? 0 : 1,
          borderRadius: 0,
          height: '100%',
          borderStyle: 'solid',
          borderColor: 'border.subtle',
          padding: 'var(--base-size-24)',
        }}
      >
        <Stack padding="none">
          <Text size="400" weight="semibold">
            Brand UI
          </Text>
          <div>
            <TextInput
              leadingVisual={SearchIcon}
              placeholder="Search"
              block
              onChange={handleFilterChange}
            />
            <Box sx={{marginInline: `calc(var(--base-size-16) * -1)`}}>
              <NavItems items={filteredNavItems} />
            </Box>
          </div>
        </Stack>
      </Box>
    </Box>
  )
}

export default Sidebar
