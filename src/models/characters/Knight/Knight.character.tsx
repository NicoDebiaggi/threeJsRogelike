import { useGLTF } from '@react-three/drei'
import { CapsuleCollider, euler, quat, RapierRigidBody, RigidBody } from '@react-three/rapier'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

import { handlePlayerPhysics, initializeKnight, ParticleSystem } from '../index'
import { useSelector } from 'react-redux'
import { Istore } from '@/redux'
import { ParticlesNebula } from './utils/ThreeNebulaTest'

export type GLTFResult = GLTF & {
  nodes: {
    ['1H_Sword_Offhand']: THREE.Mesh
    Badge_Shield: THREE.Mesh
    Rectangle_Shield: THREE.Mesh
    Round_Shield: THREE.Mesh
    Spike_Shield: THREE.Mesh
    ['1H_Sword']: THREE.Mesh
    ['2H_Sword']: THREE.Mesh
    Knight_Helmet: THREE.Mesh
    Knight_Cape: THREE.Mesh
    Knight_ArmLeft: THREE.SkinnedMesh
    Knight_ArmRight: THREE.SkinnedMesh
    Knight_Body: THREE.SkinnedMesh
    Knight_Head: THREE.SkinnedMesh
    Knight_LegLeft: THREE.SkinnedMesh
    Knight_LegRight: THREE.SkinnedMesh
    root: THREE.Bone
    handslotl: THREE.Bone
    handslotr: THREE.Bone
  }
  materials: {
    knight_texture: THREE.MeshStandardMaterial
  }
  animations: GLTFAction[]
}

type ActionName =
  | '1H_Melee_Attack_Chop'
  | '1H_Melee_Attack_Slice_Diagonal'
  | '1H_Melee_Attack_Slice_Horizontal'
  | '1H_Melee_Attack_Stab'
  | '1H_Ranged_Aiming'
  | '1H_Ranged_Reload'
  | '1H_Ranged_Shoot'
  | '1H_Ranged_Shooting'
  | '2H_Melee_Attack_Chop'
  | '2H_Melee_Attack_Slice'
  | '2H_Melee_Attack_Spin'
  | '2H_Melee_Attack_Spinning'
  | '2H_Melee_Attack_Stab'
  | '2H_Melee_Idle'
  | '2H_Ranged_Aiming'
  | '2H_Ranged_Reload'
  | '2H_Ranged_Shoot'
  | '2H_Ranged_Shooting'
  | 'Block_Attack'
  | 'Block_Hit'
  | 'Block'
  | 'Blocking'
  | 'Cheer'
  | 'Death_A_Pose'
  | 'Death_A'
  | 'Death_B_Pose'
  | 'Death_B'
  | 'Dodge_Backward'
  | 'Dodge_Forward'
  | 'Dodge_Left'
  | 'Dodge_Right'
  | 'Dualwield_Melee_Attack_Chop'
  | 'Dualwield_Melee_Attack_Slice'
  | 'Dualwield_Melee_Attack_Stab'
  | 'Hit_A'
  | 'Hit_B'
  | 'Idle'
  | 'Interact'
  | 'Jump_Full_Long'
  | 'Jump_Full_Short'
  | 'Jump_Idle'
  | 'Jump_Land'
  | 'Jump_Start'
  | 'Lie_Down'
  | 'Lie_Idle'
  | 'Lie_Pose'
  | 'Lie_StandUp'
  | 'PickUp'
  | 'Roll_Forward'
  | 'Running_A'
  | 'Running_B'
  | 'Running_Strafe_Left'
  | 'Running_Strafe_Right'
  | 'Sit_Chair_Down'
  | 'Sit_Chair_Idle'
  | 'Sit_Chair_Pose'
  | 'Sit_Chair_StandUp'
  | 'Sit_Floor_Down'
  | 'Sit_Floor_Idle'
  | 'Sit_Floor_Pose'
  | 'Sit_Floor_StandUp'
  | 'Spellcast_Long'
  | 'Spellcast_Raise'
  | 'Spellcast_Shoot'
  | 'Spellcasting'
  | 'T-Pose'
  | 'Throw'
  | 'Unarmed_Idle'
  | 'Unarmed_Melee_Attack_Kick'
  | 'Unarmed_Melee_Attack_Punch_A'
  | 'Unarmed_Melee_Attack_Punch_B'
  | 'Unarmed_Pose'
  | 'Use_Item'
  | 'Walking_A'
  | 'Walking_B'
  | 'Walking_Backwards'
  | 'Walking_C'
export interface GLTFAction extends THREE.AnimationClip {
  name: ActionName
}

const Knight = (props: JSX.IntrinsicElements['group']) => {
  const group = useRef<THREE.Group>(null)
  const { nodes, materials, animations } = useGLTF('./models/Knight.glb') as GLTFResult
  const rigidBody = useRef<RapierRigidBody>(null)
  const [isOnFloor, setIsOnFloor] = useState(false)
  const { position, particlesActive } = useSelector((state: Istore) => state.player)
  initializeKnight({ group, animations, nodes })
  handlePlayerPhysics({ body: rigidBody, isOnFloor })
  const bodyEulerRot = euler().setFromQuaternion(quat(rigidBody.current?.rotation()), 'YXZ')

  return (
    <>
      {/* <ParticleSystem
        count={100}
        active={particlesActive}
        position={new THREE.Vector3(position.x, position.y, position.z)}
        rotation={new THREE.Euler(bodyEulerRot.x, bodyEulerRot.y, bodyEulerRot.z)}
      /> */}
      <ParticlesNebula
        position={new THREE.Vector3(position.x, position.y, position.z)}
        rotation={new THREE.Euler(bodyEulerRot.x, bodyEulerRot.y, bodyEulerRot.z)}
        active={particlesActive}
      />
      <group ref={group} {...props} dispose={null}>
        <RigidBody
          ref={rigidBody}
          type='dynamic'
          enabledRotations={[false, true, false]}
          position={[0, 0, 0]}
          colliders={false}
          onCollisionEnter={e => {
            if (e.colliderObject?.name === 'floor') setIsOnFloor(true)
          }}
          onCollisionExit={e => {
            if (e.colliderObject?.name === 'floor') setIsOnFloor(false)
          }}
        >
          <CapsuleCollider args={[0.55, 0.65]} position={[0, 1.2, 0]} />
          <group name='Scene'>
            <group name='Rig'>
              <primitive object={nodes.root} />
              <skinnedMesh
                name='Knight_ArmLeft'
                geometry={nodes.Knight_ArmLeft.geometry}
                material={materials.knight_texture}
                skeleton={nodes.Knight_ArmLeft.skeleton}
              />
              <skinnedMesh
                name='Knight_ArmRight'
                geometry={nodes.Knight_ArmRight.geometry}
                material={materials.knight_texture}
                skeleton={nodes.Knight_ArmRight.skeleton}
              />
              <skinnedMesh
                name='Knight_Body'
                geometry={nodes.Knight_Body.geometry}
                material={materials.knight_texture}
                skeleton={nodes.Knight_Body.skeleton}
              />
              <skinnedMesh
                name='Knight_Head'
                geometry={nodes.Knight_Head.geometry}
                material={materials.knight_texture}
                skeleton={nodes.Knight_Head.skeleton}
              />
              <skinnedMesh
                name='Knight_LegLeft'
                geometry={nodes.Knight_LegLeft.geometry}
                material={materials.knight_texture}
                skeleton={nodes.Knight_LegLeft.skeleton}
              />
              <skinnedMesh
                name='Knight_LegRight'
                geometry={nodes.Knight_LegRight.geometry}
                material={materials.knight_texture}
                skeleton={nodes.Knight_LegRight.skeleton}
              />
            </group>
          </group>
        </RigidBody>
      </group>
    </>
  )
}

export default Knight

useGLTF.preload('./models/Knight.glb')
