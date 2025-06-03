import { from, of } from 'rxjs'
import { catchError, switchMap, tap } from 'rxjs/operators'
import {
  fetchUsersFailure,
  fetchUsersStart,
  fetchUsersSuccess,
} from '../../store/userSlice'
import type { AppDispatch } from '../../store'

// you can add endpoints file to hold all the endpoints in one place
const endpoint = 'http://localhost:3000/users?name='

export type UsersFilters = {
  name?: string
}

export const fetchUsers = (dispatch: AppDispatch, filter?: UsersFilters) => {
  dispatch(fetchUsersStart())

  return from(fetch(endpoint + filter?.name)).pipe(
    switchMap((res) => {
      // we throw error as if it's 400 or 500 the fetch method will not throw an error
      if (!res.ok) throw new Error('Failed to fetch users')
      return from(res.json())
    }),
    tap((users) => dispatch(fetchUsersSuccess(users))),
    catchError((err) => {
      dispatch(fetchUsersFailure(err.message))
      return of(err)
    })
  )
}
