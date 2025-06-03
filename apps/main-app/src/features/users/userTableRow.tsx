import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import type { IUser } from './types';


// ----------------------------------------------------------------------

type Props = {
  row: IUser;
};

export function UserTableRow({ row }: Props) {

  return (
    <TableRow hover >

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.id}</TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.name}</TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.email}</TableCell>

    </TableRow>
  );
}
