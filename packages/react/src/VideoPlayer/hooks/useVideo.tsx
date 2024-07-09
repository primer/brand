import React, {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useReducer,
  type PropsWithChildren,
  type RefObject,
  type SetStateAction,
} from 'react'
import {useProvidedRefOrCreate} from '../../hooks/useRef'
import {useIsElementFullScreen} from './useIsElementFullScreen'

type VideoState = {
  ref: RefObject<HTMLVideoElement>
  isPlaying: boolean
  isMuted: boolean
  volume: number
  volumeBeforeMute: number | null
  ccEnabled: boolean
  duration: number
}

type Action =
  | {type: 'play'}
  | {type: 'pause'}
  | {type: 'mute'}
  | {type: 'unmute'}
  | {type: 'setVolume'; payload: number}
  | {type: 'enableCC'}
  | {type: 'disableCC'}
  | {type: 'setDuration'; payload: number}

const VideoContext = createContext<Context | null>(null)

const videoReducer = (state: VideoState, action: Action): VideoState => {
  const video = state.ref.current

  if (!video) {
    // eslint-disable-next-line no-console
    console.error('Video element is not available, ignoring action', action)
    return state
  }

  switch (action.type) {
    case 'play': {
      video.play()
      return {...state, isPlaying: true}
    }
    case 'pause': {
      video.pause()
      return {...state, isPlaying: false}
    }
    case 'mute': {
      video.volume = 0
      return {...state, isMuted: true, volumeBeforeMute: state.volume}
    }
    case 'unmute': {
      const nextVolume = state.volumeBeforeMute ?? 1
      video.volume = nextVolume
      return {...state, isMuted: false, volume: nextVolume}
    }
    case 'setVolume': {
      video.volume = action.payload
      return {...state, volume: action.payload}
    }
    case 'enableCC': {
      return {...state, ccEnabled: true}
    }
    case 'disableCC': {
      return {...state, ccEnabled: false}
    }
    case 'setDuration': {
      return {...state, duration: action.payload}
    }
    default:
      return state
  }
}

type Context = VideoState & {
  play: () => void
  pause: () => void
  togglePlaying: () => void
  mute: () => void
  unmute: () => void
  toggleMute: () => void
  setVolume: (volumeValOrFn: SetStateAction<number>) => void
  seek: (time: number) => void
  seekToPercent: (percent: number) => void
  seekRelative: (secondsValOrFn: SetStateAction<number>) => void
  enableCC: () => void
  disableCC: () => void
  toggleCC: () => void
  enterFullScreen: () => void
  exitFullScreen: () => void
  toggleFullScreen: () => void
  setDuration: (duration: number) => void
  isFullScreen: boolean
}

export const useVideo = () => {
  const context = useContext(VideoContext)

  if (!context) {
    throw new Error('useVideo must be used within a VideoContext')
  }

  return context
}

type VideoProviderProps = PropsWithChildren<Record<string, unknown>>

export const VideoProvider = forwardRef<HTMLVideoElement, VideoProviderProps>(({children}, forwardedRef) => {
  const ref = useProvidedRefOrCreate(forwardedRef)

  const [state, dispatch] = useReducer(videoReducer, {
    isPlaying: false,
    isMuted: false,
    volume: 1,
    volumeBeforeMute: null,
    ccEnabled: true,
    ref,
    duration: 0,
  })

  const [isFullScreen, setIsFullScreen] = useIsElementFullScreen(ref.current?.parentElement)

  const value: Context = {
    ...state,
    isFullScreen,
    play: () => dispatch({type: 'play'}),
    pause: () => dispatch({type: 'pause'}),
    togglePlaying: () => dispatch({type: state.isPlaying ? 'pause' : 'play'}),
    mute: () => dispatch({type: 'mute'}),
    unmute: () => dispatch({type: 'unmute'}),
    toggleMute: () => dispatch({type: state.isMuted ? 'unmute' : 'mute'}),
    setVolume: volumeValOrFn => {
      const nextVolume = typeof volumeValOrFn === 'function' ? volumeValOrFn(state.volume) : volumeValOrFn
      const clampedVolume = Math.max(0, Math.min(1, nextVolume))

      dispatch({type: 'setVolume', payload: clampedVolume})
    },
    enableCC: () => {
      dispatch({type: 'enableCC'})
    },
    disableCC: () => dispatch({type: 'disableCC'}),
    toggleCC: () => dispatch({type: state.ccEnabled ? 'disableCC' : 'enableCC'}),
    enterFullScreen: () => setIsFullScreen(true),
    exitFullScreen: () => setIsFullScreen(false),
    toggleFullScreen: () => setIsFullScreen(prev => !prev),
    setDuration: (duration: number) => dispatch({type: 'setDuration', payload: duration}),
    seek: time => {
      const videoRef = state.ref.current
      if (!videoRef) return

      videoRef.currentTime = time
    },
    seekToPercent: percent => {
      const videoRef = state.ref.current
      if (!videoRef) return

      videoRef.currentTime = (percent / 100) * videoRef.duration
    },
    seekRelative: secondsValOrFn => {
      const videoRef = state.ref.current
      if (!videoRef) return

      videoRef.currentTime =
        typeof secondsValOrFn === 'function' ? secondsValOrFn(videoRef.currentTime) : secondsValOrFn
    },
  }

  useEffect(() => {
    const videoRef = state.ref.current

    if (!videoRef) return

    const eventHandlers: Record<string, (event: Event) => void> = {
      play: () => {
        dispatch({type: 'play'})
      },
      playing: () => {
        videoRef.textTracks[0].mode = 'hidden'
      },
      pause: () => {
        dispatch({type: 'pause'})
      },
      ended: () => {
        videoRef.currentTime = 0
      },
      mute: () => {
        dispatch({type: 'mute'})
      },
      unmute: () => {
        dispatch({type: 'unmute'})
      },
      volumechange: () => {
        dispatch({type: 'setVolume', payload: videoRef.volume})
      },
      loadedmetadata: () => {
        dispatch({type: 'setDuration', payload: videoRef.duration})
      },
    }

    for (const [event, handler] of Object.entries(eventHandlers)) {
      videoRef.addEventListener(event, handler)
    }

    return () => {
      for (const [event, handler] of Object.entries(eventHandlers)) {
        videoRef.removeEventListener(event, handler)
      }
    }
  }, [state.ref])

  return <VideoContext.Provider value={value}>{children}</VideoContext.Provider>
})