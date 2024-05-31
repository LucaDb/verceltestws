import { IBanner } from '@websolute/models';
import { getClassNames } from '@websolutespa/bom-core';
import { ILazyableProps } from '@websolutespa/bom-mixer-models';
import { UIStyledComponentProps, getCssResponsive, mediaUp } from '@websolutespa/bom-mixer-ui';
import styled, { css } from 'styled-components';
import { Banner } from '../../components';

export type ICulturaCallout = {
  banner: IBanner;
};

const CulturaCalloutContainer = styled.section<UIStyledComponentProps>`
  margin-left: 0;

  ${props => mediaUp(props, 'sm', css`
    margin-left: calc(var(--aside-width) + var(--aside-gap-sm));
  `)}

  ${props => mediaUp(props, 'md', css`
    margin-left: calc(var(--aside-width) + var(--aside-gap-md));
  `)}

  ${props => getCssResponsive(props)}
`;

export const CulturaCallout = ({ item }: ILazyableProps<ICulturaCallout>) => {
  const classNames = getClassNames('cultura-callout');
  return (
    <CulturaCalloutContainer className={classNames}>
      <Banner item={item.banner} />
    </CulturaCalloutContainer>
  );
};
