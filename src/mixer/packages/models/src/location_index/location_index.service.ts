import { IEquatable, IPaginationResult, QueryParams } from '@websolutespa/bom-core';
import { IModelStore } from '@websolutespa/bom-mixer-models';
import { getStore } from '@websolutespa/bom-mixer-store';
import { ILocationIndex } from './location_index';

export async function getLocationIndex(id: IEquatable, params: QueryParams = {}): Promise<ILocationIndex | undefined> {
  const store = await getStore<IModelStore>();
  const item = await store.location_index.findOne<ILocationIndex>(id, params);
  return item;
}

export async function getLocationIndices(params: QueryParams = {}): Promise<ILocationIndex[]> {
  const store = await getStore<IModelStore>();
  const items = await store.location_index.findMany<ILocationIndex>(params);
  return items;
}

export async function getLocationIndicesPagination(params: QueryParams = {}): Promise<IPaginationResult<ILocationIndex>> {
  const store = await getStore<IModelStore>();
  const pagination = await store.location_index.findPaged<ILocationIndex>(params);
  return pagination;
}
