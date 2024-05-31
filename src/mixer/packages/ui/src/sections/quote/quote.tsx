import { IQuote, getAuthorText } from '@websolute/models';
import { getClassNames } from '@websolutespa/bom-core';
import { ILazyableProps } from '@websolutespa/bom-mixer-models';
import { Box, Container, Flex, Grid, Media, Text, UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import styled from 'styled-components';
import { Wrapper } from '../../components';

const QuoteContainer = styled(Wrapper) <UIStyledComponentProps>`
  ${props => getCssResponsive(props)}
`;

export const Quote = ({ item }: ILazyableProps<IQuote>) => {
  const classNames = getClassNames('quote-1');
  const { colorScheme, anchor, topSpace, innerSpace, title, description, author, media } = item;

  const setTopSpace = !topSpace ? 'calc(var(--spacing-lg) * -1)' : 0;
  const setTopSpaceSm = !topSpace ? 'calc(var(--spacing-md) * -1)' : 0;
  const setInnerPadding = innerSpace ? 'var(--spacing-sm)' : 0;
  const setInnerPaddingSm = innerSpace ? 'var(--spacing-md)' : 0;

  return (
    <QuoteContainer className={classNames} colorScheme={colorScheme} anchor={anchor} marginTop={setTopSpace} marginTopSm={setTopSpaceSm} >
      <Box
        padding={`${setInnerPadding} 0`}
        paddingSm={`${setInnerPaddingSm} 0`}>
        <Container>
          <Grid.Row>
            <Grid sm={10} md={6} gridColumnEndSm="12" gridColumnEndMd="10">
              <Flex.Col gap="var(--margin-sm)">
                {title && <Text variant="label30">{title}</Text>}
                {description && <Text variant="paragraph10">"{description.replace(/<[^>]*>/g, '')}"</Text>}
                <Flex.Row marginTop="var(--margin-xs)" gap="var(--margin-sm)">
                  {media && <Media item={item.media} width="45px" height="45px" borderRadius={'50%'} overflow="hidden" />}
                  {author && <Text variant="paragraph30">{getAuthorText(author, ', ')}</Text>}
                </Flex.Row>
              </Flex.Col>
            </Grid>
          </Grid.Row>
        </Container>
      </Box>
    </QuoteContainer>
  );
};
