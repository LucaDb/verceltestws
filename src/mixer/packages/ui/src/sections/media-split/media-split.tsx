import { IMediaSplit } from '@websolute/models';
import { getClassNames } from '@websolutespa/bom-core';
import { ILazyableProps } from '@websolutespa/bom-mixer-models';
import { Flex, Media, Text, UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import styled from 'styled-components';
import { Wrapper } from '../../components';

const MediaSplitContainer = styled(Wrapper) <UIStyledComponentProps>`
  ${props => getCssResponsive(props)}
`;

export const MediaSplit = ({ item }: ILazyableProps<IMediaSplit>) => {
  const classNames = getClassNames('media-split-1');
  const { colorScheme, anchor, topSpace, eyelet, title, abstract, description, swap, layout, mediaColor, media } = item;

  const setTopSpace = !topSpace ? 'calc(var(--spacing-lg) * -1)' : 0;
  const setTopSpaceSm = !topSpace ? 'calc(var(--spacing-md) * -1)' : 0;

  const isFull = layout === 'full';

  return (
    <MediaSplitContainer className={classNames} colorScheme={colorScheme} anchor={anchor} marginTop={setTopSpace} marginTopSm={setTopSpaceSm}>
      <Flex.Row gap="0" alignItems="initial" flexDirection="column" flexDirectionSm="row">
        <Flex.Col alignItems="center" justifyContent="center" order={swap ? 1 : 0}>
          <Flex.Col gap="var(--margin-sm)" textAlign="center" padding="var(--spacing-md)">
            {eyelet && <Text variant="label20">{eyelet}</Text>}
            {abstract && <Text variant="paragraph30" dangerouslySetInnerHTML={{ __html: abstract }} />}
            {title && <Text variant="heading20">{title}</Text>}
            {description && <Text variant="paragraph20" dangerouslySetInnerHTML={{ __html: description }} />}
          </Flex.Col>
        </Flex.Col>
        <Flex.Col order={swap ? 0 : 1} className={mediaColor ? mediaColor : ''}>
          {(media && isFull) && <Media item={media} aspectRatio={4 / 5} size={"sm"} />}
          {(media && !isFull) && (
            <Flex.Col aspectRatio={4 / 5} alignItems="center" overflow="hidden" borderRadius="15px">
              <Media item={media} margin="var(--spacing-md)" maxWidth="358px" size={"sm"} />
            </Flex.Col>
          )}
        </Flex.Col>
      </Flex.Row>
    </MediaSplitContainer>
  );
};

