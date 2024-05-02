import * as THREE from 'three'
import { Float, useAnimations, useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { useSelector } from 'react-redux'
import { Istore } from '@/redux'
import { CuboidCollider, CylinderCollider, RigidBody, interactionGroups } from '@react-three/rapier'
import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { InteractionGroupsDictionary } from '@/dataModels'
import { swordAnimationIndexDictionary, calcFinalWeaponPosition, handleWeaponMovementFrame } from '.'

type ActionName = '2H_Sword_Idle' | '2H_Sword_VerticalSwing' | '2H_Sword_LeftDiagonalSwing' | '2H_Sword_RightDiagonalSwing'
interface GLTFAction extends THREE.AnimationClip {
  name: ActionName
}

type GLTFResult = GLTF & {
  nodes: {
    ['2H_Sword']: THREE.Mesh
  }
  materials: {
    knight_texture: THREE.MeshStandardMaterial
  }
  animations: GLTFAction[]
}

const { Default, Weapon, Enemy } = InteractionGroupsDictionary

const weaponRange = 2
const attackDuration = 700
const weaponDamage = 15

export const LongSword = (props: JSX.IntrinsicElements['group']) => {
  const group = useRef<THREE.Group>(null)
  const swordGroup = useRef<THREE.Group>(null)
  const animatedMeshRef = useRef<THREE.Mesh>(null)
  const { nodes, materials, animations } = useGLTF('./models/longSword.glb') as GLTFResult
  const { actions } = useAnimations(animations, swordGroup)

  const { position, rotation } = useSelector((state: Istore) => state.player)
  const playerPosition = new THREE.Vector3(position.x, position.y, position.z)
  const playerDirection = new THREE.Vector3(Math.sin(rotation.y), 0, Math.cos(rotation.y))

  const enemies = useSelector((state: Istore) => state.enemies)
  const [enemyPosition, setEnemyPosition] = useState<THREE.Vector3 | null>(null)
  const [idsEnemiesOnRange, setIdsEnemiesOnRange] = useState<string[]>([])
  const [lastEnemyAttacked, setLastEnemyAttacked] = useState<string | null>(null)

  const [weaponAttacking, setWeaponAttacking] = useState<boolean>(false)
  const [weaponPosition, setWeaponPosition] = useState<THREE.Vector3>(
    new THREE.Vector3(playerPosition.x, playerPosition.y, playerPosition.z - 1)
  )
  const [weaponRotation, setWeaponRotation] = useState<THREE.Euler>(new THREE.Euler(0, 0, 0))
  const [hitboxPosition, setHitboxPosition] = useState<THREE.Vector3>(new THREE.Vector3(0, 0, 0))
  const [hitboxRotation, setHitboxRotation] = useState<THREE.Euler>(new THREE.Euler(0, 0, 0))
  const [weaponAttackIndex, setWeaponAttackIndex] = useState<1 | 2 | 3>(1)

  const handleWeaponAttack = (attackDuration: number) => {
    const idle = actions['2H_Sword_Idle']
    const attackAnimation = actions[swordAnimationIndexDictionary[weaponAttackIndex] as ActionName]?.setDuration(attackDuration / 1000)
    idle?.stop()
    attackAnimation?.play()
    setTimeout(() => {
      idle?.play()
      attackAnimation?.stop()
      setWeaponAttackIndex(prev => (prev === 3 ? 1 : ((prev + 1) as 1 | 2 | 3)))
      setWeaponAttacking(false)
    }, attackDuration)
  }

  useFrame(() => {
    // force re-render of the hitbox
    setHitboxPosition(calcFinalWeaponPosition({ weaponPosition, weaponRotation, animatedMeshRef }).finalPosition)
    setHitboxRotation(calcFinalWeaponPosition({ weaponPosition, weaponRotation, animatedMeshRef }).finalRotation)

    // set enemyPosition to the closest enemy
    if (idsEnemiesOnRange.length > 0 && !weaponAttacking) {
      const enemiesOnRange = enemies
        .filter(enemy => idsEnemiesOnRange.includes(enemy.id))
        .filter(enemy => {
          // remove it from the list if it's dead
          if (enemy.hp <= 0 && lastEnemyAttacked === enemy.id) setEnemyPosition(null)
          return enemy.hp > 0
        })
        .filter(enemy => enemy.isFullySpawned)
      if (enemiesOnRange.length !== 0) {
        const closestEnemy = enemiesOnRange?.reduce((prev, current) => {
          const prevDistance = playerPosition.distanceTo(new THREE.Vector3(prev.position.x, prev.position.y, prev.position.z))
          const currentDistance = playerPosition.distanceTo(new THREE.Vector3(current.position.x, current.position.y, current.position.z))
          return prevDistance < currentDistance ? prev : current
        })
        setLastEnemyAttacked(closestEnemy.id)
        const newEnemyPosition = new THREE.Vector3(closestEnemy.position.x, closestEnemy.position.y, closestEnemy.position.z)
        if (enemyPosition !== newEnemyPosition) setEnemyPosition(newEnemyPosition)
      }
    } else if (!weaponAttacking) {
      setEnemyPosition(null)
    }

    //TODO: add shaders fx to the weapon while attacking
    //TODO: fix hitbox position and rotation

    // move the weapon to the enemy position
    if (enemyPosition) {
      const { newWeaponPosition, newWeaponRotation, weaponInPosition } = handleWeaponMovementFrame({
        playerPosition,
        enemyPosition,
        weaponPosition,
        weaponRotation,
        weaponRange
      })
      if (weaponPosition !== newWeaponPosition) {
        setWeaponPosition(newWeaponPosition)
      }
      if (weaponRotation !== newWeaponRotation) setWeaponRotation(newWeaponRotation)
      if (weaponInPosition && !weaponAttacking) {
        setWeaponAttacking(true)
        handleWeaponAttack(attackDuration)
      }
    }

    // move the weapon to the player position
    if (!enemyPosition && !weaponAttacking) {
      const opositeDirection = playerDirection.clone().negate()
      const newWeaponPosition = new THREE.Vector3(
        playerPosition.x + opositeDirection.x * 1.5,
        playerPosition.y + 1.5,
        playerPosition.z + opositeDirection.z * 1.5
      )
      const lerp = weaponPosition.lerp(newWeaponPosition, 0.1)
      setWeaponPosition(lerp)
    }
  })

  useEffect(() => {
    setIdsEnemiesOnRange(prev => prev.filter(id => enemies.map(enemy => enemy.id).includes(id)))
  }, [enemies.length])

  return (
    <group {...props} dispose={null} ref={group}>
      {/* range of attack detection */}
      <CylinderCollider
        sensor
        args={[1.1, 5]}
        position={[playerPosition.x, playerPosition.y + 2.2, playerPosition.z]}
        collisionGroups={interactionGroups(Weapon, [Enemy, Default])}
        name='weaponRange'
        onIntersectionEnter={e => {
          if (e.colliderObject?.name === 'enemy') {
            if (idsEnemiesOnRange.includes(e.rigidBodyObject?.name as string)) return
            setIdsEnemiesOnRange(prev => [...prev, e.rigidBodyObject?.name as string])
          }
        }}
        onIntersectionExit={e => {
          if (e.colliderObject?.name === 'enemy') {
            setIdsEnemiesOnRange(prev => prev.filter(enemy => enemy !== e.rigidBodyObject?.name))
            setEnemyPosition(null)
          }
        }}
      />
      <RigidBody
        type='fixed'
        position={hitboxPosition}
        rotation={hitboxRotation}
        sensor
        collisionGroups={interactionGroups(Weapon, [Enemy, Default])}
        name='weapon'
        colliders={false}
        userData={{
          weaponAttacking,
          weaponDamage
        }}
      >
        <CuboidCollider args={[0.3, 1.2, 0.1]} position={[0, 2.7, 0]} name='weapon' sensor />
      </RigidBody>
      <Float speed={7} rotationIntensity={0} floatIntensity={weaponAttacking ? 0 : 0.5} floatingRange={[0, 1]}>
        <group
          ref={swordGroup}
          position={[weaponPosition.x, weaponPosition.y + 1, weaponPosition.z]}
          rotation={[weaponRotation.x, weaponRotation.y * -1, weaponRotation.z]}
        >
          <mesh ref={animatedMeshRef} name='2H_Sword' geometry={nodes['2H_Sword'].geometry} material={materials.knight_texture} />
        </group>
      </Float>
    </group>
  )
}

useGLTF.preload('./models/longSword.glb')
