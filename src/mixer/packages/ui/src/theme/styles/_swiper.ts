/* eslint-disable @typescript-eslint/ban-ts-comment */
import { css } from 'styled-components';

// Import Swiper styles
// @ts-ignore
import swiperCss from '!!raw-loader!swiper/css';
// @ts-ignore
import swiperNavigation from '!!raw-loader!swiper/css/navigation';
// @ts-ignore
import swiperPagination from '!!raw-loader!swiper/css/pagination';
// @ts-ignore
import freeMode from '!!raw-loader!swiper/css/free-mode';

export const CssSwiper = css`

  ${swiperCss}
  ${swiperNavigation}
  ${swiperPagination}
  ${freeMode}

  .swiper-pagination {
    .swiper-pagination-bullet {
      background-color: var(--color-neutral-500);
      transition: var(--transition-smooth);
      border-radius: 8px;

      &.swiper-pagination-bullet-active {
        background-color: var(--color-neutral-800);
        width: 24px;
      }
    }
  }

  /*
  .swiper:not(.swiper-initialized) {
    .swiper-slide > * {
      display: none;
    }
  }
  */
`;
