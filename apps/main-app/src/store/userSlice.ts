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
    addUser: (state, action: PayloadAction<IUser>) => {
      state.users.push(action.payload)
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter(user => user.id !== action.payload)
    },
    updateUser: (state, action: PayloadAction<IUser>) => {
      const index = state.users.findIndex(user => user.id === action.payload.id)
      if (index !== -1) {
        state.users[index] = action.payload
      }
    }
  },
})

export const {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
  addUser,
  deleteUser,
  updateUser
} = usersSlice.actions

export default usersSlice.reducer
