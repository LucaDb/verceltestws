
import { useLenis } from '@studio-freight/react-lenis';
import { IAnchor, IComponent } from '@websolute/models';
import { usePage } from '@websolutespa/bom-mixer-hooks';
import { Button, Text } from '@websolutespa/bom-mixer-ui';
import { useMemo } from 'react';
import { MenuDropdownGroup } from './menu-dropdown-group';
import { MenuDropdownItem } from './menu-dropdown-item';

export type MenuDropdownSummaryProps = {
  onSelect?: (anchor: IAnchor, index: number) => boolean | void;
};

export const MenuDropdownSummary = (props: MenuDropdownSummaryProps) => {
  const page = usePage();
  const anchors = useMemo(() => {
    const components = page.components as IComponent[] || [];
    const anchors = components.filter(x => Boolean(x.anchor)).map(x => x.anchor) as IAnchor[];
    return anchors;
  }, [page]);
  const lenis = useLenis(() => {
    // console.log('onScroll');
  });
  const onAnchor = (anchor: IAnchor, index: number) => {
    const flag = typeof props.onSelect === 'function' ? props.onSelect(anchor, index) : undefined;
    if (flag === false) {
      return;
    }
    const selector = `#${anchor.hash}`;
    const target = document.querySelector<HTMLDivElement>(selector);
    // console.log('MenuDropdownSummary.onScroll', selector, target);
    if (target && lenis) {
      lenis?.scrollTo(target);
    }
  };
  return (
    <MenuDropdownGroup>
      <MenuDropdownItem>
        <Text variant="label30" textTransform="uppercase">{page.title}</Text>
      </MenuDropdownItem>
      {anchors.map((item, index) => (
        item.title && (
          <MenuDropdownItem key={index}>
            <Button variant="filter" onClick={() => onAnchor(item, index)}>
              <Text variant="paragraph30">{item.title as string}</Text>
            </Button>
          </MenuDropdownItem>
        )
      ))}
    </MenuDropdownGroup>
  );
};
