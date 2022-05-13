import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppState, IAddress } from './app.types'

export const initialState: AppState = {
  address: { coordinates: null, fullAddress: null },
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