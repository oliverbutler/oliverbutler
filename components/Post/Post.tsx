import React from "react";
import Section from "components/Layout/Section";
import Image from "next/image";
import { motion } from "framer-motion";
interface PostProps {
  meta: {
    title: string;
    description: string;
    date: string;
    image: string;
    readTime: number;
  };
}

const Post: React.FunctionComponent<PostProps> = ({ meta, children }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 150 }} animate={{ opacity: 1, y: 0 }}>
      <Section className="prose mx-auto my-10">
        <h1 className="title-font text-3xl mb-4 font-medium dark:text-white text-black z-10">
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
          width={1000}
          height={600}
        />
      </Section>
      <Section className="prose mx-auto">{children}</Section>
    </motion.div>
  );
};

export default Post;
