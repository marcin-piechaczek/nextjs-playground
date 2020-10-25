const path = require('path')
const { URL } = require('url')
const { nextI18NextRewrites } = require('next-i18next/rewrites')

const localeSubpaths = {
  en: 'en',
  pl: 'pl'
}

module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      loader: 'graphql-tag/loader',
    })

    config.resolve.alias = {
      ...config.resolve.alias,
      '~': path.resolve(__dirname),
    }

    return config
  },
  publicRuntimeConfig: {
    localeSubpaths,
  },
  async rewrites() {
    return [
      /**
       * Add prefix for each route
       */
        ...nextI18NextRewrites(localeSubpaths),
      /**
       * Rewrite /graphql requests to Magento
       */
      {
        source: '/graphql/:pathname*',
        destination: new URL('graphql', process.env.MAGENTO_URL).href,
      },

      /**
       * Sample of how to use APIs to Proxy Images
       */
      {
        source: '/store/:pathname*',
        destination: '/api/proxy',
      },

      /**
       * URlResolver 🙌
       */
      {
        source: '/:pathname*',
        destination: '/_url-resolver',
      },
    ]
  },
}
