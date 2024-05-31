import { IPartial } from '@websolutespa/bom-core';
import { CssActive, CssDisabled, CssFocus, CssResponsive, IVariants } from '@websolutespa/bom-mixer-ui';
import { css } from 'styled-components';
import { CssSvg } from './styles/button-svg';
import { CssText } from './styles/button-text';
import { CssFieldNatural, CssInputContainerNatural, CssInputNatural, CssLabelNatural } from './styles/fields';

export const uiVariants: IPartial<IVariants> = {
  button: {
    primary: css`
      border: 0;
      padding: 16px 37px 18px 37px;
      border-radius: var(--button-border-radius);
      background: var(--color-cyan-500);
      color: var(--color-neutral-800);
      font-size: var(--font-label10-size);
      line-height: var(--font-label10-lineHeight);

      ${CssText}
      ${CssSvg}
      ${CssFocus}
      ${CssActive}
      ${CssDisabled}
      ${CssResponsive}
    `,
    primaryInline: css`
      border: 0;
      color: inherit;

      ${CssText}
      ${CssSvg}
      ${CssResponsive}

      &:disabled,
      &.disabled {
        pointer-events: none;
        opacity: 0.5;
      }
    `,
    line: css`
      display: flex;
      transition: var(--transition-smooth);

     .text {
        background:
        linear-gradient(to right, transparent, transparent),
        linear-gradient(to right, var(--color-neutral-800), var(--color-neutral-800));
        background-size: 100% 0.05em, 0 0.05em;
        background-position: 100% 100%, 0 100%;
        background-repeat: no-repeat;
        transition: var(--transition-smooth);
        display: inline;

        &:hover,
        &:focus {
          background-size: 0 0.05em, 100% 0.05em;
        }
     }

     &._switch {
      .text {
        background-size: 0 0.05em, 100% 0.05em;

        &:hover,
        &:focus {
          background-size: 100% 0.05em, 0 0.05em;
        }
      }
     }

      &._active {
        color: var(--color-neutral-100);
        background: var(--color-neutral-800);
        padding: 11px 15px;
        border-radius: 5px;

        .text {
          color: var(--color-neutral-100);
          background-size: 0 0.1em, 100% 0.1em;
        }
      }

      svg {
        margin-right: var(--margin-xs);

        &:first-child {
          margin-right: var(--margin-xs);
        }
      }

      &._light {
        .text {
          color: var(--color-neutral-100);
          background: linear-gradient(to right,transparent,transparent), linear-gradient(to right,var(--color-neutral-100),var(--color-neutral-100));
          background-size: 100% 0.1em, 0 0.1em;
          background-position: 100% 100%, 0 100%;
          background-repeat: no-repeat;

          &:hover,
          &:focus {
            background-size: 0 0.1em, 100% 0.1em;
          }

          svg {
            fill: var(--color-neutral-100);
          }
        }

        &._switch {
          .text {
            background-size: 0 0.05em, 100% 0.05em;

            &:hover,
            &:focus {
              background-size: 100% 0.05em, 0 0.05em;
            }
          }
        }

        &._active {
          color: var(--color-neutral-800);
          background: var(--color-neutral-100);

          .text {
            color: var(--color-neutral-800);
          }

          svg {
            fill: var(--color-neutral-800);
          }
        }
      }


     &._neutral400 {
        color: var(--color-neutral-400);

        .text {
          background:
            linear-gradient(to right, transparent, transparent),
            linear-gradient(to right, var(--color-neutral-400), var(--color-neutral-400));
          background-size: 100% 0.05em, 0 0.05em;
          background-position: 100% 100%, 0 100%;
          background-repeat: no-repeat;
        }

        &._switch {
          .text {
            background-size: 0 0.05em, 100% 0.05em;

            &:hover,
            &:focus {
              background-size: 100% 0.05em, 0 0.05em;
            }
          }
        }
     }

      ${CssSvg}
      ${CssDisabled}
      ${CssResponsive}
    `,
    underline: css`
      display: flex;
      transition: var(--transition-smooth);

      .text {
          background:
          linear-gradient(to right, transparent, transparent),
          linear-gradient(to right, var(--color-neutral-100), var(--color-neutral-100));
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

      svg {
        margin-right: var(--margin-xs);

        &:first-child {
          margin-right: var(--margin-xs);
        }
      }

      &._light {
        > .text {
          color: var(--color-neutral-100);
          background: linear-gradient(to right,transparent,transparent), linear-gradient(to right,var(--color-neutral-100),var(--color-neutral-100));
          background-size: 0 0.1em,100% 0.1em;
          background-position: 100% 100%,0 100%;
          background-repeat: no-repeat;

          &:hover,
          &:focus {
            background-size: 100% 0.1em, 0 0.1em;
          }
        }
      }

      ${CssSvg}
      ${CssDisabled}
      ${CssResponsive}
    `,
    filter: css`
      border: 0;
      color: inherit;

      ${CssText}
      ${CssSvg}
      ${CssResponsive}

      opacity: 0.5;
      &:hover,
      &:active,
      &.active {
        opacity: 1;
      }
      &:disabled,
      &.disabled {
        pointer-events: none;
        opacity: 0.1;
      }
      transition: opacity ease-in-out 200ms;
    `,
    tag: css`
      color: inherit;
      padding: 9px 15px 9px 9px;
      border-radius: 30px;
      border: 1px solid currentColor;
      display: inline-flex;
      gap: 15px;

      svg {
        width: 38px;
        height: 38px;
        background: black;
        color: white;
        padding: 14px;
        border-radius: 19px;
        transition: transform ease-in-out 200ms;
      }

      &:hover,
      &.active {
        svg {
          transform: scale(1.1);
        }
      }

      ${CssText}
      ${CssDisabled}
      ${CssResponsive}
    `,
    tab: css`
      display: inline-flex;
      gap: 15px;
      padding: 16px 0;
      color: inherit;
      border-bottom: 2px solid transparent;
      transition: border ease-in-out 200ms;

      svg {
        width: 24px;
        height: 24px;
        transition: transform ease-in-out 200ms;
      }

      &:hover,
      &.active {
        border-color: currentColor;

        svg {
          transform: scale(1.1);
        }
      }

      ${CssDisabled}
    `,
  },
  field: {
    natural: CssFieldNatural,
  },
  label: {
    natural: CssLabelNatural,
  },
  input: {
    natural: {
      input: CssInputNatural,
      container: CssInputContainerNatural,
    },
  },
};
