import { IComponent } from '@websolute/models';
import { IMedia } from '@websolutespa/bom-core';
import { ILazyableProps } from '@websolutespa/bom-mixer-models';
import { Media, UIStyledComponentProps, getCssResponsive, mediaUp } from '@websolutespa/bom-mixer-ui';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styled, { css } from 'styled-components';

export type IImageMask = IComponent & {
  media?: IMedia | undefined;
};

export type ImageMaskProps = UIStyledComponentProps<IImageMask>;

const ImageMaskContainer = styled.section<Omit<ImageMaskProps, 'media'>>`
  background: var(--color-neutral-100);
  position: relative;
  height: 200vh;
  z-index: 1;
  margin-bottom: var(--margin-md);
  
  .media {
    height: 100%;
  }

  ${props => mediaUp(props, 'sm', css`
    margin-bottom: var(--spacing-lg);

    .media {
      height: auto;
    }
  `)}

  ${props => getCssResponsive(props)}
`;

export const ImageMask = ({ item }: ILazyableProps<IImageMask>) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const clipPath = useTransform(scrollYProgress, [0.3, 0.7], ['circle(40vh)', 'circle(150vh)']);

  return (
    <ImageMaskContainer ref={ref} >
      <motion.div
        style={{
          width: '100%',
          height: '100vh',
          position: 'sticky',
          top: 0,
          clipPath,
        }}>
        <Media item={item.media} height="100%" />
      </motion.div>
    </ImageMaskContainer>
  );
};
