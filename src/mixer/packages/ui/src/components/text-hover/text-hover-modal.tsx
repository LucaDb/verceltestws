import { ITextHoverMedia, ITextHoverModal } from '@websolute/models';
import { Box } from '@websolutespa/bom-mixer-ui';
import { motion, useSpring } from 'framer-motion';
import { useEffect } from 'react';
import { ImageLoop } from '../image-loop/image-loop';


export const TextHoverModal = <T extends ITextHoverMedia,>({ modal, items }: ITextHoverModal<T>) => {

  const { active, index } = modal;

  const spring = {
    stiffness: 150,
    damping: 15,
    mass: 0.1
  }

  const mousePosition = {
    x: useSpring(0, spring),
    y: useSpring(0, spring)
  }

  const MotionBox = motion(Box);

  useEffect(() => {
    window.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const targetX = clientX - (window.innerWidth / 2 * 0.2);
      const targetY = clientY - (window.innerWidth / 2 * 0.12);
      mousePosition.x.set(targetX);
      mousePosition.y.set(targetY);
    })
  }, [])

  return (
    active && (
      <MotionBox style={{ pointerEvents: 'none', position: 'fixed', top: 0, x: mousePosition.x, y: mousePosition.y, zIndex: items.length + 1 }}>
        <Box aspectRatio={16 / 9} display="inline-block" width="18vw" borderRadius="15px" overflow="hidden" backgroundColor="var(--color-neutral-900)" >
          {(items && items[index].gallery) && <ImageLoop items={items[index].gallery} aspectRatio={16 / 9} size="sm" />}
        </Box>
      </MotionBox>
    )
  );
};
