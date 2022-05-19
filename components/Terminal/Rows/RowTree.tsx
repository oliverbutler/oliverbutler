import CustomLink from '@/components/Link'
import { PostFrontMatter } from 'types/PostFrontMatter'

export const RowTree = ({ posts }: { posts: PostFrontMatter[] }) => {
  return (
    <div className="mb-3">
      <p>blog</p>
      {posts.map((post) => (
        <div key={post.slug} className="ml-4 flex items-center space-x-2">
          <CustomLink href={`/blog/${post.slug}`}>{' ' + post.slug}</CustomLink>
        </div>
      ))}
    </div>
  )
}
