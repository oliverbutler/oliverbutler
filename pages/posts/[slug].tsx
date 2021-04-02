import { PostOrPage } from "@tryghost/content-api";
import { getPosts, getSinglePost } from "utils/post";

type PostProps = {
  post: PostOrPage;
};

const Post = ({ post }: PostProps) => {
  return (
    <div>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  );
};

export async function getStaticPaths() {
  const posts = await getPosts();

  // Get the paths we want to create based on posts
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  // { fallback: false } means posts not found should 404.
  return { paths, fallback: false };
}

export const getStaticProps = async (context) => {
  const post = await getSinglePost(context.params.slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: { post },
  };
};

export default Post;
