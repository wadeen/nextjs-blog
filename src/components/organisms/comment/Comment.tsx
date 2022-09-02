/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { NextPage } from 'next'

const Comment: NextPage = () => {
  return (
    <div css={comment}>
      <h2>この記事へのコメント</h2>
      <ul css={commentList}>
        <li>
          <p css={commentName}>
            {true ? (
              <a href="" target="_blank">
                匿名さん
              </a>
            ) : (
              <>匿名さん</>
            )}
          </p>
          <p>
            kフォアkフォアfかjfkl亜jkfじゃkljf化jflかjflkじゃklfdJALkjファlkjfkljflかjklfじゃklfじゃlkfjdlかjflあjklfjlkjfkぁjklじゃlふぁjkfdjflhfkljdfじょfhghじゃほphksjqkffhqihlkjfkjkj
            lhipjflkafkj
          </p>
          <p css={commentDate}>2022.04.24</p>
        </li>
        <li>
          <p css={commentName}>匿名さん</p>
          <p>
            kフォアkフォアfかjfkl亜jkfじゃkljf化jflかjflkじゃklfdJALkjファlkjfkljflかjklfじゃklfじゃlkfjdlかjflあjklfjlkjfkぁjklじゃlふぁjkfdjflhfkljdfじょfhghじゃほphksjqkffhqihlkjfkjkj
            lhipjflkafkj
          </p>
          <p css={commentDate}>2022.04.24</p>
        </li>
        <li>
          <p css={commentName}>匿名さん</p>
          <p>
            kフォアkフォアfかjfkl亜jkfじゃkljf化jflかjflkじゃklfdJALkjファlkjfkljflかjklfじゃklfじゃlkfjdlかjflあjklfjlkjfkぁjklじゃlふぁjkfdjflhfkljdfじょfhghじゃほphksjqkffhqihlkjfkjkj
            lhipjflkafkj
          </p>
          <p css={commentDate}>2022.04.24</p>
        </li>
      </ul>
    </div>
  )
}

export default Comment

// css

const comment = css`
  margin: 30px 0;
  width: 100%;

  background-color: #faf2e8;
  border-radius: 8px;
  padding: 30px 30px;
  border: 1px solid var(--cBorder);
  h2 {
    font-size: 2.2rem;
    font-weight: 700;
    margin-bottom: 20px;
    padding-bottom: 5px;
    border-bottom: 1px dashed var(--cBorder);
  }
`

const commentList = css`
  letter-spacing: 0.04em;
  line-height: 1.4;
  li {
    position: relative;
    margin-bottom: 30px;
  }
`

const commentName = css`
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 8px;
`

const commentDate = css`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 1.4rem;
  color: gray;
`
