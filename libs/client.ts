import { createClient } from 'microcms-ts-sdk'
// import { createClient, MicroCMSSchemaInfer } from 'microcms-ts-sdk'
import { microCmsPostData } from 'types/microCmsPostData'
import { MicrocmsData } from 'types/microcmsData'
import { StorageType } from 'types/storageType'

export const client = createClient<Endpoints>({
  serviceDomain: process.env.NEXT_PUBLIC_MICROCMS_ACCESS_KEY as string,
  apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY as string,
})

// Type definition
type Content = {
  text: string
}

interface Endpoints {
  // API in list format.
  list: {
    posts: MicrocmsData
    categories: microCmsPostData
    storage: StorageType
  }
}

// Schema type inference
// type Schema = MicroCMSSchemaInfer<typeof client>
/**
 * Schema[contents]
 * {
 *   id: string;
 *   createdAt: string;
 *   updatedAt: string;
 *   publishedAt?: string;
 *   revisedAt?: string;
 *   text: string;
 * }
 *
 * Schema[content]
 * {
 *   createdAt: string;
 *   updatedAt: string;
 *   publishedAt?: string;
 *   revisedAt?: string;
 *   text: string;
 * }
 */
