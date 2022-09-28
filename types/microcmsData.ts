export type MicrocmsData = {
  category: {
    id: string
    name: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    revisedAt: string
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
  publishedAt: string
  revisedAt: string
  title: string
  updatedAt: string
  created_at: string
  updated_at: string
  toc_visible: boolean
  description: string
}
