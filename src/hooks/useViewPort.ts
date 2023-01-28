import { useEffect, useState } from 'react'

const standardWidth: number = 375
const defaultDeviceViewPort: string =
  'width=device-width,initial-scale=1.0,maximum-scale=1.0'

const getViewport = (width: string) => {
  return `width=${width},maximum-scale=1.0`
}

export const useViewport = () => {
  const [viewport, setViewport] = useState<string>(defaultDeviceViewPort)

  useEffect(() => {
    const newViewPort = getViewport(
      String(window.outerWidth > standardWidth ? 'device-width' : standardWidth)
    )
    setViewport(newViewPort)
  }, [])

  return { viewport }
}
