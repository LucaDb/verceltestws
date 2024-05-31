import { IComponent } from '@websolute/models';
import { getClassNames } from '@websolutespa/bom-core';
import { ILazyableProps, getSeoWeight } from '@websolutespa/bom-mixer-models';
import { Box, Container, Flex, Grid, Text, UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import styled from 'styled-components';
import { ImageSliderGrid, ImageSliderGridItem, Wrapper } from '../../components';

export type IMediaSliderGrid = IComponent & {
  eyelet?: string;
  title: string;
  abstract?: string;
  description?: string;
  items: ImageSliderGridItem[];
};

const MediaSliderGridContainer = styled(Wrapper) <UIStyledComponentProps>`
  ${props => getCssResponsive(props)}
`;

export const MediaSliderGrid = ({ item, index = 0 }: ILazyableProps<IMediaSliderGrid>) => {
  const classNames = getClassNames('media-slider-grid');

  const { colorScheme, anchor, topSpace, innerSpace, eyelet, title, abstract, description, items } = item;

  const setTopSpace = !topSpace ? 'calc(var(--spacing-lg) * -1)' : 0;
  const setTopSpaceSm = !topSpace ? 'calc(var(--spacing-md) * -1)' : 0;
  const setInnerPadding = innerSpace ? 'var(--spacing-sm)' : 0;
  const setInnerPaddingSm = innerSpace ? 'var(--spacing-md)' : 0;

  const seoWeight = getSeoWeight(index, item.seoWeight);

  return (
    <MediaSliderGridContainer className={classNames} colorScheme={colorScheme} anchor={anchor} marginTop={setTopSpace} marginTopSm={setTopSpaceSm} overflow="hidden">
      <Box
        padding={`${setInnerPadding} 0`}
        paddingSm={`${setInnerPaddingSm} 0`}>
        <Flex.Col gap="var(--margin-md )" gapSm="var(--margin-lg)">
          {(title || eyelet || abstract || description) && (
            <Container>
              <Grid.Row>
                <Grid sm={8} gridColumnEndSm="11" textAlign="center">
                  <Flex.Col gap="var(--margin-sm)" textAlign="center">
                    {eyelet && <Text variant="label10">{eyelet}</Text>}
                    {title && <Text as={seoWeight()} variant="display60">{title}</Text>}
                    {abstract && <Text variant="heading40" dangerouslySetInnerHTML={{ __html: abstract }} />}
                    {description && <Text variant="paragraph30" dangerouslySetInnerHTML={{ __html: description }} />}
                  </Flex.Col>
                </Grid>
              </Grid.Row>
            </Container>
          )}
          {item && (
            <Container>
              <ImageSliderGrid items={items} />
            </Container>
          )}
        </Flex.Col>
      </Box>
    </MediaSliderGridContainer>
  );
};
