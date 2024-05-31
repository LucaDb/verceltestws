import { ISpotlightSlider } from '@websolute/models';
import { getClassNames } from '@websolutespa/bom-core';
import { useLabel } from '@websolutespa/bom-mixer-hooks';
import { ILazyableProps, getSeoWeight } from '@websolutespa/bom-mixer-models';
import { Box, Container, Flex, Grid, Text, UIStyledComponentProps, getCssResponsive, mediaUp } from '@websolutespa/bom-mixer-ui';
import { useState } from 'react';
import styled, { css } from 'styled-components';
import { Navigation } from 'swiper';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { Cta, SpotlightCard, Wrapper } from '../../components';
import { ImageSliderNext, ImageSliderPrev } from '../../components/image-slider/image-slider-navigation';

const SpotlightSliderContainer = styled(Wrapper) <UIStyledComponentProps> `
  position: relative;
  padding: var(--margin-lg) 0;

  .swiper {
    overflow: initial;

    ::-webkit-scrollbar {
      display: none;
    }

    .swiper-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      z-index: 1;
      display: flex;
      transition-property: transform;
      box-sizing: content-box;
    }

    .swiper-slide {
      width: auto;
      height: 100%;
      position: relative;
      flex-shrink: 0;
    }

    .media {
      height: 50vh;
      background: transparent;

      .image {
        height: 100%;
        width: auto;
      }

      ${props => mediaUp(props, 'md', css`
        height: 90vh;
      `)}
    }
  }

  .swiper-button-prev,
  .swiper-button-next {
    display: none;
  }

  ${props => getCssResponsive(props)}
`;

export const SpotlightSlider = ({ item, index = 0, ...props }: ILazyableProps<ISpotlightSlider & SwiperProps>) => {
  const classNames = getClassNames('spotlight-slider');
  const label = useLabel();

  const [ready, setReady] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  const { colorScheme, anchor, topSpace, innerSpace, eyelet, title, abstract, description, companies, startingIndex = 0, navs } = item;

  const setTopSpace = !topSpace ? 'calc(var(--spacing-lg) * -1)' : 0;
  const setTopSpaceSm = !topSpace ? 'calc(var(--spacing-md) * -1)' : 0;
  const setInnerPadding = innerSpace ? 'var(--spacing-sm)' : 0;
  const setInnerPaddingSm = innerSpace ? 'var(--spacing-md)' : 0;

  const seoWeight = getSeoWeight(index, item.seoWeight);
  const nav = navs && navs[0];

  if (!ready && swiperInstance) {
    setTimeout(() => {
      swiperInstance.slideTo(startingIndex, 1000, () => setReady(true))
    }, 0.00001)
  }

  return (
    <SpotlightSliderContainer colorScheme={colorScheme} anchor={anchor} className={classNames} overflow="hidden" marginTop={setTopSpace} marginTopSm={setTopSpaceSm}>
      <Box padding={`${setInnerPadding} 0`} paddingSm={`${setInnerPaddingSm} 0`}>
        <Flex.Col gap="var(--margin-lg)">
          <Container>
            <Grid.Row>
              <Grid sm={8} gridColumnEndSm="11">
                <Flex.Col justifyContent="center" textAlign="center" gap="var(--margin-md)" gapSm="var(--margin-lg)">
                  {(eyelet || title || abstract || description) &&
                    <Flex.Col gap="var(--margin-xs)">
                      {eyelet && <Text variant="paragraph50">
                        <svg width="10" height="10" viewBox="0 0 11 11" fill="none"><rect x="0.5" y="0.435547" width="10" height="10" rx="13" fill="currentColor" /></svg>
                        <Box display="inline" marginLeft="10px">{eyelet}</Box>
                      </Text>}
                      {title && <Text as={seoWeight()} variant="display50">{title}</Text>}
                      {abstract && <Text variant="heading30" className="wysiwyg" dangerouslySetInnerHTML={{ __html: abstract }} />}
                      {description && <Text variant="heading20" variantSm="heading10" className="wysiwyg" dangerouslySetInnerHTML={{ __html: description }} />}
                    </Flex.Col>
                  }
                </Flex.Col>
              </Grid>
            </Grid.Row>
          </Container>
          {companies && companies.length > 0 && (
            <Box opacity={swiperInstance ? 1 : 0} transition="var(--transition-smooth)">
              <Swiper {...props}
                modules={[Navigation]}
                navigation
                onSwiper={(swiper) => setSwiperInstance(swiper)}
                spaceBetween={30}
                centeredSlides={true}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2.3,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 3.9,
                    spaceBetween: 30,
                  },
                }}
              >
                <>
                  {companies && companies.map((item, i) => (
                    <SwiperSlide key={i} virtualIndex={i} >
                      <SpotlightCard item={item} />
                    </SwiperSlide>
                  ))}
                </>
                <ImageSliderPrev />
                <ImageSliderNext />
              </Swiper>
            </Box>
          )}
          {nav && (
            <Box textAlign='center'>
              <Container>
                <Cta item={nav} title={label('discovermore.industries')} />
              </Container>
            </Box>
          )}
        </Flex.Col>
      </Box>
    </SpotlightSliderContainer>
  );
};


