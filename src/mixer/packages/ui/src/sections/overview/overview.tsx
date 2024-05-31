import { IOverview, IOverviewTabItem, IOverviewTabListItem, getTarget, isMenuHref } from '@websolute/models';
import { getClassNames } from '@websolutespa/bom-core';
import { ILazyableProps } from '@websolutespa/bom-mixer-models';
import { Button, Container, Flex, Grid, Link, Media, Text, UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Tabs, Wrapper } from '../../components';

const OverviewContainer = styled(Wrapper) <UIStyledComponentProps>`

  .button {
    padding: 0;
  }

  .line {
    justify-content: flex-start;
  }

  .companies {
    img {
      width: auto;
    }
  }

  ${props => getCssResponsive(props)}
`;

export const Overview = ({ item, index = 0 }: ILazyableProps<IOverview>) => {
  const { colorScheme, anchor, items } = item;
  const classNames = getClassNames('overview-1');

  const tabItemsNode = (item: IOverviewTabItem): ReactNode => {
    return (
      <React.Fragment>
        {item.title && <Text variant="heading40">{item.title}</Text>}
        {(item.role && item.role.title) && <Text variant="heading40">{item.role.title}</Text>}
        {item.abstract && <Text variant="paragraph50" textTransform="uppercase" dangerouslySetInnerHTML={{ __html: item.abstract }} />}
        {item.items && item.items.map((tabListItem, x) => {
          return switchLayout(tabListItem, x);
        })}
      </React.Fragment>
    );
  }

  const switchLayout = (tabListItem: IOverviewTabListItem, x: number): ReactNode => {
    let layout: ReactNode;
    const nav = tabListItem.navs && tabListItem.navs[0];
    if (!nav) {
      let itemTitle = tabListItem.member && tabListItem.member.fullName ? tabListItem.member.fullName : tabListItem.title;
      layout = <Text key={x} variant="heading40" color="var(--color-neutral-400)">{itemTitle}</Text>;
    } else {
      layout = isMenuHref(nav) &&
        <Link key={x} href={nav.href || '/' as string}>
          <Button as="a" variant="line" className="_switch _neutral400" target={getTarget(nav)}>
            {(nav.title) && <Text variant="heading40">{nav.title as string}</Text>}
          </Button>
        </Link>;
    }
    return layout;
  };

  return (
    <OverviewContainer className={classNames} colorScheme={colorScheme} anchor={anchor}>
      <Container>
        <Tabs initialValue="1" leftSpace="0">
          {items && items.map((tab, index) => {
            const hasCompanies = tab.companies;
            const hasContributors = tab.partners;
            const companyTitle = hasCompanies ? tab.companies : [];
            const companiesItems = hasCompanies ? companyTitle && tab.companies : [];
            return <Tabs.Item label={tab.title} value={`${index + 1}`} key={index} >
              <Flex.Row alignItems="flex-start" marginTop="var(--margin-sm)" flexWrap="wrap" flexWrapSm="nowrap" marginTopSm="var(--margin-lg)" gap="var(--grid-default-column-gap-xs)" gapSm="var(--grid-default-column-gap-sm)">
                {hasCompanies && (
                  <Flex.Col flex="0 0 100%" flexSm="0 0 20%" gap="15px" className="companies">
                    {companiesItems && companiesItems.map((company, z) => {
                      const currentAnchor = company && company.navs && company.navs[0];
                      const isAnchor = currentAnchor && isMenuHref(currentAnchor);
                      const mediaItem = <Media item={company.media} height="30px" alignItems="flex-start" />;
                      if (!isAnchor) return mediaItem;
                      return (
                        <Link key={z} href={currentAnchor.href || '/'} >
                          <Button as="a" display="block" textAlign="center" target={getTarget(currentAnchor)}>
                            {mediaItem}
                          </Button>
                        </Link>
                      );
                    })}
                  </Flex.Col>
                )}
                <Grid.Row flex="100%" rowGap="var(--margin-sm)" rowGapSm="var(--margin-md)" >
                  {tab.items && tab.items.map((tabItem, i) => {
                    const gridCols = tab.items.length <= 4 ? 3 : hasCompanies ? 6 : 4;
                    return (
                      <Grid xs={6} sm={gridCols} key={i}>
                        {tabItemsNode(tabItem)}
                      </Grid>
                    );
                  })}
                </Grid.Row>
                {hasContributors && (
                  <Flex.Col flex="0 0 100%" flexSm="0 0 20%" gap="var(--margin-sm)" gapSm="var(--margin-md)" className="partners">
                    {tab.partners && tab.partners.map((partner, i) => (
                      <Flex.Col key={i}>
                        {tabItemsNode(partner)}
                      </Flex.Col>
                    ))}
                  </Flex.Col>
                )}
              </Flex.Row>
            </Tabs.Item>;
          })}
        </Tabs>
      </Container>
    </OverviewContainer>
  );
};
