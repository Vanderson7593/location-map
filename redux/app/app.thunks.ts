import { AppThunk } from "../store";
import { setAddress as sliceSetAddress } from "./app.slice";
import { IAddress } from "@types";

export const setAddress = (address: IAddress): AppThunk => async (dispatch) => {
  dispatch(sliceSetAddress(address))
}