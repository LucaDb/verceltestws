import { IFolderHive } from '@websolute/models';
import { ILazyableProps } from '@websolutespa/bom-mixer-models';
import { Box, Grid, Text } from '@websolutespa/bom-mixer-ui';
import styled from 'styled-components';
import { Hive } from '../../components';

const StyledContainer = styled.div`
  color: var(--color-neutral-800);
`;

export const FolderHive = ({ item, index }: ILazyableProps<IFolderHive>) => {

  const { title, abstract, items } = item;

  return (
    <StyledContainer>
      <Grid.Row gap="var(--margin-md)" alignItems="center">
        <Grid sm={7} md={5} gridColumnEndSm="7" gridColumnEndMd="7">
          <Box padding="var(--spacing-xs)"><Hive items={items} /></Box>
        </Grid>
        <Grid sm={6} md={4} gridColumnEndSm="13" gridColumnEndMd="12">
          {title && (
            <Text variant="heading10" variantSm="heading20" marginBottom={abstract && 'var(--spacing-xs)'}>{title}</Text>
          )}
          {abstract && (
            <Text variant="paragraph30" dangerouslySetInnerHTML={{ __html: abstract }} />
          )}
        </Grid>
      </Grid.Row>
    </StyledContainer>
  );
};
