import { GlobalStyle, LAZY_MODULES, LayoutDefault, MenuProvider, theme, uiVariants } from '@websolute/ui';
import { isDevelopment } from '@websolutespa/bom-core';
import { ExtraProvider, LabelProvider, LayoutProvider, LazyModulesProvider, PageProvider } from '@websolutespa/bom-mixer-hooks';
import { IApplication } from '@websolutespa/bom-mixer-models';
import { Breakpoint, ErrorHandler, VariantsProvider, accessibility } from '@websolutespa/bom-mixer-ui';
import { useLivePreview } from '@websolutespa/payload-bowl-live-preview';
import { AnimatePresence } from 'framer-motion';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { StyleSheetManager, ThemeProvider } from 'styled-components';

export default function Application({ Component, pageProps }: IApplication) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Used for page transition
    const start = () => {
      setLoading(true);
      //console.log('loading start');
    };
    const end = () => {
      setLoading(false);
      //console.log('loading end');
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  const { layout, page, ...extra } = pageProps;
  const { data } = useLivePreview({ initialData: page });
  pageProps.page = data;
  if (!layout || !page) {
    return;
  }
  const LayoutComponent = Component.Layout || LayoutDefault;
  return (
    <StyleSheetManager>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <VariantsProvider variants={uiVariants}>
          <ErrorBoundary FallbackComponent={ErrorHandler}>
            <LayoutProvider layout={layout}>
              <LabelProvider>
                <PageProvider page={page}>
                  <ExtraProvider extra={extra}>
                    <LazyModulesProvider modules={LAZY_MODULES}>
                      <MenuProvider>
                        <AnimatePresence
                          mode="wait"
                          initial={false}
                          onExitComplete={() => window.scrollTo(0, 0)}
                        >
                          {loading ? '' : (
                            <LayoutComponent>
                              <Component {...pageProps} />
                            </LayoutComponent>
                          )}
                        </AnimatePresence>
                      </MenuProvider>
                    </LazyModulesProvider>
                  </ExtraProvider>
                </PageProvider>
              </LabelProvider>
            </LayoutProvider>
          </ErrorBoundary>
        </VariantsProvider>
        {isDevelopment && <Breakpoint />}
      </ThemeProvider>
    </StyleSheetManager>
  );
}

accessibility(React);
