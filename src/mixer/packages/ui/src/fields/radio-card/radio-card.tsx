
import { withSchema } from '@websolutespa/bom-core';
import { RadioCardAbstract, RadioCardBase, RadioCardComponent, RadioCardExtra, RadioCardMedia, RadioCardTitle } from './radio-card-base';
import { RadioCardGroup } from './radio-card-group';

export const RadioCard: RadioCardComponent & {
  Group: typeof RadioCardGroup;
  Title: typeof RadioCardTitle;
  Abstract: typeof RadioCardAbstract;
  Extra: typeof RadioCardExtra;
  Media: typeof RadioCardMedia;
} = withSchema(RadioCardBase, {
  Group: RadioCardGroup,
  Title: RadioCardTitle,
  Abstract: RadioCardAbstract,
  Extra: RadioCardExtra,
  Media: RadioCardMedia,
  displayName: 'RadioCard',
});
