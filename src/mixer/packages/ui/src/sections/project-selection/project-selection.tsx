import { IComponent, IProjectDetail } from '@websolute/models';
import { getClassNames } from '@websolutespa/bom-core';
import { useExtra } from '@websolutespa/bom-mixer-hooks';
import { ILazyableProps } from '@websolutespa/bom-mixer-models';
import { Container, Grid } from '@websolutespa/bom-mixer-ui';
import { useMemo } from 'react';
import styled from 'styled-components';
import { BlogCardSelected } from '../../components/blog-card/blog-card-selected';

export type IProjectSelection = IComponent & {
};

const StyledWrapper = styled.section`
`;

export const ProjectSelection = ({ item, index = 0 }: ILazyableProps<IProjectSelection>) => {

  const { projects } = useExtra() as { projects?: IProjectDetail[] };

  const filteredItems = useMemo(() => {
    return (projects || []).filter(x => x.selection);
  }, [projects]);

  const classNames = getClassNames('project-selection');

  return (
    <StyledWrapper className={classNames}>
      <Container marginTop="45px" marginTopSm="90px" marginTopMd="150px">
        <Grid.Row rowGap="45px" rowGapSm="90px" rowGapMd="150px">
          {filteredItems.map((item, i) => (
            <Grid key={i} md={i % 2 ? 6 : 8} gridColumnEndMd={i % 2 ? 7 : 13}>
              <BlogCardSelected item={item} />
            </Grid>
          ))}
          {/*hasMore &&
            <Grid>
              <InfiniteLoader onMore={onMore}>more</InfiniteLoader>
            </Grid>
          */}
        </Grid.Row>
      </Container>
    </StyledWrapper>
  );
};

