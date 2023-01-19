export type MicrocmsData = {
  category: {
    id: string
    name: string
  }
  content: {
    fieldId?: string
    richEditor?: string
    html?: string
  }[]
  eyecatch: {
    url: string
    width: number
    height: number
  }
  id: string
  name: string
  title: string
  createdAt: string
  updatedAt: string
  toc_visible: boolean
  description: string
  post: string
}
