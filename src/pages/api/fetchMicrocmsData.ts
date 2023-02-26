import { client } from 'libs/client'
import { dateToString } from 'src/utils/dateToString'
import { PostDataType } from 'types/PostDataType'
import { MicrocmsApi } from 'types/microcmsApi'
import { MicrocmsData } from 'types/microcmsData'

// ToDo: limitの引数をオプショナルにして、引数あればそのクエリ等を適用、なければ999件取得にする

// type Queries = {
//   [key: string]: {
//     offset?: number
//     limit?: number
//   }
// }

// type PartialQueries = Partial<Queries>

async function fetchMicrocmsData(): Promise<PostDataType[]> {
  const microcmsData = await client.getList({
    endpoint: 'posts',
    queries: { limit: 999 },
  })

  // microCMSのデータ取得
  const microcmsPostData: PostDataType[] = microcmsData.contents.map(
    (item: MicrocmsData) => {
      const createdAt = dateToString(item.createdAt, 'YYYY/MM/DD')
      const updatedAt = dateToString(item.updatedAt, 'YYYY/MM/DD')
      return {
        id: item.id,
        title: item.title,
        content: item.content,
        description: item.description || null,
        categoryId: item.category.id,
        categoryName: item.category.name,
        updatedAt,
        createdAt,
        eyecatch: item.eyecatch.url,
      }
    }
  )

  return microcmsPostData
}

export default fetchMicrocmsData
