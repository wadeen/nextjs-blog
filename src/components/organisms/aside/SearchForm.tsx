/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import SearchIcon from '@mui/icons-material/Search'

const SearchForm = () => {
  return (
    <div css={container}>
      <input type="text" />
      <button type="button">
        <SearchIcon
          fontSize="large"
          style={{ marginTop: '2px', marginLeft: '-3px' }}
        />
        検索
      </button>
    </div>
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
