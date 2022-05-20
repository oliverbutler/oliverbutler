/* eslint-disable jsx-a11y/no-static-element-interactions */
import { theme } from '../../../tailwind.config'
import { useInterval } from '@/lib/utils/useInterval'
import { useEffect, useRef, useState } from 'react'
import { useLocalStorage } from '@/lib/utils/useLocalStorage'

type Pos = number[]

const SCALE = 20
const INITIAL_LENGTH = 3

const dirToVec: Record<'left' | 'right' | 'up' | 'down', number[]> = {
  left: [-1, 0],
  right: [1, 0],
  up: [0, -1],
  down: [0, 1],
}

export const RowSnake = ({ closeFullscreen }: { closeFullscreen: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [snake, setSnake] = useState<Pos[]>([])
  const [apples, setApples] = useState<Pos[]>([])
  const [dir, setDir] = useState<'left' | 'right' | 'up' | 'down'>('right')
  const [state, setState] = useState<'running' | 'paused' | 'dead'>('running')

  const [highScore, setHighScore] = useLocalStorage('snake.high_score', 0)
  const score = snake.length - INITIAL_LENGTH

  const scaledHeight = (wrapperRef.current?.offsetHeight ?? 0) / SCALE
  const scaledWidth = (wrapperRef.current?.offsetWidth ?? 0) / SCALE

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d')

    if (!context) {
      return
    }

    context.setTransform(SCALE, 0, 0, SCALE, 0, 0)

    const drawApple = (apple: Pos) => {
      context.fillStyle = theme.extend.colors.red[400]
      context.fillRect(apple[0], apple[1], 1, 1)
    }

    const drawSnake = (snake: Pos[]) => {
      snake.forEach(([x, y], index) => {
        context.fillStyle =
          index === 0
            ? theme.extend.colors.emerald[600]
            : index === 1
            ? theme.extend.colors.emerald[500]
            : theme.extend.colors.emerald[400]
        context.fillRect(x, y, 1, 1)
      })
    }

    context.clearRect(0, 0, window.innerWidth, window.innerHeight)

    apples.forEach(drawApple)
    drawSnake(snake)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snake, apples, state])

  const addApple = () =>
    setApples((apples) => [
      ...apples,
      [Math.floor(Math.random() * scaledWidth), Math.floor(Math.random() * scaledHeight)],
    ])

  const removeApple = (apple: Pos) =>
    setApples((apples) => apples.filter((a) => !(a[0] === apple[0] && a[1] === apple[1])))

  const endGame = () => {
    setState('dead')
    setHighScore(Math.max(score, highScore))
  }

  const checkAppleCollision = (pos: Pos): boolean => {
    return apples.reduce((acc, apple) => {
      if (apple[0] === pos[0] && apple[1] === pos[1]) {
        return true
      }
      return acc
    }, false)
  }

  const gameLoop = () => {
    if (state !== 'running') {
      return
    }
    const [x, y] = dirToVec[dir]
    const newHead = [snake[0][0] + x, snake[0][1] + y]

    if (
      newHead[0] < 0 ||
      newHead[0] >= scaledWidth ||
      newHead[1] < 0 ||
      newHead[1] >= scaledHeight
    ) {
      endGame()
      return
    }

    // if any part of the snake is the same
    if (snake.map((pos) => pos.toString()).includes(newHead.toString())) {
      endGame()
    }

    if (checkAppleCollision(newHead)) {
      removeApple(newHead)
      addApple()
      setSnake((snake) => [newHead, ...snake])
    } else {
      setSnake((snake) => [newHead, ...snake.slice(0, -1)])
    }
  }

  const startGame = () => {
    setState('running')
    setSnake([
      [scaledWidth / 2 - 0, scaledHeight / 2 - 0],
      [scaledWidth / 2 - 0, scaledHeight / 2 - 1],
      [scaledWidth / 2 - 0, scaledHeight / 2 - 2],
    ])
    setApples([])
    addApple()
    addApple()
    addApple()
    setDir('right')
  }

  const delayMs = Math.min(300 - snake.length * 10, 150)

  useInterval(() => gameLoop(), delayMs)

  const handleOnKeyDown = (e) => {
    if (state === 'running') {
      e.preventDefault()
    }

    switch (e.key) {
      case 'ArrowLeft':
        setDir('left')
        break
      case 'ArrowRight':
        setDir('right')
        break
      case 'ArrowUp':
        setDir('up')
        break
      case 'ArrowDown':
        setDir('down')
        break
      case 'q':
        closeFullscreen()
        break
      default:
        setState('paused')
        break
    }
  }

  useEffect(() => {
    if (wrapperRef.current) {
      startGame()

      window.addEventListener('keydown', handleOnKeyDown)
      return () => {
        window.removeEventListener('keydown', handleOnKeyDown)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wrapperRef.current])

  return (
    <div className="h-full w-full">
      <div className="relative h-full w-full" ref={wrapperRef}>
        {state === 'running' ? (
          <div className="absolute top-2 left-2">
            {score} ({highScore} high)
          </div>
        ) : null}
        {state === 'dead' || state === 'paused' ? (
          <div
            className="absolute z-50 rounded-md bg-white/90 p-4 text-center dark:bg-gray-900/90"
            style={{ left: '50%', top: '30%', transform: 'translateX(-50%)' }}
          >
            <h2 className="mb-2 text-3xl font-bold">
              {state === 'dead' ? `You scored ${score} 🎉` : 'Paused'}
            </h2>
            <button
              className="rounded-md bg-primary-400 p-2 text-white"
              onClick={() => (state === 'dead' ? startGame() : setState('running'))}
            >
              {state === 'dead' ? 'Restart' : 'Resume'}
            </button>
            <button className="bg-dark-400 rounded-md p-2" onClick={() => closeFullscreen()}>
              Quit (<kbd>q</kbd>)
            </button>
          </div>
        ) : null}
        <canvas
          className="opacity-70"
          ref={canvasRef}
          width={wrapperRef.current?.offsetWidth}
          height={wrapperRef.current?.offsetHeight}
        />
      </div>
    </div>
  )
}
