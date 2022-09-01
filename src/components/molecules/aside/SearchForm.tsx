/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import SearchIcon from '@mui/icons-material/Search'
import { useState } from 'react'

const SearchForm = () => {
  const [inputSearchText, setInputSearchText] = useState('')

  const onClickSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
  }

  return (
    <form css={container}>
      <input
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInputSearchText(e.target.value)
        }
        value={inputSearchText}
      />
      <button type="submit" onClick={onClickSearch}>
        <SearchIcon
          fontSize="large"
          style={{ marginTop: '2px', marginLeft: '-3px' }}
        />
        検索
      </button>
    </form>
  )
}

export default SearchForm

const container = css`
  display: flex;
  align-items: center;
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
  }
`

const icon = css`
  margin-right: 3px;
`