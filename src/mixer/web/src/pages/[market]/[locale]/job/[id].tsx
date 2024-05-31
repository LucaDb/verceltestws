import { IJob } from '@websolute/models';
import { useSummary } from '@websolute/ui';
import { IStaticContext, PageProps, asEquatable } from '@websolutespa/bom-core';
import { getLayout, getPage, getPageProps, getStaticPathsForSchema } from '@websolutespa/bom-mixer-models';
import { Flex, LazyLoader, Main } from '@websolutespa/bom-mixer-ui';

export default function Job({ layout, page, params }: PageProps<IJob>) {
  useSummary(page);

  const lightColor = 'var(--color-neutral-100)';
  const darkColor = 'var(--color-neutral-800)';
  const getBackgroundColor = page.colorScheme !== undefined ? page.colorScheme === 'dark' ? darkColor : lightColor : lightColor;

  return (
    <Main background={getBackgroundColor}>
      {page.components && (
        <Flex.Col gap="var(--spacing-lg)" gapSm="var(--spacing-md)" padding=" var(--spacing-sm) 0" paddingSm="var(--spacing-md) 0">
          <LazyLoader components={page.components} />
        </Flex.Col>
      )}
    </Main>
  );
}

export async function getStaticProps(context: IStaticContext) {
  const id = asEquatable(context.params.id);
  const market = context.params.market;
  const locale = context.params.locale;
  const layout = await getLayout(market, locale);
  const page = await getPage<IJob>('job', id, market, locale);
  const props = await getPageProps({ ...context, layout, page });
  return {
    props,
    revalidate: 60, // will re-generate the page when a request comes in at most once every 60 seconds
  };
}

export async function getStaticPaths() {
  const paths = await getStaticPathsForSchema('job');
  return {
    paths,
    fallback: true, // runs in the background
    // fallback: 'blocking', // runs before initial render
  };
}
