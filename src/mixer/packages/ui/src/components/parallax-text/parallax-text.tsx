import { wrap } from '@motionone/utils';
import { SeoWeight } from '@websolutespa/bom-mixer-models';
import { Text, UIStyledComponentProps } from '@websolutespa/bom-mixer-ui';
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';
import { useRef } from 'react';
import styled from 'styled-components';

type Props = {
  children: string | JSX.Element | JSX.Element[];
  seoWeight?: SeoWeight;
  baseVelocity: number;
  scrollSpeed?: number;
  variant?: string;
  color?: string;
  duplicate?: number;
};

export type ParallaxTextProps = UIStyledComponentProps<Props>;

const ParallaxTextContainer = styled.div<Omit<ParallaxTextProps, 'children' | 'baseVelocity' | 'scrollVelocity' | 'variant' | 'color'>>`
  overflow: hidden;
  margin: 0;
  white-space: nowrap;
  display: flex;
  flex-wrap: nowrap;

  .scroller {
    white-space: nowrap;
    display: flex;
    flex-wrap: nowrap;
  }
`;

export const ParallaxText: React.FC<Props> = ({ children, seoWeight, baseVelocity = 100, variant = 'paragraph10', color, scrollSpeed = 5, duplicate = 4 }: Props) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, scrollSpeed], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  const element = [];

  for (let i = 0; i < duplicate; i++) {
    element.push(<Text key={i} as={i === 0 ? seoWeight : undefined} display="block" marginRight="30px" variant={variant} color={color ? color : 'inherit'}>{children} </Text>);
  }

  return (
    <ParallaxTextContainer >
      <motion.div className="scroller" style={{ x }}>
        {element}
      </motion.div>
    </ParallaxTextContainer>
  );
};

