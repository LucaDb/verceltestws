import { IEquatable, IPaginationResult, QueryParams } from '@websolutespa/bom-core';
import { IModelStore } from '@websolutespa/bom-mixer-models';
import { getStore } from '@websolutespa/bom-mixer-store';
import { ICulturaIndex } from './cultura_index';

export async function getCulturaIndex(id: IEquatable, params: QueryParams = {}): Promise<ICulturaIndex | undefined> {
  const store = await getStore<IModelStore>();
  const item = await store.cultura_index.findOne<ICulturaIndex>(id, params);
  return item;
}

export async function getCulturaIndices(params: QueryParams = {}): Promise<ICulturaIndex[]> {
  const store = await getStore<IModelStore>();
  const items = await store.cultura_index.findMany<ICulturaIndex>(params);
  return items;
}

export async function getCulturaIndicesPagination(params: QueryParams = {}): Promise<IPaginationResult<ICulturaIndex>> {
  const store = await getStore<IModelStore>();
  const pagination = await store.cultura_index.findPaged<ICulturaIndex>(params);
  return pagination;
}
