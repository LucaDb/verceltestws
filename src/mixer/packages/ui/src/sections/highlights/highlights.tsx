import { IHighlights } from '@websolute/models';
import { getClassNames } from '@websolutespa/bom-core';
import { ILazyableProps, getSeoWeight } from '@websolutespa/bom-mixer-models';
import { Box, Container, Flex, Grid, Text, UIStyledComponentProps, getCssResponsive, mediaDown } from '@websolutespa/bom-mixer-ui';
import styled, { css } from 'styled-components';
import { Cta, ParallaxText, Wrapper } from '../../components';


const HighlightsContainer = styled(Wrapper) <UIStyledComponentProps>`

.slider {
  overflow-x: hidden;
  border-top: 1px solid var(--color-neutral-600);
  border-bottom: 1px solid var(--color-neutral-600);

  .text {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      gap: 40px;
      padding: var(--margin-sm) 0;
      line-height: 1;

      ${props => mediaDown(props, 'sm', css`
        font-size: var(--font-display60-size);
        padding: var(--margin-xs) 0;
      `)}

      div {
        display: inline-block;
        position: relative;
        white-space: nowrap;

      &:after {
        content: '';
        position: absolute;
        z-index: 1;
        top: 50%;
        right: -24px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: var(--color-neutral-100);
      }
    }
  }

    .text + .text {
      border-top: 0;
    }
  }

  ${props => getCssResponsive(props)}
`;

export const Highlights = ({ item, index = 0 }: ILazyableProps<IHighlights>) => {
  const classNames = getClassNames('highlights-1');

  const { colorScheme, anchor, topSpace, innerSpace, eyelet, title, abstract, description, clients, navs } = item;

  const setTopSpace = !topSpace ? 'calc(var(--spacing-lg) * -1)' : 0;
  const setTopSpaceSm = !topSpace ? 'calc(var(--spacing-md) * -1)' : 0;
  const setInnerPadding = innerSpace ? 'var(--spacing-md)' : 0;

  const seoWeight = getSeoWeight(index, item.seoWeight);

  return (
    <HighlightsContainer className={classNames} colorScheme={colorScheme} anchor={anchor} marginTop={setTopSpace} marginTopSm={setTopSpaceSm}>
      <Box paddingTop={setInnerPadding}>
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
        <Box className="slider" marginTop="var(--spacing-md)">
          <ParallaxText variant="heading10" baseVelocity={2} scrollSpeed={3} duplicate={4} >
            <>
              {clients && clients.map((client, index) => <div key={index}>{client.title}</div>)}
            </>
          </ParallaxText>
        </Box>
        <Box className="slider" borderTop={0}>
          <ParallaxText variant="heading10" baseVelocity={-2} scrollSpeed={3} duplicate={4} >
            <>
              {clients && clients.map((client, index) => <div key={index}>{client.title}</div>)}
            </>
          </ParallaxText>
        </Box>
        {(navs && navs.length > 0) && (
          <Container padding="var(--spacing-md) 0">
            <Flex.Row gap="var(--margin-sm)" justifyContent="center">
              {navs.map((element, index) => <Cta key={index} item={element} variant="line-light" />)}
            </Flex.Row>
          </Container>
        )}
      </Box>
    </HighlightsContainer>
  );
};
