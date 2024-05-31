import { IEquatable, IPaginationResult, QueryParams } from '@websolutespa/bom-core';
import { IModelStore } from '@websolutespa/bom-mixer-models';
import { getStore } from '@websolutespa/bom-mixer-store';
import { IInverstorRelationsIndex } from './inverstor_relations_index';

export async function getInverstorRelationsIndex(id: IEquatable, params: QueryParams = {}): Promise<IInverstorRelationsIndex | undefined> {
  const store = await getStore<IModelStore>();
  const item = await store.inverstor_relations_index.findOne<IInverstorRelationsIndex>(id, params);
  return item;
}

export async function getInverstorRelationsIndices(params: QueryParams = {}): Promise<IInverstorRelationsIndex[]> {
  const store = await getStore<IModelStore>();
  const items = await store.inverstor_relations_index.findMany<IInverstorRelationsIndex>(params);
  return items;
}

export async function getInverstorRelationsIndicesPagination(params: QueryParams = {}): Promise<IPaginationResult<IInverstorRelationsIndex>> {
  const store = await getStore<IModelStore>();
  const pagination = await store.inverstor_relations_index.findPaged<IInverstorRelationsIndex>(params);
  return pagination;
}
