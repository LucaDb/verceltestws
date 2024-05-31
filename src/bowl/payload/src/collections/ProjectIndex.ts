
import { BowlCollection } from '@websolutespa/payload-plugin-bowl';
import { ProjectAlphabetically } from '../blocks/ProjectAlphabetically';
import { ProjectSelection } from '../blocks/ProjectSelection';
import { ProjectTag } from '../blocks/ProjectTag';
import { ProjectType } from '../blocks/ProjectType';
import { slug } from '../config';

export const ProjectIndex: BowlCollection = {
  type: 'withPage',
  slug: slug.project_index,
  fields: [
    // inherited fields: id, title, slug, category, markets, template, meta, status, createdAt, updatedAt
    { type: 'withAbstract', required: true },
    { type: 'withDescription', required: true },
    { type: 'withMedia', required: true },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Layout',
          fields: [
            {
              type: 'withComponents',
              blocks: [ProjectSelection, ProjectTag, ProjectType, ProjectAlphabetically],
            },
          ],
        },
      ],
    },
  ],
};
