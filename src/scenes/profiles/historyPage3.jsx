import * as React from 'react';
import {useState} from 'react';
import axios from "axios"
import {useLocation} from 'react-router-dom'
import { useNavigate, Link } from "react-router-dom";
import {Box} from '@mui/material'
import { useMediaQuery } from '@mui/material';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { borderColor, styled } from '@mui/system';
import { TextField } from '@mui/material';
import { Formik } from "formik";
import * as yup from "yup";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Button } from '@mui/base';
import InputMask from 'react-input-mask';


const  HistoryPage3 =() =>{


    const navigate = useNavigate(); 
  const location = useLocation();
  const data = location.state; 
//   const data = {profileNo : 'sample'}; 
  const {profileNo}={profileNo: data.profileNo};
//   const data1 = {profileNo: data.profileNo};
 // const data = props.id;
console.log('id is'+profileNo);


    const isNonMobile = useMediaQuery("(min-width:600px)");

/// handle menstrual history

    const [menstrualHistory,setMenstrualHistory] = useState('');
    const [pregnancyHistory,setPregnancyHistory] =useState('');
    const [provisionalDiag,setProvisionalDiag] =useState('');


 //// handle examinations 
 
 const [Pallor,setPallor] =useState('');
 const[Icterus,setIcterus]=useState('');
 const[Clubbing,setClubbing]=useState('');
 const[Cyanosis,setCyanosis]=useState('');
 const[Oedema,setOedema]=useState('');
 const[Iymphadenopathy,setIymphadenopathy]=useState('');
 const [initialValues,setValues ] = useState({
  
    pulse: "",
    blood_pressure:"",
    respiratory_rate:"",
    temperature:"",
    jvp:"",
    bone_tenderness: "",

  });

  const [head2toeValues,sethead2toeValues] = useState({
        hair:"",
        skin:"",
        nails:"",
        eye:"",
        fundus:"",

  });

  const [abdomenValues,setAbdomenValues] = useState({

        ascites:"",
        organomegaly:"",
        renal_bruit:"",

  })

  const handleChange =(event) =>{
      
    const { name, value } = event.target; 

    if (name === 'blood_pressure'){

        console.log('naso'+value.replace('_',''));
    }
  
    // setValues({...initialValues, [event.target.name]:[event.target.value]});

   setValues(initialValues=>({...initialValues, [event.target.name]: value.replace('_','')}))

  }

  const handleChange1 =(event) =>{
      
    const { name, value } = event.target;    
    
    // sethead2toeValues({...head2toeValues, [event.target.name]:[event.target.value]});

    sethead2toeValues(head2toeValues=>( {...head2toeValues, [event.target.name]: value}

        
    ))
   
  }

  const handleChange2 =(event) =>{
  

    const { name, value } = event.target;

        setAbdomenValues(abdomenValues=>({...abdomenValues , [event.target.name] : value}));
  
  }


  
  const handleChangeExam =(e) =>{

    const { name, value } = e.target;

    console.log('name is: '+name);

    if (name === 'Pallor') {
    setPallor(value);
    }
    if (name === 'Icterus') {
        setIcterus(value);
        }
   if (name === 'Clubbing') {
        setClubbing(value);
        }
    if (name === 'Cyanosis') {
        setCyanosis(value);
        }
    if (name === 'Oedema') {
            setOedema(value);
            }
    if (name === 'Iymphadenopathy') {
        setIymphadenopathy(value);
        }
  }


  const hangleSkip =(e) =>{

    e.stopPropagation();
    if(window.confirm('Are sure want to continue to without filling details in this page?')) {
        alert('abc');
    } else {
      alert('123');
    }
  
  }
  
  const handleSubmit = () =>{

    console.log('values'+ (JSON.stringify(abdomenValues)));
  
  const param1 ={
      profileNo :profileNo,
    menstrualHistory : menstrualHistory,
    pregnancyHistory :pregnancyHistory,
    provisionalDiag : provisionalDiag,
    examinationHistory : initialValues,
    examinations1 : {

                    pallor : Pallor,
                    icterus : Icterus,
                    Clubbing :Clubbing,
                    Cyanosis : Cyanosis,
                    Oedema :Oedema,
                    Iymphadenopathy : Iymphadenopathy
                     },
    head2toeExamination :  head2toeValues,
    abdominalExamination : abdomenValues,

  }
  
  console.log('params : '+ JSON.stringify(param1) );
  
  axios.put('http://localhost:3000/updateHistory1',(param1) ).then(res => 
{
  // if (res.status === 200) {
  //  setData(res.data );
  //  console.log(res.data);
  // }
}
).catch(err => {

  console.log('error: '+err)

});

  

navigate( '/profiles/historyPage4',{state : {profileNo :profileNo}}  )
  }
     
  


    return (

        <div className="container">

                {<h2>Profile Register No is {data.profileNo}</h2> }

                <Box  display="flex"
                    justifyContent="right"
                    alignItems="right"
                    sx={{gap:20, alignItems:"right", alignContent:"right",gridColumn: "span 1"}}
                >

                <Button onClick={hangleSkip}>Skip & Next</Button>

                </Box>

            <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4", },
                    borderColor:'blue'
                }}
            >
                <Box sx={{gridColumn : "span 2"}}>
                <h3>Menstrual history:</h3>
                  
                  <Textarea 
                    id="MenstrualHistory-id"
                    minRows={2} 
                    maxRows={3}
                    placeholder="Menstrual History"
                    sx={{ gridColumn: "span 40"}}
                    name = "menstrualHistory"
                    onChange={e=>(setMenstrualHistory(e.target.value))}
                    value={menstrualHistory}
                    />

                  </Box>
                  <Box>
                  <h3>Pregnancy history:</h3>
                
                  <Textarea 
                    id="pregnancyHistory-id"
                    minRows={2} 
                    maxRows={3}
                    placeholder="Pregnancy History"
                    sx={{ gridColumn: "span 40"}}
                    name = "pregnancyHistory"
                    onChange={e=>(setPregnancyHistory(e.target.value))}
                    value={pregnancyHistory}
                    />

                  </Box>
                  </Box>

                  <h3>Provisional Diagnosis:</h3>
                  <Box>
                  <Textarea 
                    id="provisionalDiag-id"
                    minRows={3} 
                    maxRows={5}
                    placeholder="Provisional Diagnosis"
                    sx={{ gridColumn: "span 100", height: '400px'}}
                    name = "provisionalDiag"
                    onChange={e=>(setProvisionalDiag(e.target.value))}
                    value={provisionalDiag}
                    />

                  </Box>

           
            <Box 
            width='1100px'    
            sx={{ border: 1,
                            borderLeft: 1,
                            borderRight: 1,
                          
                            borderColor:blue[500],}}> 
            <h3>Examination:</h3>
            
            <h5>Vitals:</h5>  
               
                        <Box
                        display="grid"
                        gap="10px"
                        gridTemplateColumns="repeat(6, minmax(0, 1fr))"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 8" },
                        }}
                        > 
                        {/* <TextField
                           variant="filled"
                           type="text"
                            placeholder='Vitals'    
                            name='vitals'
                            label='Vitals'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={initialValues.vitals}
                            sx={{gridColumn: "span 1"}}
                            error={!!touched.vitals && !!errors.vitals}
                            helperText={touched.vitals && errors.vitals}
                        /> */}
                         <TextField
                            
                            variant="filled"
                            type="number"
                            label="Pulse"
                           
                            onChange={handleChange}
                            value={initialValues.pulse}
                            name="pulse"
                            sx={{ gridColumn: "span 1" }}
                        />

                        
                        <InputMask 
                            mask="999/999" 
                            value={initialValues.blood_pressure} 
                            onChange={handleChange}
                            name="blood_pressure"
                            placeholder="Blood Pressure"
                            label = "mmHG"
                            sx={{ gridColumn: "span 1" }}
                            disableUnderline
                        >
                            
                            {() => <TextField
                            
                            value={initialValues.blood_pressure} 
                            onChange={handleChange}
                            name="blood_pressure"
                            placeholder="Blood Pressure"
                            variant="filled"
                            type="text"
                            label = "Blood Pressure"
                            
                            />}
                            </InputMask>

                        {/* <TextField
                            
                            variant="filled"
                            type="number"
                            label="Blood Pressure"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={initialValues.blood_pressure}
                            name="blood_pressure"
                            error={!!touched.blood_pressure && !!errors.blood_pressure}
                            helperText={touched.blood_pressure && errors.blood_pressure}
                            sx={{ gridColumn: "span 1" }}
                        /> */}
                        <TextField
                            
                            variant="filled"
                            type="number"
                            label="Respiratory Rate"
                           
                            onChange={handleChange}
                            value={initialValues.respiratory_rate}
                            name="respiratory_rate"
                          
                            sx={{ gridColumn: "span 1" }}
                        />
                        
                       
                        <TextField
                            
                            variant="filled"
                            type="number"
                            InputProps={{
                                inputProps: { 
                                    max: 110, min: 85 
                                }
                            }}
                            label="Temperature"
                           
                            onChange={handleChange}
                            value={initialValues.temperature}
                            name="temperature"
                            sx={{ gridColumn: "span 1" }}
                        />
                         
                        <TextField
                            
                            variant="filled"
                            type="number"
                            label="Jugular Venous Pressure"
                           
                            onChange={handleChange}
                            value={initialValues.jvp}
                            name="jvp"
                            sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                            
                            variant="filled"
                            type="text"
                            label="Bone Tenderness"
                          
                            onChange={handleChange}
                            value={initialValues.bone_tenderness}
                            name="bone_tenderness"
                            sx={{ gridColumn: "span 1" }}
                    />

                  <h5>Sympthoms:</h5>
                  <p></p>
                  <p></p>
                  <p></p>
                  <p></p>
                  <p></p>

                    
                        <Table  sx={{ minWidth: '1000px', border: " 2 px solid blue"  }} size="small" aria-label="simple table" 
                        
                        >
                        
                        {/* <table
                         
                            style={ {width: '500px', align: 'center',
                            border: "2px solid blue"
                            }}
                        > */}
                            <TableHead
                              sx={{backgroundColor : 'lightblue', fontFamily:{fontSize:'100px'}}}  
                            >
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: "1px solid blue"} }}>
                                <TableCell sx={{fontFamily:{color:'blueviolet',fontStyle:'sans-serif',fontSize:'13px'}}} ><b>Pallor</b></TableCell>
                                <TableCell sx={{fontFamily:{color:'blueviolet',fontStyle:'sans-serif',fontSize:'13px'}}}><b>Icterus</b></TableCell>
                                <TableCell sx={{fontFamily:{color:'blueviolet',fontStyle:'sans-serif',fontSize:'13px'}}}><b>Clubbing</b></TableCell>
                                <TableCell sx={{fontFamily:{color:'blueviolet',fontStyle:'sans-serif',fontSize:'13px'}}}><b>Cyanosis</b></TableCell>
                                <TableCell sx={{fontFamily:{color:'blueviolet',fontStyle:'sans-serif',fontSize:'13px'}}}><b>Oedema</b></TableCell>
                                <TableCell sx={{fontFamily:{color:'blueviolet',fontStyle:'sans-serif',fontSize:'13px'}}}><b>Iymphadenopathy</b></TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody
                                 
                            >
                                <TableRow
                                   
                                   sx={{ '&:last-child td, &:last-child th': { border: "1px solid blue"} }}
                                >
                                <TableCell>
                                <FormControl size="large" sx={{ gap: 1, margin: 1}}>
                                    <FormLabel id="Pallor-group" />
                                <RadioGroup
                                        row
                                        aria-labelledby="Pallor-group-label"
                                        name="Pallor"
                                        onChange={handleChangeExam}
                                        value={Pallor}
                                    
                                    >
                                        <FormControlLabel value="y" control={<Radio />} label="Yes" />
                                        <FormControlLabel value="n" control={<Radio />} label="No" />
                                       
                                    </RadioGroup>
                                </FormControl>

                                </TableCell>
                                <TableCell>
                                <FormControl size="large" >
                                    <FormLabel id="Icterus-group" />
                                <RadioGroup
                                        row
                                        aria-labelledby="Icterus-group-label"
                                        name="Icterus"
                                        onChange={handleChangeExam}
                                        value={Icterus}
                                    >
                                        <FormControlLabel value="y" control={<Radio />} label="Yes" />
                                        <FormControlLabel value="n" control={<Radio />} label="No" />
                                       
                                    </RadioGroup>
                                </FormControl>

                                </TableCell>
                                <TableCell>
                                <FormControl size="large" >
                                    <FormLabel id="Clubbing-group" />
                                <RadioGroup
                                        row
                                        aria-labelledby="Clubbing-group-label"
                                        name="Clubbing"
                                        onChange={handleChangeExam}
                                        value={Clubbing}
                                  >
                                        <FormControlLabel value="y" control={<Radio />} label="Yes" />
                                        <FormControlLabel value="n" control={<Radio />} label="No" />
                                       
                                    </RadioGroup>
                                </FormControl>

                                </TableCell>
                                <TableCell>
                                <FormControl size="large" >
                                    <FormLabel id="Cyanosis-group" />
                                <RadioGroup
                                        row
                                        aria-labelledby="Cyanosis-group-label"
                                        name="Cyanosis"
                                        onChange={handleChangeExam}
                                        value={Cyanosis}
                                    >
                                        <FormControlLabel value="y" control={<Radio />} label="Yes" />
                                        <FormControlLabel value="n" control={<Radio />} label="No" />
                                       
                                    </RadioGroup>
                                </FormControl>

                                </TableCell>
                                <TableCell>
                                <FormControl size="large" >
                                    <FormLabel id="Oedema-group" />
                                <RadioGroup
                                        row
                                        aria-labelledby="Oedema-group-label"
                                        name="Oedema"
                                        onChange={handleChangeExam}
                                        value={Oedema}
                                    >
                                        <FormControlLabel value="y" control={<Radio />} label="Yes" />
                                        <FormControlLabel value="n" control={<Radio />} label="No" />
                                       
                                    </RadioGroup>
                                </FormControl>

                                </TableCell>
                                <TableCell>
                                <FormControl size="large" >
                                    <FormLabel id="Iymphadenopathy-group" />
                                <RadioGroup
                                        row
                                        aria-labelledby="Iymphadenopathy-group-label"
                                        name="Iymphadenopathy"
                                        onChange={handleChangeExam}
                                        value={Iymphadenopathy}
                                    >
                                        <FormControlLabel value="y" control={<Radio />} label="Yes" />
                                        <FormControlLabel value="n" control={<Radio />} label="No" />
                                       
                                    </RadioGroup>
                                </FormControl>

                                </TableCell>
                                </TableRow>
                            </TableBody>

                        {/* </table> */}
                        </Table>
                </Box>
               
                   
                </Box>

                <div>
               
                <h4>Head to Toe Examination:</h4>
                <Box  display="grid"
                width='1100px'
                        gap="10px"
                        gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
                            border: 1,
                            borderLeft: 1,
                            borderRight: 1,
                          
                            borderColor:blue[500],
                            alignItems : "center"
                            
                        }}
                       
                       
                 >
                  
                   <p>
                    Hair :    
                    <TextField
                        type="text"
                        style={{ width: "500px", height: "5px" }}
                        variant="outlined" size="small"
                        name="hair"
                        onChange={handleChange1}
                        value={head2toeValues.hair}
                        multiline
                        maxRows={2}
                    />   
                   </p>  
                   <p>
                    Skin :    
                    <TextField
                        type="text"
                        style={{ width: "500px",height: "10px" }}
                        variant="outlined" size="small"
                        name='skin'
                        onChange={handleChange1}
                        value={head2toeValues.skin}
                        multiline
                        maxRows={2}
                    />   
                   </p> 
                   <p>
                    Nails :    
                    <TextField
                        type="text"
                        style={{ width: "500px", height: "5px" }}
                        variant="outlined" size="small"
                        name='nails'
                        onChange={handleChange1}
                        value={head2toeValues.nails}
                        multiline
                        maxRows={2}
                    />   
                   </p>  
                   <p>
                    Eye :    
                    <TextField
                        type="text"
                        style={{ width: "500px",height: "10px" }}
                        variant="outlined" size="small"
                        name='eye'
                        onChange={handleChange1}
                        value={head2toeValues.eye}
                        multiline
                        maxRows={2}

                    />   
                   </p> 
                   <p>
                    Fundus :    
                    <TextField
                        type="text"
                        style={{ width: "500px",height: "100px" }}
                        variant="outlined" size="large"
                        name='fundus'
                        multiline
                        maxRows={4}
                        onChange={handleChange1}
                        value={head2toeValues.fundus}

                    />   
                   </p> 
                  


                </Box>
                
                </div>
                <div>
               
                <h4>Abdominal Examination:</h4>
                <Box  display="grid"
                        gap="10px"
                        width="1100px"
                        gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
                            border: 1,
                            borderLeft: 1,
                            borderRight: 1,
                          
                            borderColor:blue[500],
                            alignItems : "center"
                            
                        }}
                       
                       
                 >
                  
                   <p>
                    Ascites :    
                    <TextField
                        type="text"
                        style={{ width: "500px", height: "5px" }}
                        variant="outlined" size="small"
                        name="ascites"
                        onChange={handleChange2}
                        value={abdomenValues.ascites}
                        multiline
                        maxRows={2}
                    />   
                   </p>  
                   <p>
                    Organomegaly :    
                    <TextField
                        type="text"
                        style={{ width: "500px",height: "10px" }}
                        variant="outlined" size="small"
                        name='organomegaly'
                        onChange={handleChange2}
                        value={abdomenValues.organomegaly}
                        multiline
                        maxRows={2}
                    />   
                   </p> 
                   <p>
                    Renal bruit :    
                    <TextField
                        type="text"
                        style={{ width: "500px", height: "5px" }}
                        variant="outlined" size="small"
                        name='renal_bruit'
                        onChange={handleChange2}
                        value={abdomenValues.renal_bruit}
                        multiline
                        maxRows={2}
                    />   
                   </p>  
                  
                  
                </Box>
              
                </div>


                <div>
                <Box display="flex"
                      justifyContent="right"
                      alignItems="right"
                      sx={{gap:20, alignItems:"right", alignContent:"right",gridColumn: "span 1",}}
                  >

                 <Button variant="contained" 
                       color='black'

                 onClick={handleSubmit}
                 >Save & Proceed to Next Page</Button>

                   </Box>
                </div>

        </div>
    )

};


 
const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    width: 600px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
  
  );
  const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };
  
  const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };
  
  const checkoutSchema = yup.object().shape({
    vitals: yup.string().required("required"),
    pulse: yup.string().required("required"),
    blood_pressure : yup.string().required("required"),
    respiratory_rate :yup.string().required("required"),
    temperature :yup.string().required("required"),
    bone_tenderness : yup.string().required("required"),
  });
  


export default HistoryPage3;