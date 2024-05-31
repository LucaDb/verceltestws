import { css } from 'styled-components';

export const CssLenis = css`
  html.lenis, html.lenis body {
    height: auto;
  }

  .lenis.lenis-smooth {
    scroll-behavior: auto !important;
  }

  .lenis.lenis-smooth [data-lenis-prevent] {
    overscroll-behavior: contain;
  }

  .lenis.lenis-stopped {
    overflow: hidden;
    margin-right: 8px;
  }

  .lenis.lenis-scrolling iframe {
    pointer-events: none;
  }
`;
