import { IconArrowLeft, IconArrowRight } from '@websolutespa/bom-mixer-icons';
import styled from 'styled-components';
import { useSwiper } from 'swiper/react';

const GalleryButton = styled.button`
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
  font-size: 1rem;
  line-height: 1;
  color: var(--color-neutral-100);
  cursor: pointer;
  z-index: 1;
  transition: all ease-in-out 250ms;
  overflow: hidden;

  svg {
    width: 1.8rem;
    height: 1.8rem;
  }

  .svg-main {
    transition: var(--transition-smooth);
  }

  .svg-hidden {
    position:absolute;
    left: -1.8rem;
    transition: var(--transition-smooth);
  }

  &:hover {
    .svg-hidden {
      transform: translateX(100%)
    }

    .svg-main{
      transform: translateX(100%)
    }
  }

  &._prev {
      .svg-hidden {
        right: -1.8rem;
        left: auto;
      }

      &:hover {
      .svg-hidden {
        transform: translateX(-100%)
      }

      .svg-main{
        transform: translateX(-100%)
      }
    }
  }

  &>span {
    font-size: 0;
  }
`;

const GalleryButtonNext = styled(GalleryButton)`
  right: 1rem;
`;

export const GalleryNext: React.FC<{}> = () => {
  const swiper = useSwiper();
  return (
    <GalleryButtonNext className="btn-nav _next" onClick={() => swiper.slideNext()}>
      <span>next</span>
      <IconArrowRight className="svg-hidden" />
      <IconArrowRight className="svg-main" />
    </GalleryButtonNext>
  );
};

const GalleryButtonPrev = styled(GalleryButton)`
  left: 1rem;
`;

export const GalleryPrev: React.FC<{}> = () => {
  const swiper = useSwiper();
  return (
    <GalleryButtonPrev className="btn-nav _prev" onClick={() => swiper.slidePrev()}>
      <span>next</span>
      <IconArrowLeft className="svg-main" />
      <IconArrowLeft className="svg-hidden" />
    </GalleryButtonPrev>
  );
};
