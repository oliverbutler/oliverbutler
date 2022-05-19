/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useInterval } from '@/lib/utils/useInterval'
import { KeyboardEvent, useEffect, useRef, useState } from 'react'

type Pos = number[]

const SCALE = 20

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
  const [state, setState] = useState<'running' | 'paused' | 'dead'>('dead')

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d')

    if (!context) {
      return
    }

    context.setTransform(SCALE, 0, 0, SCALE, 0, 0)

    const drawApple = (apple: Pos) => {
      context.fillStyle = 'red'
      context.fillRect(apple[0], apple[1], 1, 1)
    }

    const drawSnake = (snake: Pos[]) => {
      snake.forEach(([x, y], index) => {
        context.fillStyle = index === 0 ? 'darkgreen' : 'green'
        context.fillRect(x, y, 1, 1)
      })
    }

    context.fillStyle = 'black'
    context.fillRect(0, 0, 100, 100)

    context.clearRect(0, 0, window.innerWidth, window.innerHeight)

    apples.forEach(drawApple)
    drawSnake(snake)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snake, apples, state])

  const addApple = () =>
    setApples((apples) => [
      ...apples,
      [Math.floor(Math.random() * SCALE), Math.floor(Math.random() * SCALE)],
    ])

  const removeApple = (apple: Pos) =>
    setApples((apples) => apples.filter((a) => !(a[0] === apple[0] && a[1] === apple[1])))

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
    const [head] = snake
    const [x, y] = dirToVec[dir]
    const newHead = [head[0] + x, head[1] + y]

    if (newHead[0] < 0 || newHead[0] >= SCALE || newHead[1] < 0 || newHead[1] >= SCALE) {
      setState('dead')
      return
    }

    // if any part of the snake is the same
    if (snake.map((pos) => pos.toString()).includes(newHead.toString())) {
      setState('dead')
    }

    if (checkAppleCollision(newHead)) {
      console.log('apple collision')
      removeApple(newHead)
      addApple()
      setSnake([newHead, ...snake])
    } else {
      setSnake([newHead, ...snake.slice(0, -1)])
    }
  }

  const startGame = () => {
    setState('running')
    setSnake([
      [SCALE / 2 - 0, SCALE / 2 - 0],
      [SCALE / 2 - 0, SCALE / 2 - 1],
      [SCALE / 2 - 0, SCALE / 2 - 2],
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
    e.preventDefault()

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
      case ' ':
        setState(state === 'paused' ? 'running' : 'paused')
        break
      case 'Escape':
        setState(state === 'paused' ? 'running' : 'paused')
        break
      default:
        break
    }
  }

  useEffect(() => {
    startGame()

    window.addEventListener('keydown', handleOnKeyDown)
    return () => {
      window.removeEventListener('keydown', handleOnKeyDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="h-full w-full">
      <div className="relative h-full w-full" ref={wrapperRef}>
        {state === 'dead' ? (
          <div className="absolute z-50 rounded-md bg-white/90 p-4 text-center">
            <h2 className="text-3xl font-bold">Dead!</h2>
            <button className="rounded-md bg-primary-400 p-2" onClick={() => startGame()}>
              Restart
            </button>
            <button className="bg-dark-400 rounded-md p-2" onClick={() => closeFullscreen()}>
              Quit
            </button>
          </div>
        ) : null}
        <canvas
          ref={canvasRef}
          width={wrapperRef.current?.offsetWidth}
          height={wrapperRef.current?.offsetHeight}
        />
      </div>
    </div>
  )
}
