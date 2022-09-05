import { NextPage } from 'next'
import { microcmsData } from '../../../../types/microcmsData'
import { Spacer } from '../../atoms/articleTitle/Spacer'
import SearchForm from '../../molecules/aside/SearchForm'
import AsideBase from './AsideBase'
import AsideCategory from 'src/components/organisms/aside/AsideCategory'
import AsidePopular from 'src/components/organisms/aside/AsidePopular'
import AsideProfile from 'src/components/organisms/aside/AsideProfile'
const AsideArchive: NextPage = () => {
  return (
    <AsideBase>
      <SearchForm />
      <Spacer size={30} />
      <AsideProfile />
      <Spacer size={30} />
      <AsideCategory />
      <Spacer size={30} />
      <AsidePopular />
    </AsideBase>
  )
}

export default AsideArchive
