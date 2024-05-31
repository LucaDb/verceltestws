import { IconClose } from '@websolute/icons';
import { Box, Text } from '@websolutespa/bom-mixer-ui';
import { Variants, motion } from 'framer-motion';
import styled from 'styled-components';
import { easeOutExpo } from '../../utils';

export type MenuToggleMainProps = {
  onClick?: () => void;
};

const MenuToggleMainContainer = styled(motion(Box))`
  position: relative;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  width: 75px;
  height: 75px;
  user-select: none;
  cursor: pointer;
  
  .text {
    position: relative;
    bottom: 2px;
  }

  &:hover {
    *[data-btn-text] {
      transform: translateY(100%);

      &:before {
        opacity: 1;
        top: -100%;
      }
    }
  }
`;

const variants: Variants = {
  nav: {
    background: '#ffffff',
    color: '#000000',
  },
  closeTop: {
    background: '#ffffff',
    color: '#000000',
  }
};

const variantsBox: Variants = {
  dropdown: {
    top: -17,
  },
  nav: {
    top: -17,
  },
  closeTop: {
    top: -17,
  }
};


const MotionBox = motion(Box);
const transition = { duration: 0.6, ease: easeOutExpo };

export const MenuToggleMain: React.FC<MenuToggleMainProps> = ({ onClick }: MenuToggleMainProps) => {

  return (
    <MenuToggleMainContainer onClick={onClick} variants={variants} transition={transition} style={{
      background: 'var(--color-neutral-800)',
      color: 'var(--color-neutral-100)'
    }}>
      <Box position="relative" overflow="hidden">
        <MotionBox position="relative" variants={variantsBox} transition={transition}>
          <Text variant="paragraph50">menu</Text>
          <Box position="absolute" left="50%" transform="translateX(-50%)" bottom="-23px"><IconClose /></Box>
        </MotionBox>
      </Box>
    </MenuToggleMainContainer >
  );
};
