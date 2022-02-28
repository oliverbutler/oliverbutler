interface Props {
  url: string
  caption: string
}

export const Gif: React.FunctionComponent<Props> = ({ url, caption }) => {
  return (
    <div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={url} className="mx-auto" alt="gif"></img>
      {caption && <p className="mt-1 text-center">{caption}</p>}
    </div>
  )
}
