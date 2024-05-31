import { IconArrowRight } from '@websolute/icons';
import { IBanner, IColor, getTarget, isMenuHref } from '@websolute/models';
import { getClassNames } from '@websolutespa/bom-core';
import { Box, Button, Flex, Link, Text, UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import styled, { css } from 'styled-components';

export type BannerProps = UIStyledComponentProps & {
  item: IBanner,
  colorData?: IColor
};

const BannerContainer = styled.article<Omit<BannerProps, 'item'>>`

${props => props.colorData?.className === 'black' && css`
  color: var(--color-neutral-100);

  .icon {
    color: var(--color-neutral-800);
    background: var(--color-neutral-100);
  }
`}

${props => props.colorData?.className !== 'black' && css`
  color: var(--color-neutral-800);

  .icon {
    color: var(--color-neutral-100);
    background: var(--color-neutral-800);
  }
`}

.mask {
    width: 1.6em;
    height: 1.6em;
    display: flex;
    flex-direction: row;
    overflow: hidden;
    gap: 0.2em;
  }

  .svg-hidden,
  .svg-main {
    width: 1.6em;
    height: 1.6em;
    flex-shrink: 0;
    transition: var(--transition-smooth);
  }

  &:hover {
    .svg-hidden,
    .svg-main {
      transform: translateX(-1.8em);
    }
  }

  ${props => getCssResponsive(props)}
`;

export const Banner: React.FC<BannerProps> = ({ item }: BannerProps) => {

  const { title, description, navs, colorData } = item;

  const nav = navs && navs[0];
  const classNames = getClassNames(colorData?.className, 'background');

  return (
    <BannerContainer colorData={colorData} position="relative" borderRadius="15px" className={classNames}>
      {(nav && isMenuHref(nav)) && (
        <Link href={nav.href || '/'} >
          <Button as="a" padding="var(--margin-sm)" display="block" target={getTarget(nav)}>
            {(title || description) &&
              <Flex.Col gap="var(--margin-xs)" width="calc(100% - 120px)">
                {title && <Text variant="paragraph10">{title}</Text>}
                {description && <Text variant="paragraph30" variantSm="paragraph20" dangerouslySetInnerHTML={{ __html: description }} />}
              </Flex.Col>
            }
            <Flex.Col className="icon" position="absolute" bottom="var(--margin-sm)" right="var(--margin-sm)" alignItems="center" justifyContent="center" width="3.8em" height="3.8em" borderRadius="50%" >
              <Box className="mask" positionMd="absolute" position="relative">
                <IconArrowRight className="svg-hidden" />
                <IconArrowRight className="svg-main" />
              </Box>
            </Flex.Col>
          </Button>
        </Link>
      )}
    </BannerContainer>
  );
};
