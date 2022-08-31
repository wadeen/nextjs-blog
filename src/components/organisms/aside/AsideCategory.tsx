/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from 'axios'
import { NextPage } from 'next'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { microcmsData } from '../../../../types/microcmsData'
import AsideTitle from 'src/components/atoms/AsideTitle'

const AsideCategory: NextPage = () => {
  const [category, setCategory] = useState([])

  useEffect(() => {
    axios
      .get('https://nextjs-blog-wadeen.microcms.io/api/v1/categories', {
        headers: {
          'X-MICROCMS-API-KEY': process.env
            .NEXT_PUBLIC_MICROCMS_API_KEY as string,
        },
      })
      .then((res) => {
        setCategory(res.data.contents)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
      <AsideTitle text={'Category'} />
      <ul css={categoryList}>
        {category.map((categoryName: microcmsData) => (
          <li key={categoryName.id}>
            <Link href={`/category/${categoryName.id}`}>
              <a>{categoryName.name}</a>
            </Link>
          </li>
        ))}
      </ul>
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
    &:not(:last-of-type) {
      margin-bottom: 10px;
    }
  }
`
