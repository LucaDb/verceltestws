import { IEquatable, QueryParams } from '@websolutespa/bom-core';
import { IModelStore } from '@websolutespa/bom-mixer-models';
import { getStore } from '@websolutespa/bom-mixer-store';
import { IProductDetail } from './product_detail';

export async function getProductDetails(params: QueryParams = {}): Promise<IProductDetail[]> {
  const store = await getStore<IModelStore>();
  const items = await store.product_detail.findMany<IProductDetail>(params);
  return items;
}

export async function getProductDetail(id: IEquatable, params: QueryParams = {}): Promise<IProductDetail | undefined> {
  const store = await getStore<IModelStore>();
  const item = await store.product_detail.findOne<IProductDetail>(id, params);
  return item;
}
