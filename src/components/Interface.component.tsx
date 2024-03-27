import { Affix } from '@mantine/core'
import { folder, Leva, useControls } from 'leva'
import { useDispatch, useSelector } from 'react-redux'

import { Istore } from '@/redux'
import { setAnimationIndex, setHandSlots, setToogableElements } from '@/redux/slices'

const Interface = () => {
  const { animations, animationIndex, toogableElements, handSlotsFullList, handSlots } = useSelector((state: Istore) => state.player)
  const dispatch = useDispatch()

  useControls({
    Animation: {
      options: animations?.reduce((acc, animation, index) => ({ ...acc, [animation]: index }), {}),
      onChange: (index: number) => {
        if (index === animationIndex) return
        dispatch(setAnimationIndex(index))
      },
      value: animationIndex
    },
    toogableElements: folder(
      Object.entries(toogableElements).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: {
            value,
            onChange: (v: boolean) => {
              dispatch(setToogableElements({ [key]: v }))
            }
          }
        }),
        {}
      ),
      { collapsed: true }
    ),
    LeftHandSlot: {
      options: [...handSlotsFullList.handLeftSlot],
      onChange: (slot: string) => {
        dispatch(setHandSlots({ handLeftSlot: slot }))
      },
      value: handSlots.handLeftSlot
    },
    RightHandSlot: {
      options: [...handSlotsFullList.handRightSlot],
      onChange: (slot: string) => {
        dispatch(setHandSlots({ handRightSlot: slot }))
      },
      value: handSlots.handRightSlot
    }
  })

  return (
    <Affix position={{ top: 50, left: 20 }} w={400}>
      <Leva fill collapsed />
    </Affix>
  )
}

export default Interface
