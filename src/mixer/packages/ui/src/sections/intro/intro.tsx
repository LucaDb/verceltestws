import { IconArrowDown } from '@websolute/icons';
import { IColorScheme, IIntro, ITitleSize } from '@websolute/models';
import { getClassNames, isMediaJson } from '@websolutespa/bom-core';
import { useLabel, usePage } from '@websolutespa/bom-mixer-hooks';
import { ILazyableProps, getSeoWeight } from '@websolutespa/bom-mixer-models';
import { Box, Breadcrumb, Container, Flex, Grid, Media, SvgAnimation, Text, UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import React, { useRef } from 'react';
import styled, { css } from 'styled-components';
import { ScrollToAnchor, Wrapper } from '../../components';

export type IntroProps = UIStyledComponentProps<IIntro>;

const IntroContainer = styled(Wrapper) <UIStyledComponentProps<{ colorScheme: IColorScheme | undefined }>>`

  video {
      clip-path: inset(1px 1px);
  }

  ${props => (props.colorScheme === 'dark') && css`
    .intro-breadcrumb {
      a {
        color: var(--color-neutral-400);
      }
      .breadcrumb-item {
        color: var(--color-neutral-100);
      }
    }
  `}

  ${props => (props.colorScheme === 'light') && css`
    .intro-breadcrumb {
      a {
        color: var(--color-neutral-400);
      }
      .breadcrumb-item {
        color: var(--color-neutral-900);
      }
    }
  `}

  ${props => getCssResponsive(props)}
`;

export const Intro = ({ item, index = 0 }: ILazyableProps<IIntro>) => {
  const classNames = getClassNames('intro-1');
  const label = useLabel();
  const page = usePage();
  const innerRef = useRef<HTMLElement>(null);

  const { colorScheme, anchor, title, abstract, description, layout, archived, media, scrollToAnchor = undefined } = item;

  const seoWeight = getSeoWeight(index, item.seoWeight);

  const sizeMapping: ITitleSize = { 'md': 'display40', 'lg': 'display30' };
  const getSize = item.titleSize ? sizeMapping[item.titleSize] : 'display50';

  const textItem = (
    <Flex.Col gap="var(--margin-md)" padding="0 var(--margin-lg)">
      {description && (
        <Box className="wysiwyg">
          <Text variant="heading40" dangerouslySetInnerHTML={{ __html: description }} />
        </Box>
      )}
      {(scrollToAnchor && scrollToAnchor.target && scrollToAnchor.title) && (
        <ScrollToAnchor target={scrollToAnchor.target} variant="line" className="_switch">
          <Text variant="heading40">{scrollToAnchor.title} <IconArrowDown /></Text>
        </ScrollToAnchor>
      )}
    </Flex.Col>
  );

  return (
    <IntroContainer ref={innerRef} className={classNames} colorScheme={colorScheme} anchor={anchor}>
      <Container>
        <Grid.Row rowGap="var(--margin-md)" rowGapSm="var(--spacing-sm)">
          {layout === 'breadcrumb' &&
            <Grid sm={10}>
              <Breadcrumb.Group items={page.breadcrumb} className="intro-breadcrumb" />
            </Grid>
          }
          {(title || description || archived) && (
            <Grid sm={8}>
              <Flex.Col rowGap="var(--margin-sm)" alignItems="flex-start">
                {abstract && <Text variant="label20" textTransform="uppercase" dangerouslySetInnerHTML={{ __html: abstract }} />}
                {title && <Text as={seoWeight()} variant={getSize}>{title}</Text>}
                {archived &&
                  <Box className="invert" marginTop="15px" display="block" borderRadius="20px" padding="10px 15px 10px 15px">
                    <Text variant="label20">{label('archived')}</Text>
                  </Box>
                }
              </Flex.Col>
            </Grid>
          )}
          {(description && !media) && (
            <Grid sm={7} gridColumnEndSm="13">
              <Grid sm={7} gridColumnEndSm="13" >{textItem}</Grid>
            </Grid>
          )}
          {(description && media) && (
            <React.Fragment>
              <Grid gridColumnEndSm="5" gridColumnStartSm="1" alignItems='center'>
                {media && (
                  isMediaJson(media) ? (
                    <SvgAnimation href={media.url || media.src} aspectRatio={1 / 1} />
                  ) : (
                    <Media item={media} aspectRatio={1 / 1} />
                  )
                )}
              </Grid>
              <Grid sm={7} gridColumnEndSm="13" >{textItem}</Grid>
            </React.Fragment>
          )}
        </Grid.Row>
      </Container>
    </IntroContainer>
  );
};
