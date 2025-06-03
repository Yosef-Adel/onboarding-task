import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { IUser } from '../features/users/types'


interface UsersState {
  users: IUser[]
  loading: boolean
  error: string | null
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsersStart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchUsersSuccess: (state, action: PayloadAction<IUser[]>) => {
      state.users = action.payload
      state.loading = false
    },
    fetchUsersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const { fetchUsersStart, fetchUsersSuccess, fetchUsersFailure } = usersSlice.actions
export default usersSlice.reducer
