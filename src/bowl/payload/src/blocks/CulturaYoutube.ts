import { BowlBlock } from '@websolutespa/payload-plugin-bowl';

export const CulturaYoutube: BowlBlock = {
  type: 'withBlock',
  slug: 'cultura-youtube',
  fields: [
    { type: 'withTitle' },
    { type: 'withText', name: 'src', required: true },
    { type: 'withSelect', name: 'layout', options: ['default', 'aside'] },
  ],
};
