import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Box, Stack } from '@mui/material';
import { BreadcrumbsLink } from './BreadcrumbLink';

export type BreadcrumbsLinkProps = {
  name?: string;
  href?: string;
};
export type PropsType = {
  heading?: string;
  action?: React.ReactNode;
  links: BreadcrumbsLinkProps[],
}

export const CustomBreadCrumbs = ({ heading, action, links }: PropsType) => {
  const lastLink = links[links.length - 1].name;

  const renderHeading = (
    <Typography variant="h4" sx={{ mb: 2 }}>
      {heading}
    </Typography>
  );

  const renderLinks = (
    <Breadcrumbs separator={<Separator />} >
      {links.map((link, index) => (
        <BreadcrumbsLink
          key={link.name ?? index}
          link={link}
          disabled={link.name === lastLink}
        />
      ))}
    </Breadcrumbs>
  );



  const renderAction = <Box sx={{ flexShrink: 0 }}> {action} </Box>;
  return (
    <Stack spacing={2} >
      <Stack direction="row" alignItems="center">
        <Box sx={{ flexGrow: 1 }}>
          {heading && renderHeading}

          {!!links.length && renderLinks}
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
