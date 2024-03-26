import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Cylinder001: THREE.Mesh
    Cylinder001_1: THREE.Mesh
    Cylinder001_2: THREE.Mesh
    Cylinder001_3: THREE.Mesh
  }
  materials: {
    ['BrownDark.084']: THREE.MeshStandardMaterial
    ['Metal.075']: THREE.MeshStandardMaterial
    ['WoodDark.128']: THREE.MeshStandardMaterial
    ['StoneDark.047']: THREE.MeshStandardMaterial
  }
}

export const WallTorch = (props: JSX.IntrinsicElements['group']) => {
  const { nodes, materials } = useGLTF('./models/wallTorch.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <group position={[0, 0, 0]}>
        <mesh geometry={nodes.Cylinder001.geometry} material={materials['BrownDark.084']} />
        <mesh geometry={nodes.Cylinder001_1.geometry} material={materials['Metal.075']} />
        <mesh geometry={nodes.Cylinder001_2.geometry} material={materials['WoodDark.128']} />
        <mesh geometry={nodes.Cylinder001_3.geometry} material={materials['StoneDark.047']} />
      </group>
    </group>
  )
}

useGLTF.preload('./models/wallTorch.glb')
