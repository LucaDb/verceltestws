import { mediaUp } from '@websolutespa/bom-mixer-ui';
import { css } from 'styled-components';

export const Wysiwyg = css`
  .wysiwyg {

    .text {
      display: flex;
      flex-direction: column;
      gap: var(--margin-sm);
    }

    p, p:not(:last-child) {
      margin: 0;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 0;
      padding: 0;
    }

    h1 {
      font-size: var(--font-display60-size);
      line-height: var(--font-display60-line-height);
    }

    h2 {
      font-size: var(--font-heading10-size);
      line-height: var(--font-heading10-line-height);
    }

    h3 {
      font-size: var(--font-heading20-size);
      line-height: var(--font-heading20-line-height);
    }

    h4 {
      font-size: var(--font-heading30-size);
      line-height: var(--font-heading30-line-height);
    }

    h5 {
      font-size: var(--font-heading40-size);
      line-height: var(--font-heading40-line-height);
    }

    h6 {
      font-size: var(--font-paragraph10-size);
      line-height: var(--font-paragraph10-line-height);
    }

    ul,
    ol {
      padding: 0 0 0 1.1em;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;

      ${props => mediaUp(props, 'sm', css`
        gap: var(--margin-xs);
      `)}

      li {
        padding: 0;

        ul,
        ol {
          margin-top: 10px;
        }
      }
    }

    ul {
      list-style: disc;
    }

    ol {
      list-style: decimal;
    }

    blockquote {
      position: relative;
      z-index: 1;
      font-size: var(--font-heading20-size);
      line-height:var(--font-heading20-line-height);
      padding-left: var(--margin-sm);

      ${props => mediaUp(props, 'sm', css`
        font-size: var(--font-heading40-size);
        line-height:var(--font-heading40-line-height);
        padding-left: var(--margin-md);
      `)}

      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 100%;
        background: var(--color-neutral-800);
      }
    }

    a {
      background:
      linear-gradient(to right, transparent, transparent),
      linear-gradient(to right, currentColor, currentColor);
      background-size: 0 0.1em, 100% 0.1em;
      background-position: 100% 100%, 0 100%;
      background-repeat: no-repeat;
      transition: var(--transition-smooth);
      display: inline;

      &:hover,
      &:focus {
        background-size: 100% 0.1em, 0 0.1em;
      }
    }
  }
`;
