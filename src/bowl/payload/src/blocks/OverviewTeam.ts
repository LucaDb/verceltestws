import { BowlBlock } from '@websolutespa/payload-plugin-bowl';
import { slug } from '../config';

export const OverviewTeam: BowlBlock = {
  type: 'withBlock',
  slug: 'overview-team',
  fields: [
    { type: 'withTitle' },
    { type: 'relationship', name: 'companies', relationTo: slug.company, hasMany: true },
    {
      type: 'array', name: 'items', fields: [
        { type: 'relationship', name: 'role', relationTo: slug.work_role, required: true },
        {
          type: 'array', name: 'items', fields: [
            { type: 'relationship', name: 'member', relationTo: slug.person, required: true },
          ],
        },
      ]
    },
    {
      type: 'array', name: 'partners', fields: [
        { type: 'relationship', name: 'role', relationTo: slug.work_role, required: true },
        { type: 'withAbstract' },
        {
          type: 'array', name: 'items', fields: [
            { type: 'relationship', name: 'member', relationTo: slug.person, required: true },
          ],
        },
      ]
    },
  ],
};
