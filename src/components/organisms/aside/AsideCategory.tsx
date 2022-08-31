/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { NextPage } from 'next'
import Link from 'next/link'
import { client } from '../../../../libs/client'
import { microcmsData } from '../../../../types/microcmsData'
import AsideTitle from '../../atoms/AsideTitle'
const AsideCategory = ({ blog, category }: any) => {
  console.log('blog', blog)
  // console.log('category', category)

  //✋any
  return (
    <div css={container}>
      <AsideTitle text={'Category'} />

      <div>
        <ul>
          {/* {category.map(
            (
              category: any //✋any
            ) => (
              <li key={category.id}>
                <Link href={`/category/${category.id}`}>
                  <a>{category.name}</a>
                </Link>
              </li>
            )
          )} */}
        </ul>
        <ul>
          {/* {blog.map((blog: any) => ( //✋any
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>
              <a>{blog.title}</a>
            </Link>
          </li>
        ))} */}
        </ul>
      </div>
    </div>
  )
}

export default AsideCategory

const container = css`
  background-color: #fff;
`

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: 'posts' })
  // カテゴリーコンテンツの取得
  // const categoryData = await client.get({ endpoint: 'categories' })

  console.log('data', data)
  // console.log('categoryData', categoryData)
  return {
    props: {
      blog: data.contents,
      // category: categoryData.contents,
    },
  }
}
