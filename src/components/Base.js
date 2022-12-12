import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { theme } from './Theme'

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                WeChef
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


export default function Base() {
        return (
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="m">
                    <CssBaseline />
                    <Box sx={{ display:"flex", flexDirection:'column', justifyContent:'center', alignItems:'center',marginTop:"100px"}}>
                        <Typography component="h1" variant="h2">Welcome to WeChef</Typography>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main', height:'80px', width:'80px', marginTop:"50px" }}>
                            <FastfoodIcon />
                        </Avatar>
                        <Box sx={{ marginTop:'50px',display:"flex", flexDirection:'row', justifyContent:'space-between', width:'300px'}}>
                        <Link to={`/register`}>
                            <Button component="h1" variant="contained">
                            Register
                            </Button>
                        </Link>
                        <Link to={`/login`}>
                            <Button component="h1" variant="contained">
                            Login
                            </Button>
                        </Link>
                        </Box>
                    </Box>
                        
                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>
            </ThemeProvider>
        );
    }


