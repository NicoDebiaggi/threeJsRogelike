import { useKeyboardControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { euler, quat, RapierRigidBody } from '@react-three/rapier'
import { Dispatch, UnknownAction } from '@reduxjs/toolkit'
import { RefObject } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { animationIndexDictionary, Controls } from '@/dataModels'
import { Istore } from '@/redux'
import { setAnimationDuration, setAnimationIndex, setBlockPlaying, setHitPlaying, setNextAnimationIndex, setPosition } from '@/redux/slices'

const handleMovement = ({
  body,
  isOnFloor,
  JUMP_FORCE,
  MOVE_SPEED,
  MAX_SPEED,
  get,
  dispatch,
  animationIndex,
  position,
  hitPlaying,
  blockPlaying
}: {
  body: RefObject<RapierRigidBody>
  isOnFloor: boolean
  JUMP_FORCE: number
  MOVE_SPEED: number
  MAX_SPEED: number
  get: () => any
  dispatch: Dispatch<UnknownAction>
  animationIndex: number
  position: { x: number; y: number; z: number }
  hitPlaying: boolean
  blockPlaying: boolean
}) => {
  const currentPosition = body.current?.translation() || { x: 0, y: 0, z: 0 }
  if (currentPosition.x !== position.x || currentPosition.z !== position.z || currentPosition.y !== position.y) {
    dispatch(setPosition({ x: currentPosition.x, y: currentPosition.y, z: currentPosition.z }))
  }
  const impulse = { x: 0, y: 0, z: 0 }
  const keysPressed = get()
  const linvel = body.current?.linvel()
  const resultantForce = linvel ? Math.sqrt(linvel.x ** 2 + linvel.z ** 2) : 0
  let changeRotation = false

  if (isOnFloor && keysPressed.jump) {
    const eulerRot = euler().setFromQuaternion(quat(body.current?.rotation()), 'YXZ')
    impulse.x = Math.sin(eulerRot.y) * JUMP_FORCE
    impulse.z = Math.cos(eulerRot.y) * JUMP_FORCE
    impulse.y = JUMP_FORCE / 2
    body.current?.setAngvel({ x: 0, y: 0, z: 0 }, true)
    dispatch(setAnimationDuration(1))
    dispatch(setAnimationIndex(animationIndexDictionary.Roll_Forward))
    dispatch(setNextAnimationIndex(animationIndexDictionary.Jump_Idle))
  } else {
    if (keysPressed.attack && !hitPlaying && !blockPlaying && isOnFloor) {
      dispatch(setHitPlaying(true))
    }
    /* if (!keysPressed.attack && hitPlaying) dispatch(setHitPlaying(false)) */
    if (keysPressed.block && !hitPlaying && !blockPlaying && isOnFloor) {
      dispatch(setBlockPlaying(true))
    }
    if ((!keysPressed.block && blockPlaying) || !isOnFloor) dispatch(setBlockPlaying(false))
    if (resultantForce < MAX_SPEED && isOnFloor) {
      dispatch(setAnimationDuration(1))
      dispatch(setNextAnimationIndex(-1))
      if (keysPressed.forward && !keysPressed.backward && !keysPressed.left && !keysPressed.right) {
        animationIndex !== animationIndexDictionary.Running_A && dispatch(setAnimationIndex(animationIndexDictionary.Running_A))
        impulse.z += MOVE_SPEED
        changeRotation = true
      }
      if (keysPressed.backward && !keysPressed.forward && !keysPressed.left && !keysPressed.right) {
        animationIndex !== animationIndexDictionary.Running_A && dispatch(setAnimationIndex(animationIndexDictionary.Running_A))
        impulse.z -= MOVE_SPEED
        changeRotation = true
      }
      if (keysPressed.left && !keysPressed.forward && !keysPressed.backward && !keysPressed.right) {
        animationIndex !== animationIndexDictionary.Running_A && dispatch(setAnimationIndex(animationIndexDictionary.Running_A))
        impulse.x += MOVE_SPEED
        changeRotation = true
      }
      if (keysPressed.right && !keysPressed.forward && !keysPressed.backward && !keysPressed.left) {
        animationIndex !== animationIndexDictionary.Running_A && dispatch(setAnimationIndex(animationIndexDictionary.Running_A))
        impulse.x -= MOVE_SPEED
        changeRotation = true
      }
      if (keysPressed.forward && keysPressed.left && !keysPressed.backward && !keysPressed.right) {
        animationIndex !== animationIndexDictionary.Running_A && dispatch(setAnimationIndex(animationIndexDictionary.Running_A))
        impulse.z += MOVE_SPEED
        impulse.x += MOVE_SPEED
        changeRotation = true
      }
      if (keysPressed.forward && keysPressed.right && !keysPressed.backward && !keysPressed.left) {
        animationIndex !== animationIndexDictionary.Running_A && dispatch(setAnimationIndex(animationIndexDictionary.Running_A))
        impulse.z += MOVE_SPEED
        impulse.x -= MOVE_SPEED
        changeRotation = true
      }
      if (keysPressed.backward && keysPressed.left && !keysPressed.forward && !keysPressed.right) {
        animationIndex !== animationIndexDictionary.Running_A && dispatch(setAnimationIndex(animationIndexDictionary.Running_A))
        impulse.z -= MOVE_SPEED
        impulse.x += MOVE_SPEED
        changeRotation = true
      }
      if (keysPressed.backward && keysPressed.right && !keysPressed.forward && !keysPressed.left) {
        animationIndex !== animationIndexDictionary.Running_A && dispatch(setAnimationIndex(animationIndexDictionary.Running_A))
        impulse.z -= MOVE_SPEED
        impulse.x -= MOVE_SPEED
        changeRotation = true
      }
      if (((keysPressed.forward && keysPressed.backward) || (keysPressed.left && keysPressed.right)) && isOnFloor) {
        dispatch(setAnimationDuration(1))
        dispatch(setNextAnimationIndex(-1))
        dispatch(setAnimationIndex(animationIndexDictionary.Idle))
        changeRotation = false
        body.current?.setAngvel({ x: 0, y: 0, z: 0 }, true)
      }
    }
    if (!keysPressed.forward && !keysPressed.backward && !keysPressed.left && !keysPressed.right && isOnFloor) {
      body.current?.setAngvel({ x: 0, y: 0, z: 0 }, true)
      changeRotation = false
      if (animationIndex !== animationIndexDictionary.Idle) {
        dispatch(setAnimationDuration(1))
        dispatch(setNextAnimationIndex(-1))
        dispatch(setAnimationIndex(animationIndexDictionary.Idle))
      }
    }
  }

  return { impulse, changeRotation }
}

const getDiff = (target: number, source: number) => {
  const a = Math.atan2(Math.sin(target - source), Math.cos(target - source))
  return (a * 180) / Math.PI
}

const handleRotation = ({
  impulse,
  body,
  TORQUE_MULTIPLIER
}: {
  impulse: { x: number; y: number; z: number }
  body: RefObject<RapierRigidBody>
  TORQUE_MULTIPLIER: number
}) => {
  if (body.current) {
    const angle = Math.atan2(impulse.x, impulse.z)
    const eulerRot = euler().setFromQuaternion(quat(body.current.rotation()), 'YXZ')
    const diff = getDiff(angle, eulerRot.y)
    body.current.setAngvel({ x: 0, y: diff * TORQUE_MULTIPLIER, z: 0 }, true)
    if (Math.abs(diff) === 0) {
      body.current.setAngvel({ x: 0, y: 0, z: 0 }, true)
    }
  }
}

interface handlePlayerPhysicsProps {
  body: RefObject<RapierRigidBody>
  isOnFloor: boolean
}

export const handlePlayerPhysics = ({ body, isOnFloor }: handlePlayerPhysicsProps) => {
  const [_, get] = useKeyboardControls<Controls>()
  const dispatch = useDispatch()
  const { position, hitPlaying, blockPlaying } = useSelector((state: Istore) => state.player)
  const { animationIndex } = useSelector((state: Istore) => state.player)

  const JUMP_FORCE = 8
  const MOVE_SPEED = 4
  const MAX_SPEED = 8
  const TORQUE_MULTIPLIER = 0.2

  useFrame(() => {
    const { impulse, changeRotation } = handleMovement({
      body,
      isOnFloor,
      JUMP_FORCE,
      MOVE_SPEED,
      MAX_SPEED,
      get,
      dispatch,
      animationIndex,
      position,
      hitPlaying,
      blockPlaying
    })
    body.current?.applyImpulse(impulse, true)

    if (changeRotation) handleRotation({ impulse, body, TORQUE_MULTIPLIER })
  })
}
