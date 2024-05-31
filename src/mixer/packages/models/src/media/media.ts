import { IMedia } from '@websolutespa/bom-core';

export function isMediaJson(media?: IMedia): media is IMedia {
  return typeof media === 'object' && (media.type === 'json' || media.mimeType === 'application/json');
}

export function isMediaType(media?: IMedia, ...types: string[]): media is IMedia {
  return typeof media === 'object' && (types.includes(media.type) || (media.mimeType ? types.includes(media.mimeType.split('/')[0]) : false));
}
