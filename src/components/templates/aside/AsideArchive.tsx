import { Spacer } from '../../atoms/articleTitle/Spacer'
import SearchForm from '../../molecules/aside/SearchForm'
import AsideBasic from './AsideBase'
import AsideProfile from 'src/components/molecules/aside/AsideProfile'
const AsideArchive = () => {
  return (
    <AsideBasic>
      <SearchForm />
      <Spacer size={30} />
      <AsideProfile />
      <Spacer size={30} />
    </AsideBasic>
  )
}

export default AsideArchive
