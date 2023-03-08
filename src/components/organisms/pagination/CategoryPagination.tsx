/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { PER_PAGE } from 'libs/per-page'
import { paginationRange } from 'src/utils/paginationRange'

type Props = {
  totalCount: number
  category: string
}

export const CategoryPagination: NextPage<Props> = ({
  totalCount,
  category,
}) => {
  const router = useRouter()

  return (
    <ul css={pagination}>
      {paginationRange(1, Math.ceil(totalCount / PER_PAGE)).map(
        (number, index) => (
          <li key={index}>
            <Link
              href={`/category/${category}/${number}`}
              css={link}
              className={
                router.asPath.endsWith(`${number}`)
                  ? 'is-current'
                  : '' || router.asPath.endsWith(`${category}`)
                  ? 'is-current'
                  : ''
              }
            >
              {number}
            </Link>
          </li>
        )
      )}
    </ul>
  )
}

// css
const pagination = css`
  margin-top: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 20px;
  li {
    &:first-of-type {
      .is-first-current {
        background-color: var(--cPagination);
        color: #fff;
        pointer-events: none;
      }
    }
  }
`

const link = css`
  display: block;
  width: 30px;
  height: 30px;
  line-height: 26px;
  text-align: center;
  cursor: pointer;
  border-radius: 3px;
  transition: opacity 0.3s ease;
  font-size: 2rem;
  &.is-current {
    background-color: var(--cPagination);
    color: #fff;
    pointer-events: none;
  }
  &:hover {
    opacity: 0.8;
  }
`
