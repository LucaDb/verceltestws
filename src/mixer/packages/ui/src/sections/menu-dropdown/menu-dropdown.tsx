import { Variants, motion } from 'framer-motion';
import { useRef } from 'react';
import styled from 'styled-components';
import { useLayoutClickOut, useMenu } from '../../hooks';
import { easeOutExpo } from '../../utils';

export type MenuDropdownProps = {
};

const StyledMenuDropdownContainer = styled.div`
`;

const StyledMenuDropdown = styled.div`
  position: fixed;
  left: 50%;
  width: 290px;
  transform: translateX(-50%);
  text-align: center;
  background: var(--color-neutral-800);
  color: var(--color-neutral-100);
  overflow: hidden;
`;

const StyledMenuDropdownInner = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 45px;
  user-select: none;
  /*
  overflow-x: hidden;
  overflow-y: auto;
  max-height: calc(100vh - 200px);
  */
`;

const variants: Variants = {
  initial: {
    height: 0,
    bottom: 50,
    borderRadius: 150,
    scale: 0.4,
    translateX: '-50%',
  },
  dropdown: {
    height: 'auto',
    bottom: 82,
    borderRadius: 20,
    scale: 1,
    translateX: '-50%',
  },
};

const MotionDropdown = motion(StyledMenuDropdown);
const transition = { duration: 1.2, ease: easeOutExpo };

export const MenuDropdown = (props: MenuDropdownProps) => {
  const dropdown = useMenu(state => state.dropdown);
  const innerRef = useRef<HTMLDivElement>(null);

  // const { setView } = useMenu(state => state.actions);
  useLayoutClickOut(innerRef, (event: MouseEvent) => {
    // setView();
  });

  return (
    <StyledMenuDropdownContainer>
      <MotionDropdown
        variants={variants}
        transition={transition}
        initial="initial"
        animate="dropdown"
        exit="initial"
      >
        <StyledMenuDropdownInner ref={innerRef}>
          {dropdown?.children}
        </StyledMenuDropdownInner>
      </MotionDropdown>
    </StyledMenuDropdownContainer>
  );
};


