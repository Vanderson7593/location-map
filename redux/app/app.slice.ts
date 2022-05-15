import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppState } from './app.types'
import { IAddress } from "@types";

export const initialState: AppState = {
  address: null,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAddress: (state, { payload }: PayloadAction<IAddress | null>) => {
      state.address = payload
    },
  },
})

export const { setAddress } = appSlice.actions

export default appSlice.reducer