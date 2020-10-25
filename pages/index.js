import React from 'react'
import Home from '~/components/Home'
import { initializeApollo } from '~/lib/apollo-client'
import APP_QUERY from '~/components/App/App.graphql'
import PRODUCTS_QUERY from '~/components/Products/Products.graphql'
import { i18n } from '../lib/i18n';

const HomePage = () => {
  return <Home />
}

export const getServerSideProps = async ({ req }) => {
  const apolloClient = initializeApollo()
  const currentLanguage = typeof req === "undefined" ? i18n.language : req.language;

  await apolloClient.query({
    query: APP_QUERY,
    fetchPolicy: 'network-only',
    context: {
      headers: {
        store: currentLanguage
      }
    }
  })

  await apolloClient.query({
    query: PRODUCTS_QUERY,
    variables: { search: '' },
    fetchPolicy: 'network-only',
    context: {
      headers: {
        store: currentLanguage
      }
    }
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default HomePage
