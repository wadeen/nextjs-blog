import * as cheerio from 'cheerio'
import { tocType } from 'types/tocType'

export const renderToc = (content: string) => {
  const $ = cheerio.load(content)
  const headings = $('h1, h2, h3').toArray()
  const toc = headings.map((data) => ({
    // @ts-ignore ✋
    text: data.children[0].data,
    id: data.attribs.id,
  }))

  return toc
}
