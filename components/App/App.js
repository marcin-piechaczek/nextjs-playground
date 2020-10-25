import { useQuery } from '@apollo/client'
import React from 'react'
import styles from './App.module.css'
import APP_QUERY from './App.graphql'
import NextNprogress from 'nextjs-progressbar'
import Head from 'next/head'
import { resolveImage } from '~/lib/resolve-image'
import { i18n, Link } from '../../lib/i18n';
import Language from "~/components/Language/Language";

export const App = ({ children, lang }) => {
    console.log('lang', lang);
  const { data } = useQuery(APP_QUERY, {
      fetchPolicy: 'network-only',
      context: {
          headers: {
              store: lang
          }
      }
  });

  const store = data?.storeConfig

  const categoryUrlSuffix = store?.category_url_suffix ?? ''

  const categories = data?.categoryList[0].children

  return (
    <React.Fragment>
      <Head>
        <title>{store?.default_title}</title>
      </Head>

      <div className={styles.app}>
        <NextNprogress
          startPosition={0.4}
          stopDelayMs={200}
          height={6}
          options={{ showSpinner: false, easing: 'ease' }}
        />

        <header className={styles.header}>
          <Link href="/">
            <a>
              <img
                src={
                  store?.header_logo_src
                    ? resolveImage(
                        store.base_media_url + 'logo/' + store.header_logo_src
                      )
                    : '/static/logo.png'
                }
                alt={store?.logo_alt ?? 'Store'}
              />
            </a>
          </Link>

          <nav className={styles.categoriesWrapper}>
            <ul className={styles.categories}>
              {categories?.map((category) => (
                <li key={category.id}>
                  <Link
                    href={{
                      pathname: '_url-resolver',
                      query: {
                        pathname: `/${category.url_key + categoryUrlSuffix}`,
                        type: 'CATEGORY',
                      },
                    }}
                    as={'/' + category.url_key + categoryUrlSuffix}
                  >
                    <a>{category.name}</a>
                  </Link>
                </li>
              ))}
              <li>
                  <Language />
              </li>
            </ul>
          </nav>
        </header>

        <div className={styles.content}>{children}</div>

        {store?.copyright && (
          <footer className={styles.footer}>
            {data.storeConfig.copyright}
          </footer>
        )}
      </div>
    </React.Fragment>
  )
}
