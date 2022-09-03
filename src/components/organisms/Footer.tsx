/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { NextPage } from 'next'

const Footer: NextPage = () => {
  return (
    <div css={footer}>
      <div css={container}>
        <small>&copy; 2022 wadeen</small>
        <small>
          <a href="https://openmoji.org/" target="_blank" rel="noreferrer">
            `OpenMoji`
          </a>
          is licensed under
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/"
            target="_blank"
            rel="noreferrer"
          >
            CC BY-SA 4.0
          </a>
        </small>
      </div>
    </div>
  )
}

export default Footer

const footer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;
  background-color: var(--cFooter);
`

const container = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  letter-spacing: 0.03em;
  color: #fff;
  gap: 5px 0;
  small {
    a {
      margin: 0 5px;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`
