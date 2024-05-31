import { css } from 'styled-components';

export const CssText = css`
  .text {
    position: relative;
    overflow: hidden;
    transition: var(--transition-smooth);

    *[data-btn-text] {
      display: block;
      line-height: 1.5;
      transition: var(--transition-smooth);

      &:before {
        content: attr(data-btn-text);
        position: absolute;
        top: -30%;
        opacity: 0;
        transition: var(--transition-smooth);
      }
    }
  }

  &:hover {
    *[data-btn-text] {
      transform: translateY(100%);

      &:before {
        opacity: 1;
        top: -100%;
      }
    }
  }
`;
