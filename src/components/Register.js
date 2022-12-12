import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
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
import Alert from '@mui/material/Alert';

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


export default function Register() {
    const [error, setError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = event.currentTarget;
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS'
        }
        const body = {
            'username': data.username.value,
            'email': data.email.value,
            'password': data.password.value
        }
        axios.post("http://localhost:5000/auth/register", { headers: headers, method: 'POST', body})
            .then(res => {
                if (res.status === 200) {
                    console.log(res)
                    navigate('/login')
                    return res
                }
            })
            .then(
                (error) => {
                    setError(true);
                }
            )
        
    };
        return (
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    {
                        error ?
                        <Alert severity="error">Registration failed</Alert>
                        :null
                    }
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <FastfoodIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Register an account
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Enter User Name"
                                name="username"
                                autoComplete="username"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="email"
                                label="Enter Email"
                                type="email"
                                id="email"
                                autoComplete="email"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Enter Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Register
                            </Button>
                            <Link to='/'>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Home
                                </Button>
                            </Link>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>
            </ThemeProvider>
        );
    }


