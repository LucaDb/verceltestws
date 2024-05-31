import { useLenis } from '@studio-freight/react-lenis';
import { IMedia, isMediaJson } from '@websolutespa/bom-core';
import { Box, Flex, SvgAnimation, UIStyledComponentProps } from '@websolutespa/bom-mixer-ui';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

type OpeningProps = UIStyledComponentProps & {
  media: IMedia;
};

export const Opening: React.FC<OpeningProps> = ({ media }: OpeningProps) => {

  const MotionBox = motion(Box);
  const [isVisible, setIsVisible] = useState(true);
  const lenis = useLenis(() => { });

  useEffect(() => {
    if (lenis) {
      isVisible ? lenis.stop() : lenis.start();
    }
    return () => {
      if (lenis) {
        lenis.start();
      }
    };
  }, [isVisible, lenis]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible(false)
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence initial={false} mode="wait">
      {isVisible && (
        <MotionBox key="opening"
          width="100%" height="100%" background="white" position="fixed" top="0" left="0" backgroundColor="var(--color-neutral-100)" zIndex="999" overflow="hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Flex.Col width="100%" height="100%" alignItems="center" justifyContent="center">
            <Box width="300px">
              {media && isMediaJson(media) && <SvgAnimation href={media.url || media.src} width="100%" />}
            </Box>
          </Flex.Col>
        </MotionBox>
      )}
    </AnimatePresence>
  );
};
