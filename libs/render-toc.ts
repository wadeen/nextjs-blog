import parse from 'html-react-parser'
import { parseItemType } from 'types/parseItemType'

export const renderToc = (content: string) => {
  // 記事をパース
  const contentBody = parse(content)

  // 記事の中から`h2`, `h3`のみパース
  // @ts-ignore // ToDo: filterのエラー解決
  const tocItem = contentBody.filter(
    (elem: parseItemType) => elem.type === 'h2' || elem.type === 'h2'
  )

  const toc = tocItem.map((elem: any) => ({
    text: elem.props.children,
    id: elem.props.id,
  }))

  return toc
}
