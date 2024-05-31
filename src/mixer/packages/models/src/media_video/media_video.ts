import { IMedia } from '@websolutespa/bom-core';
import { IComponent } from '../component/component';

export type IMediaVideo = IComponent & {
  wrapper: boolean;
  thumb?: IMedia;
  media?: IMedia;
};


