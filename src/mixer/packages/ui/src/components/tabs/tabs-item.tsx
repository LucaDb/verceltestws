import { getClassNames } from '@websolutespa/bom-core';
import React, { useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { TabsInternalCellProps, useTabsContext } from './tabs-context';

type Props = {
  label: string | React.ReactNode;
  value: string;
  disabled?: boolean;
};

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;

export type TabsItemProps = Props & NativeAttrs;

const StyledInternalCell = styled.div<{ label: string | React.ReactNode }>`
  position: relative;
  display: flex;
  align-items: center;
  width: auto;
  height: auto;
  padding: 0.875rem 0.55rem;
  margin: 0 0.9rem;
  user-select: none;
  outline: 0;
  z-index: 1;
  font-size: var(--font-paragraph40-size);
  line-height: var(--font-paragraph40-line-height);
  white-space: nowrap;
  cursor: pointer;
  --tabs-item-hover-left: calc(-1 * 0.28rem);
  --tabs-item-hover-right: calc(-1 * 0.28rem);

  background-color: transparent;
  color: var(--color-neutral-800);
  transition: color 0.2s cubic-bezier(0.73, 0.01, 0.24, 1);

  &:hover {
    color: var(--color-neutral-100);
  }

  &:after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    width: 100%;
    height: 2px;
    border-radius: 2px;
    background-color: var(--color-neutral-800);
    opacity: 0;
    transform: scaleX(0.75);
    transition: opacity, transform 0.2s cubic-bezier(0.73, 0.01, 0.24, 1);
  }

  :global(svg) {
    max-height: 1em;
    margin-right: 5px;
  }

  &:first-of-type {
    margin-left: 0;
  }

  &.active {
    color: var(--color-neutral-800);

    &:after {
      opacity: 1;
      transform: scaleX(1);
    }

    &:hover {
      color: var(--color-neutral-100);
    }
  }

  &.disabled {
    color: var(--color-neutral-300);
    cursor: not-allowed;
  }

  &.hide-border {

    &:before {
      content: ${props => typeof props.label === 'string' ? props.label : ''};
      display: block;
      font-weight: 500;
      height: 0;
      overflow: hidden;
      visibility: hidden;
    }

    &:after {
      display: none;
    }

    &.active {
      font-weight: 500;
    }
  }
`;

export const TabsItem: React.FC<React.PropsWithChildren<TabsItemProps>> = ({
  disabled = false,
  children,
  value,
  label,
}: React.PropsWithChildren<TabsItemProps>) => {
  const { register, currentValue } = useTabsContext();
  const isActive = useMemo(() => currentValue === value, [currentValue, value]);

  useEffect(() => {
    const TabsInternalCell: React.FC<TabsInternalCellProps> = ({
      onClick,
      onMouseOver,
      activeClassName,
      activeStyle,
      hideBorder,
    }) => {
      const ref = useRef<HTMLDivElement | null>(null);
      const { currentValue } = useTabsContext();
      const active = currentValue === value;
      const clickHandler = () => {
        if (disabled) {
          return;
        }
        onClick && onClick(value);
      };

      const classNames = getClassNames('tab', { active, disabled, 'hide-border': hideBorder }, activeClassName ? { [activeClassName]: active } : {});
      return (
        <StyledInternalCell ref={ref} key={value}
          label={label}
          className={classNames} style={active ? activeStyle : {}} role="button" data-geist="tab-item"
          onMouseOver={onMouseOver} onClick={clickHandler}>
          {label}
        </StyledInternalCell>
      );
    };
    TabsInternalCell.displayName = 'TabsInternalCell';
    register && register({ value, cell: TabsInternalCell });
  }, [value, label, disabled, register]);

  /* eslint-disable react/jsx-no-useless-fragment */
  return isActive ? <>{children}</> : null;
};

TabsItem.displayName = 'TabsItem';
