import { IMediaTabs } from '@websolute/models';
import { getClassNames } from '@websolutespa/bom-core';
import { ILazyableProps, getSeoWeight } from '@websolutespa/bom-mixer-models';
import { Box, Container, Flex, Grid, Media, Text, UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import styled, { css } from 'styled-components';
import { Cta, Wrapper } from '../../components';

const MediaTabsContainer = styled(Wrapper) <UIStyledComponentProps>`
   .media {
    position: absolute;
    top: 0;
    z-index: 0;
    transition: var(--transition-smooth);
    transition-property: opacity;
    opacity: 0;

    &.active {
      opacity: 1;
      z-index: 1;
    }

    &.default {
      position: static;
      opacity: 1;
    }

    video {
      clip-path: inset(1px 1px);
    }
  }

  .box {
    position: relative;
    overflow: hidden;

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background: var(--color-neutral-400);
      transition: var(--transition-smooth);
    }

    &:last-child {
      &:after {
        display: none;
      }
    }

    .tab-button {
      cursor: pointer;
      padding: var(--margin-xs) 0;
      width: 100%;
      color: var(--color-neutral-400);
      transition: var(--transition-smooth);

      .tab-number {
        position: relative;
        bottom: 6px;
        margin-right: var(--margin-sm);
      }
    }

    &.active {
      .tab-button {
        ${props => (props.colorScheme === 'dark') && css`
          color: var(--color-neutral-100);
        `}

        ${props => (props.colorScheme === 'light') && css`
          color: var(--color-neutral-800);
        `}
      }

      &:after {
        ${props => (props.colorScheme === 'dark') && css`
          background: var(--color-neutral-100);
        `}

        ${props => (props.colorScheme === 'light') && css`
          background: var(--color-neutral-800);
        `}
      }
    }
  }

  ${props => getCssResponsive(props)}
`;

export const MediaTabs = ({ item, index = 0 }: ILazyableProps<IMediaTabs>) => {
  const classNames = getClassNames('media-tabs-1');

  const { colorScheme, anchor, topSpace, innerSpace, layout = 'default', title, abstract, description, media, navs, mediaRadius = true, items } = item;
  const itemsList = item.itemsList ?? true;

  const nav = navs && navs[0];

  const setTopSpace = !topSpace ? 'calc(var(--spacing-lg) * -1)' : 0;
  const setTopSpaceSm = !topSpace ? 'calc(var(--spacing-md) * -1)' : 0;
  const setInnerPadding = innerSpace ? 'var(--spacing-sm)' : 0;
  const setInnerPaddingSm = innerSpace ? 'var(--spacing-md)' : 0;

  const [activeTab, setActiveTab] = useState<number | null>(null);

  const toggleClick = (tabIndex: number) => {
    setActiveTab(tabIndex !== activeTab ? tabIndex : null);
  };

  const activeClass: string = 'active';
  const boxClass: string = 'box';

  const isActive = (index: number) => activeTab === index ? true : false;
  const getBtnClass = (index: number) => isActive(index) ? activeClass : '';
  const getTabClass = (index: number) => isActive(index) ? `${boxClass} ${activeClass}` : boxClass;

  const seoWeight = getSeoWeight(index, item.seoWeight);

  return (
    <MediaTabsContainer className={classNames} colorScheme={colorScheme} anchor={anchor} marginTop={setTopSpace} marginTopSm={setTopSpaceSm} padding={setInnerPadding}>
      <Box
        paddingTop={setInnerPadding}
        paddingTopSm={setInnerPaddingSm}>
        <Container>
          {(title || abstract) && layout === 'default' && (
            <Grid.Row>
              <Grid sm={9}>
                {title && <Text as={seoWeight()} variant="display60">{title}</Text>}
                {abstract && <Text variant="paragraph30" marginTop={title && 'var(--margin-xs)'} dangerouslySetInnerHTML={{ __html: abstract }} />}
              </Grid>
            </Grid.Row>
          )}
          <Grid.Row marginTop="var(--margin-sm)" marginTopSm="var(--margin-md)" gap="var(--margin-sm)">
            <Grid sm={5} gridColumnEndSm="6" position="relative" borderRadius={mediaRadius ? '15px' : '0'} overflow={mediaRadius ? 'hidden' : 'auto'}>
              <Media className="default" aspectRatio={1 / 1} item={media} />
              {items && items.map((item, index) => (
                <Media key={index} className={getBtnClass(index)} aspectRatio={1 / 1} item={item.media} />
              ))}
            </Grid>
            <Grid sm={6} gridColumnEndSm="13">
              <Flex.Col marginTop="var(--margin-sm)" marginTopSm="0" gap="var(--margin-xs)" gapSm="var(--margin-md)" justifyContent="center" height="auto" heightSm="100%">
                {description && layout === 'default' && <Text variant="paragraph20" marginBottom="var(--margin-md)" dangerouslySetInnerHTML={{ __html: description }} />}
                {(title || abstract || description) && layout === 'inline' && (
                  <Flex.Col gap="var(--margin-xs)">
                    {title && <Text variant="heading10">{title}</Text>}
                    {abstract && <Text variant="paragraph20" dangerouslySetInnerHTML={{ __html: abstract }} />}
                    {description && <Text variant="paragraph30" dangerouslySetInnerHTML={{ __html: description }} />}
                  </Flex.Col>
                )}
                {items && (
                  <Flex.Col>
                    {items && items.map((item, index) => (
                      <Box key={index} onClick={() => toggleClick(index)} className={getTabClass(index)}>
                        <Flex className="tab-button" alignItems="flex-end" >
                          {itemsList && <Text variant="label10" className="tab-number">{`0${index + 1}`}</Text>}
                          {item.title && <Text variant="heading40">{item.title}</Text>}
                        </Flex>
                        <Box className="tab-text">
                          <AnimatePresence initial={false}>
                            {isActive(index) && (
                              <motion.div
                                key="content"
                                initial="collapsed"
                                animate="open"
                                exit="collapsed"
                                variants={{
                                  open: { opacity: 1, height: 'auto', marginBottom: 'var(--margin-md)' },
                                  collapsed: { opacity: 0, height: 0, marginBottom: 0 },
                                }}
                                transition={{ duration: 0.6, ease: [0.04, 0.62, 0.23, 0.98] }}
                              >
                                {item.description && <Text variant="paragraph40" dangerouslySetInnerHTML={{ __html: item.description }} />}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </Box>
                      </Box>
                    ))}
                  </Flex.Col>
                )}
                {nav && (
                  <Flex marginTop="var(--spacing-sm)">
                    <Cta item={nav} />
                  </Flex>
                )}
              </Flex.Col>
            </Grid>
          </Grid.Row>
        </Container>
      </Box>
    </MediaTabsContainer>
  );
};
