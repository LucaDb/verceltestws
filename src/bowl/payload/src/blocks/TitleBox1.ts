import { BowlBlock } from '@websolutespa/payload-plugin-bowl';
import { withAnchor, withColorScheme, withEyelet, withInnerSpace, withSeoWeight, withTopSpace } from './BaseFields';

export const TitleBox1: BowlBlock = {
  type: 'withBlock',
  slug: 'title-box-1',
  fields: [
    withEyelet(),
    { type: 'withTitle' },
    { type: 'withAbstract' },
    { type: 'withDescription' },
    withAnchor(),
    withSeoWeight(),
    withColorScheme(),
    withTopSpace(),
    withInnerSpace(),
  ],
};
