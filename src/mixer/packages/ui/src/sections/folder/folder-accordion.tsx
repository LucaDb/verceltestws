import { IFolderAccordion } from '@websolute/models';
import { ILazyableProps } from '@websolutespa/bom-mixer-models';
import { Box, Flex, Grid, Text } from '@websolutespa/bom-mixer-ui';
import { TextTabsPanel } from '../text-tabs/text-tabs-panel';

export const FolderAccordion = ({ item, index }: ILazyableProps<IFolderAccordion>) => {

  const { title, abstract, items } = item;

  return (
    <Box position="relative" zIndex="1" padding="0 var(--spacing-sm)" paddingSm="0">
      <Grid.Row alignItems="center">
        <Grid sm={7} md={5} gridColumnEndSm="7" gridColumnEndMd="7" >
          {items && items.length > 0 && (
            <Flex.Col rowGap="var(--margin-sm)">
              {items.map((item, index) => (
                <TextTabsPanel key={index} item={item} index={index} />
              ))}
            </Flex.Col>
          )}
        </Grid>
        <Grid sm={6} md={4} gridColumnEndSm="13" gridColumnEndMd="12" marginTop="var(--margin-sm)" marginTopSm="0">
          {title && (
            <Text variant="heading10" variantSm="heading20" marginBottom={abstract && 'var(--spacing-xs)'}>{title}</Text>
          )}
          {abstract && (
            <Text variant="paragraph30" marginTop={title && 'var(--margin-xs)'} dangerouslySetInnerHTML={{ __html: abstract }} />
          )}
        </Grid>
      </Grid.Row>
    </Box>
  );
};
