import { gql, useQuery } from "@apollo/client";
import { AnimatePresence, AnimationProps, motion } from "framer-motion";
import { Posts, Posts_posts } from "queries/types/Posts";
import React, { useState } from "react";
import PostCard from "../PostCard";

const PostList = () => {
  type MotionComponentProps = {
    children: any;
    className: any;
    key: any;
  };

  const ExteriorDiv = ({ className, key, children }: MotionComponentProps) => {
    const [visible, setVisible] = useState(true);

    const variants: AnimationProps["variants"] = {
      normal: { opacity: 1, y: 0 },
      exit: { opacity: 0.2, y: -100, scale: 1.1 },
    };

    return (
      <motion.div
        initial={{ y: 50 }}
        onClick={() => setVisible(false)}
        variants={variants}
        animate={visible ? "normal" : "exit"}
        key={key}
        className={className}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div className="flex flex-wrap -m-4 justify-center">
      {/* {[].map((post) => (
        <PostCard key={post.slug} post={post} ExteriorDiv={ExteriorDiv} />
      ))} */}
    </div>
  );
};

export default PostList;
