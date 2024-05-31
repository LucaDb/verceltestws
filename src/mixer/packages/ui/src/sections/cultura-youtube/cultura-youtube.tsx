import { IYoutube } from '@websolute/models';
import { getClassNames } from '@websolutespa/bom-core';
import { ILazyableProps } from '@websolutespa/bom-mixer-models';
import { Flex, UIStyledComponentProps, getCssResponsive, mediaUp } from '@websolutespa/bom-mixer-ui';
import styled, { css } from 'styled-components';
import { Youtube } from '../../components';

export type ICulturaYoutube = IYoutube & {
  layout?: 'default' | 'aside';
};

const CulturaYoutubeContainer = styled.section<UIStyledComponentProps<{ layout: 'default' | 'aside' | undefined }>>`
  position: relative;
  z-index: 1;

  ${props => (props.layout !== 'aside') && css`
    margin-left: 0;
  `}

  ${props => (props.layout !== 'aside') && mediaUp(props, 'sm', css`
    margin-left: calc(var(--aside-width) + var(--aside-gap-sm));
  `)}

  ${props => (props.layout !== 'aside') && mediaUp(props, 'md', css`
    margin-left: calc(var(--aside-width) + var(--aside-gap-md));
  `)}

  ${props => getCssResponsive(props)}
`;

export const CulturaYoutube = ({ item }: ILazyableProps<ICulturaYoutube>) => {
  const { layout = 'default', title, src } = item;
  const classNames = getClassNames('cultura-youtube');
  const isAsideOver = layout === 'aside';

  return (
    <CulturaYoutubeContainer className={classNames} padding="0" layout={layout}>
      <Flex.Col gap="var(--margin-xs)" textAlign={isAsideOver ? 'center' : 'left'} width={isAsideOver ? '100%' : 'auto'}>
        <Youtube title={title} src={src} />
      </Flex.Col>
    </CulturaYoutubeContainer>
  );
};
