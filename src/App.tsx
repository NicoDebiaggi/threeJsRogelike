import { Canvas } from '@react-three/fiber'
import { useSelector } from 'react-redux'
import Main from '@/scenes/Main.scene'
import { Interface } from './components'
import { Istore } from './redux'
import { Physics } from '@react-three/rapier'
import { KeyboardControls, KeyboardControlsEntry } from '@react-three/drei'
import { Controls } from '@/dataModels'
import { useMemo } from 'react'
import { Perf } from 'r3f-perf'

const App = () => {
  const animations = useSelector((state: Istore) => state.player.animations)

  const map = useMemo<KeyboardControlsEntry<Controls>[]>(
    () => [
      { name: Controls.forward, keys: ['KeyW', 'ArrowUp'] },
      { name: Controls.backward, keys: ['KeyS', 'ArrowDown'] },
      { name: Controls.left, keys: ['KeyA', 'ArrowLeft'] },
      { name: Controls.right, keys: ['KeyD', 'ArrowRight'] },
      { name: Controls.jump, keys: ['Space'] },
      { name: Controls.dodge, keys: ['ShiftLeft'] },
      { name: Controls.pause, keys: ['Escape'] },
      { name: Controls.attack, keys: ['ClickLeft', 'KeyJ']},
      { name: Controls.block, keys: ['ClickRight', 'KeyK']}
    ],
    []
  )

  return (
    <KeyboardControls map={map}>
      <Canvas camera={{ fov: 90 }} shadows>
        <Perf />
        <Physics debug gravity={[0, -9.81, 0]}>
          <Main />
        </Physics>
      </Canvas>
      {animations.length > 0 && <Interface />}
    </KeyboardControls>
  )
}

export default App
