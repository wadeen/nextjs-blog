/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { PER_PAGE } from 'libs/per-page'
import { mediaQuery } from 'src/utils/Breakpoints'
import { paginationRange } from 'src/utils/paginationRange'

export const BasicPagination: NextPage<{ totalCount: number }> = ({
  totalCount,
}) => {
  const router = useRouter()
  return (
    <ul css={pagination}>
      {paginationRange(1, Math.ceil(totalCount / PER_PAGE)).map(
        (number, index) => (
          <li key={index}>
            <Link
              href={`/posts/page/${number}`}
              css={link}
              className={
                router.pathname === '/'
                  ? 'is-first-current'
                  : router.asPath.endsWith(`${number}`)
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
  ${mediaQuery[1]} {
    margin-top: 40px;
  }
  li {
    // Homeの時に"1"のみcurrent
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
  ${mediaQuery[1]} {
    font-size: 1.8rem;
  }
  &.is-current {
    background-color: var(--cPagination);
    color: #fff;
    pointer-events: none;
  }
  &:hover {
    opacity: 0.8;
  }
`
