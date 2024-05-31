
import { BowlCollection } from '@websolutespa/payload-plugin-bowl';
import { withAuthor, withColor } from '../blocks/BaseFields';
import { Hero1 } from '../blocks/Hero1';
import { ImageMask1 } from '../blocks/ImageMask1';
import { Intro1 } from '../blocks/Intro1';
import { MediaBox1 } from '../blocks/MediaBox1';
import { MediaDouble1 } from '../blocks/MediaDouble1';
import { MediaDrawer1 } from '../blocks/MediaDrawer1';
import { MediaSplit1 } from '../blocks/MediaSplit1';
import { MediaVideo } from '../blocks/MediaVideo';
import { Overview1 } from '../blocks/Overview1';
import { Quote1 } from '../blocks/Quote1';
import { SideImages1 } from '../blocks/SideImages1';
import { TitleBox1 } from '../blocks/TitleBox1';
import { slug } from '../config';


export const ProjectDetail: BowlCollection = {
  type: 'withPage',
  slug: slug.project_detail,
  fields: [
    // inherited fields: id, title, slug, category, markets, template, meta, status, createdAt, updatedAt
    { type: 'withAbstract', required: true },
    { type: 'withDescription', required: true },
    { type: 'withMedia', required: true },
    { type: 'withCheckbox', name: 'selection' },
    { type: 'relationship', name: 'client', relationTo: slug.client, hasMany: false },
    { type: 'relationship', name: 'type', relationTo: slug.category, hasMany: true },
    { type: 'relationship', name: 'tag', relationTo: slug.category, hasMany: true },
    { type: 'withSelect', name: 'layout', options: ['default', 'big', 'editorial'] },
    withAuthor(),
    withColor(),
    { type: 'withComponents', name: 'hero', blocks: [Hero1], maxRows: 1 },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Layout',
          fields: [
            {
              type: 'withComponents',
              blocks: [MediaVideo, Intro1, Overview1, ImageMask1, Quote1, SideImages1, TitleBox1, MediaBox1, MediaSplit1, MediaDouble1, MediaDrawer1],
            },
          ],
        },
      ],
    },
  ],
};
