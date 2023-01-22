import Parser from 'rss-parser'
import zennLogo from '/public/images/icon/zenn_logo.png'
import { dateToString } from '../../utils/dateToString'
import { ZennPostType } from 'types/ZennPostType'

const fetchZennData = async () => {
  const zennId = 'wadeen'

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

  const { items } = await parser.parseURL(
    `https://zenn.dev/${zennId}/feed?all=1`
  )

  const zennPostData = items.map((item: ZennPostType) => {
    const createdAt = dateToString(item.pubDate, 'YYYY/MM/DD')
    return {
      id: item.link,
      title: item.title,
      content: item.content,
      createdAt,
      eyecatch: zennLogo.src,
      categoryName: 'Zenn',
      categoryId: 'Zenn',
      isZenn: true,
      description: null, // 詳細ページないため不要
      updatedAt: null, // 詳細ページないため不要(一覧ページも投稿日のみでOK)
    }
  })

  return zennPostData
}

export default fetchZennData
