import { IComponent } from '../component/component';
import { ILocationDetail } from '../location_detail/location_detail';

export type ILocationMore = IComponent & {
  title?: string,
  quantity?: number;
  items?: ILocationDetail[];
};