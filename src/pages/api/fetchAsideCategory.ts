import fetchZennData from './fetchZennData'
import { client } from 'libs/client'
import { CategoryCountAndPost } from 'types/microCms'

async function fetchAsideCategory(): Promise<CategoryCountAndPost[]> {
  // カテゴリと合計件数が入る配列
  const categoryData: CategoryCountAndPost[] = []

  // microCMSのブログのカテゴリを取得
  const categories = await client.getList({ endpoint: 'categories' })

  // カテゴリ別の記事を取得
  for (const category of categories.contents) {
    const categoryPostData = await client.getList({
      endpoint: 'posts',
      queries: {
        filters: `category[equals]${category.id}`,
        limit: 999,
      },
    })

    // カテゴリ別の記事のカテゴリIDと合計数の代入
    categoryData.push({
      categoryName: category.name,
      categoryId: category.id,
      totalCount: String(categoryPostData.totalCount),
    })
  }

  // Zennの記事を取得

  // Zennデータの取得(api/fetchZennData.ts)
  const zennAllPostData = await fetchZennData()

  // Zenn記事のカテゴリIDと合計数の代入
  categoryData.push({
    categoryName: 'Zenn',
    categoryId: 'zenn',
    totalCount: String(zennAllPostData.length),
  })

  return categoryData
}

export default fetchAsideCategory
