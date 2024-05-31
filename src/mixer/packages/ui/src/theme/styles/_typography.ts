import { eachMedia } from '@websolutespa/bom-mixer-ui';
import { css } from 'styled-components';

export const CssTypography = css`
html,
body {
  font-family: var(--font-base-family, sans-serif);
  line-height: var(--font-base-line-height, 1.5);
  font-weight: var(--font-base-weight, normal);
  font-size: var(--font-base-size, 16px);
  ${props => typeof props.theme.fontBase.size === 'object' && eachMedia(props, (key: string) => `font-size: var(--font-base-size-${key});`)}
}

body {
  background: var(--color-neutral-100);
  color: var(--color-neutral-800);
}

/*
* {
  outline-offset: 0.2rem;
  &:focus-visible {
    outline: 2px solid var(--color-cyan-200);
  }
}
*/
`;
