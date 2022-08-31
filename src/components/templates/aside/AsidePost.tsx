/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { renderToc } from '../../../../libs/render-toc'
import { Spacer } from '../../atoms/articleTitle/Spacer'
import SearchForm from '../../molecules/aside/SearchForm'
import AsideCategory from '../../organisms/aside/AsideCategory'
import AsidePopular from '../../organisms/aside/AsidePopular'
import AsideProfile from '../../organisms/aside/AsideProfile'
import AsideBase from './AsideBase'
// import { TableOfContents } from 'src/components/molecules/TableOfContents'
const AsidePost = () => {
  // 目次
  return (
    <AsideBase>
      <AsideProfile />
      <Spacer size={30} />
      <div css={sticky}>
        <SearchForm />
        <Spacer size={30} />
        <AsideCategory />
        <Spacer size={30} />
        <AsidePopular />
        {/* <Spacer size={30} /> */}
        {/* <TableOfContents toc={toc} /> */}
      </div>
    </AsideBase>
  )
}

export default AsidePost

const sticky = css`
  display: block;
  width: 100%;
  height: 100%;
  position: sticky;
  width: 100%;
  top: 160px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  height: 100vh;
  /* padding-bottom: 250px; */
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`
