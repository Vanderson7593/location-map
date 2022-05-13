import { EForm } from "constants/form";
import { IAddress } from "redux/app/app.types";

export interface IForm {
  [EForm.Message]: string
  [EForm.CPF]: string
  [EForm.Email]: string
  [EForm.Name]: string
  [EForm.Address]: IAddress
}