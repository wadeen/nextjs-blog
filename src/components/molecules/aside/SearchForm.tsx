/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { BiSearch } from 'react-icons/bi'
import { useRecoilState } from 'recoil'
import { searchState } from '../../../store/searchState'
import { mediaQuery } from 'src/utils/Breakpoints'

const SearchForm: NextPage = () => {
  const [searchValue, setSeatchValue] = useRecoilState(searchState)
  const router = useRouter()

  const onChangeValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSeatchValue(e.target.value)
    },
    [setSeatchValue]
  )

  const handleClickSubmitButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      router.push(`/search/?keyword=${searchValue}`)
      setSeatchValue('')
    },
    [searchValue, router, setSeatchValue]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        router.push(`/search/?keyword=${searchValue}`)
        setSeatchValue('')
      }
    },
    [searchValue, router, setSeatchValue]
  )

  return (
    <form css={container}>
      <input
        id="seacrch-form"
        type="text"
        value={searchValue}
        onChange={onChangeValue}
        onKeyDown={handleKeyDown}
      />
      <button type="submit" onClick={handleClickSubmitButton}>
        <BiSearch
          fontSize="large"
          style={{ marginTop: '2px', marginLeft: '-2px' }}
        />
        検索
      </button>
    </form>
  )
}

export default SearchForm

// css
const container = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 100%;
  input {
    display: block;
    background-color: #fff;
    width: 75%;
    height: 100%;
    border: 1px solid var(--cBorder);
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    padding: 4px 8px;
    ${mediaQuery[2]} {
      width: 80%;
    }
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25%;
    height: 100%;
    background-color: var(--cSub);
    text-align: center;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    font-family: var(--fontEn);
    border: 1px solid var(--cBorder);
    border-left: none;
    color: #fff;
    ${mediaQuery[2]} {
      width: 20%;
    }
  }
`

const icon = css`
  margin-right: 3px;
`
