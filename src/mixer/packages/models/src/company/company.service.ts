import { IEquatable, IPaginationResult, QueryParams } from '@websolutespa/bom-core';
import { IModelStore } from '@websolutespa/bom-mixer-models';
import { getStore } from '@websolutespa/bom-mixer-store';
import { ICompany } from './company';

export async function getCompany(id: IEquatable, params: QueryParams = {}): Promise<ICompany | undefined> {
  const store = await getStore<IModelStore>();
  const item = await store.company.findOne<ICompany>(id, params);
  return item;
}

export async function getCompanies(params: QueryParams = {}): Promise<ICompany[]> {
  const store = await getStore<IModelStore>();
  const items = await store.company.findMany<ICompany>(params);
  return items;
}

export async function getCompaniesPagination(params: QueryParams = {}): Promise<IPaginationResult<ICompany>> {
  const store = await getStore<IModelStore>();
  const pagination = await store.company.findPaged<ICompany>(params);
  return pagination;
}
