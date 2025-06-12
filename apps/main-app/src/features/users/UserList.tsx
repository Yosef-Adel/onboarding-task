import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { CustomBreadCrumbs, LoadingScreen, notify } from "@my-workspace/ui";
import { useDebounce } from "../../hooks/useDebounce";
import { useBoolean } from "../../hooks/useBoolean";
import { createUser, deleteUser, fetchUsers, type UsersFilters } from "./userService";
import { addUser, deleteUser as deleteUserAction } from "../../store/userSlice";
import type { AppDispatch, RootState } from "../../store";
import type { IUser } from "./types";

import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { MenuItem, ListItemIcon, Typography, useTheme } from "@mui/material";
import { Icon } from "@iconify/react";

import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

import UserEditNewDialog from "./UserNewEditDialog";
import { ThemeToggleButton } from "../../theme/ThemeToggleButton";

const filtersInitialValues = { name: "" };

function UserList() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const theme = useTheme()

  const { users, loading, error } = useSelector((state: RootState) => state.users);

  const [filters, setFilters] = useState<UsersFilters>(filtersInitialValues);
  const debouncedFilters = useDebounce(filters, 300);

  const dialog = useBoolean();

  // Fetch users based on debounced filters
  useEffect(() => {
    const sub = fetchUsers(dispatch, debouncedFilters).subscribe();
    return () => sub.unsubscribe();
  }, [dispatch, debouncedFilters]);

  // Create new user
  const onSubmit = async (value: Omit<IUser, "id">) => {
    try {
      const user = await createUser(value);
      dispatch(addUser(user));
      notify({ msg: "User created successfully!", type: "success", duration: 3000 });
      dialog.onFalse();
    } catch (error: unknown) {
      if (error instanceof Error) console.error(error.message);
      notify({ msg: "Failed to create user.", type: "error", duration: 3000 });
    }
  };

  // Delete user
  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUser(id);
      dispatch(deleteUserAction(id));
      notify({ msg: "User Deleted successfully" });
    } catch (error) {
      console.error(error);
    }
  };

  // Columns definition for the user table
  const columns = useMemo<MRT_ColumnDef<IUser>[]>(
    () => [
      { accessorKey: "id", header: "ID", size: 50 },
      { accessorKey: "name", header: "Name", size: 150 },
      { accessorKey: "email", header: "Email", size: 200 },
    ],
    []
  );

  // Table configuration
  const table = useMaterialReactTable({
    columns,
    data: users,
    enableRowActions: true,
    initialState: {
      columnPinning: {
        right: ['mrt-row-actions'],
      },
    },
    mrtTheme: (theme) => ({
      baseBackgroundColor: theme.palette.background.default,
      draggingBorderColor: theme.palette.secondary.main,
    }),
    muiTablePaperProps: {
      sx: {
        border: '2px',
        borderColor: theme.palette.table.border,
        borderWidth: '1px',
        borderStyle: 'solid',
        borderRadius: '8px',
      },
    },
    renderRowActionMenuItems: ({ closeMenu, row }) => [
      <MenuItem
        key="view"
        onClick={() => {
          closeMenu();
          navigate(`users/${row.original.id}`);
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <Icon icon="ix:user-profile-filled" width="24" height="24" />
        </ListItemIcon>
        View User
      </MenuItem>,
      <MenuItem
        key="delete"
        onClick={() => {
          handleDeleteUser(row.original.id);
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <Icon color="red" icon="ic:round-delete" width="24" height="24" />
        </ListItemIcon>
        <Typography color="error">Delete User</Typography>
      </MenuItem>,
    ],
  });

  if (error) return <p>Error: {error}</p>;

  return (
    <Container sx={{ pt: 4 }}>
      <CustomBreadCrumbs
        heading="Users"
        links={[{ name: "Users" }, { name: "List" }]}
        action={
          <>
            <ThemeToggleButton />
            <Button
              onClick={() => dialog.onTrue()}
              variant="contained"
              startIcon={<Icon icon="carbon:add-filled" width="24" height="24" />}
            >
              Add User
            </Button>
          </>
        }
      />

      {/* Filters */}
      <Box sx={{ my: 2 }}>
        <TextField
          name="name"
          label="Name"
          type="text"
          value={filters.name}
          onChange={(e) => setFilters({ name: e.target.value })}
        />
      </Box>

      {/* Table or Loader */}
      {loading ? <LoadingScreen /> : users.length > 0 && <MaterialReactTable table={table} />}

      {/* Dialog for Adding New User */}
      <UserEditNewDialog onSubmit={onSubmit} open={dialog.value} onClose={dialog.onFalse} />
    </Container>
  );
}

export default UserList;
