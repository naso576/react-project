
import * as React from 'react';
import {useState, useEffect} from 'react-dom';
import { Formik } from 'formik';
import { Box, Button, TextField, Autocomplete } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { render } from '@fullcalendar/core/preact';

export default function AddDetails () {

    console.log("somesh");
    return (


        <div>
                <h1>Comorbidities</h1>
                
                <h2>Register No is </h2>
                <Box >
                    <TextField
                    label="somesh"
                    name='somesh'
                    
                    ></TextField>

                </Box>

             

        </div>
    )


};

 ;