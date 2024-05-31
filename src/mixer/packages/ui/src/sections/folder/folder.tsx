import { IFolder } from '@websolute/models';
import { getClassNames } from '@websolutespa/bom-core';
import { useLazyModules } from '@websolutespa/bom-mixer-hooks';
import { ILazyComponent, ILazyModules, ILazyableProps, getSeoWeight } from '@websolutespa/bom-mixer-models';
import { Box, Container, Flex, Grid, LAZY_MODULES, Skeleton, Text, UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import React from 'react';
import styled from 'styled-components';
import { Wrapper } from '../../components';
import { FolderCard } from './folder-card';

const FolderContainer = styled(Wrapper) <UIStyledComponentProps>`
  ${props => getCssResponsive(props)}
`;

export const Folder = ({ item, index = 0 }: ILazyableProps<IFolder>) => {
  const lazyModules = useLazyModules();
  const subModules = { ...LAZY_MODULES, ...lazyModules };

  const classNames = getClassNames('folder-1');

  const { colorScheme, anchor, topSpace, innerSpace, title, abstract, components } = item;

  const setTopSpace = !topSpace ? 'calc(var(--spacing-lg) * -1)' : 0;
  const setTopSpaceSm = !topSpace ? 'calc(var(--spacing-md) * -1)' : 0;
  const setInnerPadding = innerSpace ? 'var(--spacing-sm)' : 0;
  const setInnerPaddingSm = innerSpace ? 'var(--spacing-md)' : 0;

  const seoWeight = getSeoWeight(index, item.seoWeight);

  return (
    <FolderContainer className={classNames} colorScheme={colorScheme} anchor={anchor} marginTop={setTopSpace} marginTopSm={setTopSpaceSm}>
      <Box
        padding={`${setInnerPadding} 0`}
        paddingSm={`${setInnerPaddingSm} 0`}>
        <Container>
          {(title && abstract) && (
            <Grid.Row justifyContent="center" padding="var(--spacing-md) 0">
              <Grid gridColumnStart="2" gridColumnEnd="12" gridColumnStartSm="3" gridColumnEndSm="11">
                <Box textAlign="center">
                  {title && (
                    <Text variant="heading10" as={seoWeight()} variantSm="display50">{title}</Text>
                  )}
                  {abstract && (
                    <Text variant="paragraph30" variantSm="paragraph20" marginTop={title && 'var(--margin-xs)'} marginTopSm={title && 'var(--margin-md)'} dangerouslySetInnerHTML={{ __html: abstract }} />
                  )}
                </Box>
              </Grid>
            </Grid.Row>
          )}
          {components && components.length > 0 && (
            <Flex.Col height={`${components.length * 100}vh`} alignContent="center" flex="none" flexWrap="nowrap" rowGap="120px" justifyContent="flex-start" overflow="visible" position="relative" zIndex="1" padding={'var(--margin-md) 0'}>
              {components.map((component, i: number) => {
                const classNames = getClassNames(component.colorData.className, 'background');
                return (
                  <FolderCard key={i} top={`${50 * (i + 1)}px`} className={classNames}>
                    <React.Suspense fallback={<Skeleton minHeight="50vh" />}>
                      {lazyLoadComponent(component, subModules, index + i)}
                    </React.Suspense>
                  </FolderCard>
                );
              })}
            </Flex.Col>
          )}
        </Container>
      </Box>
    </FolderContainer>
  );
};

function lazyLoadComponent(component: ILazyComponent, modules: ILazyModules, index: number = 0): JSX.Element {
  const key = (component.schema || component.blockType) as keyof typeof modules;
  const Component = modules[key] || modules['not_found' as keyof typeof modules];
  return (<Component item={component} index={index} />);
}
