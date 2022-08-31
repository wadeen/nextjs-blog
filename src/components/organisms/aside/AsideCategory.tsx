import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { client } from '../../../../libs/client'
import { microcmsData } from '../../../../types/microcmsData'
import AsideTitle from 'src/components/atoms/AsideTitle'

// SSG
export const getStaticProps: GetStaticProps = async () => {
  const categoryData = await client.get({ endpoint: 'categories' })
  // console.log('categoryData', categoryData)
  return {
    props: {
      category: categoryData.contents,
    },
  }
}

const AsideCategory = ({ category }: any) => {
  // }: InferGetStaticPropsType<typeof getStaticProps>) => {
  // console.log('category', category)
  return (
    <>
      <AsideTitle text={'Category'} />
      <ul>
        {/* {category.map((category: any) => (
          <li key={category.id}>
            <Link href={`/category/${category.id}`}>
              <a>{category.name}</a>
            </Link>
          </li>
        ))} */}
      </ul>
    </>
  )
}

export default AsideCategory
