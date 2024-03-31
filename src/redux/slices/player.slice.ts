import { createSlice } from '@reduxjs/toolkit'

import { playerState } from '@/dataModels'

const initialState: playerState = {
  animations: [],
  nextAnimationIndex: -1,
  animationIndex: 36,
  animationDuration: 0.6,
  dashAmount: 1,
  dashCooldown: 1,
  particlesActive: false,
  toogableElements: {},
  handSlotsFullList: {
    handRightSlot: [],
    handLeftSlot: []
  },
  handSlots: {
    handRightSlot: '',
    handLeftSlot: ''
  },
  position: { x: 0, y: 0, z: 0 }
}

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setAnimationIndex: (state, action) => {
      state.animationIndex = action.payload
    },
    setNextAnimationIndex: (state, action) => {
      state.nextAnimationIndex = action.payload
    },
    setAnimations: (state, action) => {
      state.animations = action.payload
    },
    setAnimationDuration: (state, action) => {
      state.animationDuration = action.payload
    },
    setToogableElements: (state, action) => {
      state.toogableElements = { ...state.toogableElements, ...action.payload }
    },
    setHandSlotsFullList: (state, action) => {
      state.handSlotsFullList = action.payload
    },
    setHandSlots: (state, action) => {
      state.handSlots = { ...state.handSlots, ...action.payload }
    },
    setPosition: (state, action) => {
      state.position = action.payload
    },
    setParticlesActive: (state, action) => {
      state.particlesActive = action.payload
    }
  }
})

export const {
  setAnimationIndex,
  setAnimations,
  setNextAnimationIndex,
  setAnimationDuration,
  setToogableElements,
  setHandSlotsFullList,
  setHandSlots,
  setPosition,
  setParticlesActive
} = playerSlice.actions

export default playerSlice.reducer
