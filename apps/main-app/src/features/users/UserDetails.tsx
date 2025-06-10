import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { Icon } from "@iconify/react"
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Stack,
  Container,
  Button,
} from "@mui/material"

import { useBoolean } from "../../hooks/useBoolean"
import { getUserById, updateUser } from "./userService"
import { CustomBreadCrumbs, LoadingScreen, notify } from "@my-workspace/ui"
import UserEditNewDialog from "./UserNewEditDialog"

import type { IUser } from "./types"
import type { AppDispatch } from "../../store"
import { updateUser as updateUserAction } from "../../store/userSlice"

export const UserDetails = () => {
  const { id } = useParams()
  const loading = useBoolean()
  const dialog = useBoolean()
  const [user, setUser] = useState<IUser | null>(null)
  const dispatch = useDispatch<AppDispatch>()

  // Fetch user on mount
  useEffect(() => {
    const fetchUser = async () => {
      loading.onTrue()
      try {
        const user = await getUserById(id!)
        setUser(user)
      } catch (error) {
        console.error(error)
      } finally {
        loading.onFalse()
      }
    }

    fetchUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  // Handle user update
  const onSubmit = async (value: Omit<IUser, "id">) => {
    try {
      const updatedUser = await updateUser(value, id!)
      notify({
        msg: "User Updated successfully!",
        type: "success",
        duration: 3000,
      })
      dialog.onFalse()
      setUser(updatedUser)
      dispatch(updateUserAction(updatedUser))
    } catch (error: unknown) {
      console.error(error)
      notify({
        msg: "Failed to update user.",
        type: "error",
        duration: 3000,
      })
    }
  }

  return (
    <Container sx={{ pt: 4 }}>
      <CustomBreadCrumbs
        heading="User Details"
        links={[
          { name: "Users", href: "/" },
          { name: "User Details" },
        ]}
        action={
          <Button
            onClick={dialog.onTrue}
            variant="contained"
            startIcon={<Icon icon="fluent:edit-16-filled" width="24" height="24" />}
          >
            Edit User
          </Button>
        }
      />

      {loading.value ? (
        <LoadingScreen />
      ) : (
        user && (
          <Box display="flex" justifyContent="center" alignItems="start">
            <Paper
              elevation={3}
              sx={{ p: 4, borderRadius: 4, textAlign: "center", width: 300 }}
            >
              <Stack spacing={2} alignItems="center">
                <Avatar sx={{ bgcolor: "primary.main", width: 80, height: 80, fontSize: 32 }}>
                  {user.name?.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="h5">{user.name}</Typography>
                <Typography variant="body1" color="text.secondary">
                  {user.email}
                </Typography>
              </Stack>
            </Paper>
          </Box>
        )
      )}

      {/* Edit User Dialog */}
      {user && (
        <UserEditNewDialog
          edit
          user={user}
          open={dialog.value}
          onClose={dialog.onFalse}
          onSubmit={onSubmit}
        />
      )}
    </Container>
  )
}
