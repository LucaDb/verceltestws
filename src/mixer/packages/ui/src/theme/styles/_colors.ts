import { css } from 'styled-components';

export const CssColors = css`

  //DARK
  .dark {
    background: var(--color-neutral-800);
    color: var(--color-neutral-100);

    .background {
      &.cyan { background: var(--color-cyan-contrast-primary) }
      &.green { background: var(--color-green-contrast-primary) }
      &.yellow { background: var(--color-yellow-contrast-primary) }
      &.orange { background: var(--color-orange-contrast-primary) }
      &.red { background: var(--color-red-contrast-primary) }
      &.purple { background: var(--color-purple-contrast-primary) }
      &.blue-violet { background: var(--color-blue-violet-contrast-primary) }
      &.black { background: var(--color-neutral-800) }
    }

    .foreground {
      &.cyan { color: var(--color-cyan-contrast-primary) }
      &.green { color: var(--color-green-contrast-primary) }
      &.yellow { color: var(--color-yellow-contrast-primary) }
      &.orange { color: var(--color-orange-contrast-primary) }
      &.red { color: var(--color-red-contrast-primary) }
      &.purple { color: var(--color-purple-contrast-primary) }
      &.blue-violet { color: var(--color-blue-violet-contrast-primary) }
      &.black { color: var(--color-neutral-800) }
    }

    //
    .invert {
      background: var(--color-neutral-100);
      color: var(--color-neutral-800);
    }
  }

  //LIGHT
  .light {
    background: var(--color-neutral-100);
    color: var(--color-neutral-800);

    .background {
      &.cyan { background: var(--color-cyan-contrast-primary) }
      &.green { background: var(--color-green-contrast-primary) }
      &.yellow { background: var(--color-yellow-contrast-primary) }
      &.orange { background: var(--color-orange-contrast-primary) }
      &.red { background: var(--color-red-contrast-primary) }
      &.purple { background: var(--color-purple-contrast-primary) }
      &.blue-violet { background: var(--color-blue-violet-contrast-primary) }
      &.black { background: var(--color-neutral-800) }
    }

    .foreground {
      &.cyan { color: var(--color-cyan-contrast-secondary) }
      &.green { color: var(--color-green-contrast-secondary) }
      &.yellow { color: var(--color-yellow-contrast-secondary) }
      &.orange { color: var(--color-orange-contrast-secondary) }
      &.red { color: var(--color-red-contrast-secondary) }
      &.purple { color: var(--color-purple-contrast-secondary) }
      &.blue-violet { color: var(--color-blue-violet-contrast-secondary) }
      &.black { color: var(--color-neutral-800) }
    }

    //
    .invert {
      background: var(--color-neutral-800);
      color: var(--color-neutral-100);
    }
  }

  //GREY
  .grey {
    background: var(--color-neutral-200);
    color: var(--color-neutral-800);

    .background {
      &.cyan { background: var(--color-cyan-contrast-primary) }
      &.green { background: var(--color-green-contrast-primary) }
      &.yellow { background: var(--color-yellow-contrast-primary) }
      &.orange { background: var(--color-orange-contrast-primary) }
      &.red { background: var(--color-red-contrast-primary) }
      &.purple { background: var(--color-purple-contrast-primary) }
      &.blue-violet { background: var(--color-blue-violet-contrast-primary) }
      &.black { background: var(--color-neutral-800) }
    }

    .foreground {
      &.cyan { color: var(--color-cyan-contrast-secondary) }
      &.green { color: var(--color-green-contrast-secondary) }
      &.yellow { color: var(--color-yellow-contrast-secondary) }
      &.orange { color: var(--color-orange-contrast-secondary) }
      &.red { color: var(--color-red-contrast-secondary) }
      &.purple { color: var(--color-purple-contrast-secondary) }
      &.blue-violet { color: var(--color-blue-violet-contrast-secondary) }
      &.black { color: var(--color-neutral-800) }
    }

    .invert {
      background: var(--color-neutral-800);
      color: var(--color-neutral-100);
    }
  }
`;
