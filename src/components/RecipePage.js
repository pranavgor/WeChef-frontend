import { Avatar, Checkbox, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, {useState, useEffect} from 'react'
import Template from './Template'
import { theme } from './Theme'
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import axios from 'axios';
import {useParams} from 'react-router-dom'

function RecipePage() {
  const [ recipes, setRecipes ] = useState({'fav':false})
  const params = useParams();


    const handleFavourite = (e, rowData) => {
    console.log(e.target.checked, rowData)
        var temp = {...recipes};
        temp.fav = e.target.checked;
        setRecipes(temp)
        console.log(recipes)
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS',
            'x-access-token': localStorage.getItem("token")
        }
        const body = {
            'setFav' : e.target.checked,
            'recipeId': rowData 
        }
        axios.put("http://localhost:5000/recipes/self/fav/manage", { headers: headers, method: 'PUT', body:body})
        .then(res => {
        })
}
    useEffect(()=>{
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS',
            'x-access-token': localStorage.getItem("token")
        }
        axios.get("http://localhost:5000/recipes/get/"+params.id, { headers: headers, method: 'GET'})
        .then(res => {
            console.log(res.data.isFav)
            if (res.status === 200) {
              let temp = {}
              temp.id = res.data.data._id
              temp.name = res.data.data.name
              temp.ingredients = res.data.data.ingredients
              temp.description = res.data.data.description
              temp.image = res.data.data.image
              temp.fav = res.data.isFav
              setRecipes(temp)  
            }
        })
        .then(
            (error) => {
            }
        )
    }, [])

    useEffect(()=>{
      console.log(recipes)
    },[recipes])

  return (
    

    
    <ThemeProvider theme={theme}>
            <CssBaseline />  
            <Template>
            </Template>
            <Box sx={{ display: 'flex', marginLeft: '180px', marginTop:'100px', justifyContent:'center', alignItems:'center' }}>
                
                <Box sx = {{ borderRadius:'30px',backgroundColor:'#313639',border:'2px black solid', height:'80vh', width:'70vw', display:'flex', alignItems:'center', paddingTop:'20px', flexDirection:'row', justifyContent:'space-around'}}>
                    <Avatar src={recipes.image} sx = {{ height:'400px', width:'400px', marginLeft:'30px', marginRight:'30px'}}></Avatar>
                    <Box sx={{flexGrow:'3', display:'flex', flexDirection:'column', justifyContent:'space-around', height:'100%'}}>
                        <Typography sx={{ fontSize:'40px'}}>{recipes.name}</Typography>
                        <Typography>Ingredients : {recipes.ingredients}</Typography>
                        <Typography sx={{ textAlign:'justify', marginRight:'30px'}}>Description : {recipes.description}</Typography>
                        <Box sx={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                          <Typography>Favourite</Typography>
                          <Checkbox checked={recipes.fav} onChange={(e)=>handleFavourite(e, recipes.id)}> </Checkbox>
                        </Box>
                    </Box>
                </Box>
                
            </Box>

        
    </ThemeProvider>

  )
}

export default RecipePage