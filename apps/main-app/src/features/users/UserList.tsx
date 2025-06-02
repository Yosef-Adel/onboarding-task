import { CustomBreadCrumbs } from "@my-workspace/ui";
import Button from '@mui/material/Button';
import MuiLink from '@mui/material/Link';
import { Icon } from '@iconify/react';
import Container from "@mui/material/Container";
import { Link as RouterLink } from "react-router-dom";

function UserList() {
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

      <h1>Will display users table after learning tanstack tables and Rxjs</h1>
    </Container>
  );
}

export default UserList;
