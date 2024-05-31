import { IInverstorRelationsDetail } from '@websolute/models';
import { IStaticContext, PageProps, asEquatable } from '@websolutespa/bom-core';
import { getLayout, getPage, getPageProps, getStaticPathsForSchema } from '@websolutespa/bom-mixer-models';
import { Breadcrumb, Container, Grid, Media, Main, Section, Text } from '@websolutespa/bom-mixer-ui';

export default function InverstorRelationsDetail({ layout, page, params }: PageProps<IInverstorRelationsDetail>) {
  return (
    <Main>
      <Section minHeight="calc(100vh - 135px)">
        <Container>

          <Breadcrumb.Group items={page.breadcrumb} />

          <Grid.Row margin="3rem 0">
            <Grid md={6}>
              <Media item={page.media} />
            </Grid>
            <Grid md={6} justifyContent="center">
              <Text variant="display30" as="h1">{page.title}</Text>
              {page.abstract && (
                <Text variant="heading30" dangerouslySetInnerHTML={{ __html: page.abstract }} />
              )}
              {page.description && (
                <Text variant="paragraph10" dangerouslySetInnerHTML={{ __html: page.description }} />
              )}
            </Grid>
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
  const page = await getPage<IInverstorRelationsDetail>('inverstor_relations_detail', id, market, locale);
  const props = await getPageProps({ ...context, layout, page });
  return {
    props,
    revalidate: 60, // will re-generate the page when a request comes in at most once every 60 seconds
  };
}

export async function getStaticPaths() {
  const paths = await getStaticPathsForSchema('inverstor_relations_detail');
  return {
    paths,
    fallback: 'blocking', // runs before initial render
    // fallback: true, // runs in the background
  };
}
