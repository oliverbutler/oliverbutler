import { Spotify } from 'types/Spotify'

export const RowInfo = ({ spotify }: { spotify: Spotify | null }) => {
  const spotifyText = spotify
    ? `${spotify?.item.name} by ${spotify?.item.artists[0].name}`
    : 'No song playing'

  return (
    <pre className="flex flex-row pb-3 text-sm">
      <pre>
        {`  ___  _ _      
 / _ \\| | |_  _    
| (_) | | | || |   
 \\___/|_|_|\\_, | 
           |__/   `}
      </pre>
      <div className="mt-4">
        <pre>OS: React 17.0.2</pre>
        <pre>Host: oliverbutler.uk</pre>
        <pre>Spotify: {spotifyText}</pre>
        <pre className="mt-2">
          Type <code className="italic text-primary-400">help</code> to get started
        </pre>
      </div>
    </pre>
  )
}
