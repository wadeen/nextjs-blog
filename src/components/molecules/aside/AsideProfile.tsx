/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Image from 'next/image'

const AsideProfile = () => {
  return (
    <div css={container}>
      <p>
        <Image src="/images/chara.png"  width={64} height={64} alt="" />
      </p>
    </div>
  )
}

export default AsideProfile

const container = css`
  background-color: #fff;
  border-radius: 6px;
`
