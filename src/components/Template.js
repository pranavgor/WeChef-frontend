import { useLocation, useParams, useNavigate } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useEffect, useState } from 'react'
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { theme } from './Theme'
import AddIcon from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import Box from '@mui/material/Box';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';

const drawerWidth = 18;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `100%`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            // position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth + 'vw',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);



export default function Template () {


    const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    
    const toggleDrawer = () => {
    // setOpen(!open);
};

const handleLogout=()=>{
    localStorage.setItem("token", null)
    navigate('/login')
}
    return (
    <ThemeProvider theme={theme}>
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={true}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            WeChef
                            
                        </Typography>
                            <ListItemIcon onClick={handleLogout} sx={{ cursor: 'pointer'}}>
                                <LogoutIcon></LogoutIcon>
                            </ListItemIcon>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        <React.Fragment>
                            <ListItemButton onClick={() => {
                                navigate(`/new`)
                            }}>
                                <ListItemIcon>
                                    <AddIcon />
                                </ListItemIcon>
                                <ListItemText primary="New Recipe" />
                            </ListItemButton>
                            <ListItemButton onClick={() => {
                                navigate(`/feed`)
                            }}>
                                <ListItemIcon>
                                    <DynamicFeedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Feed" />
                            </ListItemButton>
                            <ListItemButton onClick={() => {
                                navigate(`/favourites`)
                            }}>
                                <ListItemIcon>
                                    <FavoriteIcon />
                                </ListItemIcon>
                                <ListItemText primary="Favourites" />
                            </ListItemButton>
                            <ListItemButton onClick={() => {
                                navigate(`/profile`)
                            }}>
                                <ListItemIcon>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText primary="Profile" />
                            </ListItemButton>
                            
                        </React.Fragment>
                    </List>
                </Drawer>
            </Box>
    </ThemeProvider>
    )

}