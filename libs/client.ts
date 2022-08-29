import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: 'nextjs-blog-wadeen',
  apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY as string,
});