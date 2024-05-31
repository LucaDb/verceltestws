
import { BowlCollection } from '@websolutespa/payload-plugin-bowl';
import { withColor, withNavs } from '../blocks/BaseFields';
import { group, slug } from '../config';

export const Company: BowlCollection = {
  type: 'withCollection',
  slug: slug.company,
  admin: {
    group: group.content,
    useAsTitle: 'title',
    defaultColumns: ['title', 'id', 'order', 'createdAt', 'updatedAt'],
  },
  fields: [
    // inherited fields: id, createdAt, updatedAt
    { type: 'withTitle' },
    { type: 'withAbstract' },
    { type: 'withMedia' },
    withColor(),
    { type: 'number', name: 'order' },
    withNavs(1),
  ],
};
