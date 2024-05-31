import { IProductDetail, getProductDetails } from '@websolute/models';
import { Next, useSummary } from '@websolute/ui';
import { IStaticContext, PageProps, asEquatable } from '@websolutespa/bom-core';
import { getLayout, getPage, getPageProps, getStaticPathsForSchema } from '@websolutespa/bom-mixer-models';
import { Flex, LazyLoader, Main, UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import styled from 'styled-components';

type ContainerProps = {};

export type PageContainerProps = UIStyledComponentProps<ContainerProps>;

const PageContainer = styled.div<PageContainerProps>`
  &:after {
    content: '';
    position: absolute;
    z-index: 0;
    top: var(--spacing-sm);
    bottom: var(--spacing-sm);
    left: var(--grid-column-gap);
    width: calc(100% - var(--grid-column-gap) * 2);
    background: var(--color-neutral-100);
    border-radius: 15px;
  }

  ${props => getCssResponsive(props)}
`;

type ProductDetailProps = PageProps<IProductDetail> & {
  nextProduct: IProductDetail
};

export default function ProductDetail({ page, nextProduct }: ProductDetailProps) {
  useSummary(page);

  const nextItem: IProductDetail | undefined = nextProduct;

  const lightColor = 'var(--color-neutral-100)';
  const darkColor = 'var(--color-neutral-800)';
  const getBackgroundColor = page.colorScheme !== undefined ? page.colorScheme === 'dark' ? darkColor : lightColor : lightColor;

  return (
    <Main background={getBackgroundColor}>
      {page.components && page.components.length > 0 && (
        <PageContainer position="relative" background="var(--color-neutral-100)" backgroundSm="var(--color-neutral-200)" padding="0" paddingSm="var(--spacing-sm) 0">
          <Flex.Col marginTop="20px" gap="var(--spacing-lg)" gapSm="var(--spacing-md)" padding="var(--spacing-sm) var(--grid-column-gap)" paddingSm="var(--spacing-md) var(--grid-column-gap)">
            {<LazyLoader components={page.components} />}
          </Flex.Col>
        </PageContainer>
      )}
      {nextItem && <Next item={nextItem} />}
    </Main>
  );
}

export async function getStaticProps(context: IStaticContext) {
  const id = asEquatable(context.params.id);
  const market = context.params.market;
  const locale = context.params.locale;
  const layout = await getLayout(market, locale);
  const page = await getPage<IProductDetail>('product_detail', id, market, locale);
  if (!page) {
    return {
      notFound: true,
      revalidate: true,
    };
  }

  const products = await getProductDetails({
    where: {
      category: {
        equals: typeof page?.category === 'object' ? page.category.id : page?.category,
      },
    }, market, locale,
  });

  const currentIndex = products.findIndex((product) => product.slug === page?.slug);
  const nextIndex = (currentIndex + 1) % products.length;
  const nextProduct = products[nextIndex];

  const props = await getPageProps({ ...context, layout, page, nextProduct });
  return {
    props,
    revalidate: 60, // will re-generate the page when a request comes in at most once every 60 seconds
  };
}

export async function getStaticPaths() {
  const paths = await getStaticPathsForSchema('product_detail');
  return {
    paths,
    fallback: 'blocking', // runs before initial render
    // fallback: true, // runs in the background
  };
}
