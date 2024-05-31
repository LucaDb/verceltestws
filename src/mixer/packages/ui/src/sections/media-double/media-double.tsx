import { IMediaDouble } from '@websolute/models';
import { getClassNames } from '@websolutespa/bom-core';
import { ILazyableProps } from '@websolutespa/bom-mixer-models';
import { Container, Flex, Media, UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import styled from 'styled-components';
import { Wrapper } from '../../components';

const MediaDoubleContainer = styled(Wrapper) <UIStyledComponentProps>`
  ${props => getCssResponsive(props)}
`;

export const MediaDouble = ({ item }: ILazyableProps<IMediaDouble>) => {
  const classNames = getClassNames('media-double-1');
  const { colorScheme, anchor, topSpace, innerSpace, wrapper, items } = item;

  const setTopSpace = !topSpace ? 'calc(var(--spacing-lg) * -1)' : 0;
  const setTopSpaceSm = !topSpace ? 'calc(var(--spacing-md) * -1)' : 0;
  const setInnerPadding = innerSpace ? 'var(--grid-column-gap) 0' : 0;
  const setGap = innerSpace ? 'var(--grid-column-gap)' : 0;

  const mediaItems = (
    <Flex.Row gap={setGap} padding={setInnerPadding} alignItems="initial" flexDirection="column" flexDirectionSm="row">
      {items && items.map((item, index) => (
        <Media item={item} key={index} aspectRatio={4 / 5} size={"sm"} />
      ))}
    </Flex.Row>
  );

  return (
    <MediaDoubleContainer className={classNames} colorScheme={colorScheme} anchor={anchor} marginTop={setTopSpace} marginTopSm={setTopSpaceSm}>
      {wrapper && <Container>{mediaItems}</Container>}
      {!wrapper && mediaItems}
    </MediaDoubleContainer>
  );
};

