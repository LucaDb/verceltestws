import { IEquatable, QueryParams } from '@websolutespa/bom-core';
import { IModelStore } from '@websolutespa/bom-mixer-models';
import { getStore } from '@websolutespa/bom-mixer-store';
import { IAbout } from './about';

export async function getAbouts(params: QueryParams = {}): Promise<IAbout[]> {
  const store = await getStore<IModelStore>();
  const items = await store.about.findMany<IAbout>(params);
  return items;
}

export async function getAbout(id: IEquatable, params: QueryParams = {}): Promise<IAbout | undefined> {
  const store = await getStore<IModelStore>();
  const item = await store.about.findOne<IAbout>(id, params);
  return item;
}
