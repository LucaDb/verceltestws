import { IMedia, getClassNames } from '@websolutespa/bom-core';
import { Flex, Media, UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import { useState } from 'react';
import styled from 'styled-components';
import { A11y, FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

export type ImageSliderGridProps<T extends ImageSliderGridItem> = {
  items: T[];
};

export type ImageSliderGridItem = {
  media: IMedia[];
};

const StyledSwiper = styled.div<UIStyledComponentProps>`
  position: relative;
  
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
  }

  ${props => getCssResponsive(props)}
`;

export function ImageSliderGrid<T extends ImageSliderGridItem>({ items, ...props }: ImageSliderGridProps<T>) {
  const [loaded, setLoaded] = useState(false);
  const classNames = getClassNames('image-slider-grid');

  const pairs = items.reduce((result: T[][], value, index, array) => {
    if (index % 2 === 0)
      result.push(array.slice(index, index + 2));
    return result;
  }, []);

  const slides = pairs.map((pair, index) => (
    <SwiperSlide key={index}>
      <Flex.Col gap="var(--margin-xs)" gapMd="var(--margin-sm)" paddingTop={index % 2 !== 0 ? 'var(--margin-sm)' : undefined} >
        {pair.map((item, i) => item && <Media key={i} item={item.media} borderRadius="5px" overflow="hidden" />)}
      </Flex.Col>
    </SwiperSlide>
  ));

  const afterInit = () => {
    setLoaded(true);
  };

  return (
    <Flex.Col className={classNames} rowGap="15px" rowGapMd="60px" minHeight="60vh">
      <StyledSwiper opacity={loaded ? 1 : 0} >
        {items && (
          <Swiper {...props}
            modules={[FreeMode, A11y]}
            onAfterInit={() => afterInit()}
            freeMode={{ enabled: true, momentumBounceRatio: 0.2 }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
          >
            {slides}
          </Swiper>
        )}
      </StyledSwiper>
    </Flex.Col>
  );
}
