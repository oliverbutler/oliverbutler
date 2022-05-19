import { useState, useEffect } from 'react'

export const AnimatedTyping = ({
  text,
  onFinishAnimation,
}: {
  text: string
  onFinishAnimation: () => void
}) => {
  const [typing, setTyping] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(typing, text)
      setTyping((typing) => {
        if (typing.length >= text.length) {
          clearInterval(interval)
          onFinishAnimation()
          return typing
        }

        return typing + text[typing.length]
      })
    }, 100)

    return () => clearInterval(interval)
  }, [onFinishAnimation, text, typing])

  return <span>{typing}</span>
}

export const RowCommand = ({
  text,
  unknown,
  animateText,
  handleAnimationComplete,
}: {
  text: string
  unknown: boolean
  animateText: boolean
  handleAnimationComplete: () => void
}) => (
  <pre>
    <span className="text-primary-400">olly</span>
    <span className="text-sky-400"> $ </span>
    <span className={unknown ? 'text-red-400' : ''}>
      {animateText ? (
        <AnimatedTyping onFinishAnimation={handleAnimationComplete} text={text} />
      ) : (
        text
      )}{' '}
      {unknown && '- use "help" for a list of commands'}
    </span>
  </pre>
)
