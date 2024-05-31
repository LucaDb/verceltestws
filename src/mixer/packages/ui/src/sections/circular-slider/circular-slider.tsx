import { ICircularSlider } from '@websolute/models';
import { getClassNames } from '@websolutespa/bom-core';
import { ILazyableProps, getSeoWeight } from '@websolutespa/bom-mixer-models';
import { Box, Container, Flex, Grid, Text, UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import styled from 'styled-components';
import { Cta, Wrapper } from '../../components';
import { CircularSliderMain } from './circular-slider-main';

const CircularSliderContainer = styled(Wrapper) <UIStyledComponentProps>`
  ${props => getCssResponsive(props)}
`;

export const CircularSlider = ({ item, index = 0 }: ILazyableProps<ICircularSlider>) => {
  const classNames = getClassNames('circular-slider');

  const { colorScheme, anchor, topSpace, innerSpace, title, eyelet, abstract, description, items, navs } = item;

  const setTopSpace = !topSpace ? 'calc(var(--spacing-lg) * -1)' : 0;
  const setTopSpaceSm = !topSpace ? 'calc(var(--spacing-md) * -1)' : 0;
  const setInnerPadding = innerSpace ? 'var(--spacing-sm)' : 0;
  const setInnerPaddingSm = innerSpace ? 'var(--spacing-md)' : 0;

  const seoWeight = getSeoWeight(index, item.seoWeight);

  return (
    <CircularSliderContainer className={classNames} colorScheme={colorScheme} anchor={anchor} marginTop={setTopSpace} marginTopSm={setTopSpaceSm}>
      <Box
        paddingTop={setInnerPadding}
        paddingTopSm={setInnerPaddingSm}>
        <Container>
          <Grid.Row>
            <Grid sm={6} gridColumnEndSm="10">
              <Flex.Col justifyContent="center" textAlign="center" gap="var(--margin-sm)" gapSm="var(--margin-md)">
                {(eyelet || title || abstract || description) &&
                  <Flex.Col gap="var(--margin-xs)">
                    {eyelet && <Text variant="label10">{eyelet}</Text>}
                    {title && <Text as={seoWeight()} variant="display50">{title}</Text>}
                    {abstract && <Text variant="heading40" className="wysiwyg" dangerouslySetInnerHTML={{ __html: abstract }} />}
                    {description && <Text variant="heading20" variantSm="heading10" className="wysiwyg" dangerouslySetInnerHTML={{ __html: description }} />}
                  </Flex.Col>
                }
              </Flex.Col>
            </Grid>
          </Grid.Row>
          {navs && (
            <Flex gap="var(--margin-sm)" marginTop="var(--margin-xs)" marginTopSm="var(--margin-sm)" flexDirection="column" flexDirectionSm="row" justifyContent="center">
              {navs.map((element, index) => <Cta key={index} item={element} />)}
            </Flex>
          )}
        </Container>
        <CircularSliderMain items={items} />
      </Box>
    </CircularSliderContainer>
  );
};
