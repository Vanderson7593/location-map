import { EAddress } from "constants/address";

export interface IAddress {
  [EAddress.CEP]: string
  [EAddress.City]: string
  [EAddress.District]: string
  [EAddress.State]: string
  [EAddress.Street]: string
  [EAddress.Coordinates]: number[]
}