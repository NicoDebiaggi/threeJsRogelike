import { createSlice } from '@reduxjs/toolkit'

import { enemyState } from '@/dataModels'

const initialState: enemyState[] = []

export const enemiesSlice = createSlice({
  name: 'enemies',
  initialState,
  reducers: {
    addEnemy: (state, action) => {
      state.push(action.payload)
    },
    removeEnemy: (state, action) => {
      const enemyIndex = state.findIndex((enemy) => enemy.id === action.payload)
      if (enemyIndex >= 0) state.splice(enemyIndex, 1)
    },
    setEnemyHp: (state, action) => {
      const enemyFound = state.find((enemy) => enemy.id === action.payload.id)
      if (enemyFound) enemyFound.hp = action.payload.hp
    },
    setEnemyPosition: (state, action) => {
      const enemyFound = state.find((enemy) => enemy.id === action.payload.id)
      if (enemyFound) enemyFound.position = action.payload.position
    },
    setEnemyRotation: (state, action) => {
      const enemyFound = state.find((enemy) => enemy.id === action.payload.id)
      if (enemyFound) enemyFound.rotation = action.payload.rotation
    },
    setIsFullySpawned: (state, action) => {
      const enemyFound = state.find((enemy) => enemy.id === action.payload.id)
      if (enemyFound) enemyFound.isFullySpawned = action.payload.isFullySpawned
    }
  }
})

export const {
  addEnemy,
  removeEnemy,
  setEnemyHp,
  setEnemyPosition,
  setEnemyRotation,
  setIsFullySpawned
} = enemiesSlice.actions

export default enemiesSlice.reducer