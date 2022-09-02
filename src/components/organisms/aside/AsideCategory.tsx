/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { CircularProgress } from '@mui/material'
import axios from 'axios'
import { NextPage } from 'next'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { microcmsData } from '../../../../types/microcmsData'
import AsideTitle from 'src/components/atoms/aside/AsideTitle'

const AsideCategory: NextPage = () => {
  const [category, setCategory] = useState([]) // ✋型設定
  const [loading, setLoading] = useState(true)
  const [getCategory, setGetCategory] = useState(true)

  useEffect(() => {
    axios
      .get(
        `https://${process.env.NEXT_PUBLIC_MICROCMS_ACCESS_KEY}.microcms.io/api/v1/categories`, // ✋型設定
        {
          headers: {
            'X-MICROCMS-API-KEY': process.env
              .NEXT_PUBLIC_MICROCMS_API_KEY as string,
          },
        }
      )
      .then((res) => {
        setCategory(res.data.contents)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        setGetCategory(false)
      })
  }, [])

  return (
    <>
      <AsideTitle text={'Category'} />

      {loading ? (
        <p css={loadingIcon}>
          <CircularProgress />
        </p>
      ) : // カテゴリの取得結果の判定
      getCategory ? (
        <ul css={categoryList}>
          {category.map((categoryName: microcmsData) => (
            <li key={categoryName.id}>
              <Link href={`/category/${categoryName.id}`}>
                <a>{categoryName.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>カテゴリの取得に失敗しました。</p>
      )}
    </>
  )
}

export default AsideCategory

const categoryList = css`
  li {
    font-size: 1.6rem;
    line-height: 2;
    letter-spacing: 0.04em;
    background-color: #fff;
    padding-left: 15px;
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
