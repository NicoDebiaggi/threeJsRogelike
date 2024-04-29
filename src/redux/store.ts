import { configureStore } from '@reduxjs/toolkit'

import { enemyState, playerState } from '@/dataModels'

import { enemiesReducer, playerReducer } from './slices'

export interface Istore {
  player: playerState
  enemies: enemyState[]
}

export default configureStore({
  reducer: {
    player: playerReducer,
    enemies: enemiesReducer
  }
})
