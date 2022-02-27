import Image from 'next/image'
import formatDate from '@/lib/utils/formatDate'
import Link from 'next/link'
import Tag from './Tag'

export const PostListItem = ({ frontMatter, showThumbnail }) => {
  const { slug, date, title, summary, tags, thumbnail } = frontMatter

  return (
    <article className="grid grid-cols-1 gap-4 sm:grid-cols-4">
      {showThumbnail ? (
        <div className="col-span-1 grid w-full sm:block">
          <Image src={thumbnail} height={150} width={250} objectFit="cover" alt="thumbnail" />
        </div>
      ) : null}
      <div className={'space-y-2 ' + showThumbnail ? 'col-span-3' : 'col-span-4'}>
        <div>
          <h3 className="text-2xl font-bold leading-8 tracking-tight">
            <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">
              {title}
            </Link>
          </h3>
          <div className="flex flex-wrap">
            {tags.map((tag) => (
              <Tag key={tag} text={tag} />
            ))}
          </div>
          <dt className="sr-only">Published on</dt>
          <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
            <time dateTime={date}>{formatDate(date)}</time>
          </dd>
        </div>
        <div className="prose max-w-none text-gray-500 dark:text-gray-400">{summary}</div>
      </div>
    </article>
  )
}
