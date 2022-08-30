import { Spacer } from '../../atoms/articleTitle/Spacer'
import AsideCategory from '../../organisms/aside/AsideCategory'
import AsideProfile from '../../organisms/aside/AsideProfile'
import SearchForm from '../../organisms/aside/SearchForm'
import AsideBasic from './AsideBase'
const AsidePost = () => {
  return (
    <AsideBasic>
      <SearchForm />
      <Spacer size={30} />
      <AsideProfile />
      <Spacer size={30} />
      <AsideCategory />
    </AsideBasic>
  )
}

export default AsidePost
