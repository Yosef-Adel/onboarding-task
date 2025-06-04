import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import UserForm from './userForm';
import { DialogContent } from '@mui/material';


export interface UserDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function UserDialog(props: UserDialogProps) {
  const { onClose, open } = props;

  return (
    <Dialog fullWidth onClose={onClose} open={open} maxWidth="sm">
      <DialogTitle>User Form</DialogTitle>
      <DialogContent>
        <UserForm onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}
