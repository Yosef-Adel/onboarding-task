import { firstValueFrom, from, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, switchMap, tap } from 'rxjs/operators';
import {
  fetchUsersFailure,
  fetchUsersStart,
  fetchUsersSuccess,
} from '../../store/userSlice';
import type { AppDispatch } from '../../store';
import type { IUser } from './types';

const BASE_URL = 'http://localhost:3000/users';

// Types
export type UsersFilters = {
  name?: string;
};

// Read: Fetch Users
export const fetchUsers = (dispatch: AppDispatch, filter?: UsersFilters) => {
  dispatch(fetchUsersStart());

  const url = `${BASE_URL}?name=${filter?.name || ''}`;

  return from(fetch(url)).pipe(
    switchMap((res) => {
      if (!res.ok) throw new Error('Failed to fetch users');
      return from(res.json());
    }),
    tap((users) => dispatch(fetchUsersSuccess(users))),
    catchError((err) => {
      dispatch(fetchUsersFailure(err.message));
      return of(err);
    })
  );
};

// Create User
export function createUser(data: Omit<IUser, 'id'>): Promise<IUser> {
  const observable$ = ajax.post<IUser>(BASE_URL, data, {
    'Content-Type': 'application/json',
  });

  return firstValueFrom(observable$).then(res => res.response);
}

// Delete User
export const deleteUser = async (id: number) => {
  const url = `${BASE_URL}/${id}`;
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (!res.ok) {
    throw new Error(`Failed to delete user with ID ${id}: ${res.statusText}`);
  }

  return res;
};

// Read: Get Single User by ID
export const getUserById = async (id: string): Promise<IUser> => {
  const url = `${BASE_URL}/${id}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch user with ID ${id}: ${res.statusText}`);
  }

  return await res.json();
};

// Update User
export const updateUser = async (updatedUser: Omit<IUser, 'id'>, id: string) => {
  const url = `${BASE_URL}/${id}`;
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedUser),
  });

  if (!res.ok) {
    throw new Error(`Failed to update user with ID ${id}: ${res.statusText}`);
  }

  const result = await res.json();
  return result.user as IUser;
};
