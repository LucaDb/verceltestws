import { BowlCollection } from '@websolutespa/payload-plugin-bowl';
import { withColor, withNavs } from '../blocks/BaseFields';
import { group, slug } from '../config';

export const Banner: BowlCollection = {
  type: 'withCollection',
  slug: slug.banner,
  admin: {
    group: group.content,
    useAsTitle: 'title',
    defaultColumns: ['title', 'id', 'createdAt', 'updatedAt'],
  },
  fields: [
    // inherited fields: id, createdAt, updatedAt
    { type: 'withTitle' },
    { type: 'withDescription' },
    withColor(),
    withNavs(),
  ],
};
