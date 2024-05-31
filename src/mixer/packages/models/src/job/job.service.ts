import { IEquatable, QueryParams } from '@websolutespa/bom-core';
import { IModelStore } from '@websolutespa/bom-mixer-models';
import { getStore } from '@websolutespa/bom-mixer-store';
import { IJob } from './job';

export async function getJobs(params: QueryParams = {}): Promise<IJob[]> {
  const store = await getStore<IModelStore>();
  const items = await store.job.findMany<IJob>(params);
  return items;
}

export async function getJob(id: IEquatable, params: QueryParams = {}): Promise<IJob | undefined> {
  const store = await getStore<IModelStore>();
  const item = await store.job.findOne<IJob>(id, params);
  return item;
}
