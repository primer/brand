import {type RefObject, useEffect, useState} from 'react'

// TODO Once Safari 18 is released we can drop this in favour of container queries
export const useVideoResizeObserver = ({
  videoWrapperRef,
  className,
}: {
  videoWrapperRef: RefObject<HTMLElement | null>
  className: string
}) => {
  const [isSmall, setIsSmall] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (!videoWrapperRef.current) return

      const breakpoint = videoWrapperRef.current.getBoundingClientRect().width

      const isSmallVideo = Boolean(breakpoint && breakpoint < 544)
      setIsSmall(isSmallVideo)

      if (isSmallVideo) {
        videoWrapperRef.current.classList.add(className)
      } else {
        videoWrapperRef.current.classList.remove(className)
      }
    }

    const resizeObserver = new ResizeObserver(_ => {
      if (videoWrapperRef.current) {
        handleResize()
      }
    })

    handleResize()

    const currentRef = videoWrapperRef.current

    if (!currentRef) {
      return () => {
        resizeObserver.disconnect()
      }
    }

    resizeObserver.observe(currentRef)
    return () => {
      resizeObserver.unobserve(currentRef)
    }
  }, [className, videoWrapperRef])

  return isSmall
}
