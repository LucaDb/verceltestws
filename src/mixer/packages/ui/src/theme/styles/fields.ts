import { css } from 'styled-components';

export const CssFieldNatural = css`
  display: inline;
  font-size: var(--font-heading20-size, 1rem);
  line-height: var(--font-heading20-line-height, 1);

  &.invalid {
    &:after {
      content: '*';
      display: inline-block;
      margin-left: 0.3em;
      opacity: 0.2;
    }

    &.touched {
      &:after {
        color: var(--form-error-color, inherit);
      }
    }
  }
`;

export const CssLabelNatural = css`
  display: inline;
  cursor: pointer;
  margin-right: 0.3em;
`;

export const CssFormControl = css`
  appearance: none;
  font-family: inherit;
  /*
  font-size: var(--form-control-font-size);
  font-weight: var(--form-control-font-weight);
  line-height: var(--form-control-line-height);
  border: var(--form-border);
  border-width: var(--form-border-width);
  border-color: var(--form-border-color);
  border-radius: var(--form-border-radius);
  outline: var(--form-outline);
  outline-offset: var(--form-outline-offset);
  background-color: var(--form-background-color);
  transition: var(--form-transition);
  */
  background-color: var(--form-background-color);
  color: var(--form-color);
  border-bottom: 1px solid rgba(25, 25, 25, 0.3);
  transition: var(--form-transition);

  &>svg {
    width: 1.5em;
    height: 1.5em;
  }

  &::placeholder {
    color: inherit;
    opacity: 0.2;
  }

  &.hidden {
    display: none;
  }

  &.disabled {
    background-color: var(--form-background-color-disabled);
    color: var(--form-color-disabled);
    cursor: not-allowed;
  }

  &:hover:not(.disabled) {
    border-color: var(--form-border-color-hover);
  }

  &:active:not(.disabled),
  &.active:not(.disabled) {
    outline-color: var(--form-outline-color-focus);
    border-color: var(--form-border-color-hover);

    .placeholder {
      opacity: 0.4;
    }
  }

  &:focus,
  &:focus-visible {
    outline-color: var(--form-outline-color-focus);

    &::placeholder {
      opacity: 0.4;
    }
  }

  &.focus {
    outline-color: var(--form-outline-color-focus);

    input::placeholder {
      opacity: 0.4;
    }
  }
`;

export const CssInputContainerNatural = css`
  ${CssFormControl}

  display: inline;
  cursor: pointer;
`;

export const CssInputReset = css`
  display: block;
  appearance: none;
  color: inherit;
  background-color: transparent;
  border: none;
  outline: none;
  min-width: 0;
  letter-spacing: inherit;
  font-feature-settings: inherit;

  &::placeholder {
    color: inherit;
    letter-spacing: inherit;
    font-feature-settings: inherit;
    opacity: 0.3;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    // -webkit-box-shadow: 0 0 0 30px white inset !important;
    transition: all 0s 50000s;
    text-decoration: underline;
  }
`;

export const CssInputNatural = css`
  ${CssInputReset}

  display: inline;
  width: auto;
  font-family: inherit;
  font-size: var(--font-heading20-size, 1rem);
  line-height: var(--font-heading20-line-height, 1);
  /*
  padding: var(--form-control-padding);
  font-size: var(--form-control-font-size);
  font-weight: var(--form-control-font-weight);
  line-height: var(--form-control-line-height);
  border-radius: var(--form-border-radius);
  */

  &::placeholder {
    opacity: 0.3;
  }
`;
