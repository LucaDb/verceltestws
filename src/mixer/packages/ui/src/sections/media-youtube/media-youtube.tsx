import { IMediaYoutube } from '@websolute/models';
import { getClassNames } from '@websolutespa/bom-core';
import { ILazyableProps } from '@websolutespa/bom-mixer-models';
import { Box, Container, UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import styled from 'styled-components';
import { Wrapper, Youtube } from '../../components';

const MediaYoutubeContainer = styled(Wrapper) <UIStyledComponentProps>`
  ${props => getCssResponsive(props)}
`;

export const MediaYoutube = ({ item }: ILazyableProps<IMediaYoutube>) => {
  const classNames = getClassNames('text-combo-1');

  const { colorScheme, anchor, topSpace, innerSpace, title, src } = item;

  const setTopSpace = !topSpace ? 'calc(var(--spacing-lg) * -1)' : 0;
  const setTopSpaceSm = !topSpace ? 'calc(var(--spacing-md) * -1)' : 0;
  const setInnerPadding = innerSpace ? 'var(--spacing-sm)' : 0;
  const setInnerPaddingSm = innerSpace ? 'var(--spacing-md)' : 0;

  return (
    <MediaYoutubeContainer className={classNames} colorScheme={colorScheme} anchor={anchor} marginTop={setTopSpace} marginTopSm={setTopSpaceSm}>
      <Box
        paddingTop={setInnerPadding}
        paddingTopSm={setInnerPaddingSm}>
        <Container>
          <Youtube title={title} src={src} />
        </Container>
      </Box>
    </MediaYoutubeContainer>
  );
};
