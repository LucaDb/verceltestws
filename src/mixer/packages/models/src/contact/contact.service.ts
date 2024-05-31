import { IEquatable, QueryParams } from '@websolutespa/bom-core';
import { IModelStore } from '@websolutespa/bom-mixer-models';
import { getStore } from '@websolutespa/bom-mixer-store';
import { IContact } from './contact';

export async function getContacts(params: QueryParams = {}): Promise<IContact[]> {
  const store = await getStore<IModelStore>();
  const items = await store.contact.findMany<IContact>(params);
  return items;
}

export async function getContact(id: IEquatable, params: QueryParams = {}): Promise<IContact | undefined> {
  const store = await getStore<IModelStore>();
  const item = await store.contact.findOne<IContact>(id, params);
  return item;
}
