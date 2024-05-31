import { IComponent } from '../component/component';

export type ITextColumns = IComponent & {
  layout?: 'center' | 'left';
  eyelet?: string;
  title?: string;
  abstract?: string;
  description?: string;
  items?: ITextColumn[];
};

export type ITextColumn = {
  counter?: number;
  title?: string;
  abstract?: string;
  description?: string,
};
