import { IProjectMore, getProjectDetails } from '@websolute/models';
import { getClassNames } from '@websolutespa/bom-core';
import { ILazyFuncProps, ILazyableProps, withLazyProps } from '@websolutespa/bom-mixer-models';
import { Box, Container, Flex, UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import styled from 'styled-components';
import { CardMidSlider, Wrapper } from '../../components';


const ProjectMoreContainer = styled(Wrapper) <UIStyledComponentProps>`

  .swiper {
    overflow: initial;
  }

  ${props => getCssResponsive(props)}
`;

export const ProjectMore = ({ item, index = 0 }: ILazyableProps<IProjectMore>) => {
  const classNames = getClassNames('project-more');
  const { colorScheme, anchor, topSpace, innerSpace, title, items, navs } = item;

  const setTopSpace = !topSpace ? 'calc(var(--spacing-lg) * -1)' : 0;
  const setTopSpaceSm = !topSpace ? 'calc(var(--spacing-md) * -1)' : 0;
  const setInnerPadding = innerSpace ? 'var(--spacing-sm)' : 0;
  const setInnerPaddingSm = innerSpace ? 'var(--spacing-md)' : 0;

  return (
    <ProjectMoreContainer className={classNames} colorScheme={colorScheme} anchor={anchor} marginTop={setTopSpace} marginTopSm={setTopSpaceSm}>
      <Box
        padding={`${setInnerPadding} 0 0 0`}
        paddingSm={`${setInnerPaddingSm} 0 0 0`}
        overflow="hidden">
        {title && items && (
          <Container>
            <Flex.Col rowGap="60px" rowGapMd="150px" >
              <CardMidSlider title={title} items={items} navs={navs} />
            </Flex.Col>
          </Container>
        )}
      </Box>
    </ProjectMoreContainer>
  );
};

withLazyProps('project-more', async function ({ page, component, layout }: ILazyFuncProps<IProjectMore>) {
  if (component.items && component.items.length > 0) {
    return component;
  }
  const limit = component.quantity || 3;
  const items = await getProjectDetails({
    limit,
    where: {
      category: {
        equals: 'project_index',
      },
    },
    sort: '-date',
    market: layout.market,
    locale: layout.locale,
  });
  component.items = items.filter(item => item.title !== page.title);
  component.items = component.items.slice(0, Math.min(limit, items.length));
  return component;
});
