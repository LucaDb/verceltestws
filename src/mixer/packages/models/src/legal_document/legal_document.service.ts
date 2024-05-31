import { IEquatable, IPaginationResult, QueryParams } from '@websolutespa/bom-core';
import { IModelStore } from '@websolutespa/bom-mixer-models';
import { getStore } from '@websolutespa/bom-mixer-store';
import { ILegalDocument } from './legal_document';

export async function getLegalDocument(id: IEquatable, params: QueryParams = {}): Promise<ILegalDocument | undefined> {
  const store = await getStore<IModelStore>();
  const item = await store.legal_document.findOne<ILegalDocument>(id, params);
  return item;
}

export async function getLegalDocuments(params: QueryParams = {}): Promise<ILegalDocument[]> {
  const store = await getStore<IModelStore>();
  const items = await store.legal_document.findMany<ILegalDocument>(params);
  return items;
}

export async function getLegalDocumentsPagination(params: QueryParams = {}): Promise<IPaginationResult<ILegalDocument>> {
  const store = await getStore<IModelStore>();
  const pagination = await store.legal_document.findPaged<ILegalDocument>(params);
  return pagination;
}
