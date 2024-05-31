import { IEquatable, IPaginationResult, QueryParams } from '@websolutespa/bom-core';
import { IModelStore } from '@websolutespa/bom-mixer-models';
import { getStore } from '@websolutespa/bom-mixer-store';
import { IGeneric } from './generic';

export async function getGeneric(id: IEquatable, params: QueryParams = {}): Promise<IGeneric | undefined> {
  const store = await getStore<IModelStore>();
  const item = await store.generic.findOne<IGeneric>(id, params);
  return item;
}

export async function getGenerics(params: QueryParams = {}): Promise<IGeneric[]> {
  const store = await getStore<IModelStore>();
  const items = await store.generic.findMany<IGeneric>(params);
  return items;
}

export async function getGenericsPagination(params: QueryParams = {}): Promise<IPaginationResult<IGeneric>> {
  const store = await getStore<IModelStore>();
  const pagination = await store.generic.findPaged<IGeneric>(params);
  return pagination;
}
