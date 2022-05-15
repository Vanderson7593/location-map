import { EForm } from "@constants";
import { IAddress } from "@types";

export interface IForm {
  [EForm.Message]: string
  [EForm.CPF]: string
  [EForm.Email]: string
  [EForm.Name]: string
  [EForm.Address]: IAddress
}