import { IMore } from '@websolute/models';
import { getClassNames } from '@websolutespa/bom-core';
import { ILazyableProps, getSeoWeight } from '@websolutespa/bom-mixer-models';
import { Box, Container, Flex, Grid, Text, UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import styled from 'styled-components';
import { Wrapper } from '../../components';

const MoreContainer = styled(Wrapper) <UIStyledComponentProps>`
  ${props => getCssResponsive(props)}
`;

export const More = ({ item, index = 0 }: ILazyableProps<IMore>) => {
  const classNames = getClassNames('more-1');

  const { colorScheme, anchor, topSpace, innerSpace, title, abstract, description } = item;

  const setTopSpace = !topSpace ? 'calc(var(--spacing-lg) * -1)' : 0;
  const setTopSpaceSm = !topSpace ? 'calc(var(--spacing-md) * -1)' : 0;
  const setInnerPadding = innerSpace ? 'var(--spacing-sm)' : 0;
  const setInnerPaddingSm = innerSpace ? 'var(--spacing-md)' : 0;

  const seoWeight = getSeoWeight(index, item.seoWeight);

  return (
    <MoreContainer className={classNames} colorScheme={colorScheme} anchor={anchor} marginTop={setTopSpace} marginTopSm={setTopSpaceSm}>
      <Box
        padding={`${setInnerPadding} 0`}
        paddingSm={`${setInnerPaddingSm} 0`}>
        <Container>
          <Grid.Row>
            <Grid sm={8} gridColumnEndSm="13">
              <Flex.Col gap="var(--spacing-xs)">
                {title && <Text variant="heading10">{title}</Text>}
                {abstract && <Text variant="heading20" dangerouslySetInnerHTML={{ __html: abstract }} />}
                {description && <Text variant="heading30" as={seoWeight()} dangerouslySetInnerHTML={{ __html: description }} />}
              </Flex.Col>
            </Grid>
          </Grid.Row>
        </Container>
      </Box>
    </MoreContainer>
  );
};
