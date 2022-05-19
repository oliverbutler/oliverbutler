const siteMetadata = {
  title: 'Oliver Butler',
  author: 'Oliver Butler',
  headerTitle: 'Oliver Butler',
  description: "I'm a software engineer who blogs about JavaScript, React, and other tech stuff.",
  language: 'en-bg',
  theme: 'system', // system, dark or light
  siteUrl: 'https://oliverbutler.uk',
  siteRepo: 'https://github.com/oliverbutler/oliverbutler',
  siteLogo: '/static/images/avatar.png',
  image: '/static/images/avatar.png',
  socialBanner: '/static/images/seo-card.png',
  email: 'dev@oliverbutler.uk',
  github: 'https://github.com/oliverbutler',
  twitter: 'https://twitter.com/_oliverbutler',
  linkedin: 'https://www.linkedin.com/in/oliver-butler',
  locale: 'en-GB',
  analytics: {
    googleAnalyticsId: 'G-G146XRC7V0',
  },
  comment: {
    provider: 'giscus',
    giscusConfig: {
      // Visit the link below, and follow the steps in the 'configuration' section
      // https://giscus.app/
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname', // supported options: pathname, url, title
      reactions: '1', // Emoji reactions: 1 = enable / 0 = disable
      // Send discussion metadata periodically to the parent window: 1 = enable / 0 = disable
      metadata: '0',
      // theme example: light, dark, dark_dimmed, dark_high_contrast
      // transparent_dark, preferred_color_scheme, custom
      theme: 'light',
      // theme when dark mode
      darkTheme: 'transparent_dark',
      // If the theme option above is set to 'custom`
      // please provide a link below to your custom theme css file.
      // example: https://giscus.app/themes/custom_example.css
      themeURL: '',
      lang: '',
    },
  },
}

module.exports = siteMetadata
