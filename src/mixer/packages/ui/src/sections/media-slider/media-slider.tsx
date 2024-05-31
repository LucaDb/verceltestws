import { IComponent } from '@websolute/models';
import { getClassNames } from '@websolutespa/bom-core';
import { ILazyableProps } from '@websolutespa/bom-mixer-models';
import { Box, UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import styled from 'styled-components';
import { ImageSlider, ImageSliderItem, Wrapper } from '../../components';

export type IMediaSlider = IComponent & {
  title: string;
  items: ImageSliderItem[];
};

const MediaSliderContainer = styled(Wrapper) <UIStyledComponentProps>`
  ${props => getCssResponsive(props)}
`;

export const MediaSlider = ({ item, index = 0 }: ILazyableProps<IMediaSlider>) => {
  const classNames = getClassNames('media-slider');

  const { colorScheme, anchor, topSpace, innerSpace, title, items } = item;

  const setTopSpace = !topSpace ? 'calc(var(--spacing-lg) * -1)' : 0;
  const setTopSpaceSm = !topSpace ? 'calc(var(--spacing-md) * -1)' : 0;
  const setInnerPadding = innerSpace ? 'var(--spacing-sm)' : 0;
  const setInnerPaddingSm = innerSpace ? 'var(--spacing-md)' : 0;

  return (
    <MediaSliderContainer className={classNames} colorScheme={colorScheme} anchor={anchor} marginTop={setTopSpace} marginTopSm={setTopSpaceSm}>
      <Box
        padding={`${setInnerPadding} 0`}
        paddingSm={`${setInnerPaddingSm} 0`}>
        <Box className={classNames} overflow="hidden">
          {(title && item) && <ImageSlider items={items} />}
        </Box>
      </Box>
    </MediaSliderContainer>
  );
};
