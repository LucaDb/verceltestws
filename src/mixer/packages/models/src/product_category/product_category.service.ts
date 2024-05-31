import { IEquatable, QueryParams } from '@websolutespa/bom-core';
import { IModelStore } from '@websolutespa/bom-mixer-models';
import { getStore } from '@websolutespa/bom-mixer-store';
import { IProductCategory } from './product_category';

export async function getProductCategories(params: QueryParams = {}): Promise<IProductCategory[]> {
  const store = await getStore<IModelStore>();
  const items = await store.product_category.findMany<IProductCategory>(params);
  return items;
}

export async function getProductCategory(id: IEquatable, params: QueryParams = {}): Promise<IProductCategory | undefined> {
  const store = await getStore<IModelStore>();
  const item = await store.product_category.findOne<IProductCategory>(id, params);
  return item;
}
