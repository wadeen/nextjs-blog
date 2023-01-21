/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from 'axios'
import { NextPage } from 'next'
import { memo } from 'react'
import { FaGithub } from 'react-icons/fa'
import { GrLanguage } from 'react-icons/gr'
import Seo from 'src/components/molecules/Seo'
import { mediaQuery } from 'src/utils/Breakpoints'

// SSG(Jsonから直接取り出し)
export const getStaticProps = async () => {
  // const data = await axios(`${process.env.NEXT_PUBLIC_HOST}/storageInfo.json`)

  const data = [
    {
      id: 1,
      img: '/images/storage/react-todo.png',
      title: 'ToDoアプリ',
      tags: ['React', 'TypeScript', 'Firestore'],
      message: 'React基礎を学習したのでアウトプットのために作成しました🗓',
      github: 'https://github.com/wadeen/original-react-todo',
      website: 'https://original-react-todo.vercel.app/',
    },
    {
      id: 2,
      img: '/images/storage/nextjs-image.png',
      title: 'Unsplash画像検索アプリ',
      tags: ['React', 'Next.js', 'TypeScript', 'Unsplash API'],
      message:
        'API学習用に作成。検索するとUnsplashのAPIを取得して画像を表示します。',
      github: 'https://github.com/wadeen/nextjs-image-search',
      website: 'https://nextjs-image-search-lvnw1iseo-wadeen.vercel.app/',
    },
    {
      id: 3,
      img: '/images/storage/portfolio.png',
      title: 'ポートフォリオサイト',
      tags: ['React', 'Next.js', 'TypeScript', 'Firestore', 'microCMS'],
      message: 'このポートフォリオサイトです。\n逐一機能を追加していきます🙌',
      github: 'https://github.com/wadeen/nextjs-blog',
      website: 'https://wadeen.net/',
    },
  ]

  return {
    props: {
      data,
    },
  }
}

type Props = {
  id: string
  img: string
  title: string
  tags: string[]
  message: string
  github: string
  website: string
}

const Storage: NextPage<{ data: Props[] }> = memo(({ data }) => {
  return (
    <>
      <Seo ogpTitle="App倉庫 | Webのあれこれ" />
      <div css={container}>
        <h1>〜技術習得のために作成したWebアプリの倉庫〜</h1>
        <ul css={list}>
          {data.map((data) => (
            <li css={item} key={data.id}>
              <a
                href={data.website}
                target="_blank"
                rel="noopener noreferrer"
                css={itemImg}
              >
                <img src={data.img} alt="" />
              </a>
              <h2>{data.title}</h2>
              <p css={subTitle}>使用技術</p>
              <ul css={tag}>
                {data.tags.map((tag: any) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <p css={subTitle}>コメント</p>
              <p css={message}>{data.message}</p>
              <ul css={links}>
                {data.github && (
                  <li>
                    <a
                      href={data.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub fontSize="large" />
                    </a>
                  </li>
                )}
                {data.website && (
                  <li>
                    <a
                      href={data.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GrLanguage />
                    </a>
                  </li>
                )}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
})

export default Storage

const container = css`
  width: min(100%, 1000px);
  margin: 0 auto;
  h1 {
    font-size: 2.4rem;
    letter-spacing: 0.05em;
    font-family: var(--fontMain);
    font-weight: 700;
    padding-bottom: 50px;
    text-align: center;
    ${mediaQuery[1]} {
      font-size: 1.4rem;
      padding-bottom: 40px;
    }
  }
`

const list = css`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  ${mediaQuery[2]} {
    gap: 20px;
  }
  h2 {
    font-size: 2.2rem;
    font-weight: 700;
    padding: 15px 0;
    letter-spacing: 0.05em;
    text-align: center;
    font-family: var(--fontMain);
    ${mediaQuery[1]} {
      font-size: 2rem;
      padding: 10px 0 15px;
    }
  }
`

const item = css`
  width: calc((100% - 40px) / 2);
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid var(--cBorder);
  overflow: hidden;
  position: relative;
  ${mediaQuery[2]} {
    width: calc((100% - 20px) / 2);
  }
  ${mediaQuery[1]} {
    width: min(100%, 400px);
    margin: 0 auto;
  }
`

const itemImg = css`
  display: block;
  transition: opacity 0.3s ease;
  &:hover {
    opacity: 0.8;
  }
  img {
    width: 100%;
    height: 100%;
    max-height: 400px;
    object-fit: cover;
  }
`

const tag = css`
  padding: 15px 20px 20px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  li {
    background-color: var(--cSub);
    color: #fff;
    border-radius: 100vmax;
    text-align: center;
    padding: 6px 12px;
    font-size: 1.4rem;
    ${mediaQuery[1]} {
      font-size: 1.2rem;
      padding: 4px 8px;
    }
  }
`

const subTitle = css`
  padding: 0 20px;
  font-weight: 500;
  letter-spacing: 0.05em;
  font-size: 1.8rem;
  font-family: var(--fontMain);
  ${mediaQuery[1]} {
    font-size: 1.6rem;
  }
`

const message = css`
  padding: 10px 20px;
  margin-bottom: 25px;
  letter-spacing: 0.05em;
  line-height: 1.4;
  font-family: var(--fontMain);
  ${mediaQuery[1]} {
    font-size: 1.4rem;
  }
`

const links = css`
  display: flex;
  gap: 0 15px;
  position: absolute;
  bottom: 10px;
  right: 20px;
  z-index: 10;
  a {
    transition: opacity 0.3s ease;
    &:hover {
      opacity: 0.8;
    }
  }
`
