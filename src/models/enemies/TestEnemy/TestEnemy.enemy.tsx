import { InteractionGroupsDictionary } from '@/dataModels'
import { Istore } from '@/redux'
import { removeEnemy, setEnemyHp, setEnemyPosition } from '@/redux/slices'
import { useFrame } from '@react-three/fiber'
import { CapsuleCollider, CylinderCollider, RapierRigidBody, RigidBody, interactionGroups } from '@react-three/rapier'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as THREE from 'three'

interface TestEnemyProps {
  enemyId: string
  initialPosition: { x: number; y: number; z: number }
  hp: number
}
const { Map, Default, EnemyRange, Enemy, Player, Weapon } = InteractionGroupsDictionary

export const TestEnemy = ({ enemyId, initialPosition, hp }: TestEnemyProps) => {
  const [enemyPosition, setLocalEnemyPosition] = useState<THREE.Vector3>(
    new THREE.Vector3(initialPosition.x, initialPosition.y, initialPosition.z)
  )
  const [onHitCooldown, setOnHitCooldown] = useState<boolean>(false)
  const [onRange, setOnRange] = useState<boolean>(false)
  const enemyRef = useRef<RapierRigidBody>(null)
  const dispatch = useDispatch()
  const playerPosition = useSelector((state: Istore) => state.player.position)

  const playerPos = new THREE.Vector3(playerPosition.x, playerPosition.y, playerPosition.z)
  const enemyPos = new THREE.Vector3(enemyPosition?.x, enemyPosition?.y, enemyPosition?.z)
  const direction = playerPos.sub(enemyPos).normalize()

  const getPosition = ({ enemyPos, playerPos }: { enemyPos: THREE.Vector3; playerPos: THREE.Vector3 }) => {
    return enemyPos.lerp(playerPos, 0.009)
  }

  useFrame(() => {
    const position = enemyRef.current?.translation()
    if (position && !onRange) {
      //move the enemy towards the player
      const lerp = getPosition({
        enemyPos: new THREE.Vector3(position.x, position.y, position.z),
        playerPos: new THREE.Vector3(playerPosition.x, playerPosition.y, playerPosition.z)
      })
      enemyRef.current?.setTranslation(lerp, true)

      if (enemyPosition && enemyPosition.distanceTo(new THREE.Vector3(position.x, position.y, position.z)) < 0.01) return
      setLocalEnemyPosition(new THREE.Vector3(position.x, position.y, position.z))
      dispatch(setEnemyPosition({ id: enemyId, position: { x: position.x, y: position.y, z: position.z } }))
    }
  })

  const handleHit = (weaponDamage: number) => {
    //applyImpulse to enemy further away from player
    const opositeDirection = direction.clone().negate()
    enemyRef.current?.applyImpulse({ x: opositeDirection.x * 100, y: 0, z: opositeDirection.z * 100 }, true)

    if (onHitCooldown) return
    setOnHitCooldown(true)
    setTimeout(() => setOnHitCooldown(false), 1000)
    const newHp = hp - weaponDamage
    if (newHp <= 0) {
      dispatch(removeEnemy(enemyId))
      return
    }
    dispatch(setEnemyHp({ id: enemyId, hp: newHp }))
  }

  return (
    <group>
      <CylinderCollider
        sensor
        args={[1.1, 3]}
        position={[initialPosition.x, initialPosition.y + 2.2, initialPosition.z]}
        collisionGroups={interactionGroups(EnemyRange, [Player, Default])}
        name='enemyRange'
        onIntersectionEnter={e => {
          if (e.colliderObject?.name === 'player') {
            setOnRange(true)
            console.log('Player in range')
            //atack fn
          }
        }}
        onIntersectionExit={e => {
          if (e.colliderObject?.name === 'player') {
            setOnRange(false)
            console.log('Player out of range')
          }
        }}
      />
      <RigidBody
        name={enemyId}
        ref={enemyRef}
        type='dynamic'
        enabledRotations={[false, true, false]}
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
        <mesh position={[0, 0.5, 0]}>
          <capsuleGeometry args={[0.7, 0.7, 32]} />
          <meshStandardMaterial color='red' />
        </mesh>
      </RigidBody>
    </group>
  )
}
