import { IEquatable, IPaginationResult, QueryParams } from '@websolutespa/bom-core';
import { IModelStore } from '@websolutespa/bom-mixer-models';
import { getStore } from '@websolutespa/bom-mixer-store';
import { IPerson } from './person';

export async function getPerson(id: IEquatable, params: QueryParams = {}): Promise<IPerson | undefined> {
  const store = await getStore<IModelStore>();
  const item = await store.person.findOne<IPerson>(id, params);
  return item;
}

export async function getPeople(params: QueryParams = {}): Promise<IPerson[]> {
  const store = await getStore<IModelStore>();
  const items = await store.person.findMany<IPerson>(params);
  return items;
}

export async function getPeoplePagination(params: QueryParams = {}): Promise<IPaginationResult<IPerson>> {
  const store = await getStore<IModelStore>();
  const pagination = await store.person.findPaged<IPerson>(params);
  return pagination;
}
