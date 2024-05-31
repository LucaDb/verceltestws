import { IMedia } from "@websolutespa/bom-core";

export type ITextHover = {
  children?: React.ReactNode;
  index: number;
  setModal: React.Dispatch<React.SetStateAction<{ active: boolean; index: number }>>
};

export type ITextHoverModal<T extends ITextHoverMedia> = {
  modal: ITextHoverModalItem;
  items: T[];
}

export type ITextHoverModalItem = {
  active: boolean;
  index: number;
}

export interface ITextHoverMedia {
  gallery: IMedia[];
}