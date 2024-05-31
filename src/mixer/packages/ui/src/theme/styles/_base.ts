import { css } from 'styled-components';

export const CssBase = css`
html,
body {
  background: #ffffff;
}

body {
  min-height: 100vh;
  min-height: -webkit-fill-available; /* mobile viewport bug fix */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  scroll-behavior: smooth;
  transition: all 0.45s ease;
}

::selection {
    background-color: var(--color-cyan-100);
  }

.negative {
  background: var(--color-neutral-900);
  color: var(--color-neutral-100);
}

.section {
  margin: 0 0 var(--spacer-md) 0;
  padding: 0;
}
`;
