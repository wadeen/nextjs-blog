import { MicrocmsData } from "./microcmsData"

export type MicrocmsApi = {
  contents: MicrocmsData[]
  limit: number
  offset: number
  totalCount: number
  id: string
}
