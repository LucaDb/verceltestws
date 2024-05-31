import { IBlogMore, getCulturaDetails } from '@websolute/models';
import { getClassNames } from '@websolutespa/bom-core';
import { useLabel, useLayout } from '@websolutespa/bom-mixer-hooks';
import { ILazyFuncProps, ILazyableProps, withLazyProps } from '@websolutespa/bom-mixer-models';
import { Box, Button, Container, Flex, Grid, Link, Text, UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import styled from 'styled-components';
import { BlogCard, Wrapper } from '../../components';

const BlogMoreContainer = styled(Wrapper) <UIStyledComponentProps>`
  ${props => getCssResponsive(props)}
`;

export const BlogMore = ({ item }: ILazyableProps<IBlogMore>) => {
  const classNames = getClassNames('blog-more-1');
  const label = useLabel();
  const layout = useLayout();

  const { colorScheme, anchor, topSpace, innerSpace, title, abstract, description, quantity = 3, cta = true } = item;

  const setTopSpace = !topSpace ? 'calc(var(--spacing-lg) * -1)' : 0;
  const setTopSpaceSm = !topSpace ? 'calc(var(--spacing-md) * -1)' : 0;
  const setInnerPadding = innerSpace ? 'var(--spacing-sm)' : 0;
  const setInnerPaddingSm = innerSpace ? 'var(--spacing-md)' : 0;

  return (
    <BlogMoreContainer className={classNames} colorScheme={colorScheme} anchor={anchor} marginTop={setTopSpace} marginTopSm={setTopSpaceSm}>
      <Box
        padding={`${setInnerPadding} 0`}
        paddingSm={`${setInnerPaddingSm} 0`}>
        <Container>
          {(title || abstract || description) && (
            <Flex.Col gap="var(--margin-xs)" gapSm="var(--margin-sm)" alignItems="center" justifyContent="center" marginBottom="var(--spacing-sm)">
              {title && <Text variant="display40" dangerouslySetInnerHTML={{ __html: title }} />}
              {abstract && <Text variant="paragraph20" dangerouslySetInnerHTML={{ __html: abstract }} />}
              {description && <Text variant="paragraph20" dangerouslySetInnerHTML={{ __html: description }} />}
            </Flex.Col>
          )}
          {item.items && item.items.length > 0 && (
            <Grid.Row rowGap="var(--margin-xs)" rowGapSm="var(--margin-sm)" columnGap="var(--margin-sm)" columnGapSm="var(--margin-md)">
              {item.items.map((item, index) => (
                <Grid sm={4} key={index} >
                  <BlogCard item={item} mediaRatio={1 / 1} />
                </Grid>
              ))}
            </Grid.Row>
          )}
          {cta && (
            <Flex justifyContent="center" marginTop="var(--spacing-xs)">
              <Link href={layout.topLevelHrefs.cultura_index || '/'}>
                <Button as="a" variant="primary">
                  <Text variant="label10">
                    <Box data-btn-text={label('showmore.posts')}>{label('showmore.posts')}</Box>
                  </Text>
                </Button>
              </Link>
            </Flex>
          )}
        </Container>
      </Box>
    </BlogMoreContainer>
  );
};

withLazyProps('blog-more-1', async function ({ component, layout }: ILazyFuncProps<IBlogMore>) {
  if (component.items && component.items.length > 0) {
    return component;
  }
  const limit = component.quantity || 3;
  const items = await getCulturaDetails({
    limit,
    where: {
      category: {
        equals: 'cultura_index',
      },
    },
    sort: '-date',
    market: layout.market,
    locale: layout.locale,
  });
  component.items = items.slice(0, Math.min(limit, items.length));
  return component;
});
