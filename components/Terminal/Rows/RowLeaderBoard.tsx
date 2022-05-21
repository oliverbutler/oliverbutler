import { LoaderText } from '@/components/LoaderText'
import { GetHighScores } from 'pages/api/score/high'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

export const RowLeaderBoard = () => {
  const { data } = useSWR<GetHighScores>('http://localhost:3005/api/score/high', fetcher)

  return (
    <div>
      {data ? (
        <ul>
          {data.highScores.map((score) => (
            <li key={score.score}>
              {score.game} {score.score} {score.user.name}
            </li>
          ))}
        </ul>
      ) : (
        <LoaderText />
      )}
    </div>
  )
}
