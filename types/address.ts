import { EAddress } from "constants/address";

export interface IAddress {
  [EAddress.PostalCode]: string | undefined
  [EAddress.City]: string | undefined
  [EAddress.District]: string | undefined
  [EAddress.State]: string | undefined
  [EAddress.Coordinates]: number[]
  [EAddress.FullAddress]: string | undefined
}