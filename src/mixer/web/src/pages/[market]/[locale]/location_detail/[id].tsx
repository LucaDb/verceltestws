import { ILocationDetail, IProductDetail } from '@websolute/models';
import { useDialog } from '@websolute/ui';
import { IStaticContext, PageProps, asEquatable } from '@websolutespa/bom-core';
import { getLayout, getPage, getPageProps, getStaticPathsForSchema } from '@websolutespa/bom-mixer-models';
import { Flex, LazyLoader, Main } from '@websolutespa/bom-mixer-ui';
import ProductDetail from '../product_detail/[id]';

export default function LocationDetail({ layout, page, params }: PageProps<ILocationDetail>) {

  const lightColor = 'var(--color-neutral-100)';
  const darkColor = 'var(--color-neutral-800)';
  const getBackgroundColor = page.colorScheme !== undefined ? page.colorScheme === 'dark' ? darkColor : lightColor : lightColor;

  const dialog = useDialog<PageProps<IProductDetail> & {
    nextProduct: IProductDetail
  }>((props) => (
    <ProductDetail {...props} />
  ));

  return (
    <Main background={getBackgroundColor}>
      {page.components && (
        <Flex.Col gap="var(--spacing-lg)" gapSm="var(--spacing-md)" padding=" var(--spacing-sm) 0 0 0" paddingSm="var(--spacing-md) 0 0 0">
          <LazyLoader components={page.components} />
        </Flex.Col>
      )}
      {dialog}
    </Main>
  );
}

export async function getStaticProps(context: IStaticContext) {
  const id = asEquatable(context.params.id);
  const market = context.params.market;
  const locale = context.params.locale;
  const layout = await getLayout(market, locale);
  const page = await getPage<ILocationDetail>('location_detail', id, market, locale);
  if (!page) {
    return {
      notFound: true,
      revalidate: true,
    };
  }
  const props = await getPageProps({ ...context, layout, page });
  return {
    props,
    revalidate: 60, // will re-generate the page when a request comes in at most once every 60 seconds
  };
}

export async function getStaticPaths() {
  const paths = await getStaticPathsForSchema('location_detail');
  return {
    paths,
    fallback: 'blocking', // runs before initial render
    // fallback: true, // runs in the background
  };
}
