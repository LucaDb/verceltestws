import { ICategorized, IMedia } from '@websolutespa/bom-core';

export type INewsletter = ICategorized & {
  slug: string;
  title: string;
  abstract: string;
  description: string;
  href: string;
  media: IMedia;
};

export type INewsletterFormSubmit = {
  fullName: string;
  email: string;
  privacy: boolean;
  checkField: string; // should be empty on submission
};
