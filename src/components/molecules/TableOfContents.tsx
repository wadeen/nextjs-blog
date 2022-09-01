/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { NextPage } from 'next'
import { toc } from '../../../types/toc'

export const TableOfContents: NextPage<{ toc: toc[] }> = ({ toc }) => {
  return (
    <div css={container}>
      <h2>目次</h2>
      <ul>
        {toc.map((data) => (
          <li key={data.id}>
            <a href={`#${data.id}`}>{data.text}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

const container = css`
  background-color: #f3f5f8;
  margin: 50px 0 30px;
  padding: 40px 50px;
  border-radius: 6px;
  border: 2px solid var(--cSub);
  h2 {
    font-size: 2.6rem;
    font-weight: 700;
    border-left: 4px solid var(--cSub);
    padding-left: 10px;
    line-height: 1.5;
    margin-bottom: 25px;
  }
  ul {
    li {
      font-size: 1.6rem;
      line-height: 1.5;
      margin-bottom: 10px;
      font-weight: 500;
      font-family: var(--fontMain);
      display: flex;
      align-items: center;
      column-gap: 15px;
      &::before {
        content: '';
        display: inline-block;
        width: 10px;
        height: 2px;
        background-color: var(--cSub);
      }
      a {
        transition: opacity 0.3s ease;
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
`
