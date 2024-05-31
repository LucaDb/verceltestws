import { IEquatable, IPaginationResult, QueryParams } from '@websolutespa/bom-core';
import { IModelStore } from '@websolutespa/bom-mixer-models';
import { getStore } from '@websolutespa/bom-mixer-store';
import { IWorkRole } from './work_role';

export async function getWorkRole(id: IEquatable, params: QueryParams = {}): Promise<IWorkRole | undefined> {
  const store = await getStore<IModelStore>();
  const item = await store.work_role.findOne<IWorkRole>(id, params);
  return item;
}

export async function getWorkRoles(params: QueryParams = {}): Promise<IWorkRole[]> {
  const store = await getStore<IModelStore>();
  const items = await store.work_role.findMany<IWorkRole>(params);
  return items;
}

export async function getWorkRolesPagination(params: QueryParams = {}): Promise<IPaginationResult<IWorkRole>> {
  const store = await getStore<IModelStore>();
  const pagination = await store.work_role.findPaged<IWorkRole>(params);
  return pagination;
}
