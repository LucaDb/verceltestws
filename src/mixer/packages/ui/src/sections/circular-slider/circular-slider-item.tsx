import { IMedia } from '@websolutespa/bom-core';
import { Box, Media, UIStyledComponentProps } from '@websolutespa/bom-mixer-ui';
import { useAnimationFrame } from 'framer-motion';
import { useEffect, useRef } from 'react';

export type CircularSliderSettings = {
  width: number;
  height: number;
  centerX: number;
  centerY: number;
  angleIncrement: number | undefined;
  radius: number;
  speed: number;
  cardWidth: number;
  angleY: number;
};

type Props = UIStyledComponentProps & {
  items: IMedia[],
  controls: CircularSliderSettings,
  itemsDirection?: 'left' | 'right';
  speed?: number;
  rotation?: boolean
};

export const CircularSliderItem = ({ items, controls, itemsDirection = 'right', rotation = false, ...props }: Props) => {

  const itemsRef = useRef<HTMLDivElement[]>([]);

  const { speed = 0.0028, cardWidth = 300, angleY = 1.8 } = controls;

  let currentAngle = 0;

  useEffect(() => {
    if (items) {
      itemsRef.current = itemsRef.current.slice(0, items.length);
    }
  }, [items]);

  useAnimationFrame((time, delta) => {
    if (itemsDirection === 'left') {
      currentAngle -= speed;
    } else {
      currentAngle += speed;
    }
    if (currentAngle > 2 * Math.PI) {
      currentAngle -= 2 * Math.PI;
    }

    items && items.forEach((item, index) => {
      const currentRef = itemsRef.current[index];

      if (currentRef) {
        const angle = controls.angleIncrement && currentAngle + (index * controls.angleIncrement);
        const x = angle && (controls.centerX + controls.radius * Math.cos(angle)) - cardWidth / 2;
        const y = angle && ((controls.centerY + controls.radius / angleY * Math.sin(angle)));

        currentRef.style.left = x + 'px';
        currentRef.style.top = y + 'px';

        if (rotation) {
          const currentRotation = angle && ((angle * 180 / Math.PI) - 90);
          if (currentRotation) {
            currentRef.style.transform = `rotate(${currentRotation}deg) scale(-1)`;
          }
        }
      }
    });

  });

  return (
    <Box position="relative" zIndex={2} width="100%" height="100%" {...props}>
      {items && controls.width && items.map((item, index) => (
        item.media &&
        <Box
          key={index}
          ref={(el) => {
            if (el && itemsRef.current) {
              itemsRef.current[index] = el;
            }
          }}
          position="absolute"
          width={cardWidth + 'px'}
        >
          <Media item={item.media} aspectRatio={4 / 3} borderRadius="15px" overflow="hidden" boxShadow="6px 10px 20px 0px #00000040;" />
        </Box>
      ))}
    </Box>
  );
};
