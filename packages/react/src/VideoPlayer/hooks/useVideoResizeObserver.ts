import {type RefObject, useEffect, useState} from 'react'

// TODO Once Safari 18 is released we can drop this in favour of container queries
export const useVideoResizeObserver = ({
  videoWrapperRef,
  className,
}: {
  videoWrapperRef: RefObject<HTMLElement>
  className: string
}) => {
  const [isSmall, setIsSmall] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (!videoWrapperRef.current) return

      const breakpoint = videoWrapperRef.current.getBoundingClientRect().width

      const isSmallVideo = Boolean(breakpoint && breakpoint < 650)
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

    resizeObserver.observe(videoWrapperRef.current as Element)
    return () => {
      resizeObserver.unobserve(currentRef as Element)
    }
  }, [className, videoWrapperRef])

  return isSmall
}
