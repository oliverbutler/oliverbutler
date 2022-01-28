import React from "react";
import { motion } from "framer-motion";
import { Image } from "components/Image/Image";
import { Blog } from "types/global";
import { RenderBadge } from "components/Typography/Badge";
import { PostTableContents } from "./PostTableContents/PostTableContents";

export interface PostMeta {
  id: number;
  title: string;
  description: string;
  date: string;
  image: StaticImageData;
  tags: string[];
  slug: string;
  readTime: number;
  draft: boolean;
}
interface PostProps {
  meta: PostMeta;
}

const Post: React.FunctionComponent<PostProps> = ({ meta, children }) => {
  const [blogInfo, setBlogInfo] = React.useState<Blog | null>(null);

  // useEffect(() => {
  //   fetch(API_URL + "/blog/hit-counter?slug=" + meta.slug)
  //     .then((res) => res.json())
  //     .then(setBlogInfo);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  /* <Love className="fixed right-10 top-52" /> */

  return (
    <motion.div initial={{ opacity: 0, y: 150 }} animate={{ opacity: 1, y: 0 }}>
      {/* <PostTableContents post={children} /> */}

      <div className="prose dark:prose-invert mx-auto mt-24 px-4">
        <h1>{meta.title}</h1>
        <p>{meta.description}</p>

        <div className="flex flex-row">
          <div className="mb-1 -mt-1 flex flex-row flex-wrap flex-auto items-center">
            {meta.tags.map((tag) => (
              <div className="mr-2 mt-2" key={tag}>
                <RenderBadge name={tag} />
              </div>
            ))}
          </div>
          <div>
            <p>{meta.date}</p>
          </div>
        </div>
        <Image
          src={meta.image}
          alt="Post Thumbnail"
          placeholder="blur"
          className="my-12"
        />
        {children}
      </div>

      {blogInfo && (
        <div className="mx-auto w-min whitespace-nowrap font-mono  text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
          Hit Count: {blogInfo.hitCount}
        </div>
      )}
    </motion.div>
  );
};

export default Post;
