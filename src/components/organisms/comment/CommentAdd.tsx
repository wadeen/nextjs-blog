/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { NextPage } from 'next'
const CommentAdd: NextPage = () => {
  return (
    <div css={commentAdd}>
      <h3 css={title}>お気軽にコメント残してください📝</h3>
      <dl>
        <div css={container}>
          <dt>
            <label htmlFor="name">名前：</label>
          </dt>
          <dd>
            <input type="text" id="name" />
          </dd>
        </div>
        <div css={container}>
          <dt>
            <label htmlFor="text">内容：</label>
          </dt>
          <dd>
            <textarea id="text" />
          </dd>
        </div>
      </dl>
      <button type="submit" css={button}>
        公開
      </button>
    </div>
  )
}

export default CommentAdd

const commentAdd = css`
  padding-top: 60px;
  position: relative;
  &::before {
    content: "";
    display: inline-block;
    width: 100%;
    height: 1px;
    background-color: var(--cBorder);
    position: absolute;
    top: 0;
  }
`

const title = css`
  text-align: center;
  font-size: 2.4rem;
  font-weight: 500;
  margin-bottom: 30px;
`

const container = css`
  display: flex;
  margin-bottom: 20px;
  dt {
    width: 60px;
  }
  dd {
    width: calc(100% - 60px);
    font-size: 1.4rem;
    input {
      background-color: #fff;
      width: 100%;
      border-radius: 2px;
      height: 40px;
      padding: 4px 6px;
    }
    textarea {
      background-color: #fff;
      width: 100%;
      max-width: 617px;
      min-height: 200px;
      border-radius: 4px;
      padding: 10px;
    }
  }
`

const button = css`
  display: block;
  text-align: center;
  margin: 10px auto;
  width: 160px;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  border-radius: 4px;
  background-color: #7fb1f3;
  border: 1px solid var(--cBorder);
`
