import { ILocationMore, getLocationDetails } from '@websolute/models';
import { getClassNames } from '@websolutespa/bom-core';
import { ILazyFuncProps, ILazyableProps, withLazyProps } from '@websolutespa/bom-mixer-models';
import { Box, Container, Flex, UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import styled from 'styled-components';
import { CardSmallSlider, Wrapper } from '../../components';


const LocationMoreContainer = styled(Wrapper) <UIStyledComponentProps>`
  overflow: hidden;

  .swiper {
    overflow: initial;
  }

  ${props => getCssResponsive(props)}
`;

export const LocationMore = ({ item, index = 0 }: ILazyableProps<ILocationMore>) => {
  const classNames = getClassNames('location-more');
  const { colorScheme, anchor, topSpace, innerSpace, title, items } = item;

  const setTopSpace = !topSpace ? 'calc(var(--spacing-lg) * -1)' : 0;
  const setTopSpaceSm = !topSpace ? 'calc(var(--spacing-md) * -1)' : 0;
  const setInnerPadding = innerSpace ? 'var(--spacing-sm)' : 0;
  const setInnerPaddingSm = innerSpace ? 'var(--spacing-md)' : 0;

  return (
    <LocationMoreContainer className={classNames} colorScheme={colorScheme} anchor={anchor} marginTop={setTopSpace} marginTopSm={setTopSpaceSm}>
      <Box
        padding={`${setInnerPadding} 0`}
        paddingSm={`${setInnerPaddingSm} 0`}>
        {title && items && (
          <Container>
            <Flex.Col rowGap="60px" rowGapMd="150px">
              <CardSmallSlider title={title} items={items} counter />
            </Flex.Col>
          </Container>
        )}
      </Box>
    </LocationMoreContainer>
  );
};

withLazyProps('location-more', async function ({ page, component, layout }: ILazyFuncProps<ILocationMore>) {
  if (component.items && component.items.length > 0) {
    return component;
  }
  const limit = component.quantity || 3;
  const items = await getLocationDetails({
    limit,
    where: {
      category: {
        equals: 'location_index',
      },
    },
    sort: '-date',
    market: layout.market,
    locale: layout.locale,
  });
  component.items = items.filter(item => item.title !== page.title);
  component.items = component.items.slice(0, Math.min(limit, items.length));
  return component;
});
