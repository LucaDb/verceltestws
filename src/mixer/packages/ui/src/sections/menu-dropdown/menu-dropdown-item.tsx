import { Variants, motion } from 'framer-motion';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { easeOutExpo } from '../../utils';

export type MenuDropdownItemProps = {
  children?: ReactNode;
};

const MenuDropdownItemContainer = styled(motion.li)`
`;

const variants: Variants = {
  initial: {
    y: 30,
    opacity: 0,
  },
  dropdown: {
    y: 0,
    opacity: 1,
  },
};

const transition = { duration: 0.6, ease: easeOutExpo };

export const MenuDropdownItem: React.FC<MenuDropdownItemProps> = ({ children }: MenuDropdownItemProps) => {

  return (
    <MenuDropdownItemContainer
      variants={variants}
      transition={transition}
    // whileHover={{ scale: 1.05 }}
    // whileTap={{ scale: 0.95 }}
    >
      {children}
    </MenuDropdownItemContainer >
  );
};
