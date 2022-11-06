/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { NextPage } from 'next'
import { mediaQuery } from 'src/utils/Breakpoints'
const ArticleTitle: NextPage<{ text: string }> = ({ text }) => (
  <p css={topTitle}>{text}</p>
)

export default ArticleTitle


// css
const topTitle = css`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 20px;
  padding-left: 25px;
  position: relative;
  font-family: var(--fontMain);
  ${mediaQuery[1]} {
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
