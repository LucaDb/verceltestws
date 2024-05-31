import { BowlBlock } from '@websolutespa/payload-plugin-bowl';

export const CulturaVideo: BowlBlock = {
  type: 'withBlock',
  slug: 'cultura-video',
  fields: [
    { type: 'withDescription' },
    { type: 'withSelect', name: 'layout', options: ['default', 'aside'] },
    { type: 'withMedia', name: 'thumb' },
    { type: 'withMedia' },
  ],
};
