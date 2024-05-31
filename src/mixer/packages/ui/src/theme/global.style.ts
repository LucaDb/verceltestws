
import { createGlobalStyle } from 'styled-components';
import { CssVars } from './global.vars';
import { CssBase } from './styles/_base';
import { CssColors } from './styles/_colors';
import { CssDebug } from './styles/_debug';
import { CssLenis } from './styles/_lenis';
import { CssPrint } from './styles/_print';
import { CssReset } from './styles/_reset';
import { CssSwiper } from './styles/_swiper';
import { CssTypography } from './styles/_typography';
import { Wysiwyg } from './styles/_wysiwyg';
import { CssScrollbar } from './styles/mixins/_scrollbar';

export const GlobalStyle = createGlobalStyle`

  ${CssReset}
  ${CssVars}
  ${CssBase}
  ${CssTypography}
  ${CssScrollbar}
  ${CssPrint}
  ${CssDebug}
  ${CssLenis}
  ${CssColors}
  ${CssSwiper}
  ${Wysiwyg}

  main {
    min-height: 100vh;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
