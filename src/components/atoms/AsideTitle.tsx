/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { NextPage } from 'next'
import { ReactNode } from 'react'

const AsideTitle = ({ text }: { text: string }) => {
  return <h2 css={title}>{text}</h2>
}

export default AsideTitle

const title = css`
  font-family: var(--fontEN);
  font-size: 2.2rem;
  letter-spacing: 0.04em;
  font-weight: 500;
  margin-bottom: 15px;
`
