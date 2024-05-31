import { ICallout } from '@websolute/models';
import { getClassNames } from '@websolutespa/bom-core';
import { ILazyableProps, getSeoWeight } from '@websolutespa/bom-mixer-models';
import { Box, Container, Flex, Grid, Text, UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import styled from 'styled-components';
import { Banner, Cta, Wrapper } from '../../components';

const CalloutContainer = styled(Wrapper) <UIStyledComponentProps>`
  ${props => getCssResponsive(props)}
`;

export const Callout = ({ item, index = 0 }: ILazyableProps<ICallout>) => {
  const classNames = getClassNames('callout');

  const { colorScheme, anchor, topSpace, innerSpace, swap = false, title, abstract, description, navs, banner } = item;

  const setTopSpace = !topSpace ? 'calc(var(--spacing-lg) * -1)' : 0;
  const setTopSpaceSm = !topSpace ? 'calc(var(--spacing-md) * -1)' : 0;
  const setInnerPadding = innerSpace ? 'var(--spacing-sm)' : 0;
  const setInnerPaddingSm = innerSpace ? 'var(--spacing-md)' : 0;

  const seoWeight = getSeoWeight(index, item.seoWeight);

  return (
    <CalloutContainer className={classNames} colorScheme={colorScheme} anchor={anchor} marginTop={setTopSpace} marginTopSm={setTopSpaceSm}>
      <Box
        paddingTop={setInnerPadding}
        paddingTopSm={setInnerPaddingSm}>
        <Container>
          <Grid.Row alignItems="center" rowGap="var(--margin-sm)">
            <Grid sm={6} order={swap ? 1 : 0}>
              <Flex.Col rowGap="var(--margin-xs)" rowGapSm="var(--margin-sm)" padding="0" paddingMd={swap ? '0 0 0 var(--spacing-md)' : '0 var(--spacing-md) 0 0'}>
                {title && <Text as={seoWeight()} variant="heading20">{title}</Text>}
                {abstract && <Text variant="heading10" variantSm="heading30" className="wysiwyg" dangerouslySetInnerHTML={{ __html: abstract }} />}
                {description && <Text variant="paragraph30" className="wysiwyg" dangerouslySetInnerHTML={{ __html: description }} />}
                {navs && navs.map((element, index) => <Cta key={index} item={element} variant={'line'} />)}
              </Flex.Col>
            </Grid>
            <Grid sm={6} order={swap ? 0 : 1}>
              {banner && <Banner item={banner} />}
            </Grid>
          </Grid.Row>
        </Container>
      </Box>
    </CalloutContainer>
  );
};
