import SearchForm from '../../molecules/aside/SearchForm'
import AsideBase from './AsideBase'

import { Spacer } from 'src/components/molecules/Spacer'
import AsideCategory from 'src/components/organisms/aside/AsideCategory'
import AsidePopular from 'src/components/organisms/aside/AsidePopular'
import AsideProfile from 'src/components/organisms/aside/AsideProfile'
import { CategoryCountAndPost } from 'types/microCms'

type Props = {
  categoryData: CategoryCountAndPost[]
}

const AsideArchive = ({ categoryData }: Props) => {
  return (
    <AsideBase>
      <SearchForm />
      <Spacer size={30} />
      <AsideProfile />
      <Spacer size={30} />
      <AsideCategory categoryData={categoryData} />
      <Spacer size={30} />
      <AsidePopular />
    </AsideBase>
  )
}

export default AsideArchive
