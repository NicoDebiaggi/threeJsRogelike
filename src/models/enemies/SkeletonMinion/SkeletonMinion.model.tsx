import { useGLTF } from '@react-three/drei'
import { GLTFResultSkeletonMinion } from './SkeletonMinion.dataModel'
import { SkeletonUtils } from 'three/examples/jsm/Addons.js'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useGraph } from '@react-three/fiber'
import { useAnimations } from '@react-three/drei'
import * as THREE from 'three'
import { ActionNameSkeletonMinion } from './SkeletonMinion.dataModel'

interface SkeletonMinionModelProps {
  position: [number, number, number]
  animationSelected: ActionNameSkeletonMinion
  lookAt: [number, number, number] | null
}

export function SkeletonMinionModel({ animationSelected, lookAt, ...props }: SkeletonMinionModelProps) {
  const skeletonMinionGroup = useRef<THREE.Group>(null)
  const [prevAnimation, setPrevAnimation] = useState<ActionNameSkeletonMinion>('Spawn_Ground_Skeletons')
  const { scene, materials, animations } = useGLTF('./models/skeletonMinion.glb') as GLTFResultSkeletonMinion
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes } = useGraph(clone)
  const { actions } = useAnimations(animations, skeletonMinionGroup)

  useEffect(() => {
    actions[prevAnimation]?.fadeOut(0.5)
    actions[animationSelected]?.reset().fadeIn(0.5).play()

    setPrevAnimation(animationSelected)
  }, [animationSelected, actions])

  useEffect(() => {
    if (lookAt) {
      const [x, y, z] = lookAt
      skeletonMinionGroup.current?.lookAt(new THREE.Vector3(x, y, z))
    }
  }, [lookAt])

  return (
    <group ref={skeletonMinionGroup} name='Rig' {...props}>
      <primitive object={nodes.root} />
      <skinnedMesh
        name='Skeleton_Minion_ArmLeft'
        geometry={(nodes.Skeleton_Minion_ArmLeft as any).geometry}
        material={materials['skeleton.003']}
        skeleton={(nodes.Skeleton_Minion_ArmLeft as any).skeleton}
      />
      <skinnedMesh
        name='Skeleton_Minion_ArmRight'
        geometry={(nodes.Skeleton_Minion_ArmRight as any).geometry}
        material={materials['skeleton.003']}
        skeleton={(nodes.Skeleton_Minion_ArmRight as any).skeleton}
      />
      <skinnedMesh
        name='Skeleton_Minion_Body'
        geometry={(nodes.Skeleton_Minion_Body as any).geometry}
        material={materials['skeleton.003']}
        skeleton={(nodes.Skeleton_Minion_Body as any).skeleton}
      />
      <skinnedMesh
        name='Skeleton_Minion_Cloak'
        geometry={(nodes.Skeleton_Minion_Cloak as any).geometry}
        material={materials['skeleton.003']}
        skeleton={(nodes.Skeleton_Minion_Cloak as any).skeleton}
      />
      <skinnedMesh
        name='Skeleton_Minion_Eyes'
        geometry={(nodes.Skeleton_Minion_Eyes as any).geometry}
        material={materials['Glow.003']}
        skeleton={(nodes.Skeleton_Minion_Eyes as any).skeleton}
      />
      <skinnedMesh
        name='Skeleton_Minion_Head'
        geometry={(nodes.Skeleton_Minion_Head as any).geometry}
        material={materials['skeleton.003']}
        skeleton={(nodes.Skeleton_Minion_Head as any).skeleton}
      />
      <skinnedMesh
        name='Skeleton_Minion_Jaw'
        geometry={(nodes.Skeleton_Minion_Jaw as any).geometry}
        material={materials['skeleton.003']}
        skeleton={(nodes.Skeleton_Minion_Jaw as any).skeleton}
      />
      <skinnedMesh
        name='Skeleton_Minion_LegLeft'
        geometry={(nodes.Skeleton_Minion_LegLeft as any).geometry}
        material={materials['skeleton.003']}
        skeleton={(nodes.Skeleton_Minion_LegLeft as any).skeleton}
      />
      <skinnedMesh
        name='Skeleton_Minion_LegRight'
        geometry={(nodes.Skeleton_Minion_LegRight as any).geometry}
        material={materials['skeleton.003']}
        skeleton={(nodes.Skeleton_Minion_LegRight as any).skeleton}
      />
    </group>
  )
}

useGLTF.preload('./models/skeletonMinion.glb')
