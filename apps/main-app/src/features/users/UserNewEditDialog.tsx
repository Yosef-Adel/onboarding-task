import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { DialogContent } from '@mui/material';
import UserForm from './UserForm';
import type { IUser } from './types';

export interface UserDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (user: Omit<IUser, "id">) => void;
  user?: IUser;
  edit?: boolean;
}

export default function UserEditNewDialog(props: UserDialogProps) {
  const { onClose, open, onSubmit, user, edit } = props;
  return (
    <Dialog fullWidth onClose={onClose} open={open} maxWidth="sm">
      <DialogTitle>{edit ? "Edit User" : "Create User"}</DialogTitle>
      <DialogContent>
        <UserForm onSubmit={onSubmit} user={user} edit={edit} />
      </DialogContent>
    </Dialog>
  );
}
