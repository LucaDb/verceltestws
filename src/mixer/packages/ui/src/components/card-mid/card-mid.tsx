import { IMedia } from '@websolutespa/bom-core';
import { Box, Button, Flex, Link, Media, Text } from '@websolutespa/bom-mixer-ui';
import { MouseEvent } from 'react';
import styled from 'styled-components';

export type CardMidItem = {
  title: string;
  abstract?: string;
  href?: string;
  media: IMedia;
};

type CardMidProps<T extends CardMidItem> = {
  item: T;
  onSelect?: (item: T) => boolean | void;
};

const StyledWrapper = styled.article`
  cursor: pointer;
  user-select: none;

  .media {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  &:hover {
    .text {
      background-size: 0 0.1em, 100% 0.1em;
    }
  }
`;

const StyledPicture = styled.picture`
  overflow: hidden;
  border-radius: 0;
  transition: border-radius 1s cubic-bezier(0.73, 0.01, 0.24, 1);

  &:hover {
    border-radius: 20px;
    transition-duration: 1.2;
  }
`;

const StyledMedia = styled(Media)`
  transform: scale(1);
  transition: transform 1s cubic-bezier(0.73, 0.01, 0.24, 1);

  &:hover {
    transform: scale(1.1);
    transition-duration: 1.2;
  }
`;

export function CardMid<T extends CardMidItem>({ item, ...props }: CardMidProps<T>) {
  const onClick = (event: MouseEvent) => {
    const flag = typeof props.onSelect === 'function' ? props.onSelect(item) : undefined;
    if (flag === false) {
      event.preventDefault();
    }
  };
  const Card = (
    <StyledWrapper as={item.href ? 'a' : 'article'} onClick={onClick}>
      <Flex.Col gap="20px">
        {item.media && (
          <StyledPicture>
            <StyledMedia aspectRatio={420 / 262} item={item.media} draggable="false" />
          </StyledPicture>
        )}
        <Box>
          {item.title && (
            <Button variant="line">
              <Text variant="heading30" dangerouslySetInnerHTML={{ __html: item.title }}></Text>
            </Button>
          )}
          {item.abstract && (
            <Text variant="paragraph30" dangerouslySetInnerHTML={{ __html: item.abstract }}></Text>
          )}
        </Box>
      </Flex.Col>
    </StyledWrapper>
  );
  return item.href ? <Link href={item.href}>{Card}</Link> : Card;
}
