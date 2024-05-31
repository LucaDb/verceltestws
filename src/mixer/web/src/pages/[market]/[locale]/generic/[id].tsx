import { IGeneric } from '@websolute/models';
import { asEquatable, IStaticContext, PageProps } from '@websolutespa/bom-core';
import { getLayout, getPage, getPageProps, getStaticPathsForSchema } from '@websolutespa/bom-mixer-models';
import { Box, Container, Flex, Grid, LazyLoader, Main, Section, Text } from '@websolutespa/bom-mixer-ui';

export default function Generic({ layout, page }: PageProps<IGeneric>) {
  return (
    <Main background="var(--color-neutral-100)">
      {(page.abstract || page.description) && (
        <Section padding="90px 0" paddingMd="150px 0">
          <Container>
            <Grid.Row>
              <Grid md={8} gridColumnEndMd={11}>
                <Flex.Col gap="30px" gapMd="60px">
                  {page.abstract && (
                    <Text variant="display60" variantMd="display50" dangerouslySetInnerHTML={{ __html: page.abstract }} />
                  )}
                  {page.description && (
                    <Box className="wysiwyg">
                      <Text variant="paragraph40" variantMd="paragraph30" dangerouslySetInnerHTML={{ __html: page.description }} />
                    </Box>
                  )}
                </Flex.Col>
              </Grid>
            </Grid.Row>
          </Container>
        </Section>
      )}
      {page.components && page.components.length > 0 && (
        <Flex.Col gap="var(--spacing-lg)" gapSm="var(--spacing-md)" padding="var(--spacing-sm) 0" paddingSm="var(--spacing-md) 0">
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
  const page = await getPage<IGeneric>('generic', id, market, locale);
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
  const paths = await getStaticPathsForSchema('generic');
  return {
    paths,
    fallback: 'blocking', // runs before initial render
    // fallback: true, // runs in the background
  };
}
