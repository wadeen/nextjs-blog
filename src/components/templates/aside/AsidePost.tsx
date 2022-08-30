import { Spacer } from '../../atoms/articleTitle/Spacer'
import AsideProfile from '../../molecules/aside/AsideProfile'
import SearchForm from '../../molecules/aside/SearchForm'
import AsideBasic from './AsideBase'
const AsidePost = () => {
  return (
    <AsideBasic>
      <SearchForm />
      <Spacer size={30}/>
      <AsideProfile />
      <Spacer size={30} />
    </AsideBasic>
  )
}

export default AsidePost
