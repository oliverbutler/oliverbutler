import React from "react";
import Section from "components/Layout/Section";
import Image from "next/image";
import { motion } from "framer-motion";
import { Title } from "components/Typography/Title/Title";
import { SectionWidth } from "components/Layout/Section/Section";
import { Love } from "components/Love/Love";

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
      <Love className="fixed right-10 top-52" />
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
    </motion.div>
  );
};

export default Post;
