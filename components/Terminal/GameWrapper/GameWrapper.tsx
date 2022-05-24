import { Game } from '@prisma/client'
import { useEffect, useRef, useState } from 'react'
import { getAwardEmoji } from '../Rows/RowLeaderBoard'
import { Snake } from '../Rows/Snake'
import { useScore } from './useScore'

const gameToName: Record<Game, string> = {
  [Game.SNAKE]: 'Snake 🐍',
}

export enum GameState {
  RUNNING,
  PAUSED,
  FINISH,
  RESTART, // When resume move to FINISH
}

export const GameWrapper = ({
  game,
  closeFullscreen,
}: {
  game: Game
  closeFullscreen: () => void
}) => {
  const [gameState, setGameState] = useState<GameState>(GameState.PAUSED)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [score, setScore] = useState(0)

  const { highScores, addNewScore, globalHighScores } = useScore(game)

  const handleOnKeyDown = (e) => {
    if (gameState === GameState.RUNNING) {
      e.preventDefault()
    }

    if (e.key === 'Escape') {
      gameState === GameState.RUNNING ? setGameState(GameState.PAUSED) : closeFullscreen()
    }

    if (e.key === 'Enter') {
      gameState === GameState.FINISH
        ? setGameState(GameState.RESTART)
        : setGameState(GameState.RUNNING)
    }
  }

  useEffect(() => {
    if (wrapperRef.current) {
      window.addEventListener('keydown', handleOnKeyDown)
      return () => {
        window.removeEventListener('keydown', handleOnKeyDown)
      }
    }
  }, [wrapperRef.current, gameState])

  console.log(highScores)

  return (
    <div className="relative flex h-full flex-col items-center justify-center" ref={wrapperRef}>
      <Snake
        gameState={gameState}
        gameWidth={wrapperRef.current?.offsetWidth ?? 0}
        gameHeight={wrapperRef.current?.offsetHeight ?? 0}
        endGame={() => {
          addNewScore(score)
          setGameState(GameState.FINISH)
        }}
        setScore={setScore}
        restartGame={() => setGameState(GameState.RUNNING)}
      />
      {gameState === GameState.RUNNING ? (
        <div className="absolute right-2 top-2">{score}</div>
      ) : null}
      {gameState !== GameState.RUNNING ? (
        <div className="absolute top-0 left-0 flex h-full w-full flex-col items-center bg-gray-50/60 p-4  backdrop-blur-sm dark:bg-gray-900/60 ">
          {gameState === GameState.FINISH ? (
            <div className="flex flex-col items-center justify-center">
              <div className="text-center">
                <h1 className="text-3xl font-bold">You scored {score} 🎉</h1>
              </div>
            </div>
          ) : (
            <h1 className="mt-6 animate-bounce text-3xl font-bold">{gameToName[game]}</h1>
          )}

          <div className="mt-4 flex flex-row space-x-6">
            <div>
              <p className="font-bold">Personal Board</p>
              {!highScores?.data ? (
                <p className="text-red-500">Login!</p>
              ) : (
                highScores?.data?.map((score) => <p key={score.id}>{`${score.score}`}</p>)
              )}
            </div>
            <div>
              <p className="font-bold">Global Board</p>
              {globalHighScores?.map((score, index) => (
                <p key={score.score}>{`${getAwardEmoji(index)} ${score.score} ${
                  score.user.name
                }`}</p>
              ))}
            </div>
          </div>
          <div className="mt-6 flex flex-row">
            <button className="rounded-md bg-primary-400 p-2 text-white" onClick={() => undefined}>
              {gameState === GameState.PAUSED
                ? 'Resume'
                : gameState === GameState.FINISH
                ? 'Restart'
                : 'Start'}{' '}
              (<kbd>Enter</kbd>)
            </button>
            <button className="bg-dark-400 rounded-md p-2" onClick={() => closeFullscreen()}>
              Quit (<kbd>Esc</kbd>)
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
