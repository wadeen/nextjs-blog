import { client } from 'libs/client'
import { dateToString } from 'src/utils/dateToString'
import { PostDataType, MicrocmsData } from 'types/microCms'

async function fetchMicrocmsData(): Promise<PostDataType[]> {
  const microcmsData = await client.getList({
    endpoint: 'posts',
    queries: { limit: 999 },
  })

  // microCMSのデータ取得
  const microcmsPostData: PostDataType[] = microcmsData.contents.map(
    (item: MicrocmsData) => {
      const created_at = dateToString(item.created_at, 'YYYY/MM/DD')
      const updated_at =
        item.updated_at === undefined
          ? ''
          : dateToString(item.updated_at, 'YYYY/MM/DD')

      return {
        id: item.id,
        title: item.title,
        content: item.content,
        description: item.description || null,
        categoryId: item.category.id,
        categoryName: item.category.name,
        created_at,
        updated_at,
        eyecatch: item.eyecatch.url,
      }
    }
  )

  return microcmsPostData
}

export default fetchMicrocmsData
