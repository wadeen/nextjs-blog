import { createClient } from 'microcms-js-sdk'

export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_MICROCMS_ACCESS_KEY as string,
  apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY as string,
})
