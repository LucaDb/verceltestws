import { IMedia, getClassNames } from '@websolutespa/bom-core';
import { Box, Flex, Media, Text, getCssResponsive, mediaUp } from '@websolutespa/bom-mixer-ui';
import styled, { css } from 'styled-components';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ImageSliderNext, ImageSliderPrev } from './image-slider-navigation';

export type ImageSliderProps<T extends ImageSliderItem> = {
  items: T[];
};

export type ImageSliderItem = {
  title: string;
  media: IMedia;
};

const StyledSwiper = styled.div`
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

export function ImageSlider<T extends ImageSliderItem>({ items, ...props }: ImageSliderProps<T>) {

  const classNames = getClassNames('image-slider');

  return (
    <Flex.Col className={classNames} rowGap="15px" rowGapMd="60px">
      <StyledSwiper>
        {items && (
          <Swiper modules={[Navigation]} navigation spaceBetween={60} slidesPerView={'auto'} centeredSlides={true} loop={true} loopedSlides={4} loopAdditionalSlides={4}>
            {items.map((item, i) => (
              <SwiperSlide key={i}>
                {item.media && <Media item={item.media} />}
                {item.title &&
                  <Box textAlign="center">
                    <Text variant="label20" color="inherit" marginTop="var(--margin-xs)" dangerouslySetInnerHTML={{ __html: item.title }}></Text>
                  </Box>
                }
              </SwiperSlide>
            ))}
            <ImageSliderPrev />
            <ImageSliderNext />
          </Swiper>
        )}
      </StyledSwiper>
    </Flex.Col>
  );
}
