// microCMSのデータ型定義

// データ全体
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
  created_at: string // 作成日時
  updated_at: string // 更新日時
  toc_visible: boolean
  description?: string | null
  post: string
}

export type MicrocmsApi = {
  contents: MicrocmsData[]
  limit: number
  offset: number
  totalCount: number
  id: string
}

export type microCmsPostData = Pick<MicrocmsData, 'id' | 'name'>

// Zennとの紐付け
export type PostDataType = Pick<
  MicrocmsData,
  'id' | 'title' | 'content' | 'description' | 'updated_at' | 'created_at'
> & {
  eyecatch: string
  categoryId: string
  categoryName: string
  isZenn?: boolean
}

// カテゴリーと投稿数
export type CategoryCountAndPost = {
  categoryName: string
  categoryId: string
  totalCount: string
}

// アプリ倉庫
export type StorageType = {
  id: string
  img: {
    url: string
  }
  title: string
  tags: {
    tag: string
  }[]
  message: string
  github: string
  website: string
}
