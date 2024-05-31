import { IEquatable, IPaginationResult, QueryParams } from '@websolutespa/bom-core';
import { IModelStore } from '@websolutespa/bom-mixer-models';
import { getStore } from '@websolutespa/bom-mixer-store';
import { ICulturaDetail } from './cultura_detail';

export async function getCulturaDetail(id: IEquatable, params: QueryParams = {}): Promise<ICulturaDetail | undefined> {
  const store = await getStore<IModelStore>();
  const item = await store.cultura_detail.findOne<ICulturaDetail>(id, params);
  return item;
}

export async function getCulturaDetails(params: QueryParams = {}): Promise<ICulturaDetail[]> {
  const store = await getStore<IModelStore>();
  const items = await store.cultura_detail.findMany<ICulturaDetail>(params);
  return items;
}

export async function getCulturaDetailsPagination(params: QueryParams = {}): Promise<IPaginationResult<ICulturaDetail>> {
  const store = await getStore<IModelStore>();
  const pagination = await store.cultura_detail.findPaged<ICulturaDetail>(params);
  return pagination;
}
