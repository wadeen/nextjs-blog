import { NextApiRequest, NextApiResponse } from 'next'

const getSearchBlogs = async (req: NextApiRequest, res: NextApiResponse) => {
  const { keyword } = req.query as { keyword: string }
  const searchBlogs = await fetch(
    `https://${
      process.env.NEXT_PUBLIC_MICROCMS_ACCESS_KEY
    }.microcms.io/api/v1/posts?q=${encodeURI(keyword)}`,
    {
      headers: {
        'X-MICROCMS-API-KEY': process.env
          .NEXT_PUBLIC_MICROCMS_API_KEY as string,
      },
    }
  )
    .then((res) => res.json())
    .catch(() => null)

  return res.status(200).json(searchBlogs)
}

export default getSearchBlogs
