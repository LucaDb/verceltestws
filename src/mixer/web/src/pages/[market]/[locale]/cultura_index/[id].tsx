import { IconClose, IconFilter } from '@websolute/icons';
import { ICulturaDetail, ICulturaIndex, getCulturaDetails } from '@websolute/models';
import { BlogCard, BlogCardEditorial, InfiniteLoader, MenuDropdownFilter, useMenu, useSummary } from '@websolute/ui';
import { IEntity, IEquatable, IStaticContext, PageProps, asEquatable, isObject } from '@websolutespa/bom-core';
import { Filter, IFilterOption, filtersToParams, useFilters, useInfiniteLoader, useLabel, useSearchParamsQs } from '@websolutespa/bom-mixer-hooks';
import { IFeatureType, getLayout, getPage, getPageProps, getStaticPathsForSchema } from '@websolutespa/bom-mixer-models';
import { Box, Button, Container, Flex, Grid, Main, Section, Text } from '@websolutespa/bom-mixer-ui';
import { Fragment, useCallback, useEffect, useMemo } from 'react';

// this is the actual filtering function
function filterCulturaDetail(key: string, item: ICulturaDetail, value: IEquatable): boolean {
  switch (key) {
    case 'type':
      return item.type.id === value;
    case 'tag':
      return item.tag.find(x => x.id === value) !== undefined;
    default:
      return false;
  }
}

export default function CulturaIndex({ layout, page, items, featureTypes, params: pageParams }: PageProps<ICulturaIndex> & {
  items: ICulturaDetail[];
  featureTypes: IFeatureType[];
}) {
  const label = useLabel();
  const { toggleView, setDropdown } = useMenu(state => state.actions);
  useSummary(page);

  featureTypes = useMemo(() => {
    const type = featureTypes.find(x => x.id === 'type');
    if (type) {
      type.title = 'Filtra per tipologia';
    }
    const tag = featureTypes.find(x => x.id === 'tag');
    if (tag) {
      tag.title = 'Filtra per tag';
    }
    return featureTypes;
  }, [featureTypes]);

  // deserialize queryString encoded params
  const { params, replaceParamsSilently } = useSearchParamsQs();

  // using item filter callback from service
  const filterItem = useCallback(filterCulturaDetail, []);

  // initialize filters with items, featureTypes and queryString params
  const { filteredItems, filters, setFilter } = useFilters<ICulturaDetail>(items, featureTypes, filterItem, params?.filter);

  // console.log(filters.map(f => `${f.id}: ${f.options.map(o => `${o.title} (${o.count})`).join(',')}`).join(','));

  // visible results paged by the infinite scroll or button loader
  const [visibleItems, onMore, hasMore] = useInfiniteLoader(filteredItems);

  // fires when user make a change on filters
  const onFilterChange = (filter: Filter<ICulturaDetail>, values?: IEquatable[]) => {
    setFilter(filter, values);
    // serializing querystring filter
    const filterParams = filtersToParams(filters);
    replaceParamsSilently({ filter: filterParams });
  };

  const onToggleOption = (filter: Filter<ICulturaDetail>, option: IFilterOption) => {
    filter.toggle(option);
    onFilterChange(filter, filter.values);
  };

  const onToggleFilters = (event: React.MouseEvent) => {
    toggleView('dropdown');
  };

  useEffect(() => {
    setDropdown({
      title: 'filtra',
      children: (
        <MenuDropdownFilter filters={filters} onToggle={onToggleOption} />
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredItems]);

  return (
    <Main className="light">
      <Section>
        <Container>
          <Grid.Row>
            <Grid gridColumnStartSm="3" gridColumnEndSm="11" textAlign="center">
              <Flex.Col gap="30px" minHeight="calc(100vh - 135px)" alignItems="center" justifyContent="center">
                {page.title && <Text variant="display30" as="h1">{page.title}</Text>}
                {page.abstract && (
                  <Text variant="heading40" dangerouslySetInnerHTML={{ __html: page.abstract }} />
                )}
                <Button variant="primaryInline" onClick={onToggleFilters}>
                  <IconFilter />
                  <Text variant="paragraph50" textTransform="uppercase">
                    <Box data-btn-text="Filtra gli articoli">Filtra gli articoli</Box>
                  </Text>
                </Button>
                <Flex.Row gap="15px">
                  {filters.map(filter => (
                    <Fragment key={filter.id}>
                      {filter.options.filter(o => filter.has(o)).map((option) => (
                        <Button key={option.id} variant="tag" onClick={() => onToggleOption(filter, option)}>
                          <IconClose />
                          <Text variant="paragraph50">
                            <Box data-btn-text={option.title}>{option.title}</Box>
                          </Text>
                        </Button>
                      ))}
                    </Fragment>
                  ))}
                </Flex.Row>
              </Flex.Col>
            </Grid>
          </Grid.Row>
          <Grid.Row columnGap="30px" rowGap="120px">
            {visibleItems.map((item, i) => (
              <Grid key={i} sm={6} md={item.layout === 'big' ? 8 : 4}>
                {(item.layout === 'default' || item.layout === 'big') && <BlogCard item={item} />}
                {item.layout === 'editorial' && <BlogCardEditorial item={item} />}
              </Grid>
            ))}
            {hasMore &&
              <Grid>
                <InfiniteLoader onMore={onMore}>more</InfiniteLoader>
              </Grid>
            }
          </Grid.Row>
        </Container>
      </Section>
    </Main>
  );
}

export async function getStaticProps(context: IStaticContext) {
  const id = asEquatable(context.params.id);
  const market = context.params.market;
  const locale = context.params.locale;
  const layout = await getLayout(market, locale);
  const page = await getPage<ICulturaIndex>('cultura_index', id, market, locale);
  if (!page) {
    return {
      notFound: true,
      revalidate: true,
    };
  }
  const items = await getCulturaDetails({ market, locale, sort: '-date' });
  const featureTypes = await collectFeatureTypes<ICulturaDetail>(items, 'type', 'tag');
  const props = await getPageProps({ ...context, layout, page, items, featureTypes });
  return {
    props,
    revalidate: 60, // will re-generate the page when a request comes in at most once every 60 seconds
  };
}

export async function getStaticPaths() {
  const paths = await getStaticPathsForSchema('cultura_index');
  return {
    paths,
    fallback: 'blocking', // runs before initial render
    // fallback: true, // runs in the background
  };
}

export async function collectFeatureTypes<T extends IEntity = IEntity>(items: T[], ...keys: string[]): Promise<IFeatureType[]> {
  const featureTypes: IFeatureType[] = [];
  if (keys.length > 0) {
    items.forEach(item => {
      keys.forEach((key) => {
        const value = item[key as keyof T] || [];
        const values = Array.isArray(value) ? value : [value];
        values.forEach(value => {
          let featureType = featureTypes.find(x => x.id === key);
          if (!featureType) {
            featureType = {
              id: key,
              schema: 'featureType',
              title: key,
              mode: 'or',
              features: [],
            };
            featureTypes.push(featureType);
          }
          const features = (featureType.features as IFeatureType['features']);
          const option = (isObject(value) ? value : ({ id: value, title: value })) as IFilterOption;
          if (features && !features.find(x => x.id === option.id)) {
            features.push(option);
          }
        });
      });
    });
  }
  return featureTypes;
}
