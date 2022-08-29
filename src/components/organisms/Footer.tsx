/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { NextPage } from 'next'



const Footer: NextPage = () => {
  return (
    <div css={footer}>
      <small>&copy; 2022 wadeen</small>
    </div>
  )
}

export default Footer

const footer = css`
  width: 100%;
  height: 40px;
  background-color: var(--cFooter);
  small {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 1.4rem;
    height: 100%;
  }
`
