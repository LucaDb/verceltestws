import { css } from 'styled-components';

export const CssSvg = css`
  svg {
    width: 1em;
    height: 1em;
    margin: 0 0.6em;
    transition: transform ease-in-out 200ms;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }
  &:hover,
  &.active {
    svg {
      transform: scale(1.1);
    }
  }
`;
