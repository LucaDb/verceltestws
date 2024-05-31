import { BowlBlock } from '@websolutespa/payload-plugin-bowl';

export const CulturaImage: BowlBlock = {
  type: 'withBlock',
  slug: 'cultura-image',
  fields: [
    { type: 'withDescription' },
    { type: 'withSelect', name: 'layout', options: ['default', 'aside-over'] },
    { type: 'withMedia' },
  ],
};
