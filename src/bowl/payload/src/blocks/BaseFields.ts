import { BowlField, MenuItem, textToSlug } from '@websolutespa/payload-plugin-bowl';
import { pages, slug } from '../config';

export const withAnchor = (): BowlField => {
  return {
    type: 'group',
    name: 'anchor',
    hooks: {
      afterRead: [
        ({ value, siblingData, req }) => {
          if (
            (!value.title || !value.hash) &&
            ['admin', 'editor'].indexOf(req.user?.role) === -1
          ) {
            siblingData.anchor = undefined;
          }
        },
      ],
    },
    validate: (value) => {
      if (value && value.title && !value.hash) {
        return `missing hash for title "${value.title}"`;
      }
      if (value && value.hash && !value.title) {
        return `missing title for hash "${value.hash}"`;
      }
      return true;
    },
    fields: [
      { type: 'withTitle' },
      {
        type: 'withText', name: 'hash', localized: true,
        hooks: {
          beforeValidate: [
            ({ value, siblingData, previousSiblingDoc }) => {
              if (typeof value === 'string' && value !== '') {
                return textToSlug(value);
              }
              const fallbackData = (siblingData && siblingData.title) ||
                (previousSiblingDoc && previousSiblingDoc.title);

              if (fallbackData && typeof fallbackData === 'string') {
                return textToSlug(fallbackData);
              }
              return value;
            },
          ],
        },
      },
    ],
  };
};

export const withSeoWeight = (): BowlField => {
  return {
    type: 'withSelect',
    name: 'seoWeight',
    options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  };
};

export const withColorScheme = (name: string = 'colorScheme'): BowlField => {
  return {
    type: 'withSelect',
    name: name,
    options: ['light', 'dark'],
  };
};

export const withExtendedColorScheme = (name: string = 'colorScheme'): BowlField => {
  return {
    type: 'withSelect',
    name: name,
    options: ['light', 'dark', 'grey'],
  };
};

export const withTopSpace = (): BowlField => {
  return {
    type: 'withCheckbox',
    name: 'topSpace',
  };
};

export const withInnerSpace = (): BowlField => {
  return {
    type: 'withCheckbox',
    name: 'innerSpace',
  };
};

export const withNavs = (maxRows?: number): BowlField => {
  return {
    name: 'navs',
    label: 'navs',
    type: 'blocks',
    maxRows: maxRows,
    blocks: [MenuItem(pages)],
    admin: {
      initCollapsed: true,
    },
  };
};

export const withEyelet = (): BowlField => {
  return {
    type: 'withText',
    name: 'eyelet',
    localized: true,
  };
};

export const withAuthor = (): BowlField => {
  return {
    type: 'relationship',
    name: 'author',
    relationTo: slug.person,
  };
};

export const withColor = (): BowlField => {
  return {
    type: 'relationship',
    name: 'colorData',
    relationTo: slug.color,
  };
};

export const withDate = (): BowlField => {
  return {
    type: 'withDate',
    hooks: {
      beforeChange: [({ value, operation }) => {
        if (operation === 'create') {
          return new Date();
        }
        return value;
      }],
    },
  };
};
