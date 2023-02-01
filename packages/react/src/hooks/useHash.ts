import {useState, useEffect, useCallback} from 'react'

export function useHash() {
  const [hash, setHash] = useState(() => window.location.hash)

  const hashChangeHandler = useCallback(() => {
    setHash(window.location.hash)
  }, [])

  useEffect(() => {
    window.addEventListener('hashchange', hashChangeHandler)
    return () => {
      window.removeEventListener('hashchange', hashChangeHandler)
    }
  }, [hashChangeHandler])

  return hash
}

// const useReactPath = () => {
//   const [path, setPath] = React.useState(window.location.pathname);
//   const listenToPopstate = () => {
//     const winPath = window.location.pathname;
//     setPath(winPath);
//   };
//   React.useEffect(() => {
//     window.addEventListener("popstate", listenToPopstate);
//     return () => {
//       window.removeEventListener("popstate", listenToPopstate);
//     };
//   }, []);
//   return path;
// };

// export function useWindowSize() {
//   const [windowSize, setWindowSize] = useState<WindowSize>({
//     width: undefined, // undefined to avoid client/server mismatch on initial mount
//     height: undefined, // undefined to avoid client/server mismatch on initial mount,
//     isLarge: undefined // undefined to avoid client/server mismatch on initial mount,
//   })

//   useEffect(() => {
//     // should only execute all the code below on client
//     function handleResize() {
//       setWindowSize({
//         width: window.innerWidth,
//         height: window.innerHeight,
//         /*
//          * Maps to large breakpoint
//          * TODO: replace with design token. Requires remToPx util.
//          */
//         isLarge: window.innerWidth >= 1012
//       })
//     }

//     // eslint-disable-next-line github/prefer-observers
//     window.addEventListener('resize', handleResize)

//     handleResize()

//     return () => window.removeEventListener('resize', handleResize)
//   }, [])

//   return windowSize
// }
