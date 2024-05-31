import { IEquatable, IPaginationResult, QueryParams } from '@websolutespa/bom-core';
import { IModelStore } from '@websolutespa/bom-mixer-models';
import { getStore } from '@websolutespa/bom-mixer-store';
import { IColor } from './color';

export async function getColor(id: IEquatable, params: QueryParams = {}): Promise<IColor | undefined> {
  const store = await getStore<IModelStore>();
  const item = await store.color.findOne<IColor>(id, params);
  return item;
}

export async function getColors(params: QueryParams = {}): Promise<IColor[]> {
  const store = await getStore<IModelStore>();
  const items = await store.color.findMany<IColor>(params);
  return items;
}

export async function getColorsPagination(params: QueryParams = {}): Promise<IPaginationResult<IColor>> {
  const store = await getStore<IModelStore>();
  const pagination = await store.color.findPaged<IColor>(params);
  return pagination;
}
