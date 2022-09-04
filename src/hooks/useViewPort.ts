import { useLayoutEffect, useState } from 'react'

const standardWidth = 375

const getViewport = ({ width }: { width: string }) => {
  return `width=${width},maximum-scale=1.0`
}

export const useViewport = () => {
  const [viewport, setViewport] = useState<string>(
    'width=device-width,initial-scale=1.0,maximum-scale=1.0'
  )

  useLayoutEffect(() => {
    setViewport(
      getViewport({
        width: `${
          window.outerWidth > standardWidth ? 'device-width' : standardWidth
        }`,
      })
    )
  }, [])

  return { viewport }
}
