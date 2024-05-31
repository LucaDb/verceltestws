import { IconArrowRight } from '@websolute/icons';
import { ITextList, ITextListItem, getTarget, isMenuHref } from '@websolute/models';
import { getClassNames } from '@websolutespa/bom-core';
import { ILazyableProps } from '@websolutespa/bom-mixer-models';
import { Box, Button, Container, Flex, Grid, Link, Text, UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { Wrapper } from '../../components';

const TextListContainer = styled(Wrapper) <UIStyledComponentProps>`
  
  .text-list-btn {
    position: relative;

    & > div {
      transition: var(--transition-smooth);
      padding-left: 0;
    }
    
    &:hover {
      & > div {
        background-color: var(--color-cyan-contrast-primary);
        padding-left: var(--margin-md);
      }
    }
  }

  ${props => getCssResponsive(props)}
`;

export const TextList = ({ item, index = 0 }: ILazyableProps<ITextList>) => {
  const classNames = getClassNames('text-list');

  const { colorScheme, anchor, topSpace, innerSpace, title, eyelet, abstract, description, items } = item;

  const setTopSpace = !topSpace ? 'calc(var(--spacing-lg) * -1)' : 0;
  const setTopSpaceSm = !topSpace ? 'calc(var(--spacing-md) * -1)' : 0;
  const setInnerPadding = innerSpace ? 'var(--spacing-md)' : 0;

  const switchLayout = (item: ITextListItem, x: number): ReactNode => {

    let layout: ReactNode;
    const navItem = item.navs && item.navs[0];
    const isButton = navItem && isMenuHref(navItem);

    const rowEl: ReactNode = (
      <Grid.Row key={x} flex="0 0 100%" padding="20px 0" alignItems="center" borderTop="1px solid var(--color-neutral-300)" borderBottom={items && (x === items.length - 1 ? '1px solid var(--color-neutral-300)' : '')}>
        <Grid sm={1}>
          {!item.abstract && <Text variant="label10">{`0${x + 1}`}</Text>}
          {item.abstract && <Text variant="paragraph50" dangerouslySetInnerHTML={{ __html: item.abstract }} />}
        </Grid>
        <Grid sm={5}>{item.title && <Text variant="heading30" dangerouslySetInnerHTML={{ __html: item.title }} />}</Grid>
        <Grid sm={6}>{item.description && <Text variant="paragraph30" dangerouslySetInnerHTML={{ __html: item.description }} />}</Grid>
        {isButton && <Flex.Row alignItems="center" position="absolute" right="var(--margin-md)" top="50%" transform="translateY(-50%)"><Text variant="Label20">{navItem.title as string}</Text><IconArrowRight /></Flex.Row>}
      </Grid.Row>
    );

    if (isButton) {
      layout = (
        <Link key={x} href={navItem.href || '/'}>
          <Button as="a" className="text-list-btn" target={getTarget(navItem)}>
            {rowEl}
          </Button>
        </Link>
      );
    } else {
      layout = rowEl;
    }
    return layout;
  };

  return (
    <TextListContainer className={classNames} colorScheme={colorScheme} anchor={anchor} marginTop={setTopSpace} marginTopSm={setTopSpaceSm}>
      <Box padding={`${setInnerPadding} 0`}>
        <Container>
          <Flex.Col gap="var(--margin-sm)">
            <Grid.Row>
              <Grid sm={10} gap="var(--margin-sm)" gapSm="var(--margin-md)">
                <Flex.Col rowGap="var(--margin-xxs)" rowGapSm="var(--margin-xs)">
                  {eyelet && <Text variant="paragraph40">{eyelet}</Text>}
                  {title && <Text variant="heading20" variantSm="heading10" dangerouslySetInnerHTML={{ __html: title }} />}
                  {abstract && <Text variant="heading40" dangerouslySetInnerHTML={{ __html: abstract }} />}
                  {description && <Text variant="paragraph50" variantSm="paragraph40" dangerouslySetInnerHTML={{ __html: description }} />}
                </Flex.Col>
              </Grid>
            </Grid.Row>
            {items && (
              <Flex.Col gap="0">
                {items.map((item, x) => {
                  return switchLayout(item, x);
                })}
              </Flex.Col>
            )}
          </Flex.Col>
        </Container>
      </Box>
    </TextListContainer>
  );
};
