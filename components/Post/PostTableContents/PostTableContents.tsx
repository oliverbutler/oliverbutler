import { slugify } from "components/Markdown/MarkdownProvider";

interface PostTableContentsProps {
  post: React.ReactNode;
}

const mapPostToContents = (
  post: { props: { children: string; originalType: string } }[]
): { text: string; level: number; id: string }[] => {
  const lines = post.map((line) => ({
    text: line.props.children,
    heading: line.props.originalType,
  }));

  return lines
    .filter((line) => String(line.heading).match(/^h[1-5]$/) !== null)
    .map((line) => ({
      text: line.text,
      id: slugify(line.text),
      level: Number(line.heading.substring(1, 2)),
    }));
};

export const PostTableContents: React.FunctionComponent<
  PostTableContentsProps
> = ({ post }) => {
  const lines = mapPostToContents(post as any);

  const selectedLine = 0;

  return (
    <div className="fixed ml-3">
      {lines.map((heading, index) => (
        <div key={index}>
          <a
            href={`#${heading.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector(`#${heading.id}`).scrollIntoView({
                behavior: "smooth",
              });
            }}
            className={index === selectedLine ? "" : "opacity-30"}
            style={{ marginLeft: `${heading.level - 1}em` }}
          >
            - {heading.text}
          </a>
        </div>
      ))}
    </div>
  );
};
