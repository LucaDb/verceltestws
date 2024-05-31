import { ITextCombo } from '@websolute/models';
import { getClassNames } from '@websolutespa/bom-core';
import { ILazyableProps, getSeoWeight } from '@websolutespa/bom-mixer-models';
import { Box, Container, Flex, Grid, Media, Text, UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import styled from 'styled-components';
import { Cta, Wrapper } from '../../components';

const TextComboContainer = styled(Wrapper) <UIStyledComponentProps>`
  ${props => getCssResponsive(props)}
`;

export const TextCombo = ({ item, index = 0 }: ILazyableProps<ITextCombo>) => {
  const classNames = getClassNames('text-combo-1');

  const { colorScheme, anchor, topSpace, innerSpace, swap = false, dots = false, mediaRadius = true, title, eyelet, abstract, description, media, mediaSmall, navs } = item;

  const setTopSpace = !topSpace ? 'calc(var(--spacing-lg) * -1)' : 0;
  const setTopSpaceSm = !topSpace ? 'calc(var(--spacing-md) * -1)' : 0;
  const setInnerPadding = innerSpace ? 'var(--spacing-sm)' : 0;
  const setInnerPaddingSm = innerSpace ? 'var(--spacing-md)' : 0;

  const seoWeight = getSeoWeight(index, item.seoWeight);

  return (
    <TextComboContainer className={classNames} colorScheme={colorScheme} anchor={anchor} marginTop={setTopSpace} marginTopSm={setTopSpaceSm}>
      <Box
        paddingTop={setInnerPadding}
        paddingTopSm={setInnerPaddingSm}>
        <Container>
          <Grid.Row alignItems="center" rowGap="var(--margin-sm)">
            <Grid sm={6} order={swap ? 1 : 0}>
              <Flex.Col rowGap="var(--margin-xs)" rowGapSm="var(--margin-sm)" padding="0" paddingMd={swap ? '0 0 0 var(--spacing-md)' : '0 var(--spacing-md) 0 0'}>
                {eyelet && (
                  <Text variant="paragraph40">
                    {dots && <svg width="10" height="10" viewBox="0 0 11 11" fill="none"><rect x="0.5" y="0.435547" width="10" height="10" rx="13" fill="currentColor" /></svg>}
                    <Box display="inline" marginLeft={dots ? '10px' : ''}>{eyelet}</Box>
                  </Text>
                )}
                {title && <Text as={seoWeight()} variant="heading20">{title}</Text>}
                {abstract && <Text variant="paragraph30" variantSm="paragraph20" className="wysiwyg" dangerouslySetInnerHTML={{ __html: abstract }} />}
                {description && <Text variant="paragraph30" className="wysiwyg" dangerouslySetInnerHTML={{ __html: description }} />}
                {mediaSmall && (
                  <Flex.Row gap="var(--margin-sm)">
                    {mediaSmall.map((item, index) => <Media key={index} item={item} />)}
                  </Flex.Row>
                )}
                {navs && (
                  <Flex gap="var(--margin-sm)" marginTop="var(--margin-xs)" marginTopSm="var(--margin-sm)" flexDirection="column" flexDirectionSm="row">
                    {navs.map((element, index) => <Cta key={index} item={element} />)}
                  </Flex>
                )}
              </Flex.Col>
            </Grid>
            <Grid sm={6} order={swap ? 0 : 1}>
              {media && <Media item={media} aspectRatio={1 / 1} borderRadius={mediaRadius ? '15px' : '0'} overflow={mediaRadius ? 'hidden' : 'auto'} />}
            </Grid>
          </Grid.Row>
        </Container>
      </Box>
    </TextComboContainer>
  );
};
