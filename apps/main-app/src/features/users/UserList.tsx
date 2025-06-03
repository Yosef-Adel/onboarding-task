import { CustomBreadCrumbs, LoadingScreen } from "@my-workspace/ui";
import Button from '@mui/material/Button';
import MuiLink from '@mui/material/Link';
import { Icon } from '@iconify/react';
import Container from "@mui/material/Container";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from "../../store";
import { useEffect, useState } from "react";
import { fetchUsers, type UsersFilters } from "./userService";
import { useDebounce } from "../../hooks/useDebounce";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const filtersInitialValues = {
  name: ""
}

function UserList() {
  const dispatch = useDispatch<AppDispatch>()
  const { users, loading, error } = useSelector((state: RootState) => state.users)

  const [filters, setFilters] = useState<UsersFilters>(filtersInitialValues)
  const debouncedFilters = useDebounce(filters, 300)


  useEffect(() => {
    const sub = fetchUsers(dispatch, debouncedFilters).subscribe()
    return () => sub.unsubscribe()
  }, [dispatch, debouncedFilters])

  if (error) return <p>Error: {error}</p>

  return (
    <Container sx={{ pt: 4 }}>
      <CustomBreadCrumbs
        heading="Users"
        navigation={[
          <MuiLink
            component={RouterLink}
            to="/"
            underline="hover"
            color="inherit"
            sx={{ fontWeight: 500 }}
          >
            Users
          </MuiLink>,
          <MuiLink
            component={RouterLink}
            underline="none"
            to="/"
            color="black"
            sx={{ fontWeight: 500 }}
          >
            List
          </MuiLink>,
        ]}
        action={
          <Button
            component={RouterLink}
            to="/user/add"
            color="secondary"
            variant="contained"
            startIcon={<Icon icon="carbon:add-filled" width="24" height="24" />}
          >
            Add User
          </Button>
        }
      />
      <h1>still need to use tanstack tables</h1>

      <Box sx={{ my: 2 }}>
        <TextField
          name="name"
          label="Name"
          type="text"
          value={filters?.name}
          onChange={(e) => setFilters({ name: e.target.value })}
        />
      </Box>
      {
        loading ? <LoadingScreen /> :
          <table border={1} cellPadding={6}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
      }
    </Container>
  );
}

export default UserList;
