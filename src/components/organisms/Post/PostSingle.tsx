import { micrcmsData } from 'types/micrcmsData'
const PostSingle = ({ post }: { post: micrcmsData }) => {
  return <div>{post.id}</div>
}

export default PostSingle
