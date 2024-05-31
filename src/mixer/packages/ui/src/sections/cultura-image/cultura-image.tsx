import { IMedia, getClassNames } from '@websolutespa/bom-core';
import { ILazyableProps } from '@websolutespa/bom-mixer-models';
import { Flex, Media, Text, UIStyledComponentProps, getCssResponsive, mediaUp } from '@websolutespa/bom-mixer-ui';
import styled, { css } from 'styled-components';

export type ICulturaImage = {
  description?: string;
  layout?: 'default' | 'aside-over';
  media?: IMedia;
};

export type CulturaImageProps = UIStyledComponentProps<ICulturaImage>;

const CulturaImageContainer = styled.section<CulturaImageProps>`

  ${props => (props.layout !== 'aside-over') && css`
    margin-left: 0;
  `}

  ${props => (props.layout !== 'aside-over') && mediaUp(props, 'sm', css`
    margin-left: calc(var(--aside-width) + var(--aside-gap-sm));
  `)}

  ${props => (props.layout !== 'aside-over') && mediaUp(props, 'md', css`
    margin-left: calc(var(--aside-width) + var(--aside-gap-md));
  `)}

  ${props => getCssResponsive(props)}
`;

export const CulturaImage = ({ item }: ILazyableProps<ICulturaImage>) => {
  const classNames = getClassNames('cultura-image');
  const { description, layout, media } = item;
  const isAsideOver = layout === 'aside-over';
  return (
    <CulturaImageContainer className={classNames} padding="0" {...item}>
      <Flex.Col gap="var(--margin-xs)" textAlign={isAsideOver ? 'center' : 'left'} width={isAsideOver ? '100%' : ''} >
        {media && <Media item={media} aspectRatio={16 / 9} borderRadius={isAsideOver ? '15px' : ''} overflow={isAsideOver ? 'hidden' : ''} />}
        {description && <Text variant="label20" color="var(--color-neutral-500)" dangerouslySetInnerHTML={{ __html: description }} />}
      </Flex.Col>
    </CulturaImageContainer>
  );
};
