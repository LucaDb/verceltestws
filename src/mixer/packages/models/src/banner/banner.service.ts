import { IEquatable, IPaginationResult, QueryParams } from '@websolutespa/bom-core';
import { IModelStore } from '@websolutespa/bom-mixer-models';
import { getStore } from '@websolutespa/bom-mixer-store';
import { IBanner } from './banner';

export async function getBanner(id: IEquatable, params: QueryParams = {}): Promise<IBanner | undefined> {
  const store = await getStore<IModelStore>();
  const item = await store.banner.findOne<IBanner>(id, params);
  return item;
}

export async function getBanners(params: QueryParams = {}): Promise<IBanner[]> {
  const store = await getStore<IModelStore>();
  const items = await store.banner.findMany<IBanner>(params);
  return items;
}

export async function getBannersPagination(params: QueryParams = {}): Promise<IPaginationResult<IBanner>> {
  const store = await getStore<IModelStore>();
  const pagination = await store.banner.findPaged<IBanner>(params);
  return pagination;
}
