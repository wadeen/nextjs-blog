/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { mq } from 'src/components/Breakpoints'

const BasicPagination: NextPage<{ totalCount: number }> = ({ totalCount }) => {
  const PER_PAGE = 10
  const router = useRouter()

  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i)

  return (
    <ul css={pagination}>
      {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
        <li key={index}>
          <Link href={`/posts/page/${number}`}>
            <a
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
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default BasicPagination

// css
const pagination = css`
  margin-top: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 20px;
  ${mq[1]} {
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
  line-height: 30px;
  text-align: center;
  cursor: pointer;
  border-radius: 3px;
  transition: opacity 0.3s ease;
  font-size: 2rem;
  ${mq[1]} {
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
