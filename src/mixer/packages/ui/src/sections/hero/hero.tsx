import { IHero, getProjectDetails } from '@websolute/models';
import { getClassNames } from '@websolutespa/bom-core';
import { ILazyFuncProps, ILazyableProps, getSeoWeight, withLazyProps } from '@websolutespa/bom-mixer-models';
import { Box, Media, Text, UIStyledComponentProps, getCssResponsive, mediaUp } from '@websolutespa/bom-mixer-ui';
import React from 'react';
import styled, { css } from 'styled-components';
import { ImageLoop, ParallaxText, Wrapper } from '../../components';

const HeroContainer = styled(Wrapper) <UIStyledComponentProps>`
  background: var(--color-neutral-800);
  overflow: hidden;

  .mask {
    clip-path: circle(18dvh);

    ${props => mediaUp(props, 'sm', css`
      clip-path: circle(40dvh);
    `)}
  }

  .media {
    height: 100%;
  }

  video,
  img {
    height: 50dvh;

    ${props => mediaUp(props, 'sm', css`
      height: 100dvh;
    `)}
  }

  .textBox {
    position: absolute;
    z-index: 1;
    bottom: var(--margin-sm);
    mix-blend-mode: difference;
  }

  ${props => getCssResponsive(props)}
`;

export const Hero = ({ item, index = 0 }: ILazyableProps<IHero>) => {
  const classNames = getClassNames('hero-1');

  const { colorScheme, anchor, topSpace, innerSpace, title, layout, media, gallery } = item;

  const setTopSpace = !topSpace ? 'calc(var(--spacing-lg) * -1)' : 0;
  const setTopSpaceSm = !topSpace ? 'calc(var(--spacing-md) * -1)' : 0;
  const setInnerPadding = innerSpace ? 'var(--spacing-sm)' : 0;
  const setInnerPaddingSm = innerSpace ? 'var(--spacing-md)' : 0;

  const seoWeight = getSeoWeight(index, item.seoWeight);

  return (
    <HeroContainer className={classNames} colorScheme={colorScheme} anchor={anchor} paddingTop={setTopSpace} paddingTopSm={setTopSpaceSm}>
      <Box
        padding={`${setInnerPadding} 0`}
        paddingSm={`${setInnerPaddingSm} 0`}>
        {layout === 'masked' && (
          <React.Fragment>
            {(gallery || media) && (
              <Box className="mask" width="100%" height="50dvh" heightSm="100dvh">
                {gallery ? (
                  <ImageLoop items={gallery} height="50dvh" heightSm="100dvh" />
                ) : (
                  media && <Media item={media} />
                )}
              </Box>
            )}
            {title && (
              <Box className="textBox">
                <ParallaxText variant="display20" seoWeight={seoWeight()} baseVelocity={4} scrollSpeed={3} duplicate={4} >
                  {title}
                </ParallaxText>
              </Box>
            )}
          </React.Fragment>
        )}
        {(layout !== 'masked') && (
          <React.Fragment>
            {(gallery || media) && (
              <Box width="100%" height="100dvh">
                {gallery ? (
                  <ImageLoop items={gallery} height="100%" />
                ) : (
                  media && <Media item={media} height="100%" width="100%" />
                )}
              </Box>
            )}
            {title && (
              <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
                <Text as={seoWeight()} variant="display20">{title}</Text>
              </Box>
            )}
          </React.Fragment>
        )}
      </Box>
    </HeroContainer>
  );
};

withLazyProps('hero-1', async function ({ component, layout, page }: ILazyFuncProps<IHero>) {
  if (component.gallery && component.gallery.length > 0) {
    return component;
  }
  const projects = await getProjectDetails({
    market: layout.market,
    locale: layout.locale,
    sort: '-updatedAt',
  });
  const limit = 10;
  const gallery = projects.filter(x => x.media && x.tag.find(t => t.id === page.category.id) !== undefined);
  if (gallery.length > 0) {
    component.gallery = gallery.map(x => x.media);
    component.gallery = component.gallery.slice(0, Math.min(limit, component.gallery.length));
  }
  return component;
});
