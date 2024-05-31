import { VariantOfType } from '@websolutespa/bom-mixer-ui';
import { css } from 'styled-components';

export const CssFieldErrorDefault = css`
  margin: var(--form-error-margin, 0);
  padding: var(--form-error-padding, 0);
  font-size: var(--form-error-font-size, 0.9rem);
  font-weight: var(--form-error-font-weight, 500);
  line-height: var(--form-error-line-height, 1.2);
  border: var(--form-error-border, none);
  background: var(--form-error-background-color, transparent);
  color: var(--form-error-color, inherit);
`;

export const fieldErrorVariants = {
  default: CssFieldErrorDefault,
};

export type IFieldErrorVariants = VariantOfType<typeof fieldErrorVariants>;
