import { AppThunk } from "../store";
import { setAddress as sliceSetAddress } from "./app.slice";
import { IAddress } from "./app.types";

export const setAddress = (address: IAddress): AppThunk => async (dispatch) => {
  dispatch(sliceSetAddress(address))
}