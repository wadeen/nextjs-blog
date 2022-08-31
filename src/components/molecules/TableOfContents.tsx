/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { NextPage } from 'next'

export const TableOfContents: NextPage<any> = ({ toc }) => {
  //✋ any
  return (
    <div css={container}>
      <p className="TableOfContentsHead">目次</p>
      <ul>
        {toc.map(
          (
            data: any //✋ any
          ) => (
            <li key={data.id}>
              <a href={`#${data.text}`}>{data.text}</a>
            </li>
          )
        )}
      </ul>
    </div>
  )
}

const container = css`
  background-color: #e3e9ed;
  margin: 50px 0 30px;
`
