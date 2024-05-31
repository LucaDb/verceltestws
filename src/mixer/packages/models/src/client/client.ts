import { IEntity, IMedia } from '@websolutespa/bom-core';
import { IFeature } from '../feature/feature';

export type IClientProject = {
  title: string;
  abstract: string;
  media: IMedia;
  tag: {
    id: string;
    title: string;
  }[];
  type: {
    id: string;
    title: string;
  }[];
  features?: IFeature[];
};

export type IClient = IEntity & {
  title: string;
  fromDate: Date | string;
  toDate?: Date | string;
  media: IMedia;
  projects: IClientProject[];
};

export const DummyClient: IClient = {
  'id': 'xxx',
  'schema': 'client',
  'title': 'Dermon',
  'fromDate': '2018-01-01T12:00:00.000Z',
  'toDate': undefined,
  'media': {
    'type': 'image',
    'src': 'https://picsum.photos/id/45/1024/768',
    'alt': 'Alternative text',
  },
  'projects': [
    {
      'title': 'Dermon Club',
      'abstract': 'Website & Content Strategy',
      'media': {
        'type': 'image',
        'src': 'https://picsum.photos/id/45/1024/768',
        'alt': 'Alternative text',
      },
      'tag': [
        {
          'id': 'product_category_strategy',
          'title': 'Strategy',
        },
      ],
      'type': [
        {
          'id': '5',
          'title': 'Fashion & Beauty',
        },
      ],
      'features': [
        {
          'title': 'Website',
          'features': [
            {
              'title': 'UX/UI',
            },
            {
              'title': 'Web design',
            },
            {
              'title': 'Art direction',
            },
            {
              'title': 'Information architecture',
            },
            {
              'title': 'Development',
            },
          ],
        },
        {
          'title': 'Digital advertising campaing',
          'features': [
            {
              'title': 'Content Strategy',
            },
            {
              'title': 'Piano editoriale',
            },
            {
              'title': 'Art direction',
            },
            {
              'title': 'Content Creation',
            },
          ],
        },
        {
          'title': 'Awards',
          'features': [
            {
              'title': 'Interactive Key Award 2020',
            },
          ],
        },
      ],
    },
    {
      'title': 'Dermon Official Website',
      'abstract': 'Website & Content Strategy',
      'media': {
        'type': 'image',
        'src': 'https://picsum.photos/id/45/1024/768',
        'alt': 'Alternative text',
      },
      'tag': [
        {
          'id': 'product_category_strategy',
          'title': 'Strategy',
        },
      ],
      'type': [
        {
          'id': '5',
          'title': 'Fashion & Beauty',
        },
      ],
      'features': [
        {
          'title': 'Website',
          'features': [
            {
              'title': 'UX/UI',
            },
            {
              'title': 'Web design',
            },
            {
              'title': 'Art direction',
            },
            {
              'title': 'Information architecture',
            },
            {
              'title': 'Development',
            },
          ],
        },
        {
          'title': 'Demand generation',
          'features': [
            {
              'title': 'SEO Strategy',
            },
            {
              'title': 'Digital Analytics',
            },
          ],
        },
      ],
    },
    {
      'title': 'Dermon Social',
      'abstract': 'Social & Content Strategy',
      'media': {
        'type': 'image',
        'src': 'https://picsum.photos/id/45/1024/768',
        'alt': 'Alternative text',
      },
      'tag': [
        {
          'id': 'product_category_strategy',
          'title': 'Strategy',
        },
      ],
      'type': [
        {
          'id': '5',
          'title': 'Fashion & Beauty',
        },
      ],
      'features': [
        {
          'title': 'Social',
          'features': [
            {
              'title': 'Social Strategy',
            },
            {
              'title': 'Content Creation',
            },
            {
              'title': 'Piano editoriale',
            },
          ],
        },
      ],
    },
  ],
};

