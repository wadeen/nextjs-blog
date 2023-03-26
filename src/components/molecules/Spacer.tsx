/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { NextPage } from 'next'
import { mediaQuery } from 'src/utils/Breakpoints'

type SpacerProps = {
  size: number
  horizontal?: boolean
  spNone?: boolean
}

export const Spacer: NextPage<SpacerProps> = ({ size, horizontal, spNone }) => {
  return (
    <div
      style={
        horizontal
          ? {
              width: size,
              height: 'auto',
              display: 'inline-block',
              flexShrink: 0,
            }
          : { width: 'auto', height: size, flexShrink: 0 }
      }
      css={spNone ? spNoneStyle : ''}
    />
  )
}

const spNoneStyle = css`
  ${mediaQuery[0]} {
    display: none;
  }
`
