import { ILayout } from '@websolutespa/bom-core';
import { FC, ReactNode } from 'react';

export type IEmailSharedProps = {
  origin: string;
  layout: ILayout;
  subscriptionEmail?: string;
  isNewsletter?: boolean;
  preview?: string;
};

export type IEmailAppProps<T> = IEmailSharedProps & {
  Component: IEmailComponent<T>;
  props: T;
};

export type IEmailAppComponent<T = any> = FC<Readonly<IEmailAppProps<T>>>;

export type IEmailLayoutProps<T> = IEmailSharedProps & {
  Component: IEmailComponent<T>;
  props: T;
};

export type IEmailLayoutComponent = FC<Readonly<IEmailSharedProps & { children: ReactNode }>>;

export type IEmailComponent<T> = FC<Readonly<IEmailSharedProps & { props: T }>> & {
  Layout?: IEmailLayoutComponent;
};
