import { IEquatable, IPaginationResult, QueryParams } from '@websolutespa/bom-core';
import { IModelStore } from '@websolutespa/bom-mixer-models';
import { getStore } from '@websolutespa/bom-mixer-store';
import { IClient } from './client';

export async function getClient(id: IEquatable, params: QueryParams = {}): Promise<IClient | undefined> {
  const store = await getStore<IModelStore>();
  const item = await store.client.findOne<IClient>(id, params);
  return item;
}

export async function getClients(params: QueryParams = {}): Promise<IClient[]> {
  const store = await getStore<IModelStore>();
  const items = await store.client.findMany<IClient>(params);
  return items;
}

export async function getClientsPagination(params: QueryParams = {}): Promise<IPaginationResult<IClient>> {
  const store = await getStore<IModelStore>();
  const pagination = await store.client.findPaged<IClient>(params);
  return pagination;
}
