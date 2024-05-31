import { getClassNames } from '@websolutespa/bom-core';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { useMenu } from '../../hooks';

export type MenuToggleItemProps = {
  direction: 'left' | 'right';
  children?: ReactNode;
};

const StyledWrapper = styled.div`
  user-select: none;

  &.left {
    opacity: 1;
    .menu-toggle-item__outer {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      clip-path: inset(0 50% 0 0);
      transform: translateX(-50px) translateY(-50%);
    }

    .menu-toggle-item__inner {
      padding-right: 40px;
    }
  }

  &.right {
    opacity: 1;
    .menu-toggle-item__outer {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      clip-path: inset(0 0 0 50%);
      transform: translateX(calc(-100% + 126px)) translateY(-50%);
    }

    .menu-toggle-item__inner {
      padding-left: 40px;

      .text {
        order: 1;
      }

      svg {
        order: 2;
      }
    }
  }

  &.hidden {
    &.left,
    &.right {
      opacity: 0;
    }
  }

  *:hover > & {
    &:not(.hidden) {
      &.left {
        .menu-toggle-item__outer {
          transform: translateX(calc(-100% + 35px)) translateY(-50%);
          clip-path: inset(0 0 0 0);
        }
      }

      &.right {
        .menu-toggle-item__outer {
          transform: translateX(40px) translateY(-50%);
          clip-path: inset(0 0 0 0);
        }
      }
    }
  }
`;

const StyledOuter = styled.div`
  position: absolute;
  z-index: 0;
  top: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 27px;
  background: var(--color-neutral-200);
  color: var(--color-neutral-900);
  padding: 10px;
  cursor: pointer;
  transition: var(--transition-smooth);
`;

const StyledInner = styled.div`
  position: relative;
  overflow: hidden;
  padding: 6px 12px;
  border-radius: 20px;
  background: var(--color-neutral-100);
  transition: var(--transition-smooth);
  
  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 8px;
  }

  svg {
    width: 20px;
    height: 20px;
    margin: 0;
  }
`;

const StyledWrapper_ = styled.div`
  user-select: none;

  &.left {
    .menu-toggle-item__outer {
      border-right: 0;
      border-top-left-radius: 100px;
      border-bottom-left-radius: 100px;
      right: 50%;
      padding: 0 40px 0 0px;
    }

    .menu-toggle-item__inner {
      .text {
        left: 34px;
      }

      svg {
        left: 9px;
      }
    }
  }

  &.right {
    .menu-toggle-item__outer {
      border-left: 0;
      border-top-right-radius: 100px;
      border-bottom-right-radius: 100px;
      left: 50%;
      padding: 0 0px 0 40px;
    }

    .menu-toggle-item__inner {
      .text {
        right: 34px;
      }

      svg {
        right: 4px;
      }
    }
  }

  &.hidden {
    .menu-toggle-item__outer {
      width: 0;
      padding: 0;
    }

    .menu-toggle-item__inner {
      width: 0;
      padding: 0;
      border-radius: 0;
    }
  }

  *:hover > & {
    &:not(.hidden) {
      .menu-toggle-item__outer {
        width: 175px;
        background: var(--color-neutral-100);
      }

      &.left {
        .menu-toggle-item__outer {
          padding: 0 40px 0 10px;
        }
      }

      &.right {
        .menu-toggle-item__outer {
          padding: 0 10px 0 40px;
        }
      }

      .menu-toggle-item__inner {
        width: 175px;
        padding: 0;
        border-radius: 0;
      }
    }
  }
`;

const StyledOuter_ = styled.div`
  position: absolute;
  z-index: 0;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-neutral-900);
  border: solid 10px  var(--color-neutral-200);
  height: 58px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  background: var(--color-neutral-200);
  cursor: pointer;
  transition: var(--transition-smooth);
`;

const StyledInner_ = styled.div`
  background: var(--color-neutral-100);
  position: relative;
  height: 100%;
  overflow: hidden;
  width: 38px;
  padding: 0 18px;
  border-radius: 50%;
  transition: var(--transition-smooth);

  .text {
    position: absolute;
    top: 8px;
    padding: 0 7px;
    display: block;
    transition: var(--transition-smooth);
  }

  svg {
    position: absolute;
    top: 10px;
    width: 20px;
    height: 20px;
    transition: var(--transition-smooth);
  }
`;

export const MenuToggleItem = ({
  direction,
  children,
}: MenuToggleItemProps) => {
  const view = useMenu(state => state.view);
  const hidden = view === 'nav' || view === 'closeTop';
  return (
    <StyledWrapper className={getClassNames('menu-toggle-item', direction, { hidden })}>
      <StyledOuter className={getClassNames('menu-toggle-item__outer')}>
        <StyledInner className={getClassNames('menu-toggle-item__inner')}>
          {children}
        </StyledInner>
      </StyledOuter>
    </StyledWrapper >
  );
};
