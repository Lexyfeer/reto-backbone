import React from 'react';
import { AppBar } from '@mui/material/';
import { Box } from '@mui/material/';
import { Toolbar } from '@mui/material/';
import { Typography } from '@mui/material/';
import { Container } from '@mui/material/';
import { Button } from '@mui/material/';
import { Avatar } from '@mui/material/';
import { Link } from '@mui/material/';
import logo from '../../logo.svg';


// interface
interface Pages {
  key: string,
  title: string,
  path: string,
}

const pages: Array<Pages> = [
  {
    key: 'Read-route',
    title: 'Contacts List',
    path: '/read'
  }
]

const NavBar = () => {
  const [ setAnchorElNav] = React.useState<null | HTMLElement>(null);

  return (
    <AppBar position="static" color="secondary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link underline="none" href="/">
            <Avatar
              alt="Remy Sharp"
              src={logo}
              sx={{ width: 56, height: 56 }}
            />
          </Link>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            LOGO
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;