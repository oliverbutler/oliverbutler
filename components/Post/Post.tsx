import React from "react";
import Section from "components/Layout/Section/Section";
import Image from "next/image";
import { motion } from "framer-motion";
import { Title } from "components/Typography/Title/Title";
import { SectionWidth } from "components/Layout/Section/Section";
import { Love } from "components/Love/Love";
import { useEffect } from "react";
import { API_URL } from "utils/api";
import { Blog } from "types/global";

export interface PostMeta {
  id: number;
  title: string;
  description: string;
  date: string;
  image: StaticImageData;
  tags: string[];
  slug: string;
  readTime: number;
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

  return (
    <>
      {/* <Love className="fixed right-10 top-52" /> */}
      <motion.div
        initial={{ opacity: 0, y: 150 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Section width={SectionWidth.Narrow}>
          <Title title={meta.title} subtitle={meta.description} />

          <Image
            src={meta.image}
            className="w-full"
            alt="Post Thumbnail"
            placeholder="blur"
          />
        </Section>
        <Section width={SectionWidth.Narrow}>{children}</Section>
        {blogInfo && (
          <div className=" mx-auto w-min whitespace-nowrap font-mono  text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
            Hit Count: {blogInfo.hitCount}
          </div>
        )}
      </motion.div>
    </>
  );
};

export default Post;
