import { getClassNames } from '@websolutespa/bom-core';
import { ILazyComponentProps } from '@websolutespa/bom-mixer-models';
import { UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ImageSlider, ImageSliderItem } from '../../components';

export type ICulturaSlider = {
  title: string;
  items: ImageSliderItem[];
};

export type CulturaSliderProps = ILazyComponentProps & {
  item: ICulturaSlider
};

const CulturaSliderContainer = styled.section<UIStyledComponentProps>`

  .btn--navigation-next {
    right: calc(-1 * var(--spacing-sm) - var(--spacing-xs));
  }

  .btn--navigation-prev {
    left: calc(-1 * var(--spacing-sm) - var(--spacing-xs));
  }

  ${props => getCssResponsive(props)}
`;

export const CulturaSlider: React.FC<CulturaSliderProps> = ({ item }: CulturaSliderProps) => {
  const classNames = getClassNames('cultura-slider');
  const ref = useRef<HTMLDivElement>(null);
  const [refPosition, setRefPosition] = useState(0);

  const { items } = item;

  useEffect(() => {
    const updateWidth = () => {
      if (ref.current) {
        const wrapper = document.querySelector('.article-wrapper');
        if (!wrapper) return;
        const { left } = wrapper.getBoundingClientRect();
        setRefPosition(-left);
      }
    };

    window.addEventListener('resize', updateWidth);
    updateWidth();

    return () => window.removeEventListener('resize', updateWidth);
  }, [setRefPosition]);

  return (
    <CulturaSliderContainer ref={ref} className={classNames} position="relative" left={`${refPosition}px`} width="calc(100vw - var(--scrollbar-width))" overflow="hidden" background="var(--color-neutral-100)">
      {item && <ImageSlider items={items} />}
    </CulturaSliderContainer>
  );
};
