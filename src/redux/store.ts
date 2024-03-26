import { configureStore } from '@reduxjs/toolkit'
import { playerReducer } from './slices'
import { playerState } from '@/dataModels'

export interface Istore {
  player: playerState
}

export default configureStore({
  reducer: {
    player: playerReducer
  }
})
