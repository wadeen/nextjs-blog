import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Seo from 'src/components/Seo'
const Strage: NextPage = () => {
  return (
    <>
      <Seo ogpTitle="自己紹介 | Webのあれこれ" />
      ようこそ！ App倉庫で、実験や開発をしたものを置いています。
      コメントなどあればお願いします。
    </>
  )
}

export default Strage
