import { ICoverMain, getProjectDetails } from '@websolute/models';
import { getClassNames } from '@websolutespa/bom-core';
import { ILazyFuncProps, ILazyableProps, getSeoWeight, withLazyProps } from '@websolutespa/bom-mixer-models';
import { Box, Flex, Text, UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import styled from 'styled-components';
import { ImageLoop, Wrapper } from '../../components';

export type CoverMainProps = UIStyledComponentProps<ICoverMain>;

const CoverMainContainer = styled(Wrapper) <UIStyledComponentProps>`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100dvh;

  ${props => getCssResponsive(props)}
`;

export const CoverMain = ({ item, index = 0 }: ILazyableProps<ICoverMain>) => {
  const classNames = getClassNames('cover-main');
  const { colorScheme, anchor, title, items } = item;

  const seoWeight = getSeoWeight(index, item.seoWeight);

  return (
    <CoverMainContainer className={classNames} colorScheme={colorScheme} anchor={anchor}>
      {title && (
        <Flex.Col width="100%" height="100%" alignContent="center" justifyContent="center" textAlign="center" padding="0 var(--spacing-xs)" paddingSm="0 var(--spacing-lg)" position="absolute" zIndex="2" top="0" left="0">
          <Text as={seoWeight()} variant="display60" variantSm="display40" color="var(--color-neutral-100)">{title}</Text>
        </Flex.Col>
      )}
      {items && (
        <Box width="100%" height="100%" position="relative" zIndex="1" overflow="hidden">
          <ImageLoop items={items} height="100%" />
        </Box>
      )}
    </CoverMainContainer>
  );
};

withLazyProps('cover-main', async function ({ component, layout, page }: ILazyFuncProps<ICoverMain>) {
  if (component.items && component.items.length > 0) {
    return component;
  }
  const limit = 10;
  const projects = await getProjectDetails({
    market: layout.market,
    locale: layout.locale,
    sort: '-updatedAt',
    limit,
  });
  component.items = projects.map(x => x.media);
  component.items = component.items.slice(0, Math.min(limit, component.items.length));
  return component;
});
