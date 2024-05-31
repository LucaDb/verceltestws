import { IMenuItem } from '@websolutespa/bom-core';
import { useLabel, useLayout } from '@websolutespa/bom-mixer-hooks';
import { UIComponentProps } from '@websolutespa/bom-mixer-ui';
import styled from 'styled-components';
import { FooterEnd } from './footer-end';
import { FooterMid } from './footer-mid';
import { FooterPre } from './footer-pre';

type Props = {
};

export type FooterProps = UIComponentProps<Props>;

const FooterContainer = styled.div<FooterProps>`
  background: var(--color-neutral-800);
  color: var(--color-neutral-400);
`;

export const Footer: React.FC<FooterProps> = (props: FooterProps) => {
  const layout = useLayout();
  const label = useLabel();

  const footerPreItems: IMenuItem[] = (layout.menu.footerPre && layout.menu.footerPre.items) ?? [];
  const footerMidGroup: IMenuItem[] = (layout.menu.footerMid && layout.menu.footerMid.items) ?? [];
  const footerMidItems: IMenuItem[] = (footerMidGroup[0] && footerMidGroup[0].items) ?? [];
  const footerMidTitle: string = (footerMidGroup[0] && footerMidGroup[0].title) ? (footerMidGroup[0].title as string) : '';
  const footerEndItems: IMenuItem[] = (layout.menu.footerEnd && layout.menu.footerEnd.items) ?? [];

  function getYear() {
    return new Date().getFullYear();
  }

  return (
    <FooterContainer {...props}>
      {footerPreItems && <FooterPre items={footerPreItems} />}
      {footerMidItems && <FooterMid items={footerMidItems} title={footerMidTitle} />}
      {footerEndItems && <FooterEnd items={footerEndItems} title={label('footer.copy')} date={getYear()} />}
    </FooterContainer>
  );
};
