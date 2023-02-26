/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { NextPage } from 'next'
import Link from 'next/link'
import useSWR from 'swr'
import crownImage from '../../../../public/images/icon/crown.png'
import AsideTitle from '../../atoms/aside/AsideTitle'
import { client } from 'libs/client'
import { PostDataType } from 'types/PostDataType'
import { MicrocmsApi } from 'types/microcmsApi'
import { MicrocmsData } from 'types/microcmsData'

type PopularType = Pick<PostDataType, 'categoryName' | 'id' | 'title'>

const AsidePopular: NextPage = () => {
  async function fetchMicrocmsData(): Promise<PopularType[]> {
    const microcmsData = await client.getList({
      endpoint: 'posts',
      queries: {
        limit: 3,
        ids: ['1_ytiaib3-f', 'bdt8y-6q7jmm', 'w0fw6h0qvczu'], // しばらくは3件を固定する
      },
    })

    // microCMSのデータ取得
    const microcmsPostData: PopularType[] = microcmsData.contents.map(
      (item: MicrocmsData) => {
        return {
          id: item.id,
          title: item.title,
          categoryName: item.category.name,
        }
      }
    )
    return microcmsPostData.reverse()
  }

  const { data, error } = useSWR('fetchData', fetchMicrocmsData)
  if (error) console.log(error.message)

  return (
    <div css={container}>
      <AsideTitle text={'Popular'} />
      {/* 人気記事については、v1.2~で実装予定
        しばらくは固定で記事を表示する  */}
      <div css={wrapper}>
        {data?.map((post) => (
          <article key={post.id} css={article}>
            <Link href={`/posts/${post.id}`} css={link}>
              <div css={titleWrapper}>
                <h3 css={title}>{post.title}</h3>
              </div>
              <p css={category}>{post.categoryName}</p>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}

export default AsidePopular

// css
const container = css`
  display: block;
  width: 100%;
`

const wrapper = css`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
`

const article = css`
  border: 1px solid var(--cSub);
  border-radius: 4px;
  padding: 10px;
  padding-left: 15px;
  background-color: #fff;
  position: relative;
  border-left: 6px solid var(--cSub);
  font-family: var(--fontMain);
  font-weight: 700;

  &:first-of-type {
    &::before {
      content: '';
      display: inline-block;
      background-image: url(${crownImage.src});
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      width: 50px;
      height: 30px;
      position: absolute;
      top: -15px;
      right: -15px;
      transform: rotate(20deg);
    }
  }

  &:hover {
    border-color: var(--cMain);
  }
`

const link = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const titleWrapper = css`
  display: flex;
  align-items: center;
  min-height: 36px;
`

const title = css`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`

const category = css`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  font-size: 1.1rem;
  width: 100%;
  margin-top: 8px;
`
