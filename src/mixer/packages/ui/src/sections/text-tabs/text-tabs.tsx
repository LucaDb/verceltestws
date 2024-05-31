import { ITextTabs } from '@websolute/models';
import { getClassNames } from '@websolutespa/bom-core';
import { ILazyableProps, getSeoWeight } from '@websolutespa/bom-mixer-models';
import { Box, Container, Flex, Grid, Text, UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import styled from 'styled-components';
import { Wrapper } from '../../components';
import { TextTabsPanel } from './text-tabs-panel';

const TextTabsContainer = styled(Wrapper) <UIStyledComponentProps>`
  ${props => getCssResponsive(props)}
`;

export const TextTabs = ({ item, index = 0 }: ILazyableProps<ITextTabs>) => {
  const classNames = getClassNames('text-tabs-1');

  const { colorScheme, anchor, topSpace, innerSpace, title, abstract, items } = item;

  const setTopSpace = !topSpace ? 'calc(var(--spacing-lg) * -1)' : 0;
  const setTopSpaceSm = !topSpace ? 'calc(var(--spacing-md) * -1)' : 0;
  const setInnerPadding = innerSpace ? 'var(--spacing-sm)' : 0;
  const setInnerPaddingSm = innerSpace ? 'var(--spacing-md)' : 0;

  const seoWeight = getSeoWeight(index, item.seoWeight);

  return (
    <TextTabsContainer className={classNames} colorScheme={colorScheme} anchor={anchor} marginTop={setTopSpace} marginTopSm={setTopSpaceSm}>
      <Box
        padding={`${setInnerPadding} 0`}
        paddingSm={`${setInnerPaddingSm} 0`}>
        <Container>
          <Grid.Row alignItems="center">
            <Grid sm={7} md={5} gridColumnEndSm="7" gridColumnEndMd="7">
              {title && <Text as={seoWeight()} variant="display50">{title}</Text>}
              {abstract && <Text variant="paragraph20" marginTop={title && 'var(--margin-xs)'} dangerouslySetInnerHTML={{ __html: abstract }} />}
            </Grid>
            <Grid sm={6} md={4} gridColumnEndSm="13" gridColumnEndMd="12" marginTop="var(--margin-sm)" marginTopSm="0">
              {items && (
                <Flex.Col rowGap="var(--margin-sm)">
                  {items && items.map((item, index) => (
                    <TextTabsPanel key={index} item={item} index={index} />
                  ))}
                </Flex.Col>
              )}
            </Grid>
          </Grid.Row>
        </Container>
      </Box>
    </TextTabsContainer>
  );
};
