import { getClassNames } from '@websolutespa/bom-core';
import React from 'react';
import styled from 'styled-components';
import { usePopoverContext } from './popover-context';

type Props = {
  line?: boolean;
  title?: boolean;
  disableAutoClose?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;

export type PopoverItemProps = Props & NativeAttrs;

const StyledPopoverItem = styled.div<any>`
  display: flex;
  box-sizing: border-box;
  justify-content: flex-start;
  align-items: center;
  color: var(--color-cyan-500);
  transition: color, background-color 150ms linear;
  line-height: 1.25em;
  font-size: 0.875rem;
  width: auto;
  height: auto;
  margin: 0;
  padding: 0.5rem 0.75rem;
  cursor: ${props => props.hasHandler ? 'pointer' : 'default'};

  &:hover {
    color: var(--color-neutral-900);
  }

  &.line {
    line-height: 0;
    padding: 0;
    background-color: var(--color-neutral-300);
    height: 0.0625rem;
    margin: 0.35rem 0 0.35rem 0;
    width: 100%;
  }

  &.title {
    font-weight: 500;
    font-size: 0.925rem;
    color: var(--color-neutral-900);
  }
`;

export const PopoverItem: React.FC<React.PropsWithChildren<PopoverItemProps>> = ({
  className = '',
  line = false,
  title = false,
  disableAutoClose = false,
  onClick,
  children,
  ...props
}: React.PropsWithChildren<PopoverItemProps>) => {
  const { disableItemsAutoClose, onItemClick } = usePopoverContext();
  const hasHandler = Boolean(onClick);
  const dontCloseByClick = disableAutoClose || disableItemsAutoClose || title || line;

  const clickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    onClick && onClick(event);
    if (dontCloseByClick) {
      return event.stopPropagation();
    }
    onItemClick(event);
  };

  const classNames = getClassNames('item', { line, title }, className);

  return (
    <>
      <StyledPopoverItem {...props} className={classNames} hasHandler={hasHandler} onClick={clickHandler}>
        {children}
      </StyledPopoverItem>
      {title && <PopoverItem line title={false} />}
    </>
  );
};

PopoverItem.displayName = 'PopoverItem';
