import { ICategorized, ILegalNotice } from '@websolutespa/bom-core';

export type ILegalDocument = ICategorized & {
  slug: string;
  title: string;
  href: string;
  legal_notice: ILegalNotice
};
