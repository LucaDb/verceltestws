import { ICategorized, IOption } from '@websolutespa/bom-core';

export type IColorOption = IOption & {
  color: string;
};

export type IContactForm = {
  service: IOption[];
  budget: IOption[];
  request: IOption[];
  color: IColorOption[];
};

export type IContact = ICategorized & {
  slug: string;
  title?: string;
  abstract?: string;
  description?: string;
  href?: string;
  options: IContactForm;
};

export type IContactFormSubmit = {
  // info
  fullName: string;
  companyName: string;
  companyArea: string;
  email: string;
  // project
  service: string[];
  budget: string;
  request: string;
  message: string;
  color: string;
  //
  privacy: boolean;
  checkField: string; // should be empty on submission
};
