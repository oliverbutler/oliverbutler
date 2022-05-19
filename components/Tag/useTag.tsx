import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const useActiveTags = () => {
  const router = useRouter()

  const [selectedTags, setSelectedTags] = useState<string[]>([])

  useEffect(() => {
    setSelectedTags(router.query.tags ? (router.query.tags as string).split(',') : [])
  }, [router.query])

  return { selectedTags }
}

export const useTag = (tag: string) => {
  const { selectedTags } = useActiveTags()

  const newTags = selectedTags.includes(tag)
    ? selectedTags.filter((t) => t !== tag)
    : [...selectedTags, tag]

  const href = newTags.length === 0 ? '/blog' : `blog/?tags=${newTags.join(',')}`

  const isActive = selectedTags.length > 0 ? selectedTags.includes(tag) : true

  return {
    href,
    isActive,
  }
}
