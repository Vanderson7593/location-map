import { EForm } from "constants/form";

export interface IForm {
  [EForm.Message]: string
  [EForm.CPF]: string
  [EForm.Email]: string
  [EForm.Name]: string
  [EForm.Address]: string
}