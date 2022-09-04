import { microcmsData } from './microcmsData';
export type microcmsApi = {
  contents: microcmsData[]
  limit: number
  offset: number
  totalCount: number
  id: string
}
