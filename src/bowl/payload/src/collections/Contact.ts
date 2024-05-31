
import { BowlCollection } from '@websolutespa/payload-plugin-bowl';
import { slug } from '../config';

export const Contact: BowlCollection = {
  type: 'withPage',
  slug: slug.contact,
  fields: [
    // inherited fields: id, title, slug, category, markets, template, meta, status, createdAt, updatedAt
    { type: 'withAbstract', required: true },
    { type: 'withDescription', required: true },
    {
      type: 'group', name: 'options', fields: [
        {
          type: 'array', name: 'service', fields: [
            { type: 'withId', required: true },
            { type: 'withName', required: true },
          ]
        },
        {
          type: 'array', name: 'budget', fields: [
            { type: 'withId', required: true },
            { type: 'withName', required: true },
          ]
        },
        {
          type: 'array', name: 'request', fields: [
            { type: 'withId', required: true },
            { type: 'withName', required: true },
          ]
        },
        {
          type: 'array', name: 'color', fields: [
            { type: 'withId', required: true },
            { type: 'withName', required: true },
            { type: 'withText', name: 'color', required: true },
          ]
        },
      ]
    },
  ],
};
