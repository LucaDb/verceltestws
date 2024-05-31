import { ICardList } from '@websolute/models';
import { getClassNames } from '@websolutespa/bom-core';
import { ILazyableProps, getSeoWeight } from '@websolutespa/bom-mixer-models';
import { Box, Container, Flex, Grid, Text, UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import styled from 'styled-components';
import { CardInline, Wrapper } from '../../components';

const CardListContainer = styled(Wrapper) <UIStyledComponentProps>`
  ${props => getCssResponsive(props)}
`;

export const CardList = ({ item, index = 0 }: ILazyableProps<ICardList>) => {
  const classNames = getClassNames('card-list');

  const { colorScheme, anchor, topSpace, innerSpace, title, eyelet, abstract, description, items } = item;

  const setTopSpace = !topSpace ? 'calc(var(--spacing-lg) * -1)' : 0;
  const setTopSpaceSm = !topSpace ? 'calc(var(--spacing-md) * -1)' : 0;
  const setInnerPadding = innerSpace ? 'var(--spacing-sm)' : 0;
  const setInnerPaddingSm = innerSpace ? 'var(--spacing-md)' : 0;

  const seoWeight = getSeoWeight(index, item.seoWeight);

  return (
    <CardListContainer className={classNames} colorScheme={colorScheme} anchor={anchor} marginTop={setTopSpace} marginTopSm={setTopSpaceSm}>
      <Box
        paddingTop={setInnerPadding}
        paddingTopSm={setInnerPaddingSm}>
        <Container>
          <Flex.Col gap="var(--margin-lg)">
            <Grid.Row>
              <Grid sm={10} gap="var(--margin-sm)" gapSm="var(--margin-md)">
                <Flex.Col rowGap="var(--margin-xxs)" rowGapSm="var(--margin-xs)">
                  {eyelet && <Text variant="paragraph40">{eyelet}</Text>}
                  {title && <Text as={seoWeight()} variant="heading20" variantSm="heading10" dangerouslySetInnerHTML={{ __html: title }} />}
                  {abstract && <Text variant="heading40" dangerouslySetInnerHTML={{ __html: abstract }} />}
                  {description && <Text variant="paragraph50" variantSm="paragraph40" dangerouslySetInnerHTML={{ __html: description }} />}
                </Flex.Col>
              </Grid>
            </Grid.Row>
            {items && (
              <Grid.Row rowGap="var(--margin-sm)" columnGap="var(--margin-sm)">
                {items.map((item, index) => (
                  <Grid key={index} sm={6}><CardInline key={index} item={item} /></Grid>
                ))}
              </Grid.Row>
            )}
          </Flex.Col>
        </Container>
      </Box>
    </CardListContainer>
  );
};
