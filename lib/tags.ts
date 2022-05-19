import { PostFrontMatter } from 'types/PostFrontMatter'
import kebabCase from './utils/kebabCase'

export const getTagsFromPosts = (posts: PostFrontMatter[]): Record<string, number> => {
  const tags = posts
    .map((post) => post.tags)
    .flat()
    .reduce((acc, tag) => {
      const formattedTag = kebabCase(tag)
      if (acc[formattedTag]) {
        acc[formattedTag] += 1
      } else {
        acc[formattedTag] = 1
      }
      return acc
    }, {} as Record<string, number>)

  return tags
}
