export const RowSnake = ({ closeFullscreen }: { closeFullscreen: () => void }) => {
  return (
    <div>
      <pre className="">I'm working on it 🐍</pre>
      <button onClick={closeFullscreen}>close</button>
    </div>
  )
}
