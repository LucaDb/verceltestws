import { IEquatable, IPaginationResult, QueryParams } from '@websolutespa/bom-core';
import { IModelStore } from '@websolutespa/bom-mixer-models';
import { getStore } from '@websolutespa/bom-mixer-store';
import { INewsletter } from './newsletter';

export async function getNewsletter(id: IEquatable, params: QueryParams = {}): Promise<INewsletter | undefined> {
  const store = await getStore<IModelStore>();
  const item = await store.newsletter.findOne<INewsletter>(id, params);
  return item;
}

export async function getNewsletters(params: QueryParams = {}): Promise<INewsletter[]> {
  const store = await getStore<IModelStore>();
  const items = await store.newsletter.findMany<INewsletter>(params);
  return items;
}

export async function getNewslettersPagination(params: QueryParams = {}): Promise<IPaginationResult<INewsletter>> {
  const store = await getStore<IModelStore>();
  const pagination = await store.newsletter.findPaged<INewsletter>(params);
  return pagination;
}
