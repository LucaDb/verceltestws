import { Box } from '@websolutespa/bom-mixer-ui';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';
import { easeOutExpo } from '../../utils';

type Props = {
  children: ReactNode;
  isVisible?: boolean;
  top?: string;
  left?: string;
  maxWidth?: string;
  background?: string;
};

const MotionBox = motion(Box);
const transition = { duration: 1.2, ease: easeOutExpo };

export const PieChartItem: React.FC<Props> = ({ top = '50%', left = '50%', isVisible = false, maxWidth = '110px', background = 'var(--color-neutral-900)', children }: Props) => {

  return (
    <AnimatePresence initial={false}>
      {isVisible && (<MotionBox
        top={top}
        left={left}
        maxWidth={maxWidth}
        background={background}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={transition}
        position="absolute;"
        zIndex="1"
        transform="translate(-50%, -50%)"
        textAlign="center"
        padding="5px 10px"
        borderRadius="16px"
        fillOpacity="1"
        color="var(--color-neutral-100)">
        {children}
      </MotionBox>)}
    </AnimatePresence>
  );
};
