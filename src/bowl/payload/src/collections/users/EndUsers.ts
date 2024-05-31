import { BowlCollection } from '@websolutespa/payload-plugin-bowl';
import { group, slug } from '../../config';

export const EndUsers: BowlCollection = {
  type: 'withCollection',
  slug: slug.endUsers,
  admin: {
    useAsTitle: 'email',
    group: group.users,
    defaultColumns: [
      'email',
      'firstName',
      'lastName',
    ],
  },
  fields: [
    {
      name: 'email',
      label: 'Email',
      type: 'withText',
      unique: true,
      index: true,
      required: true,
    },
    {
      name: 'firstName',
      label: 'First Name',
      type: 'withText',
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'withText',
    },
    {
      name: 'consentPreferences',
      type: 'array',
      label: 'Consent Preferences',
      fields: [
        {
          name: 'consentPreference',
          label: 'Consent Preference',
          type: 'relationship',
          relationTo: slug.consentPreference,
        },
        {
          name: 'date',
          type: 'date',
          label: 'Date',
        },
      ],
    },
  ],
};
