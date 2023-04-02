import Parser from 'rss-parser'
import { dateToString } from 'src/utils/dateToString'
import { ZennPostType } from 'types/ZennPostType'

// ZennのアカウントID
const zennId = 'wadeen'

const fetchZennData = async () => {
  const parser: Parser<unknown, ZennPostType> = new Parser({
    customFields: {
      item: [
        'creator',
        'title',
        'pubDate',
        'link',
        'isoDate',
        'guid',
        'enclosure',
        'creator',
        'contentSnippet',
        'content',
      ],
    },
  })

  // ToDo: catchを使うと型はどうなる？
  const { items } = await parser.parseURL(
    `https://zenn.dev/${zennId}/feed?all=1`
  )
  // .catch((err) => console.log('以下のエラーが発生しました。\n', err))

  const zennPostData = items.map((item: ZennPostType) => {
    const created_at = dateToString(item.pubDate, 'YYYY/MM/DD')
    return {
      id: item.link,
      title: item.title,
      content: item.content,
      created_at,
      updated_at: null,
      categoryName: 'Zenn',
      categoryId: 'zenn',
      isZenn: true,
      eyecatch: null, // ここで指定するとエラー出るためファイルで画像の指定する
      description: '', // 詳細ページないため不要
      updatedAt: '', // 詳細ページないため不要(一覧ページも投稿日のみでOK)
    }
  })

  return zennPostData
}

export default fetchZennData
