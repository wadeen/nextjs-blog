/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import NextPage from 'next'
import { mq } from 'src/components/Breakpoints'
const ArticleTitle = ({ text }: { text: string }) => (
  <p css={topTitle}>{text}</p>
)

export default ArticleTitle

const topTitle = css`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 20px;
  padding-left: 25px;
  position: relative;
  font-family: var(--fontMain);
  ${mq[1]} {
      font-size: 1.6rem;
  }

  &::before {
    content: '';
    display: block;
    background-color: #333;
    width: 16px;
    height: 2px;
    transform: translateY(-50%);
    top: 50%;
    left: 0;
    position: absolute;
  }
`
