/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useRecoilState } from 'recoil'
import { renderToc } from '../../../../libs/render-toc'
import { microcmsData } from '../../../../types/microcmsData'
import { stateToc } from '../../../store/stateToc'
import { Spacer } from '../../atoms/articleTitle/Spacer'
import { AsideTableOfContents } from '../../molecules/aside/AsideTableOfContents'
import SearchForm from '../../molecules/aside/SearchForm'
import AsideCategory from '../../organisms/aside/AsideCategory'
import AsidePopular from '../../organisms/aside/AsidePopular'
import AsideProfile from '../../organisms/aside/AsideProfile'
import AsideBase from './AsideBase'
import { mq } from 'src/components/Breakpoints'
import Share from 'src/components/molecules/Share'

const AsidePost = ({ post }: { post: microcmsData }) => {
  return (
    <AsideBase>
      {post.toc_visible ? (
        <>
          {/* 目次ありの場合 */}
          <AsideProfile />
          <Spacer size={30} />
          <AsideCategory />
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
          <AsideCategory />
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
  ${mq[2]} {
    position: static;
    padding: 0;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`
