import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { client } from '../../libs/client'
import { micrcmsData } from '../../types/micrcmsData'

type Props = { data: micrcmsData }

const Home: NextPage<Props> = ({ data }) => {
  return (
    <>
      <p>index.tsxです</p>
      {/* <p dangerouslySetInnerHTML={{ __html: data.content }}></p> */}
    </>
  )
}

export default Home

// SSG
export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await client.get({
    endpoint: 'blogs',
    contentId: 'uxrew5cunkpm',
  })
  return {
    props: {
      data,
    },
  }
}
