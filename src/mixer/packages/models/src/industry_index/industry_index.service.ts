import { IEquatable, IPaginationResult, QueryParams } from '@websolutespa/bom-core';
import { IModelStore } from '@websolutespa/bom-mixer-models';
import { getStore } from '@websolutespa/bom-mixer-store';
import { IIndustryIndex } from './industry_index';

export async function getIndustryIndex(id: IEquatable, params: QueryParams = {}): Promise<IIndustryIndex | undefined> {
  const store = await getStore<IModelStore>();
  const item = await store.industry_index.findOne<IIndustryIndex>(id, params);
  return item;
}

export async function getIndustryIndices(params: QueryParams = {}): Promise<IIndustryIndex[]> {
  const store = await getStore<IModelStore>();
  const items = await store.industry_index.findMany<IIndustryIndex>(params);
  return items;
}

export async function getIndustryIndicesPagination(params: QueryParams = {}): Promise<IPaginationResult<IIndustryIndex>> {
  const store = await getStore<IModelStore>();
  const pagination = await store.industry_index.findPaged<IIndustryIndex>(params);
  return pagination;
}
