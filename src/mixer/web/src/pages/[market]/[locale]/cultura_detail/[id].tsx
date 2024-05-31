import { IconEmail, IconLink, IconTwitter, IconWhatsapp } from '@websolute/icons';
import { ICulturaDetail, getAuthorText } from '@websolute/models';
import { Youtube, useSummary } from '@websolute/ui';

import { IStaticContext, PageProps, asEquatable } from '@websolutespa/bom-core';
import { useLabel } from '@websolutespa/bom-mixer-hooks';
import { getLayout, getPage, getPageProps, getStaticPathsForSchema } from '@websolutespa/bom-mixer-models';
import { Box, Breadcrumb, Button, Container, Flex, Grid, LazyLoader, Link, Media, Text, UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import styled from 'styled-components';

export default function CulturaDetail({ layout, page, params }: PageProps<ICulturaDetail>) {
  useSummary(page);
  const label = useLabel();

  const { title, abstract, description, media, author, youtubeCover } = page;

  const MainContainer = styled.section<UIStyledComponentProps>`

    ${props => getCssResponsive(props)}
  `;

  return (
    <MainContainer className="light" padding="var(--spacing-sm) 0" paddingSm="var(--spacing-md) 0">
      <Box minHeight="calc(100vh - 135px)" marginTop="60px" marginTopSm="0">
        <Container>
          <Flex.Col gap="var(--margin-lg)">
            <Flex.Row borderBottom="1px solid var(--color-neutral-800)" paddingBottom="var(--margin-xs)" paddingBottomSm="var(--margin-sm)" flexDirection="column-reverse" flexDirectionSm="row" justifyContent="space-between" alignItems="flex-start" alignItemsSm="center">
              <Breadcrumb.Group items={page.breadcrumb} />
              {page.category && (
                <Link href={page.category.href as string} >
                  <Button as="a" variant="line" className="_switch">
                    <Text variant="paragraph50" alignSelf="flex-end" alignSelfSm="auto">{label('showmore.posts')}</Text>
                  </Button>
                </Link>
              )}
            </Flex.Row>
            <Grid.Row as="header">
              <Grid md={11}>{title && <Text variant="display30" variantSm="display60" color="var(--color-neutral-800)" as="h1">{title}</Text>}</Grid>
            </Grid.Row>
            {(media && !youtubeCover) && <Media aspectRatio={8 / 5} item={media} borderRadius="10px" borderRadiusSm="15px" />}
            {((media && youtubeCover) || youtubeCover) && <Youtube title={title} src={youtubeCover.src} />}
          </Flex.Col>
          <Flex.Row display="block" displaySm="flex" alignItems="baseline" marginTop="var(--spacing-md)" paddingMd="0 var(--spacing-sm)" gap="var(--aside-gap-sm)" gapMd="var(--aside-gap-md)">
            <Box as="aside" position="static" positionSm="sticky" top="70px" flex="auto" flexSm="0 0 var(--aside-width)">
              {(abstract || author) && (
                <Flex.Col gap="var(--margin-sm)">
                  {abstract && <Text variant="heading40" dangerouslySetInnerHTML={{ __html: abstract }} />}
                  {author && <Text variant="paragraph30">{getAuthorText(author)}</Text>}
                  <Box width="100%" height="1px" background="var(--color-neutral-400)" />
                </Flex.Col>
              )}
              <Box marginTop="var(--margin-xs)">
                <Text variant="label30" marginBottom="20px">{label('share.post')}</Text>
                <Flex.Row gap="var(--margin-xs)">
                  <Flex.Col alignItems="center" flexShrink="0" borderRadius="50%" justifyContent="center" width="2.8em" height="2.8em" background="var(--color-neutral-800)" color="var(--color-neutral-100)">
                    <IconLink width="1.2em" height="1.2em" />
                  </Flex.Col>
                  <Flex.Col alignItems="center" flexShrink="0" borderRadius="50%" justifyContent="center" width="2.8em" height="2.8em" background="var(--color-neutral-800)" color="var(--color-neutral-100)">
                    <IconTwitter width="1.2em" height="1.2em" />
                  </Flex.Col>
                  <Flex.Col alignItems="center" flexShrink="0" borderRadius="50%" justifyContent="center" width="2.8em" height="2.8em" background="var(--color-neutral-800)" color="var(--color-neutral-100)">
                    <IconWhatsapp width="1.2em" height="1.2em" />
                  </Flex.Col>
                  <Flex.Col alignItems="center" flexShrink="0" borderRadius="50%" justifyContent="center" width="2.8em" height="2.8em" background="var(--color-neutral-800)" color="var(--color-neutral-100)">
                    <IconEmail width="1.2em" height="1.2em" />
                  </Flex.Col>
                </Flex.Row>
              </Box>
            </Box>
            <Box marginTop="var(--margin-md)" marginTopSm="0" width="auto" widthSm="100%" marginLeft="0" marginLeftSm="calc(-1 * var(--aside-width) - var(--aside-gap-sm))" marginLeftMd="calc(-1 * var(--aside-width) - var(--aside-gap-md))">
              <Flex.Col as="article" className="article-wrapper" gap="var(--margin-md)" gapSm="var(--margin-xl)">
                <LazyLoader components={page.components} />
              </Flex.Col>
            </Box>
          </Flex.Row>
        </Container>
      </Box>
    </MainContainer>
  );
}

export async function getStaticProps(context: IStaticContext) {
  const id = asEquatable(context.params.id);
  const market = context.params.market;
  const locale = context.params.locale;
  const layout = await getLayout(market, locale);
  const page = await getPage<ICulturaDetail>('cultura_detail', id, market, locale);
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
  const paths = await getStaticPathsForSchema('cultura_detail');
  return {
    paths,
    fallback: 'blocking', // runs before initial render
    // fallback: true, // runs in the background
  };
}
