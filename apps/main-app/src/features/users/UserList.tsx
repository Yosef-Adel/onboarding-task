import { CustomBreadCrumbs, LoadingScreen } from "@my-workspace/ui";
import Button from '@mui/material/Button';
import MuiLink from '@mui/material/Link';
import { Icon } from '@iconify/react';
import Container from "@mui/material/Container";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from "../../store";
import { useEffect, useMemo, useState } from "react";
import { fetchUsers, type UsersFilters } from "./userService";
import { useDebounce } from "../../hooks/useDebounce";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import type { IUser } from "./types";

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


  const columns = useMemo<MRT_ColumnDef<IUser>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 50,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size: 150,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 200,
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data: users,
  });

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
        loading ? <LoadingScreen /> : users.length > 0 &&
          <MaterialReactTable table={table} />
      }
    </Container>
  );
}

export default UserList;
