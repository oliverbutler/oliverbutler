import GhostContentAPI, { PostOrPage } from "@tryghost/content-api";

// Create API instance with site credentials
const api = new GhostContentAPI({
  url: "http://localhost:2368",
  key: "2342c571ce510f024667f31128",
  version: "v3",
});

export const getPosts = async () => {
  return await api.posts
    .browse({
      limit: "all",
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getSinglePost = async (postSlug: string) => {
  return await api.posts
    .read({
      slug: postSlug,
    })
    .catch((err) => {
      console.error(err);
    });
};
