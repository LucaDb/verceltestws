import { IEquatable, QueryParams } from '@websolutespa/bom-core';
import { IModelStore } from '@websolutespa/bom-mixer-models';
import { getStore } from '@websolutespa/bom-mixer-store';
import { IProjectIndex } from './project_index';

export async function getProjectIndices(params: QueryParams = {}): Promise<IProjectIndex[]> {
  const store = await getStore<IModelStore>();
  const items = await store.project_index.findMany<IProjectIndex>(params);
  return items;
}

export async function getProjectIndex(id: IEquatable, params: QueryParams = {}): Promise<IProjectIndex | undefined> {
  const store = await getStore<IModelStore>();
  const item = await store.project_index.findOne<IProjectIndex>(id, params);
  return item;
}
