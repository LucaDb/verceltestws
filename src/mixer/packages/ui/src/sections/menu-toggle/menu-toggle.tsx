import { IconChat, IconLayers } from '@websolute/icons';
import { getClassNames } from '@websolutespa/bom-core';
import { useLayout } from '@websolutespa/bom-mixer-hooks';
import { Box, Button, Link, Text, UIStyledComponentProps } from '@websolutespa/bom-mixer-ui';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { useRef } from 'react';
import styled from 'styled-components';
import { useMenu } from '../../hooks';
import { easeOutExpo } from '../../utils';
import { MenuDropdown } from '../menu-dropdown/menu-dropdown';
import { MenuToggleItem } from './menu-toggle-item';
import { MenuToggleMain } from './menu-toggle-main';

export type MenuToggleProps = {
};

const MenuToggleContainer = styled.div<UIStyledComponentProps>`
  position: fixed;
  z-index: 20;
  bottom: var(--margin-xs);
  left: 50%;
  transform: translateX(-50%);
  transition: var(--transition-smooth);
  opacity: 0;
  pointer-events: none;

  .sticky-nav {
    position: relative;
    z-index:1;
    width: 75px;
    height: 75px;
  }

  &.active {
    bottom: var(--margin-sm);
    opacity: 1;
    pointer-events: all;
  }
`;

const variantsWrap: Variants = {
  over: { scale: 1.02 },
};

const MotionWrap = motion(Box);
const transition = { duration: 0.6, ease: easeOutExpo };

export const MenuToggle: React.FC<MenuToggleProps> = (props: MenuToggleProps) => {

  const layout = useLayout();
  const dropdown = useMenu(state => state.dropdown);
  const view = useMenu(state => state.view);
  const floating = useMenu(state => state.floating)
  const ref = useRef<HTMLDivElement>(null);

  const { toggleView, setView } = useMenu(state => state.actions);

  const toggleNav = () => {
    toggleView(view || 'nav');

  };

  const classNames = getClassNames(floating ? 'active' : '');

  return (
    <MenuToggleContainer className={classNames}>
      <MotionWrap
        whileHover={view === 'dropdown' ? '' : 'over'}
        animate={(view)}
        variants={variantsWrap}
        transition={transition}
        className="sticky-nav"
        ref={ref}
      >
        {dropdown && (
          <MenuToggleItem direction="left">
            <Link href={layout.topLevelHrefs.contact}>
              <Button as="a" variant="primaryInline">
                <IconChat />
                <Text variant="paragraph50"><Box data-btn-text="contattaci">contattaci</Box></Text>
              </Button>
            </Link>
          </MenuToggleItem>
        )}
        <MenuToggleMain onClick={toggleNav} />
        {dropdown && (
          <MenuToggleItem direction="right">
            <Button variant="primaryInline" onClick={() => toggleView('dropdown')}>
              <IconLayers />
              <Text variant="paragraph50"><Box data-btn-text={dropdown.title}>{dropdown.title}</Box></Text>
            </Button>
          </MenuToggleItem>
        )}
      </MotionWrap>
      <AnimatePresence initial={false}>
        {view === 'dropdown' && (
          <MenuDropdown />
        )}
      </AnimatePresence>
    </MenuToggleContainer >
  );
};
