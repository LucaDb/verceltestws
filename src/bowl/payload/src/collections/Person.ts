
import { BowlCollection } from '@websolutespa/payload-plugin-bowl';
import { group, slug } from '../config';

export const Person: BowlCollection = {
  type: 'withCollection',
  slug: slug.person,
  admin: {
    group: group.content,
    useAsTitle: 'fullName',
    defaultColumns: ['firstName', 'lastName', 'role', 'company', 'id', 'createdAt', 'updatedAt'],
  },
  fields: [
    // inherited fields: id, createdAt, updatedAt
    { type: 'withText', name: 'firstName', localized: false, required: true },
    { type: 'withText', name: 'lastName', localized: false },
    {
      type: 'withText',
      name: 'fullName',
      localized: false,
      admin: {
        readOnly: true,
      },
      hooks: {
        beforeChange: [({ data }) => {
          if (data.lastName) {
            return `${data.firstName} ${data.lastName}`;
          }
          return data.firstName;
        }],
      },
    },
    { type: 'relationship', name: 'role', relationTo: slug.work_role },
    { type: 'relationship', name: 'company', relationTo: slug.company },
  ],
};
