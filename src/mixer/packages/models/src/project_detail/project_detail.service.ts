import { IEquatable, QueryParams } from '@websolutespa/bom-core';
import { IModelStore } from '@websolutespa/bom-mixer-models';
import { getStore } from '@websolutespa/bom-mixer-store';
import { IProjectDetail } from './project_detail';

export async function getProjectDetails(params: QueryParams = {}): Promise<IProjectDetail[]> {
  const store = await getStore<IModelStore>();
  const items = await store.project_detail.findMany<IProjectDetail>(params);
  return items;
}

export async function getProjectDetail(id: IEquatable, params: QueryParams = {}): Promise<IProjectDetail | undefined> {
  const store = await getStore<IModelStore>();
  const item = await store.project_detail.findOne<IProjectDetail>(id, params);
  return item;
}
