import { MicrocmsData } from 'types/microcmsData'

export type PostDataType = Pick<
  MicrocmsData,
  'id' | 'title' | 'content' | 'description' | 'updatedAt' | 'createdAt'
> & {
  eyecatch: string
  categoryId: string
  categoryName: string
  isZenn?: boolean
}
