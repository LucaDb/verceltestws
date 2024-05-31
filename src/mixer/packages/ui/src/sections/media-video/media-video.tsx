import { IconPlay } from '@websolute/icons';
import { IMediaVideo } from '@websolute/models';
import { getClassNames } from '@websolutespa/bom-core';
import { ILazyableProps } from '@websolutespa/bom-mixer-models';
import { Box, Container, Flex, Media, UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Wrapper } from '../../components';

const MediaVideoContainer = styled(Wrapper) <UIStyledComponentProps>`

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

export const MediaVideo = ({ item }: ILazyableProps<IMediaVideo>) => {
  const classNames = getClassNames('media-video');
  const { colorScheme, anchor, topSpace, innerSpace, wrapper, thumb, media } = item;

  const setTopSpace = !topSpace ? 'calc(var(--spacing-lg) * -1)' : 0;
  const setTopSpaceSm = !topSpace ? 'calc(var(--spacing-md) * -1)' : 0;
  const setInnerPadding = innerSpace ? 'calc(var(--grid-column-gap ) * 2) 0' : 0;

  const [videoActive, setVideoActive] = useState(false);

  const clickHandler = () => {
    setVideoActive(!videoActive);
  };

  const videoBox = (
    <React.Fragment>
      {(thumb && !videoActive) && <Media item={thumb} aspectRatio={16 / 9} />}
      {(media && videoActive) && <Media item={media} aspectRatio={16 / 9} />}
      {(thumb && !videoActive) && <Flex.Row className="icon" alignItems="center" justifyContent="center" position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" color="var(--color-neutral-800)" background="var(--color-neutral-100)" borderRadius="50%" width="3em" height="3em"><IconPlay /></Flex.Row>}
    </React.Fragment>
  )

  return (
    <MediaVideoContainer className={classNames} colorScheme={colorScheme} anchor={anchor} marginTop={setTopSpace} marginTopSm={setTopSpaceSm} padding={setInnerPadding}>
      {(media && wrapper) &&
        <Container>
          <Box onClick={clickHandler} position="relative" zIndex={1}>
            {videoBox}
          </Box>
        </Container>
      }
      {!wrapper && (
        <Box onClick={clickHandler} position="relative" zIndex={1} aspectRatio={media ? undefined : 16 / 9} background={media ? undefined : 'var(--color-neutral-800)'}>
          {videoBox}
        </Box>
      )}
    </MediaVideoContainer>
  );
};
