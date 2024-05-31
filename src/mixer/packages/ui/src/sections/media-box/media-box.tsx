import { IMediaBox } from '@websolute/models';
import { getClassNames } from '@websolutespa/bom-core';
import { ILazyableProps } from '@websolutespa/bom-mixer-models';
import { Box, Container, Flex, Media, UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import styled from 'styled-components';
import { Wrapper } from '../../components';

const MediaBoxContainer = styled(Wrapper) <UIStyledComponentProps>`

  ${props => getCssResponsive(props)}
`;

export const MediaBox = ({ item }: ILazyableProps<IMediaBox>) => {
  const classNames = getClassNames('media-box-1');
  const { colorScheme = 'light', anchor, topSpace, innerSpace, wrapper, media, layout, items } = item;

  const setTopSpace = !topSpace ? 'calc(var(--spacing-lg) * -1)' : 0;
  const setTopSpaceSm = !topSpace ? 'calc(var(--spacing-md) * -1)' : 0;
  const setInnerPadding = innerSpace ? 'calc(var(--grid-column-gap ) * 2) 0' : 0;

  const mediaItems = (
    <Box aspectRatio={media ? 'auto' : 16 / 9} className={colorScheme}>
      {media && <Media item={media} aspectRatio={16 / 9} />}
      {items && (
        <Flex.Col alignItems="center" justifyContent="center" position="absolute" top="0" left="0" bottom="0" right="0" zIndex="1">
          {(layout === 'horizontal') && <Media item={items[0]} borderRadius="var(--margin-xs)" overflow="hidden" margin="0 var(--spacing-md)" />}
          {(layout === 'vertical') && (
            <Flex.Row alignContent="center" justifyContent="center" gap="var(--spacing-md)" margin="0 var(--spacing-lg)">
              {items.map((item, index) => (
                <Media item={item} key={index} borderRadius="var(--margin-xs)" overflow="hidden" flex="0 0 28%" />
              ))}
            </Flex.Row>
          )}
        </Flex.Col>
      )}
    </Box>
  );

  return (
    <MediaBoxContainer className={classNames} anchor={anchor} marginTop={setTopSpace} marginTopSm={setTopSpaceSm} padding={setInnerPadding}>
      {wrapper && <Container>{mediaItems}</Container>}
      {!wrapper && mediaItems}
    </MediaBoxContainer>
  );
};
