import { BowlCollection, isRole } from '@websolutespa/payload-plugin-bowl';
import { roles, slug } from '../../config';

export const ContactUsAction: BowlCollection = {
  type: 'withAction',
  slug: slug.contact_us_action,
  admin: {
    defaultColumns: [
      'email',
      'fullName',
    ],
  },
  access: {
    read: isRole(roles.Admin, roles.Editor),
    update: (accessArgs) => isRole(roles.Admin)(accessArgs),
  },
  custom: {
    updateEndUser: false,
    createCredentials: false,
  },
  fields: [
    // info
    {
      name: 'fullName',
      type: 'withText',
    },
    {
      name: 'companyName',
      type: 'withText',
    },
    {
      name: 'companyArea',
      type: 'withText',
    },
    // project
    {
      name: 'service',
      type: 'text',
      hasMany: true,
    },
    {
      name: 'budget',
      type: 'withText',
    },
    {
      name: 'request',
      type: 'withText',
    },
    {
      name: 'message',
      type: 'withText',
    },
    {
      name: 'color',
      type: 'withText',
    },
  ],
};
