/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { NextPage } from 'next'
import { MicrocmsData } from '../../../../types/microcmsData'
import { AsideTableOfContents } from '../../molecules/aside/AsideTableOfContents'
import SearchForm from '../../molecules/aside/SearchForm'
import AsideCategory from '../../organisms/aside/AsideCategory'
import AsidePopular from '../../organisms/aside/AsidePopular'
import AsideProfile from '../../organisms/aside/AsideProfile'
import AsideBase from './AsideBase'
import Share from 'src/components/molecules/Share'
import { Spacer } from 'src/components/molecules/Spacer'
import { mediaQuery } from 'src/utils/Breakpoints'
import { CategoryCountAndPost } from 'types/CategoryCountAndPost'

type Props = {
  post: MicrocmsData
  categoryData: CategoryCountAndPost[]
}

const AsidePost = ({ post, categoryData }: Props) => {
  return (
    <AsideBase>
      {post.toc_visible ? (
        <>
          {/* 目次ありの場合 */}
          <AsideProfile />
          <Spacer size={30} />
          <AsideCategory categoryData={categoryData} />
          <Spacer size={30} />
          <AsidePopular />
          <Spacer size={30} />
          <div css={sticky}>
            <SearchForm />
            <Spacer size={30} />
            <AsideTableOfContents />
            <Spacer size={30} />
            <Share />
          </div>
        </>
      ) : (
        <>
          {/* 目次なしの場合 */}
          <AsideProfile />
          <Spacer size={30} />
          <AsideCategory categoryData={categoryData} />
          <Spacer size={30} />
          <div css={sticky}>
            <SearchForm />
            <Spacer size={30} />
            <AsidePopular />
            <Spacer size={30} />
            <Share />
          </div>
        </>
      )}
    </AsideBase>
  )
}

export default AsidePost

// css
const sticky = css`
  display: block;
  width: 100%;
  position: sticky;
  top: 80px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 250px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ${mediaQuery[2]} {
    position: static;
    padding: 0;
    top: 0;
    overflow: hidden;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`
