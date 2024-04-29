import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

export type ActionNameSkeletonMinion =
  | '1H_Melee_Attack_Chop'
  | '1H_Melee_Attack_Jump_Chop_Rig'
  | '1H_Melee_Attack_Slice_Diagonal'
  | '1H_Melee_Attack_Slice_Horizontal'
  | '1H_Ranged_Aiming_Rig'
  | '1H_Ranged_Reload'
  | '1H_Ranged_Shooting_Rig'
  | '2H_Melee_Attack_Chop_Rig'
  | '2H_Melee_Attack_Chop'
  | '2H_Melee_Attack_Spinning_Rig'
  | '2H_Melee_Attack_Stab'
  | '2H_Melee_Idle'
  | '2H_Ranged_Aiming_Rig'
  | '2H_Ranged_Reload'
  | 'Block_Attack_Rig'
  | 'Block_Hit_Rig'
  | 'Block_Hit'
  | 'Blocking_Rig'
  | 'Cheer'
  | 'Death_A_Pose'
  | 'Death_B_Pose_Rig'
  | 'Death_B'
  | 'Death_C_Skeletons_Resurrect_Rig'
  | 'Death_C_Skeletons_Rig'
  | 'Death_C_Skeletons'
  | 'Dodge_Left_Rig'
  | 'Dodge_Right'
  | 'Dualwield_Melee_Attack_Chop'
  | 'Dualwield_Melee_Attack_Slice_Rig'
  | 'Dualwield_Melee_Attack_Stab'
  | 'Idle_B_Rig'
  | 'Idle_Combat_Rig'
  | 'Idle_Combat'
  | 'Interact_Rig'
  | 'Jump_Full_Long'
  | 'Jump_Full_Short'
  | 'Jump_Land_Rig'
  | 'Jump_Start'
  | 'Lie_Pose_Rig'
  | 'Lie_StandUp'
  | 'Running_A_Rig'
  | 'Running_B'
  | 'Running_Strafe_Left_Rig'
  | 'Running_Strafe_Right_Rig'
  | 'Running_Strafe_Right'
  | 'Sit_Chair_StandUp_Rig'
  | 'Sit_Floor_Down'
  | 'Sit_Floor_Idle'
  | 'Sit_Floor_Pose_Rig'
  | 'Sit_Floor_StandUp'
  | 'Skeletons_Awaken_Floor_Rig'
  | 'Skeletons_Awaken_Standing_Rig'
  | 'Skeletons_Awaken_Standing'
  | 'Skeletons_Inactive_Floor_Pose'
  | 'Spawn_Air_Rig'
  | 'Spawn_Ground'
  | 'Spawn_Ground_Skeletons'
  | 'Spellcast_Raise_Rig'
  | 'Spellcast_Shoot'
  | 'Spellcasting_Rig'
  | 'T-Pose_Rig'
  | 'T-Pose'
  | 'Throw_Rig'
  | 'Unarmed_Idle'
  | 'Unarmed_Melee_Attack_Kick'
  | 'Unarmed_Melee_Attack_Punch_A_Rig'
  | 'Unarmed_Melee_Attack_Punch_B'
  | 'Walking_B_Rig'
  | 'Walking_Backwards'
  | 'Walking_D_Skeletons'

export interface GLTFResultSkeletonMinion extends GLTF {
  nodes: {
    Skeleton_Minion_ArmLeft: THREE.SkinnedMesh
    Skeleton_Minion_ArmRight: THREE.SkinnedMesh
    Skeleton_Minion_Body: THREE.SkinnedMesh
    Skeleton_Minion_Eyes: THREE.SkinnedMesh
    Skeleton_Minion_Jaw: THREE.SkinnedMesh
    Skeleton_Minion_LegLeft: THREE.SkinnedMesh
    Skeleton_Minion_LegRight: THREE.SkinnedMesh
  }
  materials: {
    ['skeleton.005']: THREE.MeshStandardMaterial
    ['skeleton.003']: THREE.MeshStandardMaterial
    ['Glow.003']: THREE.MeshStandardMaterial
  }
}
