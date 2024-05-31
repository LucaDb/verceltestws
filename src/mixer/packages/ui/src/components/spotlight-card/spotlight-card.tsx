import { ISpotlightDetail, getTarget, isMenuHref } from '@websolute/models';
import { getClassNames } from '@websolutespa/bom-core';
import { useLabel } from '@websolutespa/bom-mixer-hooks';
import { Box, Button, Link, Text, UIStyledComponentProps, getCssResponsive, mediaUp } from '@websolutespa/bom-mixer-ui';
import styled, { css } from 'styled-components';

export type ISpotlightDetailProps = {
  item: ISpotlightDetail;
  textSize?: 'sm' | 'md';
};

const SpotlightCardContainer = styled.article<UIStyledComponentProps>`
  cursor: pointer;

  .circle {
    position: relative;
    z-index: 1;
    top: 0;
    width: 100%;
    border-radius: 50%;
    margin: 0 auto var(--margin-xs) auto;
    transition: var(--transition-smooth);
    max-width: 240px;

    &:after {
      content: '';
      display: block;
      padding-bottom: 100%;
    }
  }

  .showmore {
    position: absolute;
    z-index: 1;
    top: 54%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: var(--transition-smooth);
    opacity: 0;
    padding: 5px 15px;
    color: var(--color-neutral-100);
    background-color: var(--color-neutral-800);
    border-radius: 40px;
  }

  ${props => mediaUp(props, 'sm', css`
    @media (hover: hover) {
      &:hover {
        .circle {
          transform: scale(1.04);
        }
        .showmore {
          top: 50%;
          opacity: 1;
        }
      }
    }
  `)}

  ${props => getCssResponsive(props)}
`;

export const SpotlightCard: React.FC<ISpotlightDetailProps> = ({ item, textSize = 'md' }: ISpotlightDetailProps) => {

  const { title, abstract, colorData, navs } = item;

  const label = useLabel();

  const getTitleSizeSm = textSize === 'md' ? 'heading20' : 'heading30';
  const getAbstractSizeSm = textSize === 'md' ? 'paragraph20' : 'paragraph40';
  const classNames = getClassNames(colorData?.className, 'background circle');

  const nav = navs && navs[0];

  return (
    <SpotlightCardContainer >
      {nav && isMenuHref(nav) && (
        <Link href={nav.href || '/'}>
          <Button as="a" display="block" textAlign="center" target={getTarget(nav)}>
            <Box position="relative">
              <Box className={classNames} />
              <Text className="showmore" display="none" displaySm="block" variant="paragraph30">{label('showmore.generic')} {title as string}</Text>
            </Box>
            <Box>
              {title && <Text variant="paragraph20" variantSm={getTitleSizeSm}>{title as string}</Text>}
              {abstract && <Text variant="paragraph40" variantSm={getAbstractSizeSm} color="var(--color-neutral-400)" dangerouslySetInnerHTML={{ __html: abstract }} />}
              <Text variant="paragraph40" display="block" displaySm="none" color="var(--color-cyan-400)" textDecoration="underline">{label('showmore.generic')}</Text>
            </Box>
          </Button>
        </Link>
      )}

    </SpotlightCardContainer>
  );
};
