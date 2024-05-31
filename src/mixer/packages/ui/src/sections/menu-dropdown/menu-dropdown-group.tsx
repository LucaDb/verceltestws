import { Variants, motion } from 'framer-motion';
import { ReactNode } from 'react';
import styled from 'styled-components';

export type MenuDropdownGroupProps = {
  children: ReactNode;
};

const StyledMenuDropdownGroup = styled.ul`
  padding: 0 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  &:first-child {
    padding-top: 30px;
  }

  &:last-child {
    padding-bottom: 30px;
  }
`;

const variantsList: Variants = {
  initial: {
    transition: { staggerChildren: 0.02, staggerDirection: -1 },
  },
  dropdown: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
};

const MotionDropdown = motion(StyledMenuDropdownGroup);

export const MenuDropdownGroup = ({ children }: MenuDropdownGroupProps) => {
  return (
    <MotionDropdown variants={variantsList}>
      {children}
    </MotionDropdown>
  );
};


