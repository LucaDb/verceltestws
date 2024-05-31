import { IMedia, getClassNames } from '@websolutespa/bom-core';
import { useIntersectionObserver } from '@websolutespa/bom-mixer-hooks';
import { Box, Media, MediaSize, ResponsiveProps, pickResponsiveProps } from '@websolutespa/bom-mixer-ui';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

export type ImageLoopProps = ResponsiveProps<{
  aspectRatio?: CSSProperties['aspectRatio'];
  height?: CSSProperties['height'];
  width?: CSSProperties['width'];
}>;

export type ImageLoop = ImageLoopProps & {
  items?: IMedia[];
  speed?: number;
  size?: MediaSize;
};

const StyledBox = styled(Box)`
  position: relative;
  width: 100%;
  background: var(--color-neutral-900);
  counter-reset: element;

  .media {
    position: absolute;
    display: flex;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
    // z-index: 1;
    // opacity: 0;
    visibility: hidden;
    background: transparent;
    counter-increment: element;

    .image, .video {
      display: block;
      width: 100%;
      height: 100%;
      max-width: none;
      max-height: none;
      object-fit: cover;
    }

    &.active {
      // z-index: 2;
      // opacity: 1;
      visibility: visible;
    }

    /*
    &:after {
      content:counter(element);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      font-size: 30rem;
      color: white;
    }
    */
  }
`;

export const ImageLoop = ({
  items,
  speed = 1000,
  ...props
}: ImageLoop) => {

  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [loadingIndex, setLoadingIndex] = useState<number>(0);
  const [loadedIndices, setLoadedIndices] = useState<boolean[]>([]);

  const onLoaded = (index: number) => {
    // console.log('onLoaded', index);
    setActiveIndex(index);
    const indices = [...loadedIndices];
    indices[index] = true;
    setLoadedIndices(indices);
  };

  const getIndex = (index: number) => {
    return items ? index % items.length : 0;
  }

  const elementRef = useRef<HTMLDivElement>(null);

  const isIntersecting = useIntersectionObserver(elementRef, {
    threshold: 0,
    root: null,
    rootMargin: '0px',
  });

  useEffect(() => {
    if (isIntersecting) {
      const to = setTimeout(() => {
        const i = getIndex(loadingIndex + 1);
        setLoadingIndex(i);
        if (loadedIndices[i]) {
          setActiveIndex(getIndex(activeIndex + 1));
        }
      }, speed);
      return () => clearTimeout(to);
    }
    return () => { };
  }, [activeIndex, isIntersecting]);

  const [responsiveProps] = pickResponsiveProps(props, 'aspectRatio', 'height', 'width');

  const indexes = [activeIndex, loadingIndex];
  const classNames = getClassNames('image-loop');

  if (!items || items.length === 0) {
    return;
  }

  return (
    <StyledBox ref={elementRef} className={classNames} aspectRatio={16 / 9} {...responsiveProps}>
      {items.map((item, i) => {
        // if (loadedIndices[i] || indexes.includes(i)) {
        return (
          <Media
            key={`loop-${i}`}
            className={getClassNames({ active: i === activeIndex })}
            item={item}
            {...props}
            eager
            onLoaded={async (ref) => {
              if (i === loadingIndex) {
                /*
                if (ref.current instanceof HTMLImageElement) {
                  await ref.current.decode();
                  console.log('decoded');
                }
                */
                onLoaded(i);
              }
            }}
            canLoad={loadedIndices[i] || indexes.includes(i)}
          /*
          style={{
            // zIndex: (i === activeIndex ? 2 : 1),
            opacity: (i === activeIndex ? 1 : 0)
          }}
          */
          />
        );
        // }
        // return undefined;
      })}
    </StyledBox>
  );
};
