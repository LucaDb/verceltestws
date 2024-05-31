import { IClient, IProductDetail, IProjectIndex, getClients, getProjectDetails } from '@websolute/models';
import { ProjectProvider, ProjectTabs, ProjectViews } from '@websolute/ui';
import { IStaticContext, PageProps, asEquatable } from '@websolutespa/bom-core';
import { useSearchParamsQs } from '@websolutespa/bom-mixer-hooks';
import { getLayout, getPage, getPageProps, getStaticPathsForSchema } from '@websolutespa/bom-mixer-models';
import { Container, Flex, Grid, Main, Section, Text } from '@websolutespa/bom-mixer-ui';

export default function ProjectIndex({ layout, page, projects, clients }: PageProps<IProjectIndex> & {
  projects: IProductDetail[],
  clients: IClient[],
}) {
  // deserialize queryString encoded params
  const { params } = useSearchParamsQs();
  const index = params.view ? ProjectViews.indexOf(params.view) : 0;
  return (
    <Main background="var(--color-neutral-100)">
      <Section padding="90px 0" paddingMd="150px 0">
        <Container>
          <Grid.Row>
            <Grid md={10}>
              <Flex.Col rowGap="var(--margin-xs)" rowGapSm="var(--margin-sm)">
                {page.title && <Text variant="display30" as="h1" dangerouslySetInnerHTML={{ __html: page.title }}></Text>}
                {page.abstract && <Text variant="heading40" dangerouslySetInnerHTML={{ __html: page.abstract }} />}
              </Flex.Col>
            </Grid>
          </Grid.Row>
        </Container>
      </Section>
      <ProjectProvider index={index} client={params.client}>
        <ProjectTabs />
      </ProjectProvider>
    </Main>
  );
}

export async function getStaticProps(context: IStaticContext) {
  const id = asEquatable(context.params.id);
  const market = context.params.market;
  const locale = context.params.locale;
  const layout = await getLayout(market, locale);
  const page = await getPage<IProjectIndex>('project_index', id, market, locale);
  if (!page) {
    return {
      notFound: true,
      revalidate: true,
    };
  }
  const projects = await getProjectDetails({
    market: layout.market,
    locale: layout.locale,
    sort: '-updatedAt',
  });
  const clients = await getClients({
    market: layout.market,
    locale: layout.locale,
    sort: 'title',
  });
  const props = await getPageProps({ ...context, layout, page, projects, clients });
  return {
    props,
    revalidate: 60, // will re-generate the page when a request comes in at most once every 60 seconds
  };
}

export async function getStaticPaths() {
  const paths = await getStaticPathsForSchema('project_index');
  return {
    paths,
    fallback: 'blocking', // runs before initial render
    // fallback: true, // runs in the background
  };
}
