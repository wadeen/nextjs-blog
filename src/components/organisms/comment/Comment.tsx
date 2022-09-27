/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
  // DocumentData,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../../../libs/firebase'
import { Comments } from '../../../../types/comments'
import CommentAdd from './CommentAdd'
import { dateToString } from 'src/hooks/useDateToString'
import { mediaQuery } from 'src/utils/Breakpoints'

const Comment = ({ id }: { id: string }) => {
  const [comments, setComments] = useState<Comments[]>([])

  useEffect(() => {
    const commentsData = collection(db, id) // 記事のID＝コメントの
    const commentsDataQuery = query(
      commentsData,
      orderBy('date', 'desc'),
      limit(100)
    ) // 最新順に並び替え/最大100件
    onSnapshot(commentsDataQuery, (snapshot) => {
      setComments(snapshot.docs.map((doc: any) => doc.data())) // any型 DocumentData型見直し！
    })
  }, [id])

  return (
    <div css={comment}>
      <h2>この記事へのコメント</h2>
      {comments.length === 0 ? (
        <p css={noComment}>この記事にはまだコメントがありません。</p>
      ) : (
        <>
          <ul css={commentList}>
            {comments.map(({ name, date, text }: Comments) => {
              const firestoreCommentDate = new Date(date.seconds * 1000)
              const firestoreComment = dateToString(firestoreCommentDate,'YYYY.MM.DD')
              return (
                <li key={date.seconds}>
                  <p css={commentName}>{name}</p>
                  <p css={commentDetail}>{text}</p>
                  <p css={commentDate}>{firestoreComment}</p>
                </li>
              )
            })}
          </ul>
        </>
      )}
      <CommentAdd id={id} />
    </div>
  )
}

export default Comment

// css
const comment = css`
  margin: 60px 0;
  width: 100%;
  font-family: var(--fontMain);
  background-color: #f4f1ee;
  border-radius: 8px;
  padding: 30px;
  border: 1px solid var(--cBorder);
  ${mediaQuery[1]} {
    padding: 20px 10px;
  }
  h2 {
    font-size: 2.2rem;
    font-weight: 700;
    margin-bottom: 20px;
    padding-bottom: 5px;
    border-bottom: 1px dashed var(--cBorder);
    ${mediaQuery[1]} {
      font-size: 1.8rem;
      margin-bottom: 10px;
    }
  }
`

const commentList = css`
  letter-spacing: 0.04em;
  line-height: 1.4;
  margin-bottom: 60px;
  li {
    position: relative;
    margin-bottom: 30px;
    background-color: #fff;
    padding: 25px;
    border-radius: 8px;
    ${mediaQuery[1]} {
      padding: 15px;
    }
  }
`

const commentName = css`
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 8px;
  ${mediaQuery[1]} {
    font-size: 1.8rem;
  }
`

const commentDetail = css`
  ${mediaQuery[1]} {
    font-size: 1.6rem;
  }
`

const commentDate = css`
  position: absolute;
  top: 5px;
  right: 15px;
  font-size: 1.4rem;
  color: gray;
  ${mediaQuery[1]} {
    font-size: 1.4rem;
  }
`

const noComment = css`
  padding-bottom: 30px;
`
