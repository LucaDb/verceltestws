import { IMediaLoop } from '@websolute/models';
import { IMedia, getClassNames } from '@websolutespa/bom-core';
import { ILazyFuncProps, ILazyableProps, withLazyProps } from '@websolutespa/bom-mixer-models';
import { Container, UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import styled from 'styled-components';
import { ImageLoop, Wrapper } from '../../components';

const MediaLoopContainer = styled(Wrapper) <UIStyledComponentProps>`
  ${props => getCssResponsive(props)}
`;

export const MediaLoop = ({ item }: ILazyableProps<IMediaLoop>) => {
  const classNames = getClassNames('media-loop');
  const { colorScheme, anchor, topSpace, innerSpace, wrapper, items, speed = 600 } = item;

  const setTopSpace = !topSpace ? 'calc(var(--spacing-lg) * -1)' : 0;
  const setTopSpaceSm = !topSpace ? 'calc(var(--spacing-md) * -1)' : 0;
  const setInnerPadding = innerSpace ? 'calc(var(--grid-column-gap ) * 2) 0' : 0;

  const ImageLoopItem = items && <ImageLoop items={items} aspectRatio={16 / 9} speed={speed} />

  return (
    <MediaLoopContainer className={classNames} colorScheme={colorScheme} anchor={anchor} marginTop={setTopSpace} marginTopSm={setTopSpaceSm} padding={setInnerPadding}>
      {wrapper &&
        <Container>
          {ImageLoopItem}
        </Container>
      }
      {!wrapper && ImageLoopItem}
    </MediaLoopContainer>
  );
};

withLazyProps('media-loop', async function ({ component, layout, page }: ILazyFuncProps<IMediaLoop>) {
  if (component.items && component.items.length > 0) {
    return component;
  }

  if (page.gallery) {
    let items = page.gallery as IMedia[];
    if (items.length > 0) {
      component.items = items;
    }
  };

  return component;
});
