/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Link from 'next/link'
import AsideTitle from 'src/components/atoms/aside/AsideTitle'
import { CategoryCountAndPost } from 'types/microCms'

type Props = {
  categoryData: CategoryCountAndPost[]
}

const AsideCategory = ({ categoryData }: Props) => {
  return (
    <>
      <AsideTitle text={'Category'} />
      <ul css={categoryList}>
        {categoryData.map((categoryData: CategoryCountAndPost) => (
          <li
            key={categoryData.categoryId}
            css={categoryData.totalCount === '0' && isDisabledStyle}
          >
            <Link href={`/category/${categoryData.categoryId}`}>
              {categoryData.categoryName}
              <span css={totalCount}>({categoryData.totalCount})</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default AsideCategory

// css
const categoryList = css`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  li {
    font-size: 1.6rem;
    line-height: 2.2;
    letter-spacing: 0.04em;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid var(--cSub);
    border-left: 6px solid var(--cSub);
    width: calc((100% - 8px) / 2);
    &:hover {
      border-color: var(--cMain);
    }
    a {
      display: block;
      width: 100%;
      height: 100%;
      padding-left: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      letter-spacing: 0.002em;
      font-size: 14px;
    }
  }
`

const totalCount = css`
  display: inline-block;
  margin-left: 5px;
  font-size: 12px;
`

const isDisabledStyle = css`
  opacity: 0.65;
  pointer-events: none;
`

// const loadingIcon = css`
//   margin-top: 30px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `

// const loading = css`
//   display: grid;
//   place-content: center;
//   width: 100%;
//   height: 250px;
// `

// const loadingText = css`
//   display: block;
//   margin-top: 15px;
// `
