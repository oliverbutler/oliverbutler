/* eslint-disable jsx-a11y/no-static-element-interactions */
import { theme } from '../../../tailwind.config'
import { useInterval } from '@/lib/utils/useInterval'
import { useEffect, useRef, useState } from 'react'
import { GameState } from '../GameWrapper/GameWrapper'

type Pos = number[]

const SCALE = 15
const INITIAL_LENGTH = 3

const dirToVec: Record<'left' | 'right' | 'up' | 'down', number[]> = {
  left: [-1, 0],
  right: [1, 0],
  up: [0, -1],
  down: [0, 1],
}

export const Snake = ({
  gameState,
  endGame,
  restartGame,
  setScore,
  gameHeight,
  gameWidth,
}: {
  gameState: GameState
  endGame: () => void
  restartGame: () => void
  setScore: (score: number) => void
  gameHeight: number
  gameWidth: number
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const [snake, setSnake] = useState<Pos[]>([])
  const [apples, setApples] = useState<Pos[]>([])
  const [dir, setDir] = useState<'left' | 'right' | 'up' | 'down'>('right')

  const [currScore, setCurrScore] = useState(0)

  useEffect(() => {
    setScore(currScore)
  }, [currScore])

  const scaledHeight = Math.round(gameHeight / SCALE)
  const scaledWidth = Math.round(gameWidth / SCALE)

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d')

    if (!context) {
      return
    }

    context.setTransform(SCALE, 0, 0, SCALE, 0, 0)

    const drawApple = (apple: Pos) => {
      const numberOfApplesInPosition = apples.filter((a) => a[0] === apple[0] && a[1] === apple[1])

      context.fillStyle =
        numberOfApplesInPosition.length > 1
          ? theme.extend.colors.yellow[400]
          : theme.extend.colors.red[400]
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
  }, [snake, apples])

  const addApple = () => {
    const newApple = [
      Math.floor(Math.random() * scaledWidth),
      Math.floor(Math.random() * scaledHeight),
    ]

    const isInsideSnake = snake.some(([x, y]) => x === newApple[0] && y === newApple[1])

    if (!isInsideSnake) {
      setApples((apples) => [...apples, newApple])
    } else {
      addApple()
    }
  }

  const removeApple = (apple: Pos) =>
    setApples((apples) => apples.filter((a) => !(a[0] === apple[0] && a[1] === apple[1])))

  const checkAppleCollision = (pos: Pos): number => {
    return apples.reduce((acc, apple) => {
      if (apple[0] === pos[0] && apple[1] === pos[1]) {
        return acc + 1
      }
      return acc
    }, 0)
  }

  const gameLoop = () => {
    if (snake.length === 0) {
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

    const numberOfCollisions = checkAppleCollision(newHead)

    if (numberOfCollisions > 0) {
      setCurrScore((curr) => curr + numberOfCollisions)

      removeApple(newHead)

      Array.from(Array(numberOfCollisions)).forEach(addApple)

      setSnake((snake) => [newHead, ...snake])
    } else {
      setSnake((snake) => [newHead, ...snake.slice(0, -1)])
    }
  }

  const startGame = () => {
    setSnake([
      [Math.round(scaledWidth / 2 - 0), Math.round(scaledHeight / 2 - 0)],
      [Math.round(scaledWidth / 2 - 1), Math.round(scaledHeight / 2 - 0)],
      [Math.round(scaledWidth / 2 - 2), Math.round(scaledHeight / 2 - 0)],
    ])
    setApples([])
    addApple()
    addApple()
    addApple()
    setDir('right')
  }

  useEffect(() => {
    if (gameState === GameState.RUNNING && snake.length === 0) {
      startGame()
    }

    if (gameState === GameState.RESTART) {
      startGame()
      restartGame()
    }
  }, [gameState])

  const delayMs = Math.max(250 - snake.length * 10, 125)

  useInterval(() => gameLoop(), gameState === GameState.RUNNING ? delayMs : null)

  const handleOnKeyDown = (e) => {
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
    }
  }

  useEffect(() => {
    if (wrapperRef.current) {
      window.addEventListener('keydown', handleOnKeyDown)
      return () => {
        window.removeEventListener('keydown', handleOnKeyDown)
      }
    }
  }, [wrapperRef.current])

  return (
    <div ref={wrapperRef} className="relative h-full w-full bg-gray-200/40 dark:bg-gray-900/70">
      <div ref={wrapperRef}>
        <canvas
          ref={canvasRef}
          width={wrapperRef.current?.offsetWidth ?? 0}
          height={wrapperRef.current?.offsetHeight ?? 0}
        />
      </div>
    </div>
  )
}
