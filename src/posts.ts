export interface Post {
  url: string;
  frontmatter: {
    title: string;
    pubDate: string;
    description: string;
    updatedDate: string;
    heroImage: string;
  };
}

export const getPosts = async (): Promise<Record<string, Post>> => {
  const globPosts = import.meta.glob("./pages/blog/*.{md,mdx}", {
    eager: true,
  });

  return Object.keys(globPosts).reduce((posts, postPath) => {
    const post = globPosts[postPath] as Post;
    posts[postPath.replace("./pages/blog/", "")] = post;
    return posts;
  }, {} as Record<string, Post>);
};

export const getPostsByDate = async (): Promise<Post[]> => {
  const posts = await getPosts();

  return Object.values(posts).sort(
    (a, b) =>
      new Date(b.frontmatter.pubDate).getTime() -
      new Date(a.frontmatter.pubDate).getTime()
  );
};
