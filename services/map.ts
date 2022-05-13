import { IForm } from "@types";
import { http } from "services";

export interface ICreateLocation extends IForm { }

export const createLocation = async (data: ICreateLocation) => await http.post('/location-form', data)