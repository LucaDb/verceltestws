import { BowlCollection } from '@websolutespa/payload-plugin-bowl';
import { slug } from '../../config';

export const NewsletterAction: BowlCollection = {
  type: 'withAction',
  slug: slug.newsletter_action,
  admin: {
    defaultColumns: [
      'email',
      'fullName',
    ],
  },
  custom: {
    updateEndUser: true,
    createCredentials: false,
  },
  fields: [
    {
      name: 'fullName',
      type: 'withText',
    },
  ],
};
