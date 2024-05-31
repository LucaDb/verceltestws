import { ICategorized } from '@websolutespa/bom-core';

export type IJob = ICategorized & {
  slug: string;
  title?: string;
  abstract?: string;
  description?: string;
  href?: string;
};
