const withMDX = require("@next/mdx")({
  extension: /\.mdx$/,
});

module.exports = withMDX({
  future: {
    webpack5: false,
  },

  images: {
    domains: ["localhost", "oliverbutler.s3.eu-west-2.amazonaws.com"],
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
});
