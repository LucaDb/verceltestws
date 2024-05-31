import { useLenis } from '@studio-freight/react-lenis';
import { IconClose } from '@websolute/icons';
import { getClassNames } from '@websolutespa/bom-core';
import { useDrawer } from '@websolutespa/bom-mixer-hooks';
import { Button, Drawer, mediaUp } from '@websolutespa/bom-mixer-ui';
import { ReactNode, useEffect } from 'react';
import styled, { css } from 'styled-components';

export type CustomDrawerProps = {
  name: string;
  children?: ReactNode;
  onClose?: () => void;
};

const StyledDrawer = styled(Drawer)`
  && {
    background: var(--color-neutral-800);
    color: var(--color-neutral-100);
    overflow: visible;
    opacity: 1;
  }
`;

const StyledContent = styled(Drawer.Content)`
  display: flex;
  flex-direction: column;
  gap: var(--margin-xs);
  padding: var(--margin-xs) var(--margin-sm);
  height: 100vh;
  width: 600px;
  max-width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  scroll-behavior: smooth;

  ${props => mediaUp(props, 'sm', css`
    padding: var(--margin-md) var(--margin-lg);
    gap: var(--margin-sm);
  `)}
`;

const StyledClose = styled(Button)`
  position: static;
  text-align: center;
  margin: var(--margin-xs) auto var(--margin-xs) auto;

  svg {
    width: 12px;
    height: 12px;
    color: var(--color-neutral-100);
  }

  ${props => mediaUp(props, 'sm', css`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: -60px;
    top: 20px;
    width: 38px;
    height: 38px;
    background-color: var(--color-neutral-200);
    border-radius: 50%;
    transition: var(--transition-smooth);

    svg {
      color: var(--color-neutral-800);
      transition: var(--transition-smooth);
    }

    &:hover {
      background-color: var(--color-neutral-800);

      svg {
        color: var(--color-neutral-200);
      }
    }
  `)}
`;

export const CustomDrawer = (props: CustomDrawerProps) => {
  const [drawer, openDrawer, closeDrawer] = useDrawer();
  const classNames = getClassNames('drawer');
  const onClose = (event: React.MouseEvent) => {
    closeDrawer();
    if (typeof props.onClose === 'function') {
      props.onClose();
    }
  };
  const lenis = useLenis(() => {
    // console.log('onScroll');
  });
  useEffect(() => {
    if (lenis) {
      drawer ? lenis.stop() : lenis.start();
    }
    return () => {
      if (lenis) {
        lenis.start();
      }
    };
  }, [drawer, lenis]);
  return (
    <StyledDrawer className={classNames} visible={drawer == props.name} onClose={onClose} data-lenis-prevent>
      <StyledClose onClick={onClose} title="chiudi"><IconClose /></StyledClose>
      <StyledContent>
        {props.children}
      </StyledContent>
    </StyledDrawer>
  );
};
