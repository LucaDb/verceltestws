import { IEquatable, IPaginationResult, QueryParams } from '@websolutespa/bom-core';
import { IModelStore } from '@websolutespa/bom-mixer-models';
import { getStore } from '@websolutespa/bom-mixer-store';
import { IInverstorRelationsDetail } from './inverstor_relations_detail';

export async function getInverstorRelationsDetail(id: IEquatable, params: QueryParams = {}): Promise<IInverstorRelationsDetail | undefined> {
  const store = await getStore<IModelStore>();
  const item = await store.inverstor_relations_detail.findOne<IInverstorRelationsDetail>(id, params);
  return item;
}

export async function getInverstorRelationsDetails(params: QueryParams = {}): Promise<IInverstorRelationsDetail[]> {
  const store = await getStore<IModelStore>();
  const items = await store.inverstor_relations_detail.findMany<IInverstorRelationsDetail>(params);
  return items;
}

export async function getInverstorRelationsDetailsPagination(params: QueryParams = {}): Promise<IPaginationResult<IInverstorRelationsDetail>> {
  const store = await getStore<IModelStore>();
  const pagination = await store.inverstor_relations_detail.findPaged<IInverstorRelationsDetail>(params);
  return pagination;
}
