import { IconArrowLeft, IconArrowRight } from '@websolute/icons';
import { Box } from '@websolutespa/bom-mixer-ui';
import styled from 'styled-components';
import { useSwiper } from 'swiper/react';

const SliderButton = styled.button`
  border: none;
  text-decoration: none;
  background: none;
  appearance: none;
  color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  width: 2.25rem;
  height: 2.25rem;
  margin-top: -1.125rem;
  border-radius: 50%;
  font-size: 1rem;
  line-height: 1;
  color: inherit;
  color: var(--color-neutral-800);
  background: var(--color-neutral-100);
  cursor: pointer;
  z-index: 1;
  transition: all ease-in-out 250ms;

  span {
    display: none;
  }

  svg {
    width: 1rem;
    height: 1rem;
  }

  .mask {
    width: 1em;
    height: 1em;
    display: flex;
    flex-direction: row;
    overflow: hidden;
    gap: 0.2em;
  }

  .svg-hidden,
  .svg-main {
    width: 1em;
    height: 1em;
    flex-shrink: 0;
    transition: var(--transition-smooth);
  }

  &:hover {
    .svg-hidden,
    .svg-main {
      transform: translateX(-1.2em);
    }
  }
`;

const ImageSliderButtonNext = styled(SliderButton)`
  right: var(--spacing-xs);
`;

export const ImageSliderNext: React.FC<{}> = () => {
  const swiper = useSwiper();
  return (
    <ImageSliderButtonNext className="btn--navigation btn--navigation-next" onClick={() => swiper.slideNext()}>
      <span>next</span>
      <Box className="mask">
        <IconArrowRight className="svg-hidden" />
        <IconArrowRight className="svg-main" />
      </Box>
    </ImageSliderButtonNext>
  );
};

const ImageSliderButtonPrev = styled(SliderButton)`
  left: var(--spacing-xs);
`;

export const ImageSliderPrev: React.FC<{}> = () => {
  const swiper = useSwiper();
  return (
    <ImageSliderButtonPrev className="btn--navigation btn--navigation-prev" onClick={() => swiper.slidePrev()}>
      <span>prev</span>
      <Box className="mask">
        <IconArrowLeft className="svg-hidden" />
        <IconArrowLeft className="svg-main" />
      </Box>
    </ImageSliderButtonPrev>
  );
};
