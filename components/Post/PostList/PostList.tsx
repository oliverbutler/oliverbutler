import { AnimatePresence, AnimationProps, motion } from "framer-motion";

import React, { useState } from "react";
import { PostFile } from "utils/getPosts";
import PostCard from "../PostCard";

interface Props {
  posts: PostFile[];
}

const PostList: React.FunctionComponent<Props> = ({ posts }) => {
  type MotionComponentProps = {
    children: any;
    className: any;
    key: any;
  };

  // const ExteriorDiv = ({ className, key, children }: MotionComponentProps) => {
  //   const [visible, setVisible] = useState(true);

  //   const variants: AnimationProps["variants"] = {
  //     normal: { opacity: 1, y: 0 },
  //     exit: { opacity: 0.2, y: -100, scale: 1.1 },
  //   };

  //   return (
  //     <motion.div
  //       initial={{ y: 50 }}
  //       onClick={() => setVisible(false)}
  //       variants={variants}
  //       animate={visible ? "normal" : "exit"}
  //       key={key}
  //       className={className}
  //     >
  //       {children}
  //     </motion.div>
  //   );
  // };

  return (
    <div className="flex flex-wrap -m-4 justify-center mt-6">
      {posts.map((post) => (
        <PostCard key={post.path} post={post} />
      ))}
    </div>
  );
};

export default PostList;
