/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { NextPage } from 'next'
import { useRecoilValue } from 'recoil'
import { stateToc } from '../../store/stateToc'
import { mediaQuery } from '../../utils/Breakpoints'
import { TocType } from 'types/tocType'

export const TableOfContents: NextPage = () => {
  const toc = useRecoilValue(stateToc)

  return (
    <div css={container}>
      <h2>目次</h2>
      <ul>
        {toc.map((data: TocType) => (
          <li key={data.id}>
            <a href={`#${data.id}`}>{data.text}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

// css
const container = css`
  background-color: #f3f5f8;
  margin: 50px 0 30px;
  padding: 40px 50px;
  border-radius: 6px;
  border: 2px solid var(--cSub);
  ${mediaQuery[1]} {
    margin: 30px auto;
    padding: 20px;
  }
  h2 {
    font-size: 2.6rem;
    font-weight: 700;
    border-left: 4px solid var(--cSub);
    padding-left: 10px;
    line-height: 1.5;
    margin-bottom: 25px;
    ${mediaQuery[1]} {
      font-size: 2.2rem;
      border-left: 3px solid var(--cSub);
      margin-bottom: 20px;
    }
  }
  ul {
    li {
      font-size: 1.6rem;
      line-height: 1.5;
      margin-bottom: 10px;
      font-weight: 700;
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
