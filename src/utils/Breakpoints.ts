// メディアクエリ
export const breakpoints = [500, 768, 1024]

export const mq = breakpoints.map(
  (bp) => `@media screen and (max-width: ${bp}px)`
)
