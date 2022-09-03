/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { collection, onSnapshot } from 'firebase/firestore'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { db } from '../../../../libs/firebase'
import { comments } from '../../../../types/comments'
import CommentAdd from './CommentAdd'

const Comment: NextPage = () => {
  const [comments, setComments] = useState<any>([])

  useEffect(() => {
    const commentsData = collection(db, 'comments')
    onSnapshot(commentsData, (snapshot: any) => {
      setComments(snapshot.docs.map((doc: any) => doc.data()))
    })
  }, [])

  // 日時調整
  dayjs.extend(utc)
  dayjs.extend(timezone)

  return (
    <div css={comment}>
      <h2>この記事へのコメント</h2>
      <ul css={commentList}>
        {comments.map(({ name, date, text }: any) => {
          const firestoreCommentDate = new Date(date.seconds * 1000)
          const firestoreComment = dayjs
            .utc(firestoreCommentDate)
            .tz('Asia/Tokyo')
            .format('YYYY.MM.DD')
          return (
            <li key={date.seconds}>
              <p css={commentName}>{name}</p>
              <p>{text}</p>
              <p css={commentDate}>{firestoreComment}</p>
            </li>
          )
        })}
      </ul>
      <CommentAdd />
    </div>
  )
}

export default Comment

// css
const comment = css`
  margin: 30px 0;
  width: 100%;
  font-family: var(--fontMain);
  background-color: #f4f1ee;
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
  margin-bottom: 60px;
  li {
    position: relative;
    margin-bottom: 50px;
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
