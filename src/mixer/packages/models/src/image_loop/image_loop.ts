import { IMedia } from "@websolutespa/bom-core";

export type IImageLoop = {
  items?: IMedia[];
  speed?: number;
  aspectRatio?: number;
  cover?: boolean;
  scale?: boolean;
};

