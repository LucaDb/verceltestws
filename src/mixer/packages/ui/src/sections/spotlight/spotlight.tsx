import { ISpotlight } from '@websolute/models';
import { getClassNames } from '@websolutespa/bom-core';
import { useLabel } from '@websolutespa/bom-mixer-hooks';
import { ILazyableProps, getSeoWeight } from '@websolutespa/bom-mixer-models';
import { Box, Container, Flex, Grid, Text, UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Cta, SpotlightCard, Wrapper } from '../../components';

const SpotlightContainer = styled(Wrapper) <UIStyledComponentProps>`
  ${props => getCssResponsive(props)}
`;

export const Spotlight = ({ item, index = 0 }: ILazyableProps<ISpotlight>) => {
  const classNames = getClassNames('spotlight-1');

  const { colorScheme, anchor, topSpace, innerSpace, layout = 'grid', title, abstract, description, navs, companies } = item;
  const label = useLabel();
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);

  const setTopSpace = !topSpace ? 'calc(var(--spacing-lg) * -1)' : 0;
  const setTopSpaceSm = !topSpace ? 'calc(var(--spacing-md) * -1)' : 0;
  const setInnerPadding = innerSpace ? 'var(--spacing-sm)' : 0;
  const setInnerPaddingSm = innerSpace ? 'var(--spacing-md)' : 0;

  const seoWeight = getSeoWeight(index, item.seoWeight);

  const setSize = companies && companies.length > 4 ? 'sm' : 'md';

  useEffect(() => {
    const updateWidth = () => cardRef.current && setCardWidth(cardRef.current.offsetWidth);
    window.addEventListener('resize', updateWidth);
    updateWidth();
    return () => window.removeEventListener('resize', updateWidth);
  }, [cardRef]);

  return (
    <SpotlightContainer className={classNames} colorScheme={colorScheme} anchor={anchor} marginTop={setTopSpace} marginTopSm={setTopSpaceSm}>
      <Box
        padding={`${setInnerPadding} 0`}
        paddingSm={`${setInnerPaddingSm} 0`}>
        <Container>
          <Flex.Col gap="var(--margin-md)" gapSm="var(--margin-xl)">
            {(title || abstract || description) && <Grid.Row justifyContent="center">
              <Grid gridColumnStart="2" gridColumnEnd="12" gridColumnStartSm="3" gridColumnEndSm="11">
                <Flex.Col textAlign="center" gap="var(--margin-xs)" gapSm="var(--margin-md)">
                  {title && <Text variant="heading10" variantSm="display50" as={seoWeight()}>{title}</Text>}
                  {abstract && <Text variant="heading40" dangerouslySetInnerHTML={{ __html: abstract }} />}
                  {description && <Text variant="paragraph30" variantSm="paragraph20" dangerouslySetInnerHTML={{ __html: description }} />}
                </Flex.Col>
              </Grid>
            </Grid.Row>}
            {(layout === 'grid' && companies) && (
              <Flex.Row justifyContent="center" alignItems="flex-start" gap="var(--margin-sm)" gapSm="var(--margin-md)" flexWrap="wrap">
                {companies.map((company, i) => (
                  <Box key={i} flex="0 0 calc(50% - var(--margin-sm))" flexSm="0 0 calc(25% - var(--margin-md))">
                    <SpotlightCard item={company} textSize={setSize} />
                  </Box>
                ))}
              </Flex.Row>
            )}
            {(layout === 'line' && companies) && (
              <Flex.Col rowGap="var(--margin-md)" rowGapSm="var(--margin-lg)">
                <Flex.Row alignItems="center" justifyContent="center">
                  <Box width={`${cardWidth}px`}>
                    <SpotlightCard item={companies[0]} textSize={setSize} />
                  </Box>
                </Flex.Row>
                <Flex.Row justifyContent="center" alignItems="flex-start" columnGap="var(--margin-xs)" columnGapSm="var(--spacing-xs)" rowGap="var(--margin-sm)" rowGapSm="var(--margin-md)" flexWrap="wrap" flexWrapSm="nowrap">
                  {companies.map((company, i) => (
                    i > 0 && (
                      <Box key={i} flex="0 0 calc(50% - var(--margin-xs) / 2)" flexSm="100%" maxWidth="263px" ref={cardRef}>
                        <SpotlightCard item={company} textSize={setSize} />
                      </Box>
                    )
                  ))}
                </Flex.Row>
              </Flex.Col>
            )}
            {navs && (
              <Flex marginTop="var(--spacing-sm)" justifyContent="center">
                {navs.map((element, index) => <Cta key={index} item={element} title={label('showmore.companies')} />)}
              </Flex>
            )}
          </Flex.Col>
        </Container>
      </Box>
    </SpotlightContainer>
  );
};
