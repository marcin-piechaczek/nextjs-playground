import { ApolloProvider } from '@apollo/client'
import { useApollo } from '~/lib/apollo-client'
import {App as AppWrapper} from '~/components/App'
import App from 'next/app';
import 'reset-css'
import '~/styles/global.css'
import { appWithTranslation, i18n } from '../lib/i18n';
import { Provider } from 'react-redux';
import { useStore } from '../lib/store';

function NextApp({ Component, pageProps, currentLanguage }) {
  const apolloClient = useApollo(pageProps.initialApolloState)
    const store = useStore(pageProps.initialReduxState);

  return (
      <Provider store={store}>
        <ApolloProvider client={apolloClient}>
          <AppWrapper lang={currentLanguage}>
            <Component {...pageProps} />
          </AppWrapper>
        </ApolloProvider>
      </Provider>
  )
}

NextApp.getInitialProps = async (appContext) => {
    const { ctx: { req } } = appContext;
    const currentLanguage = typeof req === "undefined" ? i18n.language : req.language;
    const appProps = await App.getInitialProps(appContext)
    return { ...appProps, currentLanguage }
}

export default appWithTranslation(NextApp)
