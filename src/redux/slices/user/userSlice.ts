import { TProfileDetails, TUserState } from '@/types/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  profile: TProfileDetails | null
  role: string | null
  cartTrigger: boolean
}

const initialState: UserState = {
  profile: null,
  role: null,
  cartTrigger: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfile(state, action: PayloadAction<TProfileDetails>) {
      state.profile = action.payload
    },
    setUserRole(state, action: PayloadAction<string>) {
      state.role = action.payload
    },
    clearUserProfile(state) {
      state.profile = null
      state.role = null
    },
    triggerCartUpdate(state) {
      state.cartTrigger = !state.cartTrigger
    },
  },
})

export const { setUserProfile, setUserRole, clearUserProfile, triggerCartUpdate } = userSlice.actions
export default userSlice.reducer
