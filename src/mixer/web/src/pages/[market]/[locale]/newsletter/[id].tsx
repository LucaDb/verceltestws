import { INewsletter, INewsletterFormSubmit } from '@websolute/models';
import { NewsletterForm, useSummary } from '@websolute/ui';
import { IStaticContext, PageProps, asEquatable } from '@websolutespa/bom-core';
import { getLayout, getPage, getPageProps, getStaticPathsForSchema } from '@websolutespa/bom-mixer-models';
import { Button, Container, Grid, Main, Section, Text } from '@websolutespa/bom-mixer-ui';
import { useState } from 'react';

export default function Newsletter({ layout, page, params }: PageProps<INewsletter>) {
  useSummary(page);
  const [submitted, setSubmitted] = useState(false);
  const onSubmit = (value: INewsletterFormSubmit) => {
    setSubmitted(true);
    window.scrollTo(0, 0);
  };
  return (
    <Main background="var(--color-neutral-100)">
      {submitted && (
        <Section minHeight="100vh" background="var(--color-warning-500)" color="var(--color-neutral-100)">
          <Container>
            <Grid.Row>
              <Grid gridColumnStartSm="3" gridColumnEndSm="11" paddingSm="0 var(--spacer-sm)" padding="0" alignItems="center" textAlign="center">
                <Text variant="display30" marginBottom="45px">
                  Grazie
                </Text>
                <Text variant="heading30" marginBottom="90px" maxWidth="50ch">
                  Abbiamo inviato una mail di verifica! Accedi alla tua email e clicca sul pulsante di conferma. Buona giornata!
                </Text>
                <Button variant="primary">Il nostro metodo</Button>
              </Grid>
            </Grid.Row>
          </Container>
        </Section>
      )}
      {!submitted && (
        <Section padding="180px 0 90px 0" paddingMd="360px 0 180px 0">
          <Container>
            <Grid.Row minHeightMd="calc(100vh - 450px)" paddingBottom="30px" paddingBottomMd="60px">
              <Grid md={10}>
                {page.abstract && (
                  <Text variant="display50" as="h1" dangerouslySetInnerHTML={{ __html: page.abstract }}></Text>
                )}
              </Grid>
            </Grid.Row>
            <NewsletterForm onSubmit={onSubmit}></NewsletterForm>
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
  const page = await getPage<INewsletter>('newsletter', id, market, locale);
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
  const paths = await getStaticPathsForSchema('newsletter');
  return {
    paths,
    fallback: 'blocking', // runs before initial render
    // fallback: true, // runs in the background
  };
}
