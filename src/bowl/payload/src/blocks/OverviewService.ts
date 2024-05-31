import { BowlBlock } from '@websolutespa/payload-plugin-bowl';
import { withNavs } from './BaseFields';

export const OverviewService: BowlBlock = {
  type: 'withBlock',
  slug: 'overview-service',
  fields: [
    { type: 'withTitle' },
    {
      type: 'array', name: 'items', fields: [
        { type: 'withTitle' },
        {
          type: 'array', name: 'items', fields: [
            {
              type: 'withTitle', admin: {
                description: () =>
                  'Se si utilizza un collegamento, lasciare vuoto e compilare solo il titolo del collegamento.',
              }
            },
            withNavs(1),
          ],
        },
      ]
    },
  ],
};
