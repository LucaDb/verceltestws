import { ICover } from '@websolute/models';
import { getClassNames, isMediaJson } from '@websolutespa/bom-core';
import { usePage } from '@websolutespa/bom-mixer-hooks';
import { ILazyableProps, getSeoWeight } from '@websolutespa/bom-mixer-models';
import { Box, Button, Container, Flex, Grid, Link, Media, SvgAnimation, Text, UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import styled from 'styled-components';
import { Wrapper } from '../../components';

const CoverContainer = styled(Wrapper) <UIStyledComponentProps>`
  ${props => getCssResponsive(props)}
`;

export const Cover = ({ item, index = 0 }: ILazyableProps<ICover>) => {
  const classNames = getClassNames('cover-1');
  const page = usePage()

  const { colorScheme, anchor, topSpace, innerSpace, title, abstract, media } = item;

  const setTopSpace = !topSpace ? 'calc(var(--spacing-lg) * -1)' : 0;
  const setTopSpaceSm = !topSpace ? 'calc(var(--spacing-md) * -1)' : 0;
  const setInnerPadding = innerSpace ? 'var(--spacing-xs)' : 0;
  const setInnerPaddingSm = innerSpace ? 'var(--spacing-sm)' : 0;

  const seoWeight = getSeoWeight(index, item.seoWeight);

  return (
    <CoverContainer className={classNames} colorScheme={colorScheme} anchor={anchor} marginTop={setTopSpace} marginTopSm={setTopSpaceSm}>
      <Box
        padding={`${setInnerPadding} 0 0 0`}
        paddingSm={`${setInnerPaddingSm} 0 0 0`}>
        <Container>
          <Grid.Row gap="var(--margin-md)" gapSm="var(--margin-lg)">
            <Grid sm={2} gridColumnStart="4" gridColumnEnd="10" gridColumnStartSm="6" gridColumnEndSm="8" >
              <Flex.Col gap="var(--margin-sm)" gapSm="var(--margin-xl)" width="auto">
                {page.category && (
                  <Box textAlign="center" >
                    <Link href={page.category.href as string}>
                      <Button as="a" variant="nav" fontSizeSm="16px" lineHeightSm="16px" target="_self">
                        {page.category.title && <Text variant="label30" className="btn-text" textTransform="uppercase">{page.category.title as string}</Text>}
                      </Button>
                    </Link>
                  </Box>
                )}
                {media && (
                  <Box aspectRatio={1 / 1}>
                    {media && (
                      isMediaJson(media) ? (
                        <SvgAnimation href={media.url || media.src} />
                      ) : (
                        <Media item={media} />
                      )
                    )}
                  </Box>
                )}
              </Flex.Col>
            </Grid>
            <Grid sm={10} gridColumnEndSm="12" textAlign="center">
              <Flex.Col gap="var(--margin-md)" gapSm="var(--margin-lg)">
                {title && <Text as={seoWeight()} variant="heading10" variantSm="display30">{item.title}</Text>}
                {abstract && <Text variant="heading30" dangerouslySetInnerHTML={{ __html: abstract }} />}
              </Flex.Col>
            </Grid>
          </Grid.Row>
        </Container>
      </Box>
    </CoverContainer>
  );
};
