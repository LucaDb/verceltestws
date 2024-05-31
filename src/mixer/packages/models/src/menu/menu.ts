import { IMenuCategory, IMenuItem, IMenuLink, IMenuPage, IMenuRoute } from '@websolutespa/bom-core';

export type IMenuHref = IMenuCategory | IMenuLink | IMenuPage | IMenuRoute;

export function isMenuHref(item: IMenuItem): item is IMenuHref {
  return ['category', 'link', 'page', 'route'].includes(item.type);
}

export function getTarget(nav?: IMenuItem): string | undefined {
  if (!nav) return;
  let target = '';
  switch (nav.type) {
    case 'link':
      target = nav.target ? nav.target : '_blank';
      break;
    default:
      target = '_self'
  }
  return target;
}