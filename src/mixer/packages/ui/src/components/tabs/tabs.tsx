import { getClassNames, withSchema } from '@websolutespa/bom-core';
import React, { CSSProperties, MouseEvent, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { Highlight } from '../../components';
import { useRect } from '../dropdown/dropdown-layout';
import { TabsConfig, TabsContext, TabsHeaderItem } from './tabs-context';
import { TabsItem } from './tabs-item';

type Props = {
  initialValue?: string;
  value?: string;
  hideDivider?: boolean;
  hideBorder?: boolean;
  highlight?: boolean;
  onChange?: (val: string) => void;
  className?: string;
  hoverHeightRatio?: number;
  hoverWidthRatio?: number;
  activeClassName?: string;
  activeStyle?: CSSProperties;
  leftSpace?: CSSProperties['marginLeft'];
  align?: CSSProperties['justifyContent'];
  children?: React.ReactNode;
};

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;

export type TabsProps = Props & NativeAttrs;

const StyledTabs = styled.div<Props>`
  font-size: 1;
  width: initial;
  height: auto;
  padding: 0;
  margin: 0;

  header {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    scrollbar-width: none;
    position: relative;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .scroll-container {
    flex: 1;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    padding-left: ${props => props.leftSpace};
    justify-content: ${props => props.align};
    border-bottom: 1px solid var(--color-neutral-400);

    &.hide-divider {
      border-color: transparent;
    }
  }
`;

const TabsBase = ({
  className = '',
  hideDivider = false,
  highlight = true,
  hoverHeightRatio = 0.7,
  hoverWidthRatio = 1.15,
  activeClassName = '',
  activeStyle = {},
  leftSpace = '12px',
  align = 'left',
  initialValue,
  value,
  hideBorder,
  children,
  onChange,
  ...props
}: TabsProps) => {
  const [tabs, setTabs] = useState<Array<TabsHeaderItem>>([]);
  const [innerValue, setInnerValue] = useState<string | undefined>(initialValue);
  const [hilight, setHilight] = useState<boolean>(false);
  const { rect, setRect } = useRect();
  const ref = useRef<HTMLDivElement | null>(null);

  const register = (next: TabsHeaderItem) => {
    setTabs(last => {
      const hasItem = last.find(item => item.value === next.value);
      if (!hasItem) {
        return [...last, next];
      }
      return last.map(item => {
        if (item.value !== next.value) {
          return item;
        }
        return {
          ...item,
          ...next,
        };
      });
    });
  };

  const initialInnerValue = useMemo<TabsConfig>(() => ({
    register,
    currentValue: innerValue,
    inGroup: true,
    leftSpace,
  }), [innerValue, leftSpace]);

  useEffect(() => {
    if (typeof value === 'undefined') {
      return;
    }
    setInnerValue(value);
  }, [value]);

  const onClick = (value: string) => {
    setInnerValue(value);
    if (typeof onChange === 'function') {
      onChange(value);
    }
  };

  const onMouseOver = (event: MouseEvent<HTMLDivElement>) => {
    setRect(event, () => ref.current);
    if (highlight) {
      setHilight(true);
    }
  };

  return (
    <TabsContext.Provider value={initialInnerValue}>
      <StyledTabs className={getClassNames('tabs', className)} leftSpace={leftSpace} align={align} {...props}>
        <header ref={ref} onMouseLeave={() => setHilight(false)}>
          {true && (
            <Highlight rect={rect} visible={hilight} hoverHeightRatio={hoverHeightRatio} hoverWidthRatio={hoverWidthRatio} />
          )}
          <div className={getClassNames('scroll-container', { 'hide-divider': hideDivider })}>
            {tabs.map(({ cell: Cell, value }) => (
              <Cell key={value} activeClassName={activeClassName}
                activeStyle={activeStyle} hideBorder={hideBorder}
                onClick={onClick} onMouseOver={onMouseOver}
              />
            ))}
          </div>
        </header>
        <div className="content">{children}</div>
      </StyledTabs>
    </TabsContext.Provider>
  );
};

export const Tabs = withSchema(TabsBase, {
  Item: TabsItem,
  Tab: TabsItem,
  displayName: 'Tabs',
});
