import { CustomBreadCrumbs, LoadingScreen } from "@my-workspace/ui";
import Button from '@mui/material/Button';
import { Icon } from '@iconify/react';
import Container from "@mui/material/Container";
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
import UserDialog from "./UserDialog";
import { ListItemIcon, MenuItem, Typography } from "@mui/material";

const filtersInitialValues = {
  name: ""
}

function UserList() {
  const dispatch = useDispatch<AppDispatch>()
  const { users, loading, error } = useSelector((state: RootState) => state.users)


  const [filters, setFilters] = useState<UsersFilters>(filtersInitialValues)
  const debouncedFilters = useDebounce(filters, 300)

  const [openDialog, setOpenDialog] = useState(false);

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
    enableRowActions: true,
    initialState: {
      columnPinning: {
        right: ['mrt-row-actions'],
      },
    },
    renderRowActionMenuItems: ({ closeMenu, row }) => [
      <MenuItem
        key={0}
        onClick={() => {
          console.log(row)
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <Icon icon="ix:user-profile-filled" width="24" height="24" />
        </ListItemIcon>
        View User
      </MenuItem>,
      <MenuItem
        key={1}
        onClick={() => {
          console.log(row)
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <Icon color="red" icon="ic:round-delete" width="24" height="24" />
        </ListItemIcon>
        <Typography color="error">
          Delete User
        </Typography>
      </MenuItem>,
    ],
  });

  if (error) return <p>Error: {error}</p>
  return (
    <Container sx={{ pt: 4 }}>
      <CustomBreadCrumbs
        heading="Users"
        links={[
          { name: "Users", href: "/" },
          { name: "List" }
        ]}
        action={
          <Button
            onClick={() => setOpenDialog(true)}
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
      <UserDialog open={openDialog} onClose={() => setOpenDialog(false)} />
    </Container>
  );
}

export default UserList;
