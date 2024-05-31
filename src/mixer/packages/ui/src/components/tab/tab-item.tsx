import { getClassNames } from '@websolutespa/bom-core';
import { Button, Flex } from '@websolutespa/bom-mixer-ui';
import { MouseEvent, ReactNode } from 'react';

export type TabItemProps = {
  active?: boolean;
  id: string;
  title: string;
  children?: ReactNode;
  onClick?: (event: MouseEvent) => void;
  onMouseEnter?: (event: MouseEvent) => void;
  onMouseLeave?: (event: MouseEvent) => void;
};

export const TabItem = (props: TabItemProps) => {
  const onClick = (event: MouseEvent) => {
    if (typeof props.onClick == 'function') {
      props.onClick(event);
    }
  };
  const onMouseEnter = (event: MouseEvent) => {
    if (typeof props.onMouseEnter == 'function') {
      props.onMouseEnter(event);
    }
  };
  const onMouseLeave = (event: MouseEvent) => {
    if (typeof props.onMouseLeave == 'function') {
      props.onMouseLeave(event);
    }
  };
  return (
    <Flex className="tab__item" onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Button variant="tab" whiteSpace="nowrap" className={getClassNames({ active: props.active })}>{props.title}</Button>
    </Flex>
  );
};
