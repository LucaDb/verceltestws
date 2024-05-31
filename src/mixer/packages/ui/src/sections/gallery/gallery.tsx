import { IconGallery, IconGrid } from '@websolute/icons';
import { IGallery, IGalleryViewType, getProjectDetails } from '@websolute/models';
import { getClassNames } from '@websolutespa/bom-core';
import { useLabel, useLayout } from '@websolutespa/bom-mixer-hooks';
import { ILazyFuncProps, ILazyableProps, withLazyProps } from '@websolutespa/bom-mixer-models';
import { Box, Button, Container, Flex, Grid, Link, Media, Text, UIStyledComponentProps, getCssResponsive, mediaUp } from '@websolutespa/bom-mixer-ui';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import styled, { css } from 'styled-components';
import { Navigation } from 'swiper';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { ProjectCard, Wrapper } from '../../components';
import { GalleryNext, GalleryPrev } from './gallery-navigation';

const GalleryContainer = styled(Wrapper) <UIStyledComponentProps> `

  .swiper {
    ::-webkit-scrollbar {
      display: none;
    }

    overflow-x: auto;
    margin-top: var(--margin-md);
    padding: 0 calc(var(--grid-column-gap) * 2) ;

    .btn-nav {
      display: none;
    }

    ${props => mediaUp(props, 'md', css`
      padding: 0 16.666vw;
      margin-top: 0;

      .btn-nav {
        display: flex;
      }
    `)}

    .swiper-slide {
      border-radius: 15px;
      overflow: hidden;

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

const animation = {
  initialOpacity: 0,
  animateOpacity: 1,
  exitOpacity: 0,
  duration: 0.8,
};

export const Gallery = ({ item, index = 0, ...props }: ILazyableProps<IGallery & SwiperProps>) => {
  const classNames = getClassNames('gallery-1');

  const layout = useLayout();
  const label = useLabel();

  const { colorScheme, anchor, topSpace, innerSpace, title, items } = item;

  const setTopSpace = !topSpace ? 'calc(var(--spacing-lg) * -1)' : 0;
  const setTopSpaceSm = !topSpace ? 'calc(var(--spacing-md) * -1)' : 0;
  const setInnerPadding = innerSpace ? 'var(--spacing-sm)' : 0;
  const setInnerPaddingSm = innerSpace ? 'var(--spacing-md)' : 0;

  const [galleryView, setGalleryView] = useState<string>('gallery');

  const clickHandler = (viewType: IGalleryViewType) => {
    setGalleryView(viewType);
  };

  const isGallery = galleryView === 'gallery';
  const isGrid = galleryView === 'grid';
  const lightColorCheck = colorScheme !== 'light' ? '_light' : '';

  return (
    <GalleryContainer className={classNames} colorScheme={colorScheme} anchor={anchor} marginTop={setTopSpace} marginTopSm={setTopSpaceSm}>
      <Box
        paddingTop={setInnerPadding}
        paddingTopSm={setInnerPaddingSm}>
        <AnimatePresence initial={false} mode="wait" >
          <Flex.Col
            height={isGallery ? 'auto' : 'auto'}
            heightMd={isGallery ? '100vh' : 'auto'}
            padding={isGallery ? 'var(--margin-md) 0' : ''}
            paddingMd={isGallery ? '0' : ''}
            justifyContent={isGallery ? 'space-evenly' : 'flex-start'} >
            <Flex.Row flex="0 0 10vh" justifyContent="center" align-items="center" gap="var(--margin-sm)" gapSm="var(--margin-md)" >
              <Button variant="line" onClick={() => clickHandler('gallery')} className={isGallery ? `_active ${lightColorCheck}` : `${lightColorCheck}`}>
                <IconGallery />
                <Text variant="label30" className="btn-text" textTransform="uppercase">{label('view.gallery')}</Text>
              </Button>
              <Button variant="line" onClick={() => clickHandler('grid')} className={isGrid ? `_active ${lightColorCheck}` : `${lightColorCheck}`}>
                <IconGrid />
                <Text variant="label30" className="btn-text" textTransform="uppercase">{label('view.grid')}</Text>
              </Button>
            </Flex.Row>
            {item.items && item.items.length > 0 && (
              <Flex.Col justifyContent="center" flex="0 0 auto">
                {isGallery && (
                  <motion.div
                    key="gallery"
                    initial={{ opacity: animation.initialOpacity }}
                    animate={{ opacity: animation.animateOpacity }}
                    exit={{ opacity: animation.exitOpacity }}
                    transition={{ duration: animation.duration }}
                  >
                    <Swiper {...props}
                      spaceBetween={30}
                      centeredSlides={true}
                      navigation
                      loop={true}
                      loopedSlides={2}
                      modules={[Navigation]}
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
                      {item.items.map((item, i) => (
                        <SwiperSlide key={i} virtualIndex={i} >
                          <Link href={item.href || '/' as string}>
                            <Button as="a" display="block" position="relative" aspectRatio={1} aspectRatioMd={16 / 9} maxHeight="80vh" margin="0 auto">
                              {(item.title || item.abstract) &&
                                <Flex.Col gap="0" position="absolute" zIndex="999" transform="translate(-50%, -50%)" width="80%" left="50%" top="50%" padding="0 10%" textAlign="center">
                                  <Text variant="heading40" variantSm="heading30" color="var(--color-neutral-100)">
                                    {item.title}.
                                  </Text>
                                  <Text variant="heading40" variantSm="heading30" dangerouslySetInnerHTML={{ __html: item.abstract }}></Text>
                                </Flex.Col>
                              }
                              <Media item={item.media} />
                            </Button>
                          </Link>
                        </SwiperSlide>
                      ))}
                      <GalleryPrev />
                      <GalleryNext />
                    </Swiper>
                  </motion.div>
                )}
                {isGrid && (
                  <motion.div
                    key="grid"
                    initial={{ opacity: animation.initialOpacity }}
                    animate={{ opacity: animation.animateOpacity }}
                    exit={{ opacity: animation.exitOpacity }}
                    transition={{ duration: animation.duration }}
                  >
                    <Container marginTop="var(--margin-md)" >
                      <Grid.Row rowGap="var(--spacing-sm)" rowGapSm="var(--spacing-sm)">
                        {item.items.map((item, i) => (
                          <Grid sm={4} key={i}>
                            <ProjectCard item={item} aspectRatio={1} aspectRatioSm={16 / 9} />
                          </Grid>
                        ))}
                      </Grid.Row>
                    </Container>
                  </motion.div>
                )}
              </Flex.Col>
            )}
            <Flex flex="0 0 10vh" margin={isGrid ? 'var(--margin-md) 0' : '0'} justifyContent="center" align-items="center">
              <Link href={layout.topLevelHrefs.project_index}>
                <Button as="a" variant="underline" className="_light" height="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center" textAlign="center">
                  <Text variant="label20">{label('showmore.projects')}</Text>
                </Button>
              </Link>
            </Flex>
          </Flex.Col>
        </AnimatePresence>
      </Box>
    </GalleryContainer>
  );
};

withLazyProps('gallery-1', async function ({ component, layout }: ILazyFuncProps<IGallery>) {
  if (component.items && component.items.length > 0) {
    return component;
  }
  const limit = 6;
  const items = await getProjectDetails({
    limit: 6,
    where: {
      category: {
        equals: 'project_index',
      },
    },
    sort: '-date',
    market: layout.market,
    locale: layout.locale,
  });
  component.items = items.slice(0, Math.min(limit, items.length));
  return component;
});
