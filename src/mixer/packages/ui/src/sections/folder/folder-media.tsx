import { IFolderMedia, getTarget, isMenuHref } from '@websolute/models';
import { ILazyableProps } from '@websolutespa/bom-mixer-models';
import { Box, Button, Field, Grid, Label, Link, Media, Radio, Text } from '@websolutespa/bom-mixer-ui';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { easeOutExpo } from '../../utils';

const StyledContainer = styled.div`
  color: var(--color-neutral-800);
`;

export const FolderMedia = ({ item, index }: ILazyableProps<IFolderMedia>) => {

  const { title, abstract, categories } = item;

  const ref = useRef<HTMLInputElement>(null);

  const [tabIndex, setTabIndex] = useState(0);
  const [mediaHeight, setMediaHeight] = useState(0);

  const MotionBox = motion(Box);
  const transition = { duration: 1.2, ease: easeOutExpo };

  const setHeight = () => {
    if (ref.current) setMediaHeight(ref.current.getBoundingClientRect().height);
  };

  const clickHandler = (tabId: number) => {
    setTabIndex(tabId);
    setHeight();
  };

  useEffect(() => {
    window.addEventListener('resize', setHeight);

    return (() => {
      window.removeEventListener('resize', setHeight);
    });
  }, []);

  return (
    <StyledContainer>
      <Grid.Row gap="var(--margin-md)" alignItems="center">
        <Grid sm={6} md={4} gridColumnEndSm="6" gridColumnEndMd="6" height={mediaHeight ? `${mediaHeight}px` : '100%'} margin="0 auto 30px auto" marginSm="0" width="100%" position="relative">
          {categories && categories.map((category, index) => {
            const mediaLength = category.items.length;
            const is2items = mediaLength === 2;
            const is5items = mediaLength >= 5;
            return (index === tabIndex) && (
              <MotionBox
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={transition}
                position="absolute;"
                zIndex="1"
                key={index}>
                <Box ref={ref} display="grid" gridTemplateColumns={is2items ? '1fr' : '1fr 1fr'} gap="var(--margin-sm)">
                  {category.items && category.items.map((item, i) => {
                    const is3itemsFirstMedia = (mediaLength === 3 && i === 0);
                    const ratio = (is3itemsFirstMedia || is2items || is5items) ? (is5items ? 1.8 / 1 : 2 / 1) : 1 / 1;
                    const nav = item.navs && item.navs[0];
                    return (
                      <Box key={i} width="100%" height="100%" gridColumnStart={is3itemsFirstMedia ? 'auto' : ''} gridColumnEnd={is3itemsFirstMedia ? 'span 2' : ''} >
                        {(item.media && !nav) && (
                          <Media item={item.media} aspectRatio={ratio} borderRadius="15px" overflow="hidden" />
                        )}
                        {(item.media && nav) && (isMenuHref(nav)) && (
                          <Link href={nav.href || '/'}>
                            <Button as="a" target={getTarget(nav)}>
                              <Media item={item.media} aspectRatio={ratio} borderRadius="15px" overflow="hidden" />
                            </Button>
                          </Link>
                        )}
                      </Box>
                    );
                  })}
                </Box>
              </MotionBox>
            );
          })}
        </Grid>
        <Grid sm={6} md={4} gridColumnEndSm="13" gridColumnEndMd="12">
          {title && (
            <Text variant="heading10" variantSm="heading20" marginBottom={abstract && 'var(--spacing-xs)'}>{title}</Text>
          )}
          {abstract && (
            <Text variant="paragraph30" dangerouslySetInnerHTML={{ __html: abstract }} />
          )}
          {categories && (
            <Field marginTop="var(--spacing-xs)">
              {categories.map((category, index) => (
                <Label key={index} >
                  <Radio checked={(index === tabIndex) && true} onChange={() => clickHandler(index)} name="color" id={`${category.title}-${index}`} value={category.title} marginBottom={index < categories.length ? '5px' : ''} />
                  <Text variant="paragraph30" variantSm="paragraph20">{category.title}</Text>
                </Label>
              ))}
            </Field>
          )}
        </Grid>
      </Grid.Row>
    </StyledContainer>
  );
};
