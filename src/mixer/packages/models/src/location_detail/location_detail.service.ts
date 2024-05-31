import { IEquatable, IPaginationResult, QueryParams } from '@websolutespa/bom-core';
import { IModelStore } from '@websolutespa/bom-mixer-models';
import { getStore } from '@websolutespa/bom-mixer-store';
import { ILocationDetail } from './location_detail';

export async function getLocationDetail(id: IEquatable, params: QueryParams = {}): Promise<ILocationDetail | undefined> {
  const store = await getStore<IModelStore>();
  const item = await store.location_detail.findOne<ILocationDetail>(id, params);
  return item;
}

export async function getLocationDetails(params: QueryParams = {}): Promise<ILocationDetail[]> {
  const store = await getStore<IModelStore>();
  const items = await store.location_detail.findMany<ILocationDetail>(params);
  return items;
}

export async function getLocationDetailsPagination(params: QueryParams = {}): Promise<IPaginationResult<ILocationDetail>> {
  const store = await getStore<IModelStore>();
  const pagination = await store.location_detail.findPaged<ILocationDetail>(params);
  return pagination;
}
