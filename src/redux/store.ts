import { configureStore } from '@reduxjs/toolkit'

import { playerState } from '@/dataModels'

import { playerReducer } from './slices'

export interface Istore {
  player: playerState
}

export default configureStore({
  reducer: {
    player: playerReducer
  }
})
