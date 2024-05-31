import { getClassNames } from '@websolutespa/bom-core';
import { useEventListener, useIsomorphicLayoutEffect } from '@websolutespa/bom-mixer-hooks';
import { UIComponent, UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import React, { ReactNode, useRef } from 'react';
import styled from 'styled-components';

export type BusyIndicatorProps = UIStyledComponentProps<{}>;

const StyledBusyIndicator = styled.div<BusyIndicatorProps>`
  --bounce-easing: linear(0, 0.004, 0.016, 0.035, 0.063, 0.098, 0.141 13.6%, 0.25, 0.391, 0.563, 0.765, 1, 0.891 40.9%, 0.848, 0.813, 0.785, 0.766, 0.754, 0.75, 0.754, 0.766, 0.785, 0.813, 0.848, 0.891 68.2%, 1 72.7%, 0.973, 0.953, 0.941, 0.938, 0.941, 0.953, 0.973, 1, 0.988, 0.984, 0.988, 1);

	position: relative;
  display: block;
	width: 30px;
  height: 30px;
	display: grid;
	place-items: center;

  &::before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    background-color: var(--color-cyan-500);
    animation:
    busy-indicator-bounce 0.8s var(--bounce-easing) infinite,
    busy-indicator-color 6.4s linear infinite;
  }

  @keyframes busy-indicator-bounce {
    0% {
      transform: scale(1, 1);
    }

    100% {
      transform: scale(0.45, 0.45);
    }
  }

  @keyframes busy-indicator-color {
    0% {
      background-color: var(--color-cyan-500);
    }
    12% {
      background-color: var(--color-turquoise-500);
    }
    24% {
      background-color: var(--color-green-500);
    }
    36% {
      background-color: var(--color-yellow-500);
    }
    48% {
      background-color: var(--color-orange-500);
    }
    60% {
      background-color: var(--color-red-500);
    }
    72% {
      background-color: var(--color-purple-500);
    }
    84% {
      background-color: var(--color-blue-violet-500);
    }
    100% {
      background-color: var(--color-cyan-500);
    }
  }

  ${props => getCssResponsive(props)}
`;

export const BusyIndicator = StyledBusyIndicator;

type Props = {
  onMore: () => void;
  children?: ReactNode;
};
export type InfiniteLoaderProps = UIStyledComponentProps<Props>;
export type InfiniteLoaderComponent<C extends React.ElementType = 'div'> = UIComponent<C, Props>;
export type StyledInfiniteLoaderProps = UIStyledComponentProps;

const StyledInfiniteLoader = styled.div<StyledInfiniteLoaderProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  margin: 1rem 0;
  ${props => getCssResponsive(props)}
`;

export const InfiniteLoader: InfiniteLoaderComponent = ({ children, as = 'div' as React.ElementType, onMore, ...props }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const onScroll = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      // console.log('rect', rect);
      if (rect.top < window.innerHeight * 0.9) {
        onMore();
      }
    }
  };

  useEventListener('scroll', onScroll);

  // Set size at the first client-side load
  useIsomorphicLayoutEffect(() => {
    onScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classNames = getClassNames('infinite-loader');

  return (
    <StyledInfiniteLoader as={as} ref={ref} className={classNames} {...props}>
      <BusyIndicator />
    </StyledInfiniteLoader>
  );
};
