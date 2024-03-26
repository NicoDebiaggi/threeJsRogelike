import * as THREE from 'three'
import { Suspense } from 'react'
import { OrbitControls } from '@react-three/drei'
import { useSelector } from 'react-redux'
import { useThree } from '@react-three/fiber'
import { Knight, MapOne } from '@/models'
import { Istore } from '@/redux'

const cameraBaseConfig = {
  position: [0, 9, -5]
}

const Main = () => {
  /* const position = useSelector((state: Istore) => state.player.position)

  useThree(({ camera, scene }) => {
    scene.background = new THREE.Color(0x222222)
    camera.position.set(
      cameraBaseConfig.position[0] + position.x,
      cameraBaseConfig.position[1] + position.y,
      cameraBaseConfig.position[2] + position.z
    ),
      camera.lookAt(position.x, position.y, position.z)
  }) */

  return (
    <>
      {<OrbitControls />}
      <ambientLight />
      <directionalLight intensity={0.7} position={[-5, 5, 5]} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <Suspense fallback={null}>
       {/*  <group position={[0, -1, 0]}>
          <Knight />
        </group> */}
        <MapOne />
      </Suspense>
    </>
  )
}

export default Main
