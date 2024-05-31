import { IProductDetail } from '@websolute/models';
import { isMediaJson } from '@websolutespa/bom-core';
import { Box, Media, SvgAnimation, Text, UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import styled from 'styled-components';
import { ButtonDialog } from '../button-dialog/button-dialog';

type Props = {
  item: IProductDetail;
  aspectRatio?: number;
  aspectRatioSm?: number;
};

export type ProductCardProps = UIStyledComponentProps<Props>;

const ProductCardContainer = styled.article<Omit<ProductCardProps, 'item'>>`

  .button {
    &:hover {
      .text {
        background-size: 0 0.1em, 100% 0.1em;
      }
    }
  }

  ${props => getCssResponsive(props)}
`;

export const ProductCard: React.FC<ProductCardProps> = ({ item, aspectRatio, aspectRatioSm, ...props }: ProductCardProps) => {

  const { title, media } = item;

  return (
    <ProductCardContainer aspectRatio={aspectRatio} aspectRatioSm={aspectRatioSm} maxWidth="none" maxWidthSm="33.333vw" borderRadius="10px" borderRadiusSm="15px" background="var(--color-neutral-200)">
      <ButtonDialog item={item} variant="line" height="100%" display="flex" padding="var(--margin-md) var(--margin-xs)" paddingSm="var(--margin-lg) var(--margin-sm)" flexDirection="column" justifyContent="center" alignItems="center" textAlign="center">
        <Box aspectRatio={1 / 1} aspectRatioSm={1 / 1} width="70%">
          {media && (
            isMediaJson(media) ? (
              <SvgAnimation href={media.url || media.src} width="100%" mode="over" />
            ) : (
              <Media item={media} width="100%" padding="0 var(--margin-sm)" />
            )
          )}
        </Box>
        {title && <Box marginTop="var(--margin-sm)" marginTopSm="var(--margin-md)"><Text variant="heading20" variantSm="heading40">{title}</Text></Box>}
      </ButtonDialog>
    </ProductCardContainer>
  );
};
