import { ILegalDocument } from '@websolute/models';
import { asEquatable, IStaticContext, PageProps } from '@websolutespa/bom-core';
import { getLayout, getPage, getPageProps, getStaticPathsForSchema } from '@websolutespa/bom-mixer-models';
import { Box, Container, Flex, Grid, Main, Section, Text } from '@websolutespa/bom-mixer-ui';

export default function LegalDocument({ layout, page }: PageProps<ILegalDocument>) {
  return (
    <Main background="var(--color-neutral-100)">
      {(page.legal_notice && page.legal_notice.text) && (
        <Section padding="90px 0" paddingMd="150px 0">
          <Container>
            <Grid.Row>
              <Grid md={8} gridColumnEndMd={11}>
                <Flex.Col gap="30px" gapMd="60px">
                  <Box className="wysiwyg">
                    <Text variant="paragraph40" variantMd="paragraph30" dangerouslySetInnerHTML={{ __html: page.legal_notice.text }} />
                  </Box>
                </Flex.Col>
              </Grid>
            </Grid.Row>
          </Container>
        </Section>
      )}
    </Main>
  );
}

export async function getStaticProps(context: IStaticContext) {
  const id = asEquatable(context.params.id);
  const market = context.params.market;
  const locale = context.params.locale;
  const layout = await getLayout(market, locale);
  const page = await getPage<ILegalDocument>('legal_document', id, market, locale);
  const props = await getPageProps({ ...context, layout, page });
  return {
    props,
    revalidate: 60, // will re-generate the page when a request comes in at most once every 60 seconds
  };
}

export async function getStaticPaths() {
  const paths = await getStaticPathsForSchema('legal_document');
  return {
    paths,
    fallback: 'blocking', // runs before initial render
    // fallback: true, // runs in the background
  };
}
