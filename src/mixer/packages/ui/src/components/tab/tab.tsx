import { withSchema } from '@websolutespa/bom-core';
import { Flex } from '@websolutespa/bom-mixer-ui';
import React, { MouseEvent, ReactNode, forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Hilight, HilightDefault, HilightProps } from './hilight';
import { TabItem, TabItemProps } from './tab-item';

export type TabProps = {
  initialValue?: number;
  children?: ReactNode;
  onSelect?: (item: TabItemProps, index: number) => void;
};

const TabBase = forwardRef((props: TabProps, ref) => {
  const [index, setIndex] = useState(props.initialValue || -1);
  const [hilight, setHilight] = useState<HilightProps>(HilightDefault);
  const containerRef = useRef<HTMLDivElement>(null);
  const onSelect = (item: TabItemProps, index: number) => {
    setIndex(index);
    if (typeof props.onSelect == 'function') {
      props.onSelect(item, index);
    }
  };
  const onMouseEnter = (event: MouseEvent) => {
    if (!containerRef.current) {
      return;
    }
    const containerRect = containerRef.current.getBoundingClientRect();
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setHilight({ active: true, left: rect.left - containerRect.left - 10, width: rect.width + 20 });
  };
  const onMouseLeave = (event: MouseEvent) => {
    setHilight({ ...hilight, active: false });
  };
  const { items, itemsChildren, otherChildren } = parseChildrenProps(props.children);
  useImperativeHandle(ref, () => {
    return {
      setIndex: (newIndex: number) => {
        if (index !== newIndex) {
          setIndex(newIndex);
          const item = items[newIndex];
          if (typeof props.onSelect == 'function') {
            props.onSelect(item, newIndex);
          }
        }
      },
    };
  }, [index, items, props]);
  return (
    <>
      <Flex.Row ref={containerRef}
        gap="30px" gapMd="45px"
        position="relative"
        borderBottom="1px solid #bababa">
        <Hilight {...hilight} />
        {items.map((item, i) => (
          <TabItem key={i}
            id={item.id} title={item.title} active={i === index}
            onClick={() => onSelect(item, i)} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
          />
        ))}
        {otherChildren}
      </Flex.Row>
      {itemsChildren[index]}
    </>
  );
});

TabBase.displayName = 'Tab';

export function parseChildrenProps(children: ReactNode | undefined): {
  items: TabItemProps[];
  itemsChildren: ReactNode[];
  otherChildren: ReactNode;
} {
  const items: TabItemProps[] = [];
  const itemsChildren: ReactNode[] = [];
  const otherChildren = React.Children.map(children, (item) => {
    if (!React.isValidElement(item)) {
      return item;
    }
    if (item.type === TabItem) {
      const { children, ...props } = item.props;
      items.push(props);
      itemsChildren.push(children);
      return null;
    }
    return item;
  });
  return { items, itemsChildren, otherChildren };
}

export const Tab = withSchema(TabBase, {
  Item: TabItem,
  displayName: 'Tab',
});
