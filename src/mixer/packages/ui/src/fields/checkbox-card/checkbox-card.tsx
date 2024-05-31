
import { withSchema } from '@websolutespa/bom-core';
import { CheckboxCardAbstract, CheckboxCardBase, CheckboxCardComponent, CheckboxCardExtra, CheckboxCardMedia, CheckboxCardTitle } from './checkbox-card-base';
import { CheckboxCardGroup } from './checkbox-card-group';

export const CheckboxCard: CheckboxCardComponent & {
  Group: typeof CheckboxCardGroup;
  Title: typeof CheckboxCardTitle;
  Abstract: typeof CheckboxCardAbstract;
  Extra: typeof CheckboxCardExtra;
  Media: typeof CheckboxCardMedia;
} = withSchema(CheckboxCardBase, {
  Group: CheckboxCardGroup,
  Title: CheckboxCardTitle,
  Abstract: CheckboxCardAbstract,
  Extra: CheckboxCardExtra,
  Media: CheckboxCardMedia,
  displayName: 'CheckboxCard',
});

