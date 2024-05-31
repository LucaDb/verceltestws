import { BowlBlock } from '@websolutespa/payload-plugin-bowl';
import { withAnchor, withColorScheme, withInnerSpace, withSeoWeight, withTopSpace } from './BaseFields';
import { OverviewInfo } from './OverviewInfo';
import { OverviewService } from './OverviewService';
import { OverviewTeam } from './OverviewTeam';

export const Overview1: BowlBlock = {
  type: 'withBlock',
  slug: 'overview-1',
  fields: [
    {
      type: 'blocks', name: 'items', blocks: [OverviewInfo, OverviewService, OverviewTeam]
    },
    withAnchor(),
    withSeoWeight(),
    withColorScheme(),
    withTopSpace(),
    withInnerSpace(),
  ],
};
