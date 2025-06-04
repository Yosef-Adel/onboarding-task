import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { BreadcrumbsLinkProps } from './CustomBreadCrumbs';



// ----------------------------------------------------------------------

type Props = {
  disabled: boolean;
  link: BreadcrumbsLinkProps;
};

export function BreadcrumbsLink({ link, disabled }: Props) {
  const styles = {
    typography: 'body2',
    alignItems: 'center',
    color: 'text.primary',
    display: 'inline-flex',
    ...(disabled &&
      { cursor: 'default', pointerEvents: 'none', color: 'text.disabled' }),
  };

  const renderContent = (
    <>
      {link.name}
    </>
  );

  if (link.href) {
    return (
      <Link href={link.href} sx={styles}>
        {renderContent}
      </Link>
    );
  }

  return <Box sx={styles}> {renderContent} </Box>;
}
