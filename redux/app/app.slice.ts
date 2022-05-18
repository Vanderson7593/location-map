import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppState } from './app.types'
import { IAddress, ICoordinates, IMapShape } from "@types";

export const initialState: AppState = {
  address: null,
  shapes: null
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAddress: (state, { payload }: PayloadAction<IAddress | null>) => {
      state.address = payload
    },
    setShapes: (state, { payload }: PayloadAction<IMapShape[]>) => {
      state.shapes = payload
    },
  },
})

export const { setAddress, setShapes } = appSlice.actions

export default appSlice.reducer