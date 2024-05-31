import { ITextColumns } from '@websolute/models';
import { getClassNames } from '@websolutespa/bom-core';
import { ILazyableProps } from '@websolutespa/bom-mixer-models';
import { Box, Container, Flex, Grid, Text, UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import styled from 'styled-components';
import { Counter, Wrapper } from '../../components';


const TextColumnsContainer = styled(Wrapper) <UIStyledComponentProps>`
  ${props => getCssResponsive(props)}
`;

export const TextColumns = ({ item, index = 0 }: ILazyableProps<ITextColumns>) => {
  const classNames = getClassNames('text-columns-1');

  const { colorScheme, anchor, topSpace, innerSpace, layout = 'center', title, eyelet, abstract, description, items } = item;

  const setTopSpace = !topSpace ? 'calc(var(--spacing-lg) * -1)' : 0;
  const setTopSpaceSm = !topSpace ? 'calc(var(--spacing-md) * -1)' : 0;
  const setInnerPadding = innerSpace ? 'var(--spacing-md)' : 0;

  const isCentered = layout === 'center';

  return (
    <TextColumnsContainer className={classNames} colorScheme={colorScheme} anchor={anchor} marginTop={setTopSpace} marginTopSm={setTopSpaceSm}>
      <Box paddingTop={setInnerPadding}>
        <Container>
          <Flex.Col gap="var(--margin-md)" gapSm="var(--margin-xl)">
            <Grid.Row>
              <Grid gridColumnStartSm={isCentered ? 3 : 0} gridColumnEndSm={isCentered ? 11 : 10} gap="var(--margin-sm)" gapSm="var(--margin-md)">
                <Flex.Col rowGap="var(--margin-xs)" alignItems={isCentered ? 'center' : 'initial'} textAlign={isCentered ? 'center' : 'initial'}>
                  {eyelet && (
                    <Text variant="paragraph40">
                      <svg width="10" height="10" viewBox="0 0 11 11" fill="none"><rect x="0.5" y="0.435547" width="10" height="10" rx="13" fill="currentColor" /></svg>
                      <Box display="inline" marginLeft="10px">{eyelet}</Box>
                    </Text>
                  )}
                  {title && <Text variant="display30" variantSm="display50" dangerouslySetInnerHTML={{ __html: title }} />}
                  {abstract && <Text variant="heading40" dangerouslySetInnerHTML={{ __html: abstract }} />}
                  {description && <Text variant="paragraph30" variantSm="paragraph40" dangerouslySetInnerHTML={{ __html: description }} />}
                </Flex.Col>
              </Grid>
            </Grid.Row>
            {items && (
              <Flex gap="var(--margin-xs)" gapSm="var(--margin-sm)" flexDirection="column" flexDirectionSm="row">
                {items.map((item, index) => (
                  <Flex.Col key={index} rowGap="10px" rowGapSm="var(--margin-xs)" textAlign={isCentered ? 'center' : 'left'} >
                    {item.counter && <Text variant="display20" marginBottom="0" marginBottomSm="var(--margin-xs)"><Counter value={item.counter} /></Text>}
                    {item.title && <Text variant="heading30" dangerouslySetInnerHTML={{ __html: item.title }} />}
                    {item.abstract && <Text variant="paragraph30" dangerouslySetInnerHTML={{ __html: item.abstract }} />}
                    {item.description && <Text variant="paragraph40" dangerouslySetInnerHTML={{ __html: item.description }} />}
                  </Flex.Col>
                ))}
              </Flex>
            )}
          </Flex.Col>
        </Container>
      </Box>
    </TextColumnsContainer>
  );
};
