import { IDetail } from '@websolute/models';
import { getClassNames } from '@websolutespa/bom-core';
import { ILazyableProps, getSeoWeight } from '@websolutespa/bom-mixer-models';
import { Box, Container, Flex, Grid, Text, UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import styled, { css } from 'styled-components';
import { Wrapper } from '../../components';

const DetailContainer = styled(Wrapper) <UIStyledComponentProps<{ bottomBorder: boolean }>>`
  position: relative;
  z-index: 1;

  ${props => (props.bottomBorder) && css`
    &:after {
      content: '';
      position: absolute;
      z-index: 2;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background: var(--color-neutral-400);
    }
  `}

  ul {
    li {
      display: flex;
      justify-content: flex-start;
      margin-bottom: var(--margin-md);

      .dots {
        width: auto;
        margin-top: 4px;
        margin-right: 8px;
        line-height: var(--font-paragraph20-line-height,1);

        svg {
          display: block;
          margin-bottom: 0.6em;
          line-height: 1;
        }
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  ${props => getCssResponsive(props)}
`;

export const Detail = ({ item, index = 0 }: ILazyableProps<IDetail>) => {
  const classNames = getClassNames('detail-1');

  const { colorScheme, anchor, topSpace, innerSpace, bottomBorder = false, title, abstract, list, swap } = item;

  const setTopSpace = !topSpace ? 'calc(var(--spacing-lg) * -1)' : 0;
  const setTopSpaceSm = !topSpace ? 'calc(var(--spacing-md) * -1)' : 0;
  const setInnerPadding = innerSpace ? 'var(--spacing-sm)' : 0;
  const setInnerPaddingSm = innerSpace ? 'var(--spacing-md)' : 0;

  const seoWeight = getSeoWeight(index, item.seoWeight);

  const renderList = (
    list?.items && <ul>
      {list?.items.map((listItem, i) => (
        <li key={i}>
          <Box className="dots">
            {[...Array(i + 1)].map((_, j) => (
              <svg
                key={j}
                width="27"
                height="27"
                viewBox="0 0 27 27"
                fill="none"
              >
                <rect x="0.5" y="0.435547" width="26" height="26" rx="13" fill="currentColor" />
              </svg>
            ))}
          </Box>
          <Text variant="paragraph20">{listItem.title}</Text></li>
      ))}
    </ul>
  );

  console.log('bottomBorder' , bottomBorder)

  return (
    <DetailContainer className={classNames} colorScheme={colorScheme} anchor={anchor} bottomBorder={bottomBorder ? bottomBorder : false} marginTop={setTopSpace} marginTopSm={setTopSpaceSm}>
      <Box
        paddingTop={setInnerPadding}
        paddingTopSm={setInnerPaddingSm}
        paddingBottom={bottomBorder ? 'var(--spacing-sm)' : 0}
        paddingBottomSm={bottomBorder ? 'var(--spacing-md)' : 0}>
        <Container>
          {!swap && (
            <Grid.Row>
              <Grid gridColumnStartSm="2" gridColumnEndSm="6" marginBottom="var(--margin-sm)" marginBottomSm="0">
                <Flex.Col rowGap="var(--margin-sm)">
                  {title && <Text as={seoWeight()} variant="heading10">{title}</Text>}
                  {abstract && <Text variant="display50" variantSm="heading20" dangerouslySetInnerHTML={{ __html: abstract }} />}
                </Flex.Col>
              </Grid>
              <Grid gridColumnStartSm="7" gridColumnEndSm="12">
                <Flex.Col rowGap="var(--margin-sm)">
                  {(list && list.title) && <Text variant="heading30">{list.title}</Text>}
                  {(list && list.abstract) && <Text variant="heading40" dangerouslySetInnerHTML={{ __html: list.abstract }} />}
                  {renderList}
                </Flex.Col>
              </Grid>
            </Grid.Row>
          )}
          {swap && (
            <Grid.Row>
              <Grid gridColumnStartSm="2" gridColumnEndSm="7" order="2" orderSm="1">
                {(list && list.title) && <Text variant="heading10">{list.title}</Text>}
                {(list && list.abstract) && <Text variant="heading10" dangerouslySetInnerHTML={{ __html: list.abstract }} />}
                {renderList}
              </Grid>
              <Grid gridColumnStartSm="8" gridColumnEndSm="12" marginBottom="var(--margin-sm)" marginBottomSm="0" order="1" orderSm="2">
                {title && <Text variant="heading10" as={seoWeight()} textAlign="left" textAlignSm="right">{title}</Text>}
                {abstract && <Text variant="display50" variantSm="heading20" textAlign="left" textAlignSm="right" dangerouslySetInnerHTML={{ __html: abstract }} />}
              </Grid>
            </Grid.Row>
          )}
        </Container>
      </Box>
    </DetailContainer>
  );
};
