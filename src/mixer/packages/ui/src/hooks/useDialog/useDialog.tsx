import { useLenis } from '@studio-freight/react-lenis';
import { PageProps, isBrowser, isDevelopment } from '@websolutespa/bom-core';
import { ExtraProvider, PageProvider, useLayout, usePage, usePortal } from '@websolutespa/bom-mixer-hooks';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { HeaderDialog } from '../../sections/header-dialog/header-dialog';

const StyledWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  scroll-behavior: smooth;
  z-index: 100;
`;

const StyledHeader = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: auto;
  max-width: 100%;
  z-index: 101;
`;

export function useDialog<T extends PageProps>(callback: (props: T) => ReactNode) {

  const layout = useLayout();
  const page = usePage();
  const router = useRouter();

  const hash = isBrowser ? window.location.hash : '';

  const [visible, setVisible] = useState(false);
  const [locked, setLocked] = useState(false);
  const [pageProps, setPageProps] = useState<T>();

  const { layout: pagePropsLayout, page: pagePropsPage, ...extra } = pageProps || {};

  const lenis = useLenis(() => {

  });

  const onClose = () => {
    setVisible(false);
    router.replace(page.href, page.href, { scroll: false });
  };

  useEffect(() => {
    if (hash.indexOf('#dialog=') === 0) {
      setVisible(true);
      setLocked(true);
      const href = hash.split('#dialog=')[1];
      fetch(`/_next/data/${isDevelopment ? 'development' : 'production'}${href}.json`)
        .then(response => response.json())
        .then(props => {
          console.log('props', props);
          setPageProps(props.pageProps as T);
        });
      return () => {
        // handle abort
      };
    }
    return () => { };
  }, [hash, layout.market, layout.locale]);

  useEffect(() => {
    if (lenis) {
      locked ? lenis.stop() : lenis.start();
    }
    return () => {
      if (lenis) {
        lenis.start();
      }
    };
  }, [locked, lenis]);

  const portal = usePortal('dialog');

  if (!portal) {
    return null;
  }

  return createPortal(
    <AnimatePresence
      onExitComplete={() => setLocked(false)}
    >
      {visible && (
        <div data-lenis-prevent>
          <StyledWrapper
            initial={{ translateY: '100vh' }}
            animate={{ translateY: 0 }}
            exit={{ translateY: '100vh' }}
            transition={{ delay: 0.35, duration: 0.7 }}
          >
            {pageProps && (
              <PageProvider page={pageProps.page}>
                <ExtraProvider extra={extra}>
                  {callback(pageProps)}
                </ExtraProvider>
              </PageProvider>
            )}
          </StyledWrapper>
          <StyledHeader
            initial={{ translateY: '-100vh' }}
            animate={{ translateY: 0 }}
            exit={{ translateY: '-100vh' }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <HeaderDialog onClose={onClose} />
          </StyledHeader>
        </div>
      )}
    </AnimatePresence>,
    portal
  );
}
