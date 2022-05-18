import { EAddress, ECoordinates } from "@constants";


export type ICoordinates = {
  [ECoordinates.Lat]: number
  [ECoordinates.Lng]: number
}

export interface IMapShape {
  id: string
  coordinates: Array<ICoordinates>
}

export interface IAddress {
  [EAddress.PostalCode]: string | undefined
  [EAddress.City]: string | undefined
  [EAddress.District]: string | undefined
  [EAddress.State]: string | undefined
  [EAddress.Coordinates]: ICoordinates
  [EAddress.FullAddress]: string | undefined
}