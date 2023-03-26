import { useState, useEffect } from 'react'

const useScrollHeight = (baseHeight?: number) => {
  const [scrollHeight, setScrollHeight] = useState(false) // 基準高さでbooleanを返す

  const BASE_HEIGHT = baseHeight ? baseHeight : 100

  useEffect(() => {
    window.addEventListener('scroll', () => {
      let height = window.pageYOffset
      height > BASE_HEIGHT ? setScrollHeight(true) : setScrollHeight(false)
    })
  }, [BASE_HEIGHT, scrollHeight])

  return scrollHeight
}

export default useScrollHeight
