import { useGLTF } from '@react-three/drei'
import { CuboidCollider, RigidBody } from '@react-three/rapier'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

import { WallTorch } from '@/models'

type GLTFResult = GLTF & {
  nodes: {
    tileBrickB_largeCrackedA: THREE.Mesh
    tileBrickB_largeCrackedA001: THREE.Mesh
    tileBrickB_largeCrackedA002: THREE.Mesh
    tileBrickB_largeCrackedA003: THREE.Mesh
    tileBrickB_largeCrackedA004: THREE.Mesh
    tileBrickB_largeCrackedA005: THREE.Mesh
    tileBrickB_largeCrackedA006: THREE.Mesh
    tileBrickB_largeCrackedA007: THREE.Mesh
    tileBrickB_largeCrackedA008: THREE.Mesh
    tileBrickB_largeCrackedA009: THREE.Mesh
    tileBrickB_largeCrackedA010: THREE.Mesh
    tileBrickB_largeCrackedA011: THREE.Mesh
    tileBrickB_largeCrackedA013: THREE.Mesh
    tileBrickB_largeCrackedA014: THREE.Mesh
    tileBrickB_largeCrackedA015: THREE.Mesh
    tileBrickB_largeCrackedA016: THREE.Mesh
    tileBrickB_largeCrackedA018: THREE.Mesh
    tileBrickB_largeCrackedA019: THREE.Mesh
    tileBrickB_largeCrackedA020: THREE.Mesh
    tileBrickB_largeCrackedA021: THREE.Mesh
    tileBrickB_largeCrackedA022: THREE.Mesh
    tileBrickB_largeCrackedA023: THREE.Mesh
    tileBrickB_largeCrackedA024: THREE.Mesh
    tileBrickB_largeCrackedA025: THREE.Mesh
    tileBrickB_largeCrackedA026: THREE.Mesh
    tileBrickB_largeCrackedA027: THREE.Mesh
    tileBrickB_largeCrackedA028: THREE.Mesh
    tileBrickB_largeCrackedA029: THREE.Mesh
    tileBrickB_largeCrackedA030: THREE.Mesh
    tileBrickB_largeCrackedA031: THREE.Mesh
    tileBrickB_largeCrackedA032: THREE.Mesh
    tileBrickB_largeCrackedA033: THREE.Mesh
    tileBrickB_largeCrackedA034: THREE.Mesh
    tileBrickB_largeCrackedA035: THREE.Mesh
    tileBrickB_largeCrackedA036: THREE.Mesh
    tileBrickB_largeCrackedA037: THREE.Mesh
    tileBrickB_largeCrackedA038: THREE.Mesh
    tileBrickB_largeCrackedA039: THREE.Mesh
    tileBrickB_largeCrackedA040: THREE.Mesh
    tileBrickB_largeCrackedA041: THREE.Mesh
    tileBrickB_largeCrackedA042: THREE.Mesh
    tileBrickB_largeCrackedA043: THREE.Mesh
    tileBrickB_largeCrackedA044: THREE.Mesh
    tileBrickB_largeCrackedA045: THREE.Mesh
    tileBrickB_largeCrackedA012: THREE.Mesh
    tileBrickB_largeCrackedA017: THREE.Mesh
    Cube010: THREE.Mesh
    Cube010_1: THREE.Mesh
    Cube010_2: THREE.Mesh
    Cube217: THREE.Mesh
    Cube217_1: THREE.Mesh
    Cube106: THREE.Mesh
    Cube106_1: THREE.Mesh
    Cube178: THREE.Mesh
    Cube178_1: THREE.Mesh
  }
  materials: {
    ['Stone.163']: THREE.MeshStandardMaterial
    ['Stone.021']: THREE.MeshStandardMaterial
    ['Stone.032']: THREE.MeshStandardMaterial
    ['Stone.010']: THREE.MeshStandardMaterial
    ['Mud.003']: THREE.MeshStandardMaterial
    ['WoodDark.003']: THREE.MeshStandardMaterial
    ['Stone.217']: THREE.MeshStandardMaterial
    ['StoneDark.139']: THREE.MeshStandardMaterial
    ['Stone.117']: THREE.MeshStandardMaterial
    ['StoneDark.054']: THREE.MeshStandardMaterial
    ['Stone.187']: THREE.MeshStandardMaterial
    ['StoneDark.109']: THREE.MeshStandardMaterial
  }
}

export const MapOne = (props: JSX.IntrinsicElements['group']) => {
  const { nodes, materials } = useGLTF('./models/mapOne.glb') as GLTFResult
  return (
    <group {...props} dispose={null} position={[0, -1.5, 0]} rotation={[0, 0.7854, 0]}>
      {/* FLOOR */}
      <RigidBody type='fixed' friction={16} colliders={false}>
        <CuboidCollider name='floor' args={[24, 0.5, 24]} position={[0, 0.5, 0]} />
        <group position={[9, 0, 15]}>
          <mesh geometry={nodes.tileBrickB_largeCrackedA.geometry} material={materials['Stone.163']} position={[6, 0, 0]} />
          <mesh geometry={nodes.tileBrickB_largeCrackedA001.geometry} material={materials['Stone.163']} position={[-6, 0, -6]} />
          <mesh geometry={nodes.tileBrickB_largeCrackedA002.geometry} material={materials['Stone.163']} position={[-6, 0, 0]} />
          <mesh geometry={nodes.tileBrickB_largeCrackedA003.geometry} material={materials['Stone.163']} position={[6, 0, -6]} />
          <mesh geometry={nodes.tileBrickB_largeCrackedA004.geometry} material={materials['Stone.163']} position={[-24, 0, 6]} />
          <mesh geometry={nodes.tileBrickB_largeCrackedA005.geometry} material={materials['Stone.163']} position={[0, 0, 6]} />
          <mesh geometry={nodes.tileBrickB_largeCrackedA006.geometry} material={materials['Stone.163']} position={[-6, 0, 6]} />
          <mesh geometry={nodes.tileBrickB_largeCrackedA007.geometry} material={materials['Stone.163']} position={[-18, 0, 6]} />
          <mesh geometry={nodes.tileBrickB_largeCrackedA008.geometry} material={materials['Stone.163']} position={[-18, 0, 0]} />
          <mesh geometry={nodes.tileBrickB_largeCrackedA009.geometry} material={materials['Stone.163']} position={[-24, 0, 0]} />
          <mesh geometry={nodes.tileBrickB_largeCrackedA010.geometry} material={materials['Stone.163']} position={[-18, 0, -6]} />
          <mesh geometry={nodes.tileBrickB_largeCrackedA011.geometry} material={materials['Stone.163']} position={[-12, 0, 0]} />
          <mesh geometry={nodes.tileBrickB_largeCrackedA013.geometry} material={materials['Stone.163']} position={[-18, 0, -18]} />
          <mesh geometry={nodes.tileBrickB_largeCrackedA014.geometry} material={materials['Stone.163']} position={[-24, 0, -24]} />
          <mesh geometry={nodes.tileBrickB_largeCrackedA015.geometry} material={materials['Stone.163']} position={[-12, 0, -24]} />
          <mesh geometry={nodes.tileBrickB_largeCrackedA016.geometry} material={materials['Stone.163']} position={[-12, 0, -12]} />
          <mesh geometry={nodes.tileBrickB_largeCrackedA018.geometry} material={materials['Stone.163']} position={[-18, 0, -12]} />
          <mesh geometry={nodes.tileBrickB_largeCrackedA019.geometry} material={materials['Stone.163']} position={[-6, 0, -12]} />
          <mesh geometry={nodes.tileBrickB_largeCrackedA020.geometry} material={materials['Stone.163']} position={[0, 0, -12]} />
          <mesh geometry={nodes.tileBrickB_largeCrackedA021.geometry} material={materials['Stone.163']} position={[-24, 0, -12]} />
          <mesh geometry={nodes.tileBrickB_largeCrackedA022.geometry} material={materials['Stone.163']} position={[6, 0, -24]} />
          <mesh geometry={nodes.tileBrickB_largeCrackedA023.geometry} material={materials['Stone.163']} position={[-6, 0, -18]} />
          <mesh geometry={nodes.tileBrickB_largeCrackedA024.geometry} material={materials['Stone.163']} position={[0, 0, -18]} />
          <mesh geometry={nodes.tileBrickB_largeCrackedA025.geometry} material={materials['Stone.163']} position={[6, 0, -18]} />
          <mesh geometry={nodes.tileBrickB_largeCrackedA026.geometry} material={materials['Stone.163']} position={[-30, 0, -18]} />
          <mesh geometry={nodes.tileBrickB_largeCrackedA027.geometry} material={materials['Stone.163']} position={[-30, 0, -12]} />
          <mesh geometry={nodes.tileBrickB_largeCrackedA028.geometry} material={materials['Stone.163']} position={[-30, 0, 6]} />
          <mesh geometry={nodes.tileBrickB_largeCrackedA029.geometry} material={materials['Stone.163']} position={[-30, 0, 0]} />
          <mesh geometry={nodes.tileBrickB_largeCrackedA030.geometry} material={materials['Stone.163']} position={[-30, 0, -6]} />
          <mesh geometry={nodes.tileBrickB_largeCrackedA031.geometry} material={materials['Stone.163']} position={[12, 0, -12]} />
          <mesh geometry={nodes.tileBrickB_largeCrackedA032.geometry} material={materials['Stone.163']} position={[12, 0, -24]} />
          <mesh geometry={nodes.tileBrickB_largeCrackedA033.geometry} material={materials['Stone.163']} position={[12, 0, 0]} />
          <mesh geometry={nodes.tileBrickB_largeCrackedA034.geometry} material={materials['Stone.163']} position={[12, 0, 6]} />
          <mesh geometry={nodes.tileBrickB_largeCrackedA035.geometry} material={materials['Stone.163']} position={[12, 0, -36]} />
          <mesh geometry={nodes.tileBrickB_largeCrackedA036.geometry} material={materials['Stone.163']} position={[-30, 0, -30]} />
          <mesh geometry={nodes.tileBrickB_largeCrackedA037.geometry} material={materials['Stone.163']} position={[-30, 0, -36]} />
          <mesh geometry={nodes.tileBrickB_largeCrackedA038.geometry} material={materials['Stone.163']} position={[-24, 0, -36]} />
          <mesh geometry={nodes.tileBrickB_largeCrackedA039.geometry} material={materials['Stone.163']} position={[0, 0, -36]} />
          <mesh geometry={nodes.tileBrickB_largeCrackedA040.geometry} material={materials['Stone.163']} position={[-6, 0, -36]} />
          <mesh geometry={nodes.tileBrickB_largeCrackedA041.geometry} material={materials['Stone.163']} position={[-18, 0, -36]} />
          <mesh geometry={nodes.tileBrickB_largeCrackedA042.geometry} material={materials['Stone.163']} position={[-12, 0, -36]} />
          <mesh geometry={nodes.tileBrickB_largeCrackedA043.geometry} material={materials['Stone.163']} position={[-18, 0, -30]} />
          <mesh geometry={nodes.tileBrickB_largeCrackedA044.geometry} material={materials['Stone.163']} position={[6, 0, -30]} />
          <mesh geometry={nodes.tileBrickB_largeCrackedA045.geometry} material={materials['Stone.163']} position={[-6, 0, -30]} />
          <mesh geometry={nodes.tileBrickB_largeCrackedA012.geometry} material={materials['Stone.021']} position={[-18, 0, 0]} />
          <mesh geometry={nodes.tileBrickB_largeCrackedA017.geometry} material={materials['Stone.032']} position={[-18, 0, -18]} />
          <group position={[6, 0, 6]}>
            <mesh geometry={nodes.Cube010.geometry} material={materials['Stone.010']} />
            <mesh geometry={nodes.Cube010_1.geometry} material={materials['Mud.003']} />
            <mesh geometry={nodes.Cube010_2.geometry} material={materials['WoodDark.003']} />
          </group>
          <group position={[0, 0, -6]}>
            <mesh geometry={nodes.Cube010.geometry} material={materials['Stone.010']} />
            <mesh geometry={nodes.Cube010_1.geometry} material={materials['Mud.003']} />
            <mesh geometry={nodes.Cube010_2.geometry} material={materials['WoodDark.003']} />
          </group>
          <group position={[-24, 0, -6]}>
            <mesh geometry={nodes.Cube010.geometry} material={materials['Stone.010']} />
            <mesh geometry={nodes.Cube010_1.geometry} material={materials['Mud.003']} />
            <mesh geometry={nodes.Cube010_2.geometry} material={materials['WoodDark.003']} />
          </group>
          <group position={[-12, 0, 6]}>
            <mesh geometry={nodes.Cube010.geometry} material={materials['Stone.010']} />
            <mesh geometry={nodes.Cube010_1.geometry} material={materials['Mud.003']} />
            <mesh geometry={nodes.Cube010_2.geometry} material={materials['WoodDark.003']} />
          </group>
          <group position={[-12, 0, -6]}>
            <mesh geometry={nodes.Cube010.geometry} material={materials['Stone.010']} />
            <mesh geometry={nodes.Cube010_1.geometry} material={materials['Mud.003']} />
            <mesh geometry={nodes.Cube010_2.geometry} material={materials['WoodDark.003']} />
          </group>
          <group position={[-12, 0, -18]}>
            <mesh geometry={nodes.Cube010.geometry} material={materials['Stone.010']} />
            <mesh geometry={nodes.Cube010_1.geometry} material={materials['Mud.003']} />
            <mesh geometry={nodes.Cube010_2.geometry} material={materials['WoodDark.003']} />
          </group>
          <group position={[-24, 0, -18]}>
            <mesh geometry={nodes.Cube010.geometry} material={materials['Stone.010']} />
            <mesh geometry={nodes.Cube010_1.geometry} material={materials['Mud.003']} />
            <mesh geometry={nodes.Cube010_2.geometry} material={materials['WoodDark.003']} />
          </group>
          <group position={[-18, 0, -24]}>
            <mesh geometry={nodes.Cube010.geometry} material={materials['Stone.010']} />
            <mesh geometry={nodes.Cube010_1.geometry} material={materials['Mud.003']} />
            <mesh geometry={nodes.Cube010_2.geometry} material={materials['WoodDark.003']} />
          </group>
          <group position={[0, 0, -24]}>
            <mesh geometry={nodes.Cube010.geometry} material={materials['Stone.010']} />
            <mesh geometry={nodes.Cube010_1.geometry} material={materials['Mud.003']} />
            <mesh geometry={nodes.Cube010_2.geometry} material={materials['WoodDark.003']} />
          </group>
          <group position={[6, 0, -12]}>
            <mesh geometry={nodes.Cube010.geometry} material={materials['Stone.010']} />
            <mesh geometry={nodes.Cube010_1.geometry} material={materials['Mud.003']} />
            <mesh geometry={nodes.Cube010_2.geometry} material={materials['WoodDark.003']} />
          </group>
          <group position={[-6, 0, -24]}>
            <mesh geometry={nodes.Cube010.geometry} material={materials['Stone.010']} />
            <mesh geometry={nodes.Cube010_1.geometry} material={materials['Mud.003']} />
            <mesh geometry={nodes.Cube010_2.geometry} material={materials['WoodDark.003']} />
          </group>
          <group position={[-30, 0, -24]}>
            <mesh geometry={nodes.Cube010.geometry} material={materials['Stone.010']} />
            <mesh geometry={nodes.Cube010_1.geometry} material={materials['Mud.003']} />
            <mesh geometry={nodes.Cube010_2.geometry} material={materials['WoodDark.003']} />
          </group>
          <group position={[12, 0, -18]}>
            <mesh geometry={nodes.Cube010.geometry} material={materials['Stone.010']} />
            <mesh geometry={nodes.Cube010_1.geometry} material={materials['Mud.003']} />
            <mesh geometry={nodes.Cube010_2.geometry} material={materials['WoodDark.003']} />
          </group>
          <group position={[12, 0, -6]}>
            <mesh geometry={nodes.Cube010.geometry} material={materials['Stone.010']} />
            <mesh geometry={nodes.Cube010_1.geometry} material={materials['Mud.003']} />
            <mesh geometry={nodes.Cube010_2.geometry} material={materials['WoodDark.003']} />
          </group>
          <group position={[12, 0, -30]}>
            <mesh geometry={nodes.Cube010.geometry} material={materials['Stone.010']} />
            <mesh geometry={nodes.Cube010_1.geometry} material={materials['Mud.003']} />
            <mesh geometry={nodes.Cube010_2.geometry} material={materials['WoodDark.003']} />
          </group>
          <group position={[6, 0, -36]}>
            <mesh geometry={nodes.Cube010.geometry} material={materials['Stone.010']} />
            <mesh geometry={nodes.Cube010_1.geometry} material={materials['Mud.003']} />
            <mesh geometry={nodes.Cube010_2.geometry} material={materials['WoodDark.003']} />
          </group>
          <group position={[-12, 0, -30]}>
            <mesh geometry={nodes.Cube010.geometry} material={materials['Stone.010']} />
            <mesh geometry={nodes.Cube010_1.geometry} material={materials['Mud.003']} />
            <mesh geometry={nodes.Cube010_2.geometry} material={materials['WoodDark.003']} />
          </group>
          <group position={[-24, 0, -30]}>
            <mesh geometry={nodes.Cube010.geometry} material={materials['Stone.010']} />
            <mesh geometry={nodes.Cube010_1.geometry} material={materials['Mud.003']} />
            <mesh geometry={nodes.Cube010_2.geometry} material={materials['WoodDark.003']} />
          </group>
          <group position={[0, 0, -30]}>
            <mesh geometry={nodes.Cube010.geometry} material={materials['Stone.010']} />
            <mesh geometry={nodes.Cube010_1.geometry} material={materials['Mud.003']} />
            <mesh geometry={nodes.Cube010_2.geometry} material={materials['WoodDark.003']} />
          </group>
          <mesh geometry={nodes.Cube010.geometry} material={materials['Stone.010']} />
          <mesh geometry={nodes.Cube010_1.geometry} material={materials['Mud.003']} />
          <mesh geometry={nodes.Cube010_2.geometry} material={materials['WoodDark.003']} />
        </group>
      </RigidBody>
      {/* WALLS */}
      <RigidBody type='fixed' friction={0} colliders={false} position={[9, 0, 15]}>
        {/* 4 wall coliders */}
        <CuboidCollider args={[1, 4, 24]} position={[15, 5, -15]} />
        <CuboidCollider args={[1, 4, 24]} position={[-33, 5, -15]} />
        <CuboidCollider args={[1, 4, 24]} position={[-9, 5, -39]} rotation={[0, 1.571, 0]} />
        <CuboidCollider args={[1, 4, 24]} position={[-9, 5, 9]} rotation={[0, 1.571, 0]} />
        <group>
          <group position={[7, 1, 9]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[-1, 1, 9]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[3, 1, 9]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[-13, 1, 9]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[-17, 1, 9]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[-33, 5, -31]} rotation={[0, 1.571, 0]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[-5, 1, 9]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[-21, 1, 9]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[-33, 5, -23]} rotation={[0, 1.571, 0]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[-25, 1, 9]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[-25, 1, -39]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[-33, 5, -27]} rotation={[0, 1.571, 0]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[-21, 1, -39]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[-5, 1, -39]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[-33, 5, -11]} rotation={[0, 1.571, 0]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[-17, 1, -39]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[-13, 1, -39]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[3, 1, -39]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[-1, 1, -39]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[7, 1, -39]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[-33, 5, -7]} rotation={[0, 1.571, 0]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[-33, 5, -19]} rotation={[0, 1.571, 0]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[15, 1, -31]} rotation={[0, 1.571, 0]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[15, 1, -23]} rotation={[0, 1.571, 0]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[15, 1, -27]} rotation={[0, 1.571, 0]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[15, 1, -11]} rotation={[0, 1.571, 0]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[15, 1, -7]} rotation={[0, 1.571, 0]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[-33, 5, -3]} rotation={[0, 1.571, 0]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[15, 1, -19]} rotation={[0, 1.571, 0]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[15, 1, -3]} rotation={[0, 1.571, 0]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[-33, 5, 1]} rotation={[0, 1.571, 0]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[15, 1, 1]} rotation={[0, 1.571, 0]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[-33, 1, 1]} rotation={[0, 1.571, 0]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[15, 5, 1]} rotation={[0, 1.571, 0]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[-33, 1, -3]} rotation={[0, 1.571, 0]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[-33, 1, -19]} rotation={[0, 1.571, 0]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[15, 5, -3]} rotation={[0, 1.571, 0]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[-33, 1, -7]} rotation={[0, 1.571, 0]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[-33, 1, -11]} rotation={[0, 1.571, 0]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[-33, 1, -27]} rotation={[0, 1.571, 0]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[-33, 1, -23]} rotation={[0, 1.571, 0]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[-33, 1, -31]} rotation={[0, 1.571, 0]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[15, 5, -19]} rotation={[0, 1.571, 0]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[15, 5, -7]} rotation={[0, 1.571, 0]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[15, 5, -11]} rotation={[0, 1.571, 0]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[15, 5, -27]} rotation={[0, 1.571, 0]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[15, 5, -23]} rotation={[0, 1.571, 0]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[15, 5, -31]} rotation={[0, 1.571, 0]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[7, 5, -39]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[-1, 5, -39]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[3, 5, -39]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[-13, 5, -39]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[-17, 5, -39]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[-5, 5, -39]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[-21, 5, -39]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[-25, 5, -39]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[-25, 5, 9]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[-21, 5, 9]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[-5, 5, 9]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[-17, 5, 9]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[-13, 5, 9]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[3, 5, 9]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[-1, 5, 9]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[7, 5, 9]}>
            <mesh geometry={nodes.Cube217.geometry} material={materials['Stone.217']} />
            <mesh geometry={nodes.Cube217_1.geometry} material={materials['StoneDark.139']} />
          </group>
          <group position={[15, 1, 9]} rotation={[0, -1.571, 0]}>
            <mesh geometry={nodes.Cube106.geometry} material={materials['Stone.117']} />
            <mesh geometry={nodes.Cube106_1.geometry} material={materials['StoneDark.054']} />
          </group>
          <group position={[-33, 1, 9]} rotation={[Math.PI, 0, Math.PI]}>
            <mesh geometry={nodes.Cube106.geometry} material={materials['Stone.117']} />
            <mesh geometry={nodes.Cube106_1.geometry} material={materials['StoneDark.054']} />
          </group>
          <group position={[15, 1, -39]}>
            <mesh geometry={nodes.Cube106.geometry} material={materials['Stone.117']} />
            <mesh geometry={nodes.Cube106_1.geometry} material={materials['StoneDark.054']} />
          </group>
          <group position={[-33, 1, -39]} rotation={[0, Math.PI / 2, 0]}>
            <mesh geometry={nodes.Cube106.geometry} material={materials['Stone.117']} />
            <mesh geometry={nodes.Cube106_1.geometry} material={materials['StoneDark.054']} />
          </group>
          <group position={[-33, 5, -39]} rotation={[0, Math.PI / 2, 0]}>
            <mesh geometry={nodes.Cube106.geometry} material={materials['Stone.117']} />
            <mesh geometry={nodes.Cube106_1.geometry} material={materials['StoneDark.054']} />
          </group>
          <group position={[15, 5, -39]}>
            <mesh geometry={nodes.Cube106.geometry} material={materials['Stone.117']} />
            <mesh geometry={nodes.Cube106_1.geometry} material={materials['StoneDark.054']} />
          </group>
          <group position={[-33, 5, 9]} rotation={[Math.PI, 0, Math.PI]}>
            <mesh geometry={nodes.Cube106.geometry} material={materials['Stone.117']} />
            <mesh geometry={nodes.Cube106_1.geometry} material={materials['StoneDark.054']} />
          </group>
          <group position={[15, 5, 9]} rotation={[0, -1.571, 0]}>
            <mesh geometry={nodes.Cube106.geometry} material={materials['Stone.117']} />
            <mesh geometry={nodes.Cube106_1.geometry} material={materials['StoneDark.054']} />
          </group>
          <group position={[-9, 1, 9]}>
            <mesh geometry={nodes.Cube178.geometry} material={materials['Stone.187']} />
            <mesh geometry={nodes.Cube178_1.geometry} material={materials['StoneDark.109']} />
          </group>
          <group position={[11, 1, 9]}>
            <mesh geometry={nodes.Cube178.geometry} material={materials['Stone.187']} />
            <mesh geometry={nodes.Cube178_1.geometry} material={materials['StoneDark.109']} />
          </group>
          <group position={[-29, 1, 9]}>
            <mesh geometry={nodes.Cube178.geometry} material={materials['Stone.187']} />
            <mesh geometry={nodes.Cube178_1.geometry} material={materials['StoneDark.109']} />
          </group>
          <group position={[-29, 1, -39]}>
            <mesh geometry={nodes.Cube178.geometry} material={materials['Stone.187']} />
            <mesh geometry={nodes.Cube178_1.geometry} material={materials['StoneDark.109']} />
          </group>
          <group position={[11, 1, -39]}>
            <mesh geometry={nodes.Cube178.geometry} material={materials['Stone.187']} />
            <mesh geometry={nodes.Cube178_1.geometry} material={materials['StoneDark.109']} />
          </group>
          <group position={[-9, 1, -39]}>
            <mesh geometry={nodes.Cube178.geometry} material={materials['Stone.187']} />
            <mesh geometry={nodes.Cube178_1.geometry} material={materials['StoneDark.109']} />
          </group>
          <group position={[-33, 1, -15]} rotation={[0, -1.571, 0]}>
            <mesh geometry={nodes.Cube178.geometry} material={materials['Stone.187']} />
            <mesh geometry={nodes.Cube178_1.geometry} material={materials['StoneDark.109']} />
          </group>
          <group position={[-33, 1, 5]} rotation={[0, -1.571, 0]}>
            <mesh geometry={nodes.Cube178.geometry} material={materials['Stone.187']} />
            <mesh geometry={nodes.Cube178_1.geometry} material={materials['StoneDark.109']} />
          </group>
          <group position={[-33, 1, -35]} rotation={[0, -1.571, 0]}>
            <mesh geometry={nodes.Cube178.geometry} material={materials['Stone.187']} />
            <mesh geometry={nodes.Cube178_1.geometry} material={materials['StoneDark.109']} />
          </group>
          <group position={[15, 1, -35]} rotation={[0, -1.571, 0]}>
            <mesh geometry={nodes.Cube178.geometry} material={materials['Stone.187']} />
            <mesh geometry={nodes.Cube178_1.geometry} material={materials['StoneDark.109']} />
          </group>
          <group position={[15, 1, 5]} rotation={[0, -1.571, 0]}>
            <mesh geometry={nodes.Cube178.geometry} material={materials['Stone.187']} />
            <mesh geometry={nodes.Cube178_1.geometry} material={materials['StoneDark.109']} />
          </group>
          <group position={[15, 1, -15]} rotation={[0, -1.571, 0]}>
            <mesh geometry={nodes.Cube178.geometry} material={materials['Stone.187']} />
            <mesh geometry={nodes.Cube178_1.geometry} material={materials['StoneDark.109']} />
          </group>
          <group position={[15, 5, -15]} rotation={[0, -1.571, 0]}>
            <mesh geometry={nodes.Cube178.geometry} material={materials['Stone.187']} />
            <mesh geometry={nodes.Cube178_1.geometry} material={materials['StoneDark.109']} />
          </group>
          <group position={[15, 5, 5]} rotation={[0, -1.571, 0]}>
            <mesh geometry={nodes.Cube178.geometry} material={materials['Stone.187']} />
            <mesh geometry={nodes.Cube178_1.geometry} material={materials['StoneDark.109']} />
          </group>
          <group position={[15, 5, -35]} rotation={[0, -1.571, 0]}>
            <mesh geometry={nodes.Cube178.geometry} material={materials['Stone.187']} />
            <mesh geometry={nodes.Cube178_1.geometry} material={materials['StoneDark.109']} />
          </group>
          <group position={[-33, 5, -35]} rotation={[0, -1.571, 0]}>
            <mesh geometry={nodes.Cube178.geometry} material={materials['Stone.187']} />
            <mesh geometry={nodes.Cube178_1.geometry} material={materials['StoneDark.109']} />
          </group>
          <group position={[-33, 5, 5]} rotation={[0, -1.571, 0]}>
            <mesh geometry={nodes.Cube178.geometry} material={materials['Stone.187']} />
            <mesh geometry={nodes.Cube178_1.geometry} material={materials['StoneDark.109']} />
          </group>
          <group position={[-33, 5, -15]} rotation={[0, -1.571, 0]}>
            <mesh geometry={nodes.Cube178.geometry} material={materials['Stone.187']} />
            <mesh geometry={nodes.Cube178_1.geometry} material={materials['StoneDark.109']} />
          </group>
          <group position={[-9, 5, -39]}>
            <mesh geometry={nodes.Cube178.geometry} material={materials['Stone.187']} />
            <mesh geometry={nodes.Cube178_1.geometry} material={materials['StoneDark.109']} />
          </group>
          <group position={[11, 5, -39]}>
            <mesh geometry={nodes.Cube178.geometry} material={materials['Stone.187']} />
            <mesh geometry={nodes.Cube178_1.geometry} material={materials['StoneDark.109']} />
          </group>
          <group position={[-29, 5, -39]}>
            <mesh geometry={nodes.Cube178.geometry} material={materials['Stone.187']} />
            <mesh geometry={nodes.Cube178_1.geometry} material={materials['StoneDark.109']} />
          </group>
          <group position={[-29, 5, 9]}>
            <mesh geometry={nodes.Cube178.geometry} material={materials['Stone.187']} />
            <mesh geometry={nodes.Cube178_1.geometry} material={materials['StoneDark.109']} />
          </group>
          <group position={[11, 5, 9]}>
            <mesh geometry={nodes.Cube178.geometry} material={materials['Stone.187']} />
            <mesh geometry={nodes.Cube178_1.geometry} material={materials['StoneDark.109']} />
          </group>
          <group position={[-9, 5, 9]}>
            <mesh geometry={nodes.Cube178.geometry} material={materials['Stone.187']} />
            <mesh geometry={nodes.Cube178_1.geometry} material={materials['StoneDark.109']} />
          </group>
        </group>
      </RigidBody>
      {/* ASSETS */}
      <WallTorch position={[23.3, 5, -15]} rotation={[0, -1.571, 0]} />
    </group>
  )
}

useGLTF.preload('./models/mapOne.glb')
