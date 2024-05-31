import { ILocationDetail, ILocationIndex, getLocationDetails } from '@websolute/models';
import { IEquatable, IFeatureType, IServerSideContext, PageProps, asEquatable } from '@websolutespa/bom-core';
import { IPaginationInfo, getFilters, getPaginationInfo, getSearchParamsQs, setFilters, updateSearchParamsQs } from '@websolutespa/bom-mixer-hooks';
import { IconChevronLeft, IconChevronRight } from '@websolutespa/bom-mixer-icons';
import { getLayout, getPage, getPageProps } from '@websolutespa/bom-mixer-models';
import { Button, Card, Container, Flex, Grid, Link, Main, Media, Pagination, Section, Text } from '@websolutespa/bom-mixer-ui';
import { useRouter } from 'next/router';

export default function LocationIndex({ layout, page, pagination }: PageProps<ILocationIndex> & {
  pagination: IPaginationInfo<ILocationDetail>;
}) {
  const router = useRouter();

  function onPaginationChange(page: number) {
    const { pathname, query } = updateSearchParamsQs(router.asPath,
      {
        pagination: { page },
      }
    );
    // console.log('onPaginationChange', pathname, query);
    router.replace({ pathname, query });
  }

  function urlResolver(page: number) {
    const { pathname, query } = updateSearchParamsQs(router.asPath,
      {
        pagination: { page },
      }
    );
    return pathname + (query ? `?${query}` : '');
  }

  return (
    <Main background="var(--color-neutral-100)">
      <Section minHeight="calc(100vh - 135px)">
        <Container>
          <Grid.Row>
            <Grid gridColumnStartSm="3" gridColumnEndSm="11" textAlign="center">
              <Flex.Col gap="30px" minHeight="calc(100vh - 135px)" alignItems="center" justifyContent="center">
                {page.title && <Text variant="display30" as="h1">{page.title}</Text>}
                {page.abstract && (
                  <Text variant="heading40" dangerouslySetInnerHTML={{ __html: page.abstract }} />
                )}
              </Flex.Col>
            </Grid>
          </Grid.Row>
          <Grid.Row columnGap="1rem" rowGap="2.5rem">
            {pagination.items.map((item, i) => (
              <Grid key={i} sm={6} md={6} >
                <Link href={item.href || '#'}>
                  <Card as="a" hoverable width="100%">
                    <Media aspectRatio={96 / 54} marginBottom="2rem" item={item.media} />
                    <Card.Content>
                      <Text variant="heading40" lineHeight="1.2" dangerouslySetInnerHTML={{ __html: item.title || 'untitled' }}></Text>
                      <Button variant="nav">
                        <Text variant="paragraph50" textTransform="uppercase">View More</Text>
                      </Button>
                    </Card.Content>
                  </Card>
                </Link>
              </Grid>
            ))}
            {/* pagination */}
            {pagination.pages > 1 && (
              <Grid alignItems="center">
                <Pagination margin="2rem 0"
                  count={pagination.pages} initialPage={pagination.page} page={pagination.page}
                  onChange={onPaginationChange}
                  urlResolver={urlResolver}
                >
                  <Pagination.Previous><IconChevronLeft /></Pagination.Previous>
                  <Pagination.Next><IconChevronRight /></Pagination.Next>
                </Pagination>
              </Grid>
            )}
            {/* no results */}
            {pagination.pages == 0 && (
              <Grid alignItems="center" className="pt80 pb80">
                There are no results match your search criteria.
              </Grid>
            )}
          </Grid.Row>
        </Container>
      </Section>
    </Main>
  );
}

export async function getServerSideProps(context: IServerSideContext) {
  const params = context.params;
  const query = context.query;

  const id = asEquatable(params.id);
  const market = params.market;
  const locale = params.locale;
  const layout = await getLayout(market, locale);
  const page = await getPage<ILocationIndex>('location_index', id, market, locale);
  if (!page) {
    return {
      notFound: true,
      revalidate: true,
    };
  }

  const items = await getLocationDetails({ market, locale });
  const featureTypes = await getLocationDetailFeatureTypes({ market, locale });

  // querystring
  const searchParams = getSearchParamsQs(context.resolvedUrl);

  // filters
  const filters = getFilters(items, featureTypes, filterLocationDetail, searchParams.filters);
  const filteredItems = setFilters(items, filters);

  // pagination
  let pagination = searchParams.pagination || {};
  pagination = getPaginationInfo<ILocationDetail>(filteredItems, pagination.page, pagination.perPage || 12);

  const props = await getPageProps({ params, query, layout, page, filters, pagination });
  return {
    props,
  };
}

/**
 * this method retrieves filter datas.
 */
export async function getLocationDetailFeatureTypes({ market, locale }: { market: string, locale: string }): Promise<IFeatureType[]> {
  const featureTypes: IFeatureType[] = [{
    id: 'search',
    schema: 'featureType',
    title: 'Search',
    mode: 'query',
  }];
  return featureTypes;
}

/**
 * this method is the actual filtering function.
 */
function filterLocationDetail(key: string, item: ILocationDetail, value: IEquatable) {
  switch (key) {
    case 'search':
      return item.title.toLowerCase().includes(value.toString().toLowerCase());
    default:
      return false;
  }
}
