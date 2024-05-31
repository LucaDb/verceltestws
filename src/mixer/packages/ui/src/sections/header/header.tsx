import { useLenis } from '@studio-freight/react-lenis';
import { getClassNames } from '@websolutespa/bom-core';
import { useLabel, useLayout } from '@websolutespa/bom-mixer-hooks';
import { Box, Button, Link, Text, UIComponentProps, mediaUp } from '@websolutespa/bom-mixer-ui';
import { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { Logo } from '../../components/logo/logo';
import { LogoDot } from '../../components/logo/logo-dot';
import { useMenu } from '../../hooks';
import { MenuToggle } from '../menu-toggle/menu-toggle';
import { MenuNav } from '../menu/menu-nav';

type ContainerProps = {
  fixed?: boolean;
  sticky?: boolean;
  scrolled?: boolean;
};

export type HeaderContainerProps = UIComponentProps<ContainerProps>;

const HeaderContainer = styled.header<HeaderContainerProps>`
  
  .logo,
  .dot,
  .toggle {
    transition: var(--transition-smooth);
    top: var(--margin-xs);
    opacity: 0;
  }

  &.active {
    .logo,
    .dot,
    .toggle {
      top: 20px;
      opacity: 1;

      ${props => mediaUp(props, 'sm', css`
        top: var(--margin-sm);
      `)}
    }
  }

  .exclusion {
    mix-blend-mode: difference;
  }
`;

type Props = {
  fixed?: boolean;
  sticky?: boolean;
};

export type HeaderProps = UIComponentProps<Props>;

export const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const layout = useLayout();
  const label = useLabel();

  const firstRender = useRef(true);
  const view = useMenu(state => state.view);
  const floating = useMenu(state => state.floating);
  const { toggleView, setFloating, setView } = useMenu(state => state.actions);

  const navToggle = () => {
    toggleView('nav');
  };

  const lenis = useLenis((lenis) => {
    if (!floating && (lenis.scroll > window.innerHeight / 2)) {
      setFloating(true);
    } else {
      setFloating(false);
    }
  })

  useEffect(() => {
    const isNav = view === 'nav';
    let timerId: NodeJS.Timeout | undefined;

    // if the menu is open, the floating menu should be active to show the close button
    if (isNav) {
      setFloating(true);
    } else {
      //if user is on top of the page and the menu is open, hide the header nav.
      if (lenis && lenis.scroll <= window.innerHeight / 2) {
        setFloating(false);

        //during the first render we don't need to activate the "setView(closeTop)" to avoid the animation
        if (firstRender.current) {
          firstRender.current = false;
        } else {
          //if user is on top of the page and close the menu, the floating menu should hide without animation
          setView('closeTop');
          // set view to undefined after the closing animation is done
          timerId = setTimeout(() => {
            setView(undefined);
          }, 200);
        }
      }
    }

    //stop scrolling when the menu is open
    if (lenis) {
      isNav ? lenis.stop() : lenis.start();
    }

    return () => {
      if (lenis) {
        lenis.start();
      }
      if (timerId) {
        clearTimeout(timerId);
      }
    };

  }, [view, lenis]);

  const classNames = getClassNames(!floating ? 'active' : '');

  return (
    <>
      <HeaderContainer className={classNames} {...props}>
        <Link href={layout.topLevelHrefs.homepage || '/'}>
          <Button as="a" display="block" title="Websolute">
            <Box className="dot" position="fixed" left="20px" leftSm="var(--margin-sm)" width="21px" height="21px" zIndex="10" color="var(--color-cyan-500)" ><LogoDot /></Box>
            <Box className="logo exclusion" position="fixed" left="48px" leftSm="58px" width="100px" zIndex="10" color="var(--color-neutral-100)"><Logo /></Box>
          </Button>
        </Link>
        <Box className="toggle exclusion" position="fixed" zIndex="10" right="20px" rightSm="var(--margin-sm)" color="var(--color-neutral-100)">
          <Button onClick={navToggle}>
            <Text variant="paragraph40">{label('header.menu')}</Text>
          </Button>
        </Box>
      </HeaderContainer>
      <MenuToggle />
      <MenuNav />
    </>
  );
};
