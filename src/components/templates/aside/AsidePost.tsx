import { Spacer } from '../../atoms/articleTitle/Spacer'
import SearchForm from '../../molecules/aside/SearchForm'
import AsideCategory from '../../organisms/aside/AsideCategory'
import AsidePopular from '../../organisms/aside/AsidePopular'
import AsideProfile from '../../organisms/aside/AsideProfile'
import AsideBasic from './AsideBase'
const AsidePost = () => {
  return (
    <AsideBasic>
      <SearchForm />
      <Spacer size={30} />
      <AsideProfile />
      <Spacer size={30} />
      <AsideCategory />
      <Spacer size={30} />
      <AsidePopular />
    </AsideBasic>
  )
}

export default AsidePost
