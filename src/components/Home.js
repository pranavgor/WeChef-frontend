import { Checkbox, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Template from './Template'
import { theme } from './Theme'
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MUIDataTable from "mui-datatables";
import { Avatar } from '@mui/material';
import { Link } from "react-router-dom";


const getMuiTheme = () =>
    createTheme({
        palette: {
            mode: 'dark',
            primary:{
                light:"#f3e5f5",
                main:"#ce93d8",
                dark:"#ab47bc"
            }
        },
      components: {
        MuiTable:{
            styleOverrides:{ root: {
            width: '70vw',
            border:'none',
          }}
        },
        MuiTableBody:{
            styleOverrides:{ root: {
            border:'none',
          }}
        },
        MuiTableCell: {
          styleOverrides:{ root: {
            border: 'none',
            
          }}
        },
      }
    });


const colWidth = '10vw';

const columns = [
    {
        name: "Image",
        label: "Image",
        options: {
            filter: false,
            sort: false,
            setCellProps: () => ({ style: { minWidth: colWidth, maxWidth: colWidth }}),
            customBodyRender: (val) => {
            return (
                    <Avatar src={val} sx={{ marginRight:'30px', marginLeft:'10px', height:'100px', width:'100px'}}></Avatar>
                )
            },
        }
    },
    {
        name: "Name",
        label: "Name",
        options: {
            setCellProps: () => ({ style: { minWidth: colWidth, maxWidth: colWidth, height:colWidth }}),
            filter: false,
            sort: true,
        }
    },
    {
        name: "Ingredients",
        label: "Ingredients",
        
        options: {
            setCellProps: () => ({ style: { minWidth: colWidth, maxWidth: colWidth }}),
            filter: false,
            sort: false,
        }
    },
    {
        name: "Tags",
        label: "Tags",
        options: {
            setCellProps: () => ({ style: { minWidth: colWidth, maxWidth: colWidth }}),
            filter: true,
            sort: false,
        }
    },
    {
        name: "View Details",
        label: "View Details",
        options: {
            setCellProps: () => ({ style: { minWidth: colWidth, maxWidth: colWidth }}),
            filter: false,
            sort: false,
            customBodyRender: (val) => {
            return (
                    <Button variant="contained" onClick={(e)=>{handleRowClick(e, val)}}>Details</Button>
                )
            },
        }
        
    },
    {
        name: "Favourite",
        label: "Favourite",
        options: {
            setCellProps: () => ({ style: { minWidth: colWidth, maxWidth: colWidth }}),
            filter: false,
            sort: false,
            customBodyRender: (val) => {
            return (
                val ?
                <Checkbox checked={val[1]} onChange={(e)=>{handleFavourite(e, val[0])}}></Checkbox> :
                <Typography></Typography>
                ) 
            },
        }
        
    },
];
const handleRowClick = (e, rowData) => {
    console.log(rowData)
    window.location.href = `/recipe/` + rowData
}

const handleFavourite = (e, rowData) => {
    console.log(e.target.checked, rowData)
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
            window.location.reload();
        })
}


const options = {
    filterType: 'checkbox',
    selectableRows: false,
};

function Home() {

    const [ recipes, setRecipes ] = useState([[
    ]])

    useEffect(()=>{
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS',
            'x-access-token': localStorage.getItem("token")
        }
        axios.get("http://localhost:5000/recipes/all", { headers: headers, method: 'GET'})
        .then(res => {
            if (res.status === 200) {
                let ans = []
                for(var i = 0; i < res.data.data.length; i++){
                    let temp = []
                    temp.push(res.data.data[i].data.image)
                    temp.push(res.data.data[i].data.name)
                    temp.push(res.data.data[i].data.ingredients)
                    temp.push(res.data.data[i].data.tag)
                    temp.push(res.data.data[i].data._id)
                    temp.push([res.data.data[i].data._id, res.data.data[i].isFav])
                    ans.push([...temp])
                    temp = []
                }
                setRecipes(ans)
                console.log(ans)
            }
        })
        .then(
            (error) => {
            }
        )
    }, [])



  return (
    <ThemeProvider theme={theme}>
            <CssBaseline />  
            <Template>
            </Template>
            <Box sx={{ display: 'flex', marginLeft: '20vw', marginTop:'100px', justifyContent:'center', alignItems:'center'
                        }}>
                <ThemeProvider theme={getMuiTheme()}>
                <MUIDataTable
                        title={"Recipe Feed"}
                        data={recipes}
                        columns={columns}
                        options={options}
                    />
                </ThemeProvider>
            </Box>
    </ThemeProvider>
  )
}

export default Home