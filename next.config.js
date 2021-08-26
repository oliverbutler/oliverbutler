// const mdxRenderer = `
//   import React from 'react'
//   import { mdx } from '@mdx-js/react'

//   export async function getStaticProps () {

//     return {
//       props: {
//         foo: 'bar'
//       }
//     }
//   }
// `;

const withMDX = require("@next/mdx")({
  extension: /\.mdx$/,
  options: {
    // renderer: mdxRenderer,
  },
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
