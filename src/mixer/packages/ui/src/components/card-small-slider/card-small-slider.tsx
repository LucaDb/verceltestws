import { getClassNames } from '@websolutespa/bom-core';
import { Flex, Text } from '@websolutespa/bom-mixer-ui';
import styled from 'styled-components';
import { Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CardSmall, CardSmallItem } from '../../components/card-small/card-small';

export type CardSmallSliderProps<T extends CardSmallItem> = {
  title: string;
  items: T[];
  counter?: boolean;
  variant?: 'small' | 'big';
  onSelect?: (item: T) => boolean | void;
};

const StyledSwiper = styled.div`
  .swiper {
    width: 100%;
  }

  .swiper-slide {
    width: 420px;
    max-width: 100%;
  }
`;

export function CardSmallSlider<T extends CardSmallItem>({ title, items, counter, variant = 'small', ...props }: CardSmallSliderProps<T>) {

  const onSelect = (item: T): boolean | void => {
    if (typeof props.onSelect === 'function') {
      props.onSelect(item);
    }
  };

  const slidesPerView = variant === 'small' ? 4 : 2.5;
  const slidesPerViewLg = variant === 'small' ? 3 : 2.5;
  const classNames = getClassNames('card-small-slider');

  return (
    <Flex.Col className={classNames} rowGap="15px" rowGapMd="60px">
      <Flex.Row gap="15px" alignItems="top">
        <Text variant="heading10">{title}</Text>
        {counter && (
          <Text variant="label10">{items.length}</Text>
        )}
      </Flex.Row>
      <StyledSwiper>
        <Swiper
          modules={[Virtual]}
          virtual
          speed={500}
          freeMode
          grabCursor
          slidesPerView={4}
          spaceBetween={30}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1440: {
              slidesPerView: slidesPerViewLg,
              spaceBetween: 30,
            },
            1920: {
              slidesPerView: slidesPerView,
              spaceBetween: 30,
            },
          }}
        >
          {items.map((item, i) => (
            <SwiperSlide key={i} virtualIndex={i}>
              <CardSmall item={item} onSelect={onSelect} />
            </SwiperSlide>
          ))}
        </Swiper>
      </StyledSwiper>
    </Flex.Col>
  );
}
