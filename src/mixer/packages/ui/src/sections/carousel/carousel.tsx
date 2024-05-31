import { IconGallery, IconGrid } from '@websolute/icons';
import { ICarousel, ICarouselType, getProductDetails } from '@websolute/models';
import { getClassNames } from '@websolutespa/bom-core';
import { useLabel } from '@websolutespa/bom-mixer-hooks';
import { ILazyFuncProps, ILazyableProps, getSeoWeight, withLazyProps } from '@websolutespa/bom-mixer-models';
import { Box, Button, Container, Flex, Grid, Text, UIStyledComponentProps, getCssResponsive, mediaUp } from '@websolutespa/bom-mixer-ui';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import styled, { css } from 'styled-components';
import { FreeMode, Pagination } from 'swiper';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { ProductCard, Wrapper } from '../../components';

const CarouselContainer = styled(Wrapper) <UIStyledComponentProps>`
  .swiper {
    width: 100%;
    overflow-x: auto;
    margin-top: var(--margin-md);
    padding: 0 calc(25vw - var(--grid-column-gap)) 0 var(--grid-column-gap);

    ${props => mediaUp(props, 'sm', css`
      padding: 0 calc(var(--grid-column-gap) * 2) var(--margin-lg) calc(var(--grid-column-gap) * 2);
    `)}

    ::-webkit-scrollbar {
      display: none;
    }
  }

  ${props => getCssResponsive(props)}
`;

const animation = {
  initialOpacity: 0,
  animateOpacity: 1,
  exitOpacity: 0,
  duration: 0.3,
};

export const Carousel = ({ item, index = 0, ...props }: ILazyableProps<ICarousel & SwiperProps>) => {
  const classNames = getClassNames('carousel-1');
  const label = useLabel();
  const [carouselView, setCarouselView] = useState('gallery');

  const { colorScheme, anchor, topSpace, innerSpace, title, abstract, items } = item;

  const setTopSpace = !topSpace ? 'calc(var(--spacing-lg) * -1)' : 0;
  const setTopSpaceSm = !topSpace ? 'calc(var(--spacing-md) * -1)' : 0;
  const setInnerPadding = innerSpace ? 'var(--spacing-sm)' : 0;
  const setInnerPaddingSm = innerSpace ? 'var(--spacing-md)' : 0;

  const seoWeight = getSeoWeight(index, item.seoWeight);

  const isGallery = carouselView === 'gallery';
  const isGrid = carouselView === 'grid';
  const lightColorCheck = colorScheme !== 'light' ? '_light' : '';

  const clickHandler = (viewType: ICarouselType) => {
    setCarouselView(viewType);
  };

  return (
    <CarouselContainer className={classNames} colorScheme={colorScheme} anchor={anchor} marginTop={setTopSpace} marginTopSm={setTopSpaceSm}>
      <Box
        paddingTop={setInnerPadding}
        paddingTopSm={setInnerPaddingSm}>
        <Container position="relative">
          {(title || abstract) && (
            <Grid.Row>
              <Grid sm={9}>
                {title && <Text variant="display60" as={seoWeight()}>{title}</Text>}
                {abstract && <Text variant="paragraph30" marginTop={abstract && 'var(--margin-xs)'} dangerouslySetInnerHTML={{ __html: abstract }} />}
              </Grid>
            </Grid.Row>
          )}
          <Flex.Row position="static" positionMd="absolute" marginTop="var(--margin-sm)" marginTopMd="0" top="50px" right="0" gap="var(--margin-sm)" gapSm="var(--margin-md)">
            <Button variant="line" onClick={() => clickHandler('gallery')} className={isGallery ? `_active ${lightColorCheck}` : `${lightColorCheck}`}>
              <IconGallery />
              <Text variant="label30" className="btn-text" textTransform="uppercase">{label('view.gallery')}</Text>
            </Button>
            <Button variant="line" onClick={() => clickHandler('grid')} className={isGrid ? `_active ${lightColorCheck}` : `${lightColorCheck}`}>
              <IconGrid />
              <Text variant="label30" className="btn-text" textTransform="uppercase" >{label('view.grid')}</Text>
            </Button>
          </Flex.Row>
        </Container>
      </Box>
      <AnimatePresence initial={false} mode="wait">
        {(items && items.length > 0 && isGallery) && (
          <motion.div
            key="gallery"
            initial={{ opacity: animation.initialOpacity }}
            animate={{ opacity: animation.animateOpacity }}
            exit={{ opacity: animation.exitOpacity }}
            transition={{ duration: animation.duration }}
          >
            <Swiper {...props}
              spaceBetween={30}
              centeredSlides={false}
              freeMode={true}
              pagination={{
                clickable: true,
              }}
              modules={[FreeMode, Pagination]}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
              }}
            >
              {items.map((item, i) => (
                <SwiperSlide key={i} virtualIndex={i}>
                  <ProductCard item={item} aspectRatio={2 / 2.1} />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        )}
        {(items && items.length > 0 && isGrid) && (
          <motion.div
            key="grid"
            initial={{ opacity: animation.initialOpacity }}
            animate={{ opacity: animation.animateOpacity }}
            exit={{ opacity: animation.exitOpacity }}
            transition={{ duration: animation.duration }}
          >
            <Container marginTop="var(--margin-md)" >
              <Grid.Row rowGap="var(--spacing-sm)" rowGapSm="var(--spacing-xs)">
                {items.map((item, i) => (
                  <Grid sm={4} lg={3} key={i}>
                    <ProductCard item={item} aspectRatio={2 / 2.3} aspectRatioSm={2 / 2.7} />
                  </Grid>
                ))}
              </Grid.Row>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </CarouselContainer>
  );
};

withLazyProps('carousel-1', async function ({ component, layout, page }: ILazyFuncProps<ICarousel>) {
  if (component.items && component.items.length > 0) {
    return component;
  }
  const items = await getProductDetails({
    where: {
      category: {
        equals: typeof page?.category === 'object' ? page.category.id : page?.category,
      },
    },
    sort: '-date',
    market: layout.market,
    locale: layout.locale,
  });
  component.items = items;
  return component;
});
