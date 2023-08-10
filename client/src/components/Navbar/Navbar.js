import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from "../../redux/slices/userSlice";
import AuthService from "../../utils/auth";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleToggleDrawer = () => setDrawerOpen(!drawerOpen);
  const handleLogout = () => {
    AuthService.logout();
    dispatch(logOut());
  };
  const links = [
    { to: '/', text: 'HOME' },
    { to: '/contact', text: 'CONTACT' },
    { to: '/location', text: 'LOCATION' },
    { to: '/about', text: 'ABOUT' },
    isAuthenticated && { to: '/tournaments', text: 'TOURNAMENTS' },
    isAuthenticated && { to: '/dashboard', text: 'DASHBOARD' },
    isAuthenticated && { onClick: handleLogout, text: 'LOGOUT' },
  ].filter(Boolean);
  const userLinks = [
    !isAuthenticated && { to: '/login', text: 'LOG IN' },
    !isAuthenticated && { to: '/signup', text: 'SIGN UP' },
  ].filter(Boolean);

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: '#1a237e', fontFamily: 'Orbitron, sans-serif' }}>
        <Toolbar>
          {isMobile && <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleToggleDrawer}><MenuIcon /></IconButton>}
          <div style={{ flexGrow: 1, display: 'flex', justifyContent: isMobile ? 'center' : 'space-between', alignItems: 'center' }}>
            {!isMobile && <ul style={{ display: 'flex', listStyle: 'none', padding: 0, margin: 0 }}>{links.map((link, index) => <li key={index} style={{ margin: '0 15px' }}><Typography variant="body1">{link.to ? <Link to={link.to} style={{ color: 'white', textDecoration: 'none' }}>{link.text}</Link> : <Button onClick={link.onClick} style={{ color: 'white' }}>{link.text}</Button>}</Typography></li>)}</ul>}
          </div>
          {!isMobile && userLinks.map((link, index) => <Button variant="contained" color="primary" key={index} component={Link} to={link.to} style={{ marginLeft: '10px' }}>{link.text}</Button>)}
        </Toolbar>
      </AppBar>
      {isMobile && <Drawer anchor="left" open={drawerOpen} onClose={handleToggleDrawer}><List>{links.concat(userLinks).map((link, index) => <ListItem button key={index}>{link.to ? <Link to={link.to} onClick={handleToggleDrawer} style={{ color: 'black', textDecoration: 'none' }}>{link.text}</Link> : <Button onClick={link.onClick}>{link.text}</Button>}</ListItem>)}</List></Drawer>}
    </>
  );
}

export default Navbar;
