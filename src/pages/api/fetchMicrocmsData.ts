import { NextPage } from 'next'
import { client } from 'libs/client'
import { dateToString } from 'src/utils/dateToString'
import { PostDataType } from 'types/PostDataType'
import { MicrocmsApi } from 'types/microcmsApi'
import { MicrocmsData } from 'types/microcmsData'

type Props = {
  [key: string]: {
    offset?: number
    limit?: number
  }
}

const fetchMicrocmsData = async ({ queries }: Props) => {
  const microcmsData = await client.get<MicrocmsApi>({
    endpoint: 'posts',
    queries: queries ?? { limit: 6 },
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
