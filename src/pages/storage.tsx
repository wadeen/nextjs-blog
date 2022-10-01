/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { NextPage } from 'next'
import { memo } from 'react'
import { FaGithub } from 'react-icons/fa'
import { GrLanguage } from 'react-icons/gr'
import { mediaQuery } from 'src/utils/Breakpoints'
import Seo from 'src/utils/Seo'

// SSG(Jsonから直接取り出し)
export const getStaticProps = async () => {
  const req = await fetch(`${process.env.NEXT_PUBLIC_HOST}/storageInfo.json`)
  const data = await req.json()
  return {
    props: {
      data: data,
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

// eslint-disable-next-line react/display-name
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
                css={imteImg}
              >
                <img src={data.img} alt="" />
              </a>
              <h2>{data.title}</h2>
              <p css={subTitlte}>使用技術</p>
              <ul css={tag}>
                {data.tags.map((tag: any) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <p css={subTitlte}>コメント</p>
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

const imteImg = css`
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

const subTitlte = css`
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
