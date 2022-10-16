/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { NextPage } from 'next'

const AsideTitle: NextPage<{ text: string }> = ({ text }) => {
  return <h2 css={title}>{text}</h2>
}

export default AsideTitle

// css
const title = css`
  font-family: var(--fontEN);
  font-size: 2.2rem;
  letter-spacing: 0.04em;
  font-weight: 700;
  margin-bottom: 15px;
`
