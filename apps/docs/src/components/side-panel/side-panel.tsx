import React from 'react'
import {useState, useRef} from 'react'
import {IconButton} from '@primer/react'
import {Dialog} from '@primer/react/experimental'
import {ThreeBarsIcon, XIcon} from '@primer/octicons-react'
import styles from './side-panel.module.css'
import {Sidebar} from '@primer/gatsby-theme-doctocat'

export function SidePanel() {
  const [isOpen, setIsOpen] = useState(false)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const openButtonRef = useRef<HTMLButtonElement>(null)

  const openDialog = () => {
    setIsOpen(true)
  }

  const closeDialog = () => {
    setIsOpen(false)
  }

  const renderHeader = ({dialogLabelId}: {dialogLabelId: string}) => (
    <div
      className={styles.Header}
      id={dialogLabelId}
      aria-label="Navigation"
      role="heading"
      aria-level={1}
    >
      <IconButton
        ref={closeButtonRef}
        icon={XIcon}
        variant="default"
        aria-label="Close Navigation"
        onClick={closeDialog}
      />
    </div>
  )

  return (
    <div className={styles.SidePanel}>
      <IconButton
        ref={openButtonRef}
        icon={ThreeBarsIcon}
        variant="default"
        aria-label="Navigation"
        onClick={openDialog}
      />
      {isOpen && (
        <Dialog
          onClose={closeDialog}
          width="small"
          // TODO: get `@primer/react` updated to a version that supports the `position` prop on experimental `Dialog` component
          position="right"
          renderHeader={renderHeader}
          returnFocusRef={openButtonRef}
        >
          <Sidebar hideBorder />
        </Dialog>
      )}
    </div>
  )
}
