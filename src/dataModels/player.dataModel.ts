export interface playerState {
  animations: string[]
  nextAnimationIndex: number
  animationIndex: number
  animationDuration: number
  hitPlaying: boolean
  blockPlaying: boolean
  toogableElements: {
    [key: string]: boolean
  }
  handSlotsFullList: {
    handRightSlot: string[]
    handLeftSlot: string[]
  }
  handSlots: {
    handRightSlot: string
    handLeftSlot: string
  }
  position: {x: number, y: number, z: number}
}

export const animationIndexDictionary = {
  "1H_Melee_Attack_Chop": 0,
  "1H_Melee_Attack_Slice_Diagonal": 1,
  "1H_Melee_Attack_Slice_Horizontal": 2,
  "1H_Melee_Attack_Stab": 3,
  "1H_Ranged_Aiming": 4,
  "1H_Ranged_Reload": 5,
  "1H_Ranged_Shoot": 6,
  "1H_Ranged_Shooting": 7,
  "2H_Melee_Attack_Chop": 8,
  "2H_Melee_Attack_Slice": 9,
  "2H_Melee_Attack_Spin": 10,
  "2H_Melee_Attack_Spinning": 11,
  "2H_Melee_Attack_Stab": 12,
  "2H_Melee_Idle": 13,
  "2H_Ranged_Aiming": 14,
  "2H_Ranged_Reload": 15,
  "2H_Ranged_Shoot": 16,
  "2H_Ranged_Shooting": 17,
  "Block": 18,
  "Block_Attack": 19,
  "Block_Hit": 20,
  "Blocking": 21,
  "Cheer": 22,
  "Death_A": 23,
  "Death_A_Pose": 24,
  "Death_B": 25,
  "Death_B_Pose": 26,
  "Dodge_Backward": 27,
  "Dodge_Forward": 28,
  "Dodge_Left": 29,
  "Dodge_Right": 30,
  "Dualwield_Melee_Attack_Chop": 31,
  "Dualwield_Melee_Attack_Slice": 32,
  "Dualwield_Melee_Attack_Stab": 33,
  "Hit_A": 34,
  "Hit_B": 35,
  "Idle": 36,
  "Interact": 37,
  "Jump_Full_Long": 38,
  "Jump_Full_Short": 39,
  "Jump_Idle": 40,
  "Jump_Land": 41,
  "Jump_Start": 42,
  "Lie_Down": 43,
  "Lie_Idle": 44,
  "Lie_Pose": 45,
  "Lie_StandUp": 46,
  "PickUp": 47,
  "Roll_Forward": 48,
  "Running_A": 49,
  "Running_B": 50,
  "Running_Strafe_Left": 51,
  "Running_Strafe_Right": 52,
  "Sit_Chair_Down": 53,
  "Sit_Chair_Idle": 54,
  "Sit_Chair_Pose": 55,
  "Sit_Chair_StandUp": 56,
  "Sit_Floor_Down": 57,
  "Sit_Floor_Idle": 58,
  "Sit_Floor_Pose": 59,
  "Sit_Floor_StandUp": 60,
  "Spellcast_Long": 61,
  "Spellcast_Raise": 62,
  "Spellcast_Shoot": 63,
  "Spellcasting": 64,
  "T-Pose": 65,
  "Throw": 66,
  "Unarmed_Idle": 67,
  "Unarmed_Melee_Attack_Kick": 68,
  "Unarmed_Melee_Attack_Punch_A": 69,
  "Unarmed_Melee_Attack_Punch_B": 70,
  "Unarmed_Pose": 71,
  "Use_Item": 72,
  "Walking_A": 73,
  "Walking_B": 74,
  "Walking_Backwards": 75,
  "Walking_C": 76
}