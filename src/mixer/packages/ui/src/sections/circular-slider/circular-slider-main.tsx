import { IMedia } from '@websolutespa/bom-core';
import { Box } from '@websolutespa/bom-mixer-ui';
import { useEffect, useRef, useState } from 'react';
import { CircularSliderItem, CircularSliderSettings } from './circular-slider-item';

type Props = {
  items: IMedia[]
};

export const CircularSliderMain = ({ items }: Props) => {

  const wrapperRef = useRef<HTMLInputElement>(null);
  const [controls, setControls] = useState<CircularSliderSettings>({ width: 0, height: 0, centerX: 0, centerY: 0, angleIncrement: 0, radius: 0, speed: 0, cardWidth: 0, angleY: 0 });

  const rotation = true;
  const deltaRadius = 1.8;
  const deltaCenterY = 1.2 * deltaRadius;
  const angleY = 2.2 / deltaRadius;
  const deltaCardWidth = (items.length / 3.4);
  const speed = 0.002;

  useEffect(() => {
    const updateWidth = () => {
      if (wrapperRef && wrapperRef.current && items) {
        const currentWrapper = wrapperRef.current;
        const settings = {
          width: currentWrapper.offsetWidth,
          height: currentWrapper.offsetWidth,
          centerX: currentWrapper.offsetWidth / 2,
          centerY: (currentWrapper.offsetHeight / 2) * deltaCenterY,
          angleIncrement: ((2 * Math.PI) / items.length),
          radius: currentWrapper.offsetWidth / deltaRadius,
          cardWidth: currentWrapper.offsetWidth / deltaCardWidth,
          speed,
          angleY,
        };
        setControls(settings);
      }
    };

    window.addEventListener('resize', updateWidth);
    updateWidth();

    return () => window.removeEventListener('resize', updateWidth);
  }, [items, deltaCardWidth, angleY, deltaCenterY]);

  return (
    <Box ref={wrapperRef} position="relative" overflow="hidden" width="100%" height="25vh" heightSm="60vh" heightMd="85vh" heightLg="100vh" >
      <CircularSliderItem items={items} controls={controls} position="relative" zIndex="2" rotation={rotation} />
      <CircularSliderItem items={[...items].reverse()} controls={controls} itemsDirection="left" rotation={rotation} position="absolute" zIndex="1" top="8vh" topSm="13vh" topMd="24vh" topLg="38vh" />
    </Box>
  );
};
