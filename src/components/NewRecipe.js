import React from 'react'
import Template from './Template'
import {theme} from './Theme'
import Button from '@mui/material/Button';
import {
    FormControl,
    InputLabel,
    CssBaseline,
    Select,
    MenuItem,
    Link,
    Grid,
    Box,
    Typography,
    createTheme,
    ThemeProvider,
    TextField
} from '@mui/material';
import axios from 'axios';
import {useState, useEffect} from "react";
import {useLocation, useParams, useNavigate} from "react-router-dom";
import {styled} from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import Alert from '@mui/material/Alert';



const handleChange = (event) => {
    console.log(event.target.value)
}

function NewRecipe() {

    const [submit, setSubmit] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = event.currentTarget;
        console.log(data)
        console.log(localStorage.getItem("token"))
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS',
            'x-access-token': localStorage.getItem("token")
        }
        const body = {
            'name': data.name.value,
            'ingredients': data.ingredients.value,
            'description': data.description.value,
            'image': data.image.value,
            'tag': data.tag.value
        }

        axios.post("http://localhost:5000/recipes/create", { headers: headers, method: 'POST', body})
            .then(res => {
                if (res.status === 200) {
                    console.log(res)
                    setSubmit(true);
                    return res
                    
                }
            })
            .then(
                (error) => {
                }
            )

        }
    return (
        <ThemeProvider theme={theme}>

            <CssBaseline/>
                    
            <Template></Template>
            <Box
                sx={{
                display: 'flex',
                marginLeft: '15vw',
                marginTop: '100px',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{
                    mt: 3,
                    width: '80%'
                }}>
                    <Typography sx={{ fontSize:'25px', marginBottom:'10px'}}>Add a new recipe</Typography>
                    <Grid container spacing={2}>
                        <Grid item md={12}>
                            <FormControl fullWidth>
                                <TextField id="outlined-basic" name="name" required label="Enter Recipe Name" onChange={(e)=>handleChange(e)}></TextField>
                            </FormControl>      
                        </Grid>  
                        <Grid item md={12}>
                            <FormControl fullWidth>
                                <TextField id="outlined-basic" name="ingredients" required label="Enter Recipe Ingredients (Separate using commas)" onChange={(e)=>handleChange(e)}></TextField>
                            </FormControl>      
                        </Grid>  
                        <Grid item md={12}>
                            <FormControl fullWidth>
                                <TextField id="outlined-basic" name="description" required label="Enter Recipe Description" onChange={(e)=>handleChange(e)}></TextField>
                            </FormControl>      
                        </Grid>  
                        <Grid item md={12}>
                            <FormControl fullWidth>
                                <TextField id="outlined-basic" name="image" label="Enter Image Link" onChange={(e)=>handleChange(e)}></TextField>
                            </FormControl>      
                        </Grid>
                        <Grid item md={12}>
                            <FormControl fullWidth>
                                <TextField id="outlined-basic" name="tag" label="Enter Recipe Tags" onChange={(e)=>handleChange(e)}></TextField>
                            </FormControl>      
                        </Grid>
                    </Grid>
                    
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                        mt: 3,
                        mb: 2
                    }}
                        >
                        Submit
                    </Button>
                {
                        submit ?
                        <Alert severity="success">Successfully submitted</Alert>
                        :null
                    }
                </Box>
                    
            </Box>
                    
        </ThemeProvider>

    )
}

export default NewRecipe