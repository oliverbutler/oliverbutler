/* eslint-disable jsx-a11y/no-static-element-interactions */
import { theme } from '../../../tailwind.config'
import { useInterval } from '@/lib/utils/useInterval'
import { useEffect, useRef, useState } from 'react'
import { GameState } from '../GameWrapper/GameWrapper'

const SCALE = 15
const DELAY = 1000 / 60 // 60FPS
const SPACE_BAR_VELOCITY = -0.4
const TERMINAL_VELOCITY = 1
const GRAVITY_CONSTANT = 0.02
const GAP_BETWEEN_PIPES = 15
const PIPE_HOLE_SIZE = 9

export const FlappyBird = ({
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

  const [time, setTime] = useState(0)
  const [y, setY] = useState(10)
  const [yv, setYv] = useState(SPACE_BAR_VELOCITY)
  const [pipes, setPipes] = useState([10, 5, 3])

  const scaledHeight = Math.round(gameHeight / SCALE)
  const scaledWidth = Math.round(gameWidth / SCALE)

  const checkIfCollideFloor = () => {
    if (y > scaledHeight - 1 || y < 1) endGame()
  }

  useEffect(() => {
    setScore(Math.round(time / 100))
  }, [time])

  const gameLoop = () => {
    const context = canvasRef.current?.getContext('2d')

    if (!context) {
      return
    }

    context.setTransform(SCALE, 0, 0, SCALE, 0, 0)

    context.clearRect(0, 0, window.innerWidth, window.innerHeight)

    // Draw le birb (10x10 pixel)
    context.fillStyle = theme.extend.colors.yellow[400]
    context.fillRect(5, y, 2, 2)

    // Draw the ground
    context.fillStyle = theme.extend.colors.emerald[400]
    context.fillRect(0, scaledHeight, scaledWidth, scaledHeight)

    // Apply the gravity to the bird
    setY((y) => y + yv)
    setYv((yv) => Math.min(yv + GRAVITY_CONSTANT, TERMINAL_VELOCITY))

    pipes.forEach((pipe, index) => {
      // Draw the pipes
      context.fillStyle = theme.extend.colors.green[400]

      const x = GAP_BETWEEN_PIPES * (index + 1) - time * 0.1

      // Draw top pipe
      context.fillRect(x, 0, 2, pipe)
      context.fillRect(x, pipe + PIPE_HOLE_SIZE, 2, scaledHeight - pipe - PIPE_HOLE_SIZE)
    })

    checkIfCollideFloor()

    setTime((time) => time + 1)
  }

  const startGame = () => {
    setY(10)
    setYv(SPACE_BAR_VELOCITY)
    setPipes([10, 5, 3])
  }

  useEffect(() => {
    if (gameState === GameState.RUNNING && FlappyBird.length === 0) {
      startGame()
    }

    if (gameState === GameState.RESTART) {
      startGame()
      restartGame()
    }
  }, [gameState])

  useInterval(() => gameLoop(), gameState === GameState.RUNNING ? DELAY : null)

  const handleOnKeyDown = (e) => {
    switch (e.key) {
      case ' ':
        setYv(() => SPACE_BAR_VELOCITY)
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
