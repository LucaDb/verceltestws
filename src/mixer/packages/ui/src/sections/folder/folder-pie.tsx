import { IFolderPie } from '@websolute/models';
import { ILazyableProps } from '@websolutespa/bom-mixer-models';
import { Box, Grid, Text } from '@websolutespa/bom-mixer-ui';
import styled from 'styled-components';
import { PieChart } from '../../components';

const StyledContainer = styled.div`
  color: var(--color-neutral-800);
`;

export const FolderPie = ({ item, index }: ILazyableProps<IFolderPie>) => {

  const { title, abstract, items, colorData } = item;
  const colorClass = `var(--color-${colorData.className}-contrast-primary)`;

  return (
    <StyledContainer>
      <Grid.Row gap="var(--margin-md)" alignItems="center">
        <Grid sm={7} md={5} gridColumnEndSm="7" gridColumnEndMd="7">
          <Box padding="var(--spacing-xs)" color={colorClass}><PieChart items={items} /></Box>
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
