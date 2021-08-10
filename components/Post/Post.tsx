import React from "react";
import Section from "components/Layout/Section";
import Image from "next/image";
import { motion } from "framer-motion";

export interface PostMeta {
  id: number;
  title: string;
  description: string;
  date: string;
  image: any;
  tags: string[];
  readTime: number;
}
interface PostProps {
  meta: PostMeta;
}

const Post: React.FunctionComponent<PostProps> = ({ meta, children }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 150 }} animate={{ opacity: 1, y: 0 }}>
      <Section className="prose dark:prose-light mx-auto my-10">
        <h1 className="title-font text-3xl mb-4 font-medium z-10">
          {meta.title}
        </h1>
        <p className="leading-relaxed mb-2">{meta.description}</p>
        <p className="leading-relaxed mb-8">
          {meta.date} - {meta.readTime} Min Read
        </p>
        <Image
          src={meta.image}
          className="w-full"
          alt="Post Thumbnail"
          placeholder="blur"
        />
      </Section>
      <Section className="prose dark:prose-light mx-auto">{children}</Section>
    </motion.div>
  );
};

export default Post;
