import { AppThunk } from "../store";
import { setAddress as sliceSetAddress, setShapes as sliceSetShapes } from "./app.slice";
import { IAddress, ICoordinates, IMapShape } from "@types";

export const setAddress = (address: IAddress | null): AppThunk => async (dispatch) => {
  dispatch(sliceSetAddress(address))
}

export const setShapes = (shapes: IMapShape[]): AppThunk => async (dispatch) => {
  dispatch(sliceSetShapes(shapes))
}