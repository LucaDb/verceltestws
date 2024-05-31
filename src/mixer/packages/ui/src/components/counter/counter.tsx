import { Box } from '@websolutespa/bom-mixer-ui';
import { useInView, useMotionValue, useSpring } from 'framer-motion';
import React, { useEffect, useRef } from 'react';

interface CounterProps {
  value: number;
  direction?: 'up' | 'down';
}

export const Counter: React.FC<CounterProps> = ({ value, direction = 'up' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const motionValue = useMotionValue(direction === 'down' ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 100,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      motionValue.set(direction === 'down' ? 0 : value);
    }
  }, [motionValue, isInView, direction, value]);

  useEffect(() => {
    springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat('it-IT').format(
          latest.toFixed(0)
        );
      }
    });
  }, [springValue]);

  return <Box ref={ref} />;
};
