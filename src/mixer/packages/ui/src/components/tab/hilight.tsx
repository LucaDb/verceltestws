import { getClassNames } from '@websolutespa/bom-core';
import { CSSProperties } from 'react';
import styled from 'styled-components';

export type HilightProps = {
  active?: boolean;
  left: number;
  width: number;
};

export const HilightDefault: HilightProps = {
  active: false,
  left: 0,
  width: 100,
};

const StyledHilight = styled.div`
  --hilight-left: 0;
  --hilight-width: 0;
  position: absolute;
  left: var(--hilight-left);
  width: var(--hilight-width);
  height: 30px;
  border-radius: 15px;
  background: white;
  mix-blend-mode: difference;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease-in-out;

  &.active {
    opacity: 1;
  }
`;

export const Hilight = (props: HilightProps = HilightDefault) => {
  const { active, left, width } = props;
  const classNames = getClassNames('hilight', { active });
  return (
    <StyledHilight className={classNames} style={{
      '--hilight-left': `${left}px`,
      '--hilight-width': `${width}px`,
    } as CSSProperties} />
  );
};
