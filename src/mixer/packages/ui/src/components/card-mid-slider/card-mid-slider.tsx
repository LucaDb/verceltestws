import { IconArrowUpRight } from '@websolute/icons';
import { IMenuItem, getClassNames } from '@websolutespa/bom-core';
import { useLabel } from '@websolutespa/bom-mixer-hooks';
import { Box, Flex, Text } from '@websolutespa/bom-mixer-ui';
import styled from 'styled-components';
import { Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CardMid, CardMidItem } from '../card-mid/card-mid';
import { Cta } from '../cta/cta';

export type CardMidSliderProps<T extends CardMidItem> = {
  title: string;
  items: T[];
  counter?: boolean;
  navs: IMenuItem[];
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

const StyledRow = styled(Flex.Row)`
  .text {
    text-transform: uppercase;
  }
`

export function CardMidSlider<T extends CardMidItem>({ title, items, counter, navs, ...props }: CardMidSliderProps<T>) {

  const label = useLabel();

  const onSelect = (item: T): boolean | void => {
    if (typeof props.onSelect === 'function') {
      props.onSelect(item);
    }
  };

  const nav = navs && navs[0];
  const classNames = getClassNames('card-small-slider');

  return (
    <Flex.Col className={classNames} rowGap="15px" rowGapMd="var(--margin-md)">
      <StyledRow gap="15px" alignItems="top" borderBottom="1px solid var(--color-neutral-9200)" paddingBottom="var(--margin-xs)" justifyContent='space-between'>
        <Box>
          <Text variant="paragraph50">
            <svg width="10" height="10" viewBox="0 0 11 11" fill="none"><rect x="0.5" y="0.435547" width="10" height="10" rx="13" fill="currentColor" /></svg>
            <Box display="inline" marginLeft="10px">{title}</Box>
          </Text>
          {counter && (
            <Text variant="label10">{items.length}</Text>
          )}
        </Box>
        <Flex.Row alignItems='center' justifyContent='center'>
          <Cta item={nav} title={label('discovermore.projects')} variant="line-alt" variantText="paragraph50" />
          <IconArrowUpRight />
        </Flex.Row>
      </StyledRow>
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
              slidesPerView: 2.3,
              spaceBetween: 30,
            },
            1920: {
              slidesPerView: 2.3,
              spaceBetween: 30,
            },
          }}
        >
          {items.map((item, i) => (
            <SwiperSlide key={i} virtualIndex={i}>
              <CardMid item={item} onSelect={onSelect} />
            </SwiperSlide>
          ))}
        </Swiper>
      </StyledSwiper>
    </Flex.Col>
  );
}
