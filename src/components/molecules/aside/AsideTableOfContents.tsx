/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { NextPage } from 'next'
import { useRecoilState } from 'recoil'
import { stateToc } from '../../../store/stateToc'
import { mq } from 'src/components/Breakpoints'
import { tocType } from 'types/tocType'

export const AsideTableOfContents: NextPage = () => {
  const [toc, setToc] = useRecoilState(stateToc) // Recoil

  return (
    <div css={container}>
      <h2>目次</h2>
      <ul>
        {toc.map((data: tocType) => (
          <li key={data.id}>
            <a href={`#${data.id}`}>{data.text}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

const container = css`
  background-color: #fff;
  margin: 10px 0;
  padding: 20px;
  border-radius: 6px;
  border: 2px solid var(--cSub);
  ${mq[2]} {
    display: none;
  }
  h2 {
    font-size: 2.2rem;
    font-weight: 700;
    border-left: 3px solid var(--cSub);
    padding-left: 10px;
    line-height: 1.5;
    margin-bottom: 20px;
  }
  ul {
    li {
      font-size: 1.4rem;
      line-height: 1.5;
      margin-bottom: 15px;
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
