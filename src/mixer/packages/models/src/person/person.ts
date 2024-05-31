import { IEntity } from '@websolutespa/bom-core';
import { ICompany } from '../company/company';
import { IWorkRole } from '../work_role/work_role';

export type IPerson = IEntity & {
  firstName: string;
  lastName: string;
  fullName: string;
  role: IWorkRole;
  company?: ICompany;
};

export function getAuthorText(author: IPerson, roleSeparator = ' • ') {
  let text = author.fullName;

  if (author.company) {
    text += ` ${author.company.title}`;
  }

  if (author.role) {
    text += `${roleSeparator}${author.role.title}`;
  }

  return text;
}
