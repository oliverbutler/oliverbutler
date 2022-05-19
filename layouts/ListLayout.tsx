import { useState } from 'react'
import { PostListItem } from '@/components/PostListItem'
import { PostFrontMatter } from 'types/PostFrontMatter'
import { getTagsFromPosts } from '@/lib/tags'
import Tag from '@/components/Tag/Tag'
import { useActiveTags } from '@/components/Tag/useTag'

export default function ListLayout({ posts, title }: { posts: PostFrontMatter[]; title: string }) {
  const [searchValue, setSearchValue] = useState('')
  const { selectedTags } = useActiveTags()

  const filteredBlogPosts = posts.filter((frontMatter) => {
    const searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ')

    const isInSelectedTags =
      selectedTags.length === 0 ? true : selectedTags.every((tag) => frontMatter.tags.includes(tag))

    return isInSelectedTags && searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  const tags = getTagsFromPosts(filteredBlogPosts)

  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a])

  return (
    <>
      <div className="">
        <div className="flex flex-col lg:flex-row lg:space-x-12">
          <div className="space-y-2 pt-6 pb-8 md:space-y-5 lg:w-1/3">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              {title}
            </h1>
            <div className="relative max-w-lg">
              <input
                aria-label="Search articles"
                type="text"
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search articles"
                className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-black dark:text-gray-100"
              />
              <svg
                className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex max-w-lg flex-wrap">
              {Object.keys(tags).length === 0 && 'No tags found.'}
              {sortedTags.map((t) => (
                <div key={t} className="mt-2 mb-2 mr-5">
                  <Tag
                    text={t}
                    rightContent={
                      <span className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300">
                        {` (${tags[t]}) `}
                      </span>
                    }
                    highlightIfActive
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <ul className="mt-6">
          {!filteredBlogPosts.length && 'No posts found.'}
          {filteredBlogPosts.map((frontMatter) => (
            <li key={frontMatter.slug} className="py-4">
              <PostListItem frontMatter={frontMatter} showThumbnail />
            </li>
          ))}
        </ul>
      </div>
      {/* {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )} */}
    </>
  )
}
