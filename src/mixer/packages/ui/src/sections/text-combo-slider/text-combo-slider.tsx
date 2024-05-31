import { ITextComboSlider } from '@websolute/models';
import { getClassNames } from '@websolutespa/bom-core';
import { ILazyableProps, getSeoWeight } from '@websolutespa/bom-mixer-models';
import { Box, Container, Flex, Grid, Media, Text, UIStyledComponentProps, getCssResponsive, mediaUp } from '@websolutespa/bom-mixer-ui';
import { motion } from 'framer-motion';
import { useState } from 'react';
import styled, { css } from 'styled-components';
import { Pagination } from 'swiper';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { Wrapper } from '../../components';
import { easeOutExpo } from '../../utils';

const TextComboSliderContainer = styled(Wrapper) <UIStyledComponentProps> `

  .swiper {
    ::-webkit-scrollbar {
      display: none;
    }

    overflow-x: auto;
    padding: 0 calc(var(--grid-column-gap) * 2) ;

    .btn-nav {
      display: none;
    }

    ${props => mediaUp(props, 'md', css`
      padding: 0 10vw;
      margin-top: 0;

      .btn-nav {
        display: flex;
      }
    `)}

    video {
      clip-path: inset(1px 1px);
    }

    .swiper-slide {

      .button {

        &:after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(0deg, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35));
          }
        }

        .media {
          height: 100%;
        }
    }
  }

  .swiper-button-prev,
  .swiper-button-next {
    display: none;
  }

  ${props => getCssResponsive(props)}
`;

export const TextComboSlider = ({ item, index = 0, ...props }: ILazyableProps<ITextComboSlider & SwiperProps>) => {
  const classNames = getClassNames('text-combo-slider-1');
  const [activeSlide, setActiveSlide] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  const { colorScheme, anchor, topSpace, innerSpace, mediaRadius = false, eyelet, title, abstract, description, items } = item;

  const setTopSpace = !topSpace ? 'calc(var(--spacing-lg) * -1)' : 0;
  const setTopSpaceSm = !topSpace ? 'calc(var(--spacing-md) * -1)' : 0;
  const setInnerPadding = innerSpace ? 'var(--spacing-sm)' : 0;
  const setInnerPaddingSm = innerSpace ? 'var(--spacing-md)' : 0;

  const seoWeight = getSeoWeight(index, item.seoWeight);

  const transition = { duration: 0.6, ease: easeOutExpo };

  return (
    <TextComboSliderContainer colorScheme={colorScheme} anchor={anchor} className={classNames} overflow="hidden" marginTop={setTopSpace} marginTopSm={setTopSpaceSm}>
      <Box padding={`${setInnerPadding} 0`} paddingSm={`${setInnerPaddingSm} 0`}>
        <Flex.Col gap="var(--margin-lg)">
          <Flex.Col gap="var(--margin-sm)" gapSm="var(--margin-md)">
            <Container>
              <Grid.Row>
                <Grid sm={6} gridColumnEndSm="10">
                  <Flex.Col justifyContent="center" textAlign="center" gap="var(--margin-sm)" gapSm="var(--margin-md)">
                    {(eyelet || title || abstract || description) &&
                      <Flex.Col gap="var(--margin-xs)">
                        {eyelet && <Text variant="label20">{eyelet}</Text>}
                        {title && <Text as={seoWeight()} variant="display60">{title}</Text>}
                        {description && <Text variant="heading20" variantSm="heading40" className="wysiwyg" dangerouslySetInnerHTML={{ __html: description }} />}
                        {abstract && <Text variant="paragraph30" className="wysiwyg" dangerouslySetInnerHTML={{ __html: abstract }} />}
                      </Flex.Col>
                    }
                  </Flex.Col>
                </Grid>
              </Grid.Row>
            </Container>
            {items && (
              <Flex.Row justifyContent="center" textAlign="center" gap="var(--margin-xs)" gapSm="var(--margin-md)" overflowX="auto" overflowXSm="initial">
                {items.map((item, index) => (
                  <Flex.Row key={index} className={activeSlide === index ? 'invert' : ''} padding="5px 15px" borderRadius="40px" cursor="pointer" transition="var(--transition-smooth)" onClick={() => swiperInstance && swiperInstance.slideTo(index, 800)}>
                    <Box overflow="hidden" width="10px" height="10px" position="relative" >
                      <motion.svg
                        initial={{ x: '100%' }}
                        animate={activeSlide !== index ? { x: '100%' } : { x: '0' }}
                        transition={transition}
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                        }}
                        width="10" height="10" viewBox="0 0 11 11" fill="none"><rect x="0.5" y="0.435547" width="10" height="10" rx="13" fill="currentColor" /></motion.svg>
                    </Box>
                    <Text variant="paragraph30">{item.title}</Text>
                  </Flex.Row>)
                )}
              </Flex.Row>
            )}
          </Flex.Col>
          {items && items.length > 0 && (
            <Box>
              <Swiper {...props}
                onSwiper={(swiper) => setSwiperInstance(swiper)}
                onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
                spaceBetween={30}
                centeredSlides={true}
                modules={[Pagination]}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                  },
                }}
              >
                <>
                  {items.map((item, i) => (
                    <SwiperSlide key={i} virtualIndex={i} >
                      <Flex alignItems="center" gap="var(--margin-sm)" flexDirection="column" flexDirectionSm="row">
                        <Box className="media" flex="0 0 calc(50% - var(--margin-xs))">
                          <Media item={item.media} aspectRatio={1 / 1} borderRadius={mediaRadius ? '15px' : '0'} overflow={mediaRadius ? 'hidden' : 'auto'} />
                        </Box>
                        <Box flex="0 0 calc(50% - var(--margin-xs))">
                          <Flex.Col gap="var(--margin-xs)" padding="0" paddingSm="0 var(--margin-md) 0 var(--margin-sm)" paddingMd="0 var(--margin-xl) 0 var(--margin-md)" width="auto">
                            {item.eyelet && <Text variant="label10">{item.eyelet}</Text>}
                            {item.title && <Text variant="heading20" variantSm="heading30">{item.title}</Text>}
                            {item.abstract && <Text variant="paragraph20" className="wysiwyg" dangerouslySetInnerHTML={{ __html: item.abstract }} />}
                            {item.description && <Text variant="paragraph40" className="wysiwyg" dangerouslySetInnerHTML={{ __html: item.description }} />}
                          </Flex.Col>
                        </Box>
                      </Flex>
                    </SwiperSlide>
                  ))}
                </>
              </Swiper>
            </Box>
          )}
        </Flex.Col>
      </Box>
    </TextComboSliderContainer>
  );
};


