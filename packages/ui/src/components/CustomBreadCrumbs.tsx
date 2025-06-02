import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Box, Stack } from '@mui/material';

export type PropsType = {
  heading?: string;
  action?: React.ReactNode;
  navigation: React.ReactNode[];
}

export const CustomBreadCrumbs = ({ heading, action, navigation }: PropsType) => {

  const renderHeading = (
    <Typography variant="h4" sx={{ mb: 2 }}>
      {heading}
    </Typography>
  );


  const renderNavigations = (
    <Breadcrumbs separator={<Separator />} >
      {navigation.map(
        element =>
          <Link underline="hover" color="inherit" href="/">
            {element}
          </Link>
      )}

    </Breadcrumbs>
  );

  const renderAction = <Box sx={{ flexShrink: 0 }}> {action} </Box>;
  return (
    <Stack spacing={2} >
      <Stack direction="row" alignItems="center">
        <Box sx={{ flexGrow: 1 }}>
          {heading && renderHeading}

          {!!navigation.length && renderNavigations}
        </Box>

        {action && renderAction}
      </Stack>

    </Stack>
  );
}

// ----------------------------------------------------------------------

function Separator() {
  return (
    <Box
      component="span"
      sx={{
        width: 4,
        height: 4,
        borderRadius: '50%',
        bgcolor: 'text.disabled',
      }}
    />
  );
}
