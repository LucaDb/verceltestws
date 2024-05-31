import { IMedia } from "@websolutespa/bom-core";
import { IComponent } from "../component/component";

export type ICoverMain = IComponent & {
    title?: string;
    items?: IMedia[];
};