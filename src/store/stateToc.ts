import { atom } from 'recoil'

export type stateTocType = {
  text: string
  id: string
}

export const stateToc = atom({
  key: 'stateToc',
  default: [],
})
