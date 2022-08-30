import { Spacer } from '../../atoms/articleTitle/Spacer'
import SearchForm from '../../organisms/aside/SearchForm'
import AsideBasic from './AsideBase'
import AsideCategory from 'src/components/organisms/aside/AsideCategory'
import AsideProfile from 'src/components/organisms/aside/AsideProfile'
const AsideArchive = () => {
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

export default AsideArchive
