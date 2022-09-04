/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { NextPage } from 'next'

type Props = {
  text: string
  onClick: () => void
  disabled: boolean
}

const PrimayButton: NextPage<Props> = ({ text, onClick, disabled }) => {
  return (
    <button type="submit" css={button} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  )
}

export default PrimayButton

// css
const button = css`
  display: block;
  text-align: center;
  margin: 10px auto;
  width: 160px;
  height: 40px;
  line-height: 38px;
  color: #fff;
  border-radius: 4px;
  background-color: var(--cSub);
  border: 1px solid var(--cBorder);
  transition: opacity 0.3s ease;
  &:hover {
    opacity: 0.85;
  }
  &:disabled {
    opacity: 0.4;
  }
`
