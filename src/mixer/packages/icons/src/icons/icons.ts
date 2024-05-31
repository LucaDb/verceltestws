// https://github.com/feathericons/react-feather

import { lazy } from 'react';

export * from './arrow-down';
export * from './arrow-left';
export * from './arrow-right';
export * from './arrow-up-right';
export * from './chat';
export * from './close';
export * from './email';
export * from './filter';
export * from './gallery';
export * from './grid';
export * from './layers';
export * from './link';
export * from './play';
export * from './twitter';
export * from './w-logo';
export * from './websolute';
export * from './whatsapp';

export const Icons = {
  IconArrowDown: lazy(() => import('./arrow-down').then( module => ({ default: module.IconArrowDown }) )),
  IconArrowLeft: lazy(() => import('./arrow-left').then( module => ({ default: module.IconArrowLeft }) )),
  IconArrowRight: lazy(() => import('./arrow-right').then( module => ({ default: module.IconArrowRight }) )),
  IconArrowUpRight: lazy(() => import('./arrow-up-right').then( module => ({ default: module.IconArrowUpRight }) )),
  IconChat: lazy(() => import('./chat').then( module => ({ default: module.IconChat }) )),
  IconClose: lazy(() => import('./close').then( module => ({ default: module.IconClose }) )),
  IconEmail: lazy(() => import('./email').then( module => ({ default: module.IconEmail }) )),
  IconFilter: lazy(() => import('./filter').then( module => ({ default: module.IconFilter }) )),
  IconGallery: lazy(() => import('./gallery').then( module => ({ default: module.IconGallery }) )),
  IconGrid: lazy(() => import('./grid').then( module => ({ default: module.IconGrid }) )),
  IconLayers: lazy(() => import('./layers').then( module => ({ default: module.IconLayers }) )),
  IconLink: lazy(() => import('./link').then( module => ({ default: module.IconLink }) )),
  IconPlay: lazy(() => import('./play').then( module => ({ default: module.IconPlay }) )),
  IconTwitter: lazy(() => import('./twitter').then( module => ({ default: module.IconTwitter }) )),
  IconWLogo: lazy(() => import('./w-logo').then( module => ({ default: module.IconWLogo }) )),
  IconWebsolute: lazy(() => import('./websolute').then( module => ({ default: module.IconWebsolute }) )),
  IconWhatsapp: lazy(() => import('./whatsapp').then( module => ({ default: module.IconWhatsapp }) ))
};
