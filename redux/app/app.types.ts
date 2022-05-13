export interface IAddress {
  coordinates: number[] | null
  fullAddress: string | null
}

export interface AppState {
  address: IAddress | null
}

