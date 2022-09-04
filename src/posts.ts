export interface Post {
  url: string;
  image: any;
  frontmatter: {
    title: string;
    pubDate: string;
    description: string;
    updatedDate: string;
    heroImage: string;
  };
}

const getAllImages = (): Record<string, () => Promise<unknown>> => {
  const images = import.meta.glob("./images/**/*.{png,jpg,jpeg}");

  return images;
};

export const getPosts = async (): Promise<Record<string, Post>> => {
  const globPosts = import.meta.glob("./pages/blog/*.{md,mdx}", {
    eager: true,
  });

  let newPosts = {} as Record<string, Post>;

  const images = getAllImages();

  for (const postPath in globPosts) {
    const post = globPosts[postPath] as Post;

    const foundImage = images[post.frontmatter.heroImage.replace("../..", ".")];

    if (!foundImage) {
      throw new Error(`Image not found for ${post.frontmatter.title}`);
    }

    const resolvedImg = ((await foundImage()) as any).default;

    const postWithImage = Object.assign({ image: resolvedImg }, post);

    newPosts[postPath.replace("./pages/blog/", "")] = postWithImage;
  }

  return newPosts;
};

export const getPostsByDate = async (): Promise<Post[]> => {
  const posts = await getPosts();

  return Object.values(posts).sort(
    (a, b) =>
      new Date(b.frontmatter.pubDate).getTime() -
      new Date(a.frontmatter.pubDate).getTime()
  );
};
