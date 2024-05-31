import { BowlBlock } from '@websolutespa/payload-plugin-bowl';

export const CulturaSlider: BowlBlock = {
  type: 'withBlock',
  slug: 'cultura-slider',
  fields: [
    { type: 'withTitle' },
    {
      type: 'array', name: 'items', fields: [
        { type: 'withTitle' },
        { type: 'withText', name: 'href' },
        { type: 'withMedia' },
      ],
    },
  ],
};
