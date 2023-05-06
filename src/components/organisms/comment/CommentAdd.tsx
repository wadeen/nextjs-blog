/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Timestamp, collection, addDoc } from 'firebase/firestore'
import { NextPage } from 'next'
import { useState } from 'react'
import { db } from 'libs/firebase'
import Button from 'src/components/atoms/Button'
import { mediaQuery } from 'src/utils/Breakpoints'

const CommentAdd: NextPage<{ id: string }> = ({ id }) => {
  const [inputName, setInputName] = useState('') // 名前
  const [inputText, setInputText] = useState('') // 内容

  const onClickSubmit = async () => {
    const isPublished = window.confirm('この内容で公開してもいいですか？')
    if (!isPublished) return

    try {
      const docData = {
        name: inputName,
        text: inputText,
        date: Timestamp.now(),
      }

      await addDoc(collection(db, id), docData)
      setInputName('')
      setInputText('')
      alert(
        `公開されました🎉\n不適切なコメントの場合は削除される可能性があります。`
      )
    } catch (e) {
      alert('送信できませんでした。しばらく経ってからやり直してください。')
      console.log(`コメント送信エラー:\n ${e}`)
    }
  }

  return (
    <div css={commentAdd}>
      <h3 css={title}>お気軽にコメント残してください📝</h3>
      <dl>
        <div css={container}>
          <dt>
            <label htmlFor="name">名前：</label>
          </dt>
          <dd>
            <input
              type="text"
              id="name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInputName(e.target.value)
              }
              value={inputName}
              placeholder="ニックネームを入力"
            />
          </dd>
        </div>
        <div css={container}>
          <dt>
            <label htmlFor="text">内容：</label>
          </dt>
          <dd>
            <textarea
              id="text"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setInputText(e.target.value)
              }
              value={inputText}
              placeholder="コメントを入力"
            />
          </dd>
        </div>
      </dl>
      <Button
        onClick={onClickSubmit}
        disabled={inputName === '' || inputText === ''}
      >
        公開
      </Button>
    </div>
  )
}

export default CommentAdd

const commentAdd = css`
  padding-top: 60px;
  position: relative;
  ${mediaQuery[1]} {
    padding-top: 30px;
  }
  &::before {
    content: '';
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
  font-weight: 700;
  margin-bottom: 30px;
  ${mediaQuery[1]} {
    font-size: 1.8rem;
  }
`

const container = css`
  display: flex;
  margin-bottom: 20px;
  dt {
    width: 60px;
    padding-top: 10px;
    ${mediaQuery[1]} {
      font-size: 1.4rem;
      width: 50px;
    }
    label {
      cursor: default;
    }
  }
  dd {
    width: calc(100% - 60px);
    font-size: 1.4rem;
    ${mediaQuery[1]} {
      width: calc(100% - 50px);
    }
    input {
      background-color: #fff;
      width: 100%;
      height: 40px;
      padding: 6px 10px;
      border-radius: 4px;
      border: 1px solid var(--cBorder);
    }
    textarea {
      background-color: #fff;
      /* width: 787px; */
      width: 100%;
      max-width: 100%;
      min-height: 200px;
      border-radius: 4px;
      padding: 10px;
      border: 1px solid var(--cBorder);
    }
  }
`
