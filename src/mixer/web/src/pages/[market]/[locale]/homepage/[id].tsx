import { IHomepage } from '@websolute/models';
import { Opening, useSummary } from '@websolute/ui';
import { IStaticContext, PageProps, asEquatable } from '@websolutespa/bom-core';
import { getLayout, getPage, getPageProps, getStaticPathsForSchema } from '@websolutespa/bom-mixer-models';
import { Flex, LazyLoader, Main } from '@websolutespa/bom-mixer-ui';
import React from 'react';

type HomepageProps = PageProps<IHomepage>;

export default function Homepage({ layout, page, params }: HomepageProps) {
  useSummary(page);

  const lightColor = 'var(--color-neutral-100)';
  const darkColor = 'var(--color-neutral-800)';
  const getBackgroundColor = page.colorScheme !== undefined ? page.colorScheme === 'dark' ? darkColor : lightColor : lightColor;

  return (
    <React.Fragment>
      {(page.opening?.media && page.opening?.active) && <Opening media={page.opening?.media} />}
      <Main background={getBackgroundColor}>
        {page.components && (
          <Flex.Col gap="var(--spacing-lg)" gapSm="var(--spacing-md)" padding="0" paddingSm="0">
            <LazyLoader components={page.components} />
          </Flex.Col>
        )}
      </Main>
    </React.Fragment>
  );
}

export async function getStaticProps(context: IStaticContext) {
  const id = asEquatable(context.params.id);
  const market = context.params.market;
  const locale = context.params.locale;
  const layout = await getLayout(market, locale);
  const page = await getPage<IHomepage>('homepage', id, market, locale);
  if (!page) {
    return {
      notFound: true,
      revalidate: true,
    };
  }
  const props = await getPageProps({ ...context, layout, page });
  return {
    props,
    /*
    * Next.js will attempt to re-generate the page when a request comes in at most once every 60 seconds
    */
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const paths = await getStaticPathsForSchema('homepage');
  return {
    paths,
    /*
    * getStaticProps runs in the background when using fallback: true
    * getStaticProps is called before initial render when using fallback: blocking
    */
    fallback: 'blocking', // runs before initial render
    // fallback: true, // runs in the background
  };
}

