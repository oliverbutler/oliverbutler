import { useState, useEffect } from 'react'

const frames = [
  '[    ]',
  '[=   ]',
  '[==  ]',
  '[=== ]',
  '[ ===]',
  '[  ==]',
  '[   =]',
  '[    ]',
  '[   =]',
  '[  ==]',
  '[ ===]',
  '[====]',
  '[=== ]',
  '[==  ]',
  '[=   ]',
]

export const LoaderText = () => {
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((frame) => (frame + 1) % frames.length)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  const curr = frames[frame]

  return <pre>Loading... {curr}</pre>
}
