import Link from 'next/link'
import React from 'react'
import { useTag } from './useTag'
import classnames from 'classnames'

const Tag = ({
  text,
  rightContent,
  highlightIfActive = false,
}: {
  text: string
  rightContent?: React.ReactNode
  highlightIfActive?: boolean
}) => {
  const { href, isActive } = useTag(text)

  return (
    <Link href={href} passHref>
      <span className="cursor-pointer">
        <a
          className={classnames('mr-3 text-sm font-medium uppercase ', {
            'text-primary-500 hover:text-primary-600 dark:hover:text-primary-400':
              (isActive && highlightIfActive) || !highlightIfActive,
          })}
        >
          {text.split(' ').join('-')}
        </a>
        {rightContent}
      </span>
    </Link>
  )
}

export default Tag
