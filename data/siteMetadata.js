const siteMetadata = {
  title: 'Oliver Butler',
  author: 'Oliver Butler',
  headerTitle: 'Oliver Butler',
  description:
    'Hey there! 👋 I hope you enjoy some of my latest posts, if you really love it give it a like, comment, and sign up to my mailing list!',
  language: 'en-bg',
  theme: 'system', // system, dark or light
  siteUrl: 'https://oliverbutler.uk',
  siteRepo: 'https://github.com/oliverbutler/blog',
  siteLogo: '/static/images/avatar.png',
  image: '/static/images/avatar.png',
  socialBanner: '/static/images/twitter-card.png',
  email: 'dev@oliverbutler.uk',
  github: 'https://github.com',
  twitter: 'https://twitter.com/Twitter',
  linkedin: 'https://www.linkedin.com',
  locale: 'en-GB',
  analytics: {
    plausibleDataDomain: '',
    simpleAnalytics: false, // true or false
    umamiWebsiteId: '', // e.g. 123e4567-e89b-12d3-a456-426614174000
    googleAnalyticsId: 'G-385N1M2KM5', // e.g. UA-000000-2 or G-XXXXXXX
  },
  newsletter: {
    provider: 'mailchimp',
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
    },
  },
}

module.exports = siteMetadata
