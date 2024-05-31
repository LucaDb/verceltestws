import { LenisOptions } from '@studio-freight/lenis';
import { ReactLenis } from '@studio-freight/react-lenis';
import { Layout, Meta } from '@websolutespa/bom-mixer-ui';
import { PageTransition } from '../../components';
import { Footer, Header } from '../../sections';

export type LayoutDefaultProps = {
  children?: React.ReactNode;
};

const structuredDataCollections = {
  article: ['cultura_detail'],
};

export function LayoutDefault({ children }: LayoutDefaultProps) {
  const options: LenisOptions = {
  };
  return (
    <>
      <Meta structuredDataCollections={structuredDataCollections} />
      <Layout>
        <ReactLenis root options={options}>
          <PageTransition>
            <Header />
            {children}
            <Footer />
          </PageTransition>
        </ReactLenis>
      </Layout>
    </>
  );
}
