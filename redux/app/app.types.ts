import { IAddress, ICoordinates, IMapShape } from "@types";

export interface AppState {
  address: IAddress | null
  shapes: Array<IMapShape> | null
}

