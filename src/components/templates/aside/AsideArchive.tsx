import { Spacer } from '../../atoms/articleTitle/Spacer'
import SearchForm from '../../molecules/aside/SearchForm'
import AsideBasic from './AsideBase'
import AsideCategory from 'src/components/organisms/aside/AsideCategory'
import AsidePopular from 'src/components/organisms/aside/AsidePopular'
import AsideProfile from 'src/components/organisms/aside/AsideProfile'
const AsideArchive = () => {
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

export default AsideArchive
