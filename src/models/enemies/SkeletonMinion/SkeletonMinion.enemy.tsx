import { InteractionGroupsDictionary } from '@/dataModels'
import { Istore } from '@/redux'
import { removeEnemy, setEnemyHp, setEnemyPosition, setIsFullySpawned } from '@/redux/slices'
import { useFrame } from '@react-three/fiber'
import { CapsuleCollider, CylinderCollider, RapierRigidBody, RigidBody, interactionGroups } from '@react-three/rapier'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as THREE from 'three'
import { SkeletonMinionModel } from './SkeletonMinion.model'
import { ActionNameSkeletonMinion } from './SkeletonMinion.dataModel'

interface SkeletonMinionProps {
  enemyId: string
  initialPosition: { x: number; y: number; z: number }
  hp: number
}
const { Map, Default, EnemyRange, Enemy, Player, Weapon } = InteractionGroupsDictionary

export const SkeletonMinion = ({ enemyId, initialPosition, hp }: SkeletonMinionProps) => {
  const [enemyPosition, setLocalEnemyPosition] = useState<THREE.Vector3>(
    new THREE.Vector3(initialPosition.x, initialPosition.y, initialPosition.z)
  )
  const [isDead, setIsDead] = useState<boolean>(false)
  const [lookAtPlayer, setLookAtPlayer] = useState<boolean>(false)
  const [onHitCooldown, setOnHitCooldown] = useState<boolean>(false)
  const [onRange, setOnRange] = useState<boolean>(false)
  const [finishSpawn, setFinishSpawn] = useState<boolean>(false)
  const [animationSelected, setAnimationSelected] = useState<ActionNameSkeletonMinion>('Spawn_Ground_Skeletons')
  const [meshYOffset, setMeshYOffset] = useState<number>(-0.75)
  const enemyRef = useRef<RapierRigidBody>(null)
  const dispatch = useDispatch()
  const playerPosition = useSelector((state: Istore) => state.player.position)

  const playerPos = new THREE.Vector3(playerPosition.x, playerPosition.y, playerPosition.z)
  const enemyPos = new THREE.Vector3(enemyPosition?.x, enemyPosition?.y, enemyPosition?.z)
  const direction = playerPos.sub(enemyPos).normalize()

  useEffect(() => {
    //spawn animation
    //TODO: add particle effect on spawn and on death
    setTimeout(() => {
      setFinishSpawn(true)
      setAnimationSelected('Walking_D_Skeletons')
      dispatch(setIsFullySpawned({ id: enemyId, isFullySpawned: true }))
    }, 3100)
  }, [])

  const onKill = () => {
    setIsDead(true)
    setAnimationSelected('Skeletons_Inactive_Floor_Pose')
    lookAtPlayer && setLookAtPlayer(false)
    //move enemy down to the ground
    let localMeshYOffset = meshYOffset
    setInterval(() => {
      const newMeshYOffset = localMeshYOffset - 0.02
      localMeshYOffset = newMeshYOffset
      setMeshYOffset(newMeshYOffset)
      if (newMeshYOffset < -1.2) {
        dispatch(removeEnemy(enemyId))
        return
      }
    }, 100)
  }

  useFrame(() => {
    const speed = 0.1
    const position = enemyRef.current?.translation()
    if (position && !onRange && finishSpawn && !isDead) {
      if (position.y < -2) {
        onKill()
        return
      }
      const newPosition = new THREE.Vector3(position.x + direction.x * speed, position.y, position.z + direction.z * speed)
      enemyRef.current?.setTranslation(newPosition, true)

      if (enemyPosition && enemyPosition.distanceTo(new THREE.Vector3(position.x, position.y, position.z)) < 0.01) return
      setLocalEnemyPosition(new THREE.Vector3(position.x, position.y, position.z))
      dispatch(setEnemyPosition({ id: enemyId, position: { x: position.x, y: position.y, z: position.z } }))
    }
    if (finishSpawn && !lookAtPlayer && !isDead) {
      setLookAtPlayer(true)
    }
    // if distanceTo player is more than 1.5, setOnRange to false
    if (enemyPosition) {
      if (enemyPosition.distanceTo(playerPos) > 3 && onRange && !isDead) {
        setOnRange(false)
      }
      if (enemyPosition.distanceTo(playerPos) <= 3 && !onRange && !isDead) {
        setOnRange(true)
      }
    }
  })

  //TODO: enemies stop moving when player isnt moving, the problem is that distanceToPlayer is not being updated
  //TODO: performance issue when the program runs for a long time
  const handleHit = (weaponDamage: number) => {
    if (isDead) return
    //applyImpulse to enemy further away from player
    const opositeDirection = direction.clone().negate()
    const impulseVec = new THREE.Vector3(opositeDirection.x, 0, opositeDirection.z)
    enemyRef.current?.applyImpulse(impulseVec.multiplyScalar(50), true)

    if (onHitCooldown) return
    setOnHitCooldown(true)
    setTimeout(() => setOnHitCooldown(false), 1000)
    const newHp = hp - weaponDamage
    dispatch(setEnemyHp({ id: enemyId, hp: newHp }))
    if (newHp <= 0) onKill()
  }

  return (
    <group>
      <CylinderCollider
        sensor
        args={[1.1, 3]}
        position={[enemyPosition.x, enemyPosition.y + 2.2, enemyPosition.z]}
        collisionGroups={interactionGroups(EnemyRange, [Player, Default])}
        name='enemyRange'
        onIntersectionEnter={e => {
          if (e.colliderObject?.name === 'player') {
            console.log('Player in range')
            //atack fn
          }
        }}
        onIntersectionExit={e => {
          if (e.colliderObject?.name === 'player') {
            console.log('Player out of range')
          }
        }}
      />
      <RigidBody
        name={enemyId}
        ref={enemyRef}
        type='dynamic'
        enabledRotations={[false, false, false]}
        position={[initialPosition.x, initialPosition.y, initialPosition.z]}
        colliders={false}
        onIntersectionEnter={event => {
          if (event.colliderObject?.name === 'weapon') {
            const { weaponAtacking, weaponDamage } = event.rigidBodyObject?.userData as { weaponAtacking: boolean; weaponDamage: number }
            if (weaponAtacking === false) return
            handleHit(weaponDamage)
          }
        }}
      >
        <CapsuleCollider
          collisionGroups={interactionGroups(Enemy, [Map, Weapon, Default, Enemy])}
          args={[0.55, 0.65]}
          position={[0, 0.5, 0]}
          name='enemy'
        />
        <SkeletonMinionModel
          lookAt={lookAtPlayer ? [playerPosition.x, playerPosition.y, playerPosition.z] : null}
          animationSelected={animationSelected}
          position={[0, meshYOffset, 0]}
        />
      </RigidBody>
    </group>
  )
}
