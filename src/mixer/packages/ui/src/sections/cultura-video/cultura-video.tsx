import { IconPlay } from '@websolute/icons';
import { IMedia, getClassNames } from '@websolutespa/bom-core';
import { ILazyableProps } from '@websolutespa/bom-mixer-models';
import { Box, Flex, Media, Text, UIStyledComponentProps, getCssResponsive, mediaUp } from '@websolutespa/bom-mixer-ui';
import { useState } from 'react';
import styled, { css } from 'styled-components';

export type ICulturaVideo = {
  description?: string;
  layout?: 'default' | 'aside';
  thumb?: IMedia;
  media?: IMedia;
};

export type CulturaVideoProps = UIStyledComponentProps<ICulturaVideo>;

const CulturaVideoContainer = styled.section<CulturaVideoProps>`

  ${props => (props.layout !== 'aside') && css`
    margin-left: 0;
  `}

  ${props => (props.layout !== 'aside') && mediaUp(props, 'sm', css`
    margin-left: calc(var(--aside-width) + var(--aside-gap-sm));
  `)}

  ${props => (props.layout !== 'aside') && mediaUp(props, 'md', css`
    margin-left: calc(var(--aside-width) + var(--aside-gap-md));
  `)}

  .cover {
    cursor: pointer;
    .icon {
      transition: var(--transition-smooth);
      color:var(--color-neutral-900);
      background: var(--color-neutral-100);
    }
    &:hover {
      .icon {
        color:var(--color-neutral-100);
        background: var(--color-neutral-900);
      }
    }
  }

  ${props => getCssResponsive(props)}
`;

export const CulturaVideo = ({ item }: ILazyableProps<ICulturaVideo>) => {
  const classNames = getClassNames('cultura-video');

  const [videoActive, setVideoActive] = useState(false);
  const { description, layout, media, thumb } = item;
  const isAsideOver = layout === 'aside';

  const clickHandler = () => {
    setVideoActive(!videoActive);
  };

  return (
    <CulturaVideoContainer className={classNames} padding="0" {...item}>
      <Flex.Col gap="var(--margin-xs)" textAlign={isAsideOver ? 'center' : 'left'} width={isAsideOver ? '100%' : 'auto'} className="cover">
        <Box onClick={clickHandler} position="relative" zIndex={1}>
          {(thumb && !videoActive) && <Media item={thumb} aspectRatio={16 / 9} borderRadius={isAsideOver ? '15px' : '0'} overflow={isAsideOver ? 'hidden' : 'auto'} />}
          {(media && videoActive) && <Media item={media} aspectRatio={16 / 9} borderRadius={isAsideOver ? '15px' : '0'} overflow={isAsideOver ? 'hidden' : 'auto'} />}
          {(thumb && !videoActive) && <Flex.Row className="icon" alignItems="center" justifyContent="center" position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" color="var(--color-neutral-800)" background="var(--color-neutral-100)" borderRadius="50%" width="3em" height="3em"><IconPlay /></Flex.Row>}
        </Box>
        {description && <Text variant="label20" color="var(--color-neutral-500)" dangerouslySetInnerHTML={{ __html: description }} />}
      </Flex.Col>
    </CulturaVideoContainer>
  );
};
