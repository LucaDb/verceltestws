import { IInverstorRelationsIndex } from '@websolute/models';
import { IServerSideContext, PageProps, asEquatable } from '@websolutespa/bom-core';
import { getLayout, getPage, getPageProps } from '@websolutespa/bom-mixer-models';
import { Container, Grid, LazyLoader, Main } from '@websolutespa/bom-mixer-ui';

export default function InverstorRelationsIndex({ layout, page }: PageProps<IInverstorRelationsIndex>) {

  return (
    <Main background="var(--color-neutral-100)">
      <Container>
        <Grid.Row columnGap="1rem" rowGap="2.5rem">
          <Grid md={3}>
            menu
          </Grid>
          <Grid md={9}>
            <LazyLoader components={page.components}/>
          </Grid>
        </Grid.Row>
      </Container>
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
  const page = await getPage<IInverstorRelationsIndex>('inverstor_relations_index', id, market, locale);


  const props = await getPageProps({ params, query, layout, page });
  return {
    props,
  };
}

