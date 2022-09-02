/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { NextPage } from 'next'
import Link from 'next/link'
import { microcmsData } from '../../../../types/microcmsData'
import AsideTitle from 'src/components/atoms/aside/AsideTitle'

const AsideCategory: NextPage = () => {
  const { error, data } = useQuery(['category'], () =>
    axios.get(
      `https://${process.env.NEXT_PUBLIC_MICROCMS_ACCESS_KEY}.microcms.io/api/v1/categories`,
      {
        headers: {
          'X-MICROCMS-API-KEY': process.env
            .NEXT_PUBLIC_MICROCMS_API_KEY as string,
        },
      }
    )
  )

  if (error) {
    // @ts-ignore
    console.log(error.message)
  }

  // カテゴリの取得結果の判定
  return data ? (
    <>
      <AsideTitle text={'Category'} />
      <ul css={categoryList}>
        {data.data.contents.map((category: microcmsData) => (
          <li key={category.id}>
            <Link href={`/category/${category.id}`}>
              <a>{category.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  ) : null
}

export default AsideCategory

const categoryList = css`
  li {
    font-size: 1.6rem;
    line-height: 2;
    letter-spacing: 0.04em;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid var(--cSub);
    border-left: 6px solid var(--cSub);
    &:hover {
      border-color: var(--cMain);
    }
    a {
      display: block;
      width: 100%;
      height: 100%;
      padding-left: 15px;
    }
    &:not(:last-of-type) {
      margin-bottom: 10px;
    }
  }
`

const loadingIcon = css`
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`
