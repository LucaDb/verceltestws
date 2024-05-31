import { IEquatable, IPaginationResult, QueryParams } from '@websolutespa/bom-core';
import { IModelStore } from '@websolutespa/bom-mixer-models';
import { getStore } from '@websolutespa/bom-mixer-store';
import { IIndustryDetail } from './industry_detail';

export async function getIndustryDetail(id: IEquatable, params: QueryParams = {}): Promise<IIndustryDetail | undefined> {
  const store = await getStore<IModelStore>();
  const item = await store.industry_detail.findOne<IIndustryDetail>(id, params);
  return item;
}

export async function getIndustryDetails(params: QueryParams = {}): Promise<IIndustryDetail[]> {
  const store = await getStore<IModelStore>();
  const items = await store.industry_detail.findMany<IIndustryDetail>(params);
  return items;
}

export async function getIndustryDetailsPagination(params: QueryParams = {}): Promise<IPaginationResult<IIndustryDetail>> {
  const store = await getStore<IModelStore>();
  const pagination = await store.industry_detail.findPaged<IIndustryDetail>(params);
  return pagination;
}
