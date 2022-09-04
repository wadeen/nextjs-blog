// @ts-nocheck
import * as cheerio from 'cheerio'
import { NextPage } from 'next'

export const renderToc: NextPage = (content) => {
  const $ = cheerio.load(content)
  const headings = $('h1, h2, h3').toArray()
  const toc = headings.map((data) => ({
    text: data.children[0].data,
    id: data.attribs.id,
  }))

  return toc
}
