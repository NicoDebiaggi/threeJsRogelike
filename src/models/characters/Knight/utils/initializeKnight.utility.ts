import { useAnimations } from '@react-three/drei'
import { MutableRefObject, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as THREE from 'three'

import { animationIndexDictionary } from '@/dataModels'
import { setAnimations, setHandSlotsFullList, setHitPlaying, setNextAnimationIndex, setToogableElements } from '@/redux/slices'
import { Istore } from '@/redux/store'

import { GLTFAction, GLTFResult } from '../Knight.character'

interface initializeKightProps {
  group: MutableRefObject<THREE.Group | null>
  animations: THREE.AnimationClip[] & GLTFAction[]
  nodes: GLTFResult['nodes']
}

export const initializeKnight = ({ group, animations, nodes }: initializeKightProps) => {
  const dispatch = useDispatch()
  const { animationIndex, toogableElements, handSlots, animationDuration, nextAnimationIndex, hitPlaying, blockPlaying } = useSelector(
    (state: Istore) => state.player
  )
  const { actions, names } = useAnimations(animations, group)
  const FADE_DURATION = 0.5
  const hitAnimationIndex = animationIndexDictionary['1H_Melee_Attack_Slice_Diagonal']
  const blockAnimationIndex = animationIndexDictionary.Blocking

  // set the list of animations
  useEffect(() => {
    dispatch(setAnimations(names))
  }, [names])
  // play the animation at the current index
  useEffect(() => {
    const currentAction = actions[names[animationIndex]]
    const nextAction = actions[names[nextAnimationIndex]]
    currentAction?.setDuration(animationDuration)
    if (nextAnimationIndex === -1 && currentAction) {
      // stop all the animations and play the current animation index filter the hit and block animations
      const filteredActions = Object.values(actions).filter(
        action => action !== actions[names[hitAnimationIndex]] && action !== actions[names[blockAnimationIndex]]
      )
      Object.values(filteredActions).forEach(action => action && action.fadeOut(FADE_DURATION))

      currentAction.reset().fadeIn(FADE_DURATION).play()
    } else if (currentAction && nextAction) {
      currentAction.repetitions = 0
      // stop all the animations and play the current animation index filter the hit and block animations
      const filteredActions = Object.values(actions).filter(action => action !== currentAction && action !== nextAction)
      Object.values(filteredActions).forEach(action => action && action.fadeOut(FADE_DURATION))

      // play only once the current animation index after that play the next animation index
      currentAction
        .reset()
        .fadeIn(FADE_DURATION)
        .play()
        .getMixer()
        .addEventListener('finished', () => {
          currentAction.crossFadeTo(nextAction, FADE_DURATION, true).play()
          dispatch(setNextAnimationIndex(-1))
        })
    }
    return () => {
      actions[names[animationIndex]]?.fadeOut(FADE_DURATION)
    }
  }, [animationIndex])

  useEffect(() => {
    const hitAction = actions[names[hitAnimationIndex]]
    if (hitPlaying && hitAction) {
      hitAction.repetitions = 0
      hitAction
        .reset()
        .fadeIn(FADE_DURATION)
        .play()
        .getMixer()
        .addEventListener('finished', () => {
          dispatch(setHitPlaying(false))
        })
    } else hitAction?.fadeOut(FADE_DURATION)
  }, [hitPlaying])

  useEffect(() => {
    const blockAction = actions[names[blockAnimationIndex]]
    if (blockPlaying && blockAction) {
      blockAction.reset().fadeIn(FADE_DURATION).play()
    } else blockAction?.fadeOut(FADE_DURATION)
  })

  // set the toogable elements
  useEffect(() => {
    const toogableElements = {
      Knight_Helmet: nodes.Knight_Helmet.visible,
      Knight_Cape: nodes.Knight_Cape.visible
    }
    if (Object.keys(toogableElements).length > 0) dispatch(setToogableElements(toogableElements))
  }, [nodes, setToogableElements])
  // listen for changes in the toogable elements
  useEffect(() => {
    nodes.Knight_Helmet.visible = toogableElements.Knight_Helmet
    nodes.Knight_Cape.visible = toogableElements.Knight_Cape
  }, [toogableElements])

  // set the hand slots
  useEffect(() => {
    const newHandSlots = {
      handRightSlot: nodes.handslotr.children.map(child => child.name),
      handLeftSlot: nodes.handslotl.children.map(child => child.name)
    }
    dispatch(setHandSlotsFullList(newHandSlots))
  }, [nodes, setHandSlotsFullList])
  // clear the hand slots at first render
  useEffect(() => {
    nodes.handslotl.clear()
    nodes.handslotr.clear()
  }, [])
  // listen for changes in the hand slots
  useEffect(() => {
    const handRightSlotNode = nodes.handslotr
    handRightSlotNode.clear()
    type NodeKeys = keyof typeof nodes
    if (!handSlots.handRightSlot) return
    // if handRightSlot is included in nodeKeys, add it to the handRightSlotNode
    if (Object.keys(nodes).includes(handSlots.handRightSlot)) {
      handRightSlotNode.add(nodes[handSlots.handRightSlot as NodeKeys])
    } else if (handSlots.handRightSlot === '') handRightSlotNode.clear()
  }, [handSlots.handRightSlot])
  useEffect(() => {
    const handLeftSlot = nodes.handslotl
    handLeftSlot.clear()
    type NodeKeys = keyof typeof nodes
    if (!handSlots.handLeftSlot) return
    // if handLeftSlot is included in nodeKeys, add it to the handLeftSlotNode
    if (Object.keys(nodes).includes(handSlots.handLeftSlot)) {
      handLeftSlot.add(nodes[handSlots.handLeftSlot as NodeKeys])
    } else if (handSlots.handLeftSlot === '') handLeftSlot.clear()
  }, [handSlots.handLeftSlot])
}
