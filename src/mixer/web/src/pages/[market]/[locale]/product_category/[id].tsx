import { IProductCategory, IProductDetail, IProjectDetail } from '@websolute/models';
import { useDialog, useSummary } from '@websolute/ui';
import { IStaticContext, PageProps, asEquatable } from '@websolutespa/bom-core';
import { getLayout, getPage, getPageProps, getStaticPathsForSchema } from '@websolutespa/bom-mixer-models';
import { Flex, LazyLoader, Main } from '@websolutespa/bom-mixer-ui';
import ProductDetail from '../product_detail/[id]';

type ProductCategoryProps = PageProps<IProductCategory> & {
  products: IProductDetail[],
  projects: IProjectDetail[],
};

export default function ProductCategory({ layout, page, params }: ProductCategoryProps) {

  const lightColor = 'var(--color-neutral-100)';
  const darkColor = 'var(--color-neutral-800)';
  const getBackgroundColor = page.colorScheme !== undefined ? page.colorScheme === 'dark' ? darkColor : lightColor : lightColor;

  useSummary(page);

  const dialog = useDialog<PageProps<IProductDetail> & {
    nextProduct: IProductDetail
  }>((props) => (
    <ProductDetail {...props} />
  ));

  return (
    <Main background={getBackgroundColor}>
      {page.components && (
        <Flex.Col gap="var(--spacing-lg)" gapSm="var(--spacing-md)" paddingBottom="var(--spacing-sm)" paddingBottomSm="var(--spacing-md)">
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
  const page = await getPage<IProductCategory>('product_category', id, market, locale);
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
  const paths = await getStaticPathsForSchema('product_category');
  return {
    paths,
    fallback: 'blocking', // runs before initial render
    // fallback: true, // runs in the background
  };
}
