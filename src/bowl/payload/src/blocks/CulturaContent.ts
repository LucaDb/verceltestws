import { BowlBlock } from '@websolutespa/payload-plugin-bowl';

export const CulturaContent: BowlBlock = {
  type: 'withBlock',
  slug: 'cultura-content',
  fields: [
    { type: 'withTitle' },
    { type: 'withDescription' },
  ],
};
