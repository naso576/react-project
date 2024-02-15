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
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Button } from '@mui/base';
import { tokens } from "../../theme";
import { mockInvestigationsData } from "../../data/mockData";
import { useTheme } from "@mui/material";


const  HistoryPage4 =() =>{
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state; 
  //   const data = {profileNo : 'sample'}; 
    const {profileNo}={profileNo: data.profileNo};
  //   const data1 = {profileNo: data.profileNo};
   // const data = props.id;
  console.log('id is'+profileNo);
  
  
      const isNonMobile = useMediaQuery("(min-width:600px)");
      const theme = useTheme();
      const colors = tokens(theme.palette.mode);

      const hangleSkip =(e) =>{

        e.stopPropagation();
        if(window.confirm('Are sure want to continue to without filling details in this page?')) {
            alert('abc');
        } else {
          alert('123');
          investigationdata.map((v,i) =>(
            console.log(v.id)

          ))      
          
        }
      
      };

    const [cardiacExamination, setCardiacExamination] = useState();
    const [respiratoryExamination,setRespiratoryExamination] = useState();
    const [neurologicalExamination, setNeurologicalExamination] = useState();
    const [clinicalDiag,setClinicalDiag] = useState();

    const [investigationdata,setinvestigationdata] = useState([...mockInvestigationsData]);
    
    const [array,setArray] = useState(investigationdata);

    const [finalArray,setFinalArray] = useState([]);

    const [finalArray1,setFinalArray1] = useState([]);

    const handleChangeCheck = i=> e =>{

        console.log('id is' + e);

        
console.log(e.target.name+'  '+e.target.checked);


        // array.map( i => {

        //   console.log('array is :'+ i.investigationCode);

        // }



        // )
       
        
         setArray(array.map(samplearray => {
          if (samplearray.id === i && e.target.checked === true) {
            // Create a *new* object with changes
            console.log('inside if')
            return { ...samplearray, selected: true };

       
          } 
          
          if (samplearray.id === i && e.target.checked === false)
          {

            
            console.log('inside if else if')
            // No changes
            return { ...samplearray, selected: false };

          }
          else 
          {
              return samplearray;

          }

        }));

        console.log('array is :'+JSON.stringify(array));

    };

    const handleSubmit =()=>{



     setFinalArray( array.map((e,i)=>{

        
          if(e.selected=== true){
            // setFinalArray([...finalArray,{invCode:e.investigationCode}]);
            finalArray.push(e.investigationCode);
            

        
          }
          return {...finalArray};

      }
      
      
      ))
        
      

  const param1 ={
                  profileNo :profileNo,
                  cardiacExamination : cardiacExamination,
                  respiratoryExamination :respiratoryExamination,
                  neurologicalExamination : neurologicalExamination,
                  clinicalDiag : clinicalDiag,
                  investigationdata : finalArray,

                }
 console.log('param : '+ JSON.stringify(param1));


            
          axios.put('http://localhost:3000/updateHistory2',(param1) ).then(res => 
          {
           
          }
          ).catch(err => {
          
            console.log('error: '+err)
          
          });
 
          
        navigate( '/profiles/finalPage',{state : {profileNo :profileNo}}  )


    }

return (

            

            <div className="container" >

            {<h2>Profile Register No is {data.profileNo}</h2> }

                
            <Box  display="flex"
                    justifyContent="right"
                    alignItems="right"
                    sx={{gap:20, alignItems:"right", alignContent:"right",gridColumn: "span 1", borderColor: 'solid blue'}}
                >

                <Button onClick={hangleSkip}>Skip & Next</Button>

                </Box>

            <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 2", },
                    borderColor:' solid blue'
                }}
            >
                  <Box sx={{gridColumn : "span 2"}}>
                <h3>Cardiac examination:</h3>
                  
                  <Textarea 
                    id="cardiacExamination-id"
                    minRows={2} 
                    maxRows={3}
                    placeholder="Cardiac Examination"
                    sx={{ gridColumn: "span 40"}}
                    name = "cardiacExamination"
                    onChange={e=>(setCardiacExamination(e.target.value))}
                    value={cardiacExamination}
                    />

                  </Box>
                  <Box sx={{gridColumn : "span 2"}}>
                <h3>Respiratory examination:</h3>
                  
                  <Textarea 
                    id="RespiratoryExamination-id"
                    minRows={2} 
                    maxRows={3}
                    placeholder="Respiratory Examination"
                    sx={{ gridColumn: "span 40"}}
                    name = "respiratoryExamination"
                    onChange={e=>(setRespiratoryExamination(e.target.value))}
                    value={respiratoryExamination}
                    />

                  </Box>

                  <Box sx={{gridColumn : "span 2"}}>
                  <h3>Neurological examination:</h3>
                  
                  <Textarea 
                    id="neurologicalExamination-id"
                    minRows={2} 
                    maxRows={3}
                    placeholder="Neurological Examination"
                    sx={{ gridColumn: "span 40"}}
                    name = "neurologicalExamination"
                    onChange={e=>(setNeurologicalExamination(e.target.value))}
                    value={neurologicalExamination}
                    />

                  </Box>

                 
                  <Box sx={{gridColumn : "span 2"}}>
                  <h3>Clinical Diagnosis:</h3>
                  <Textarea 
                    id="clinicalDiag-id"
                    minRows={3} 
                    maxRows={5}
                    placeholder="Clinical Diagnosis"
                    sx={{ gridColumn: "span 100", height: '400px'}}
                    name = "clinicalDiag"
                    onChange={e=>(setClinicalDiag(e.target.value))}
                    value={clinicalDiag}
                    />
                    
                  </Box>

                 <Box  sx={{gridColumn : "span 2"}}>

                 <h3>Investigations Required</h3>

                 </Box>
                  <Box
                   display="grid"
                   gap="10px"
                   gridTemplateColumns="repeat(3, minmax(0, 1fr))"
                   sx={{
                       "& > div": { gridColumn: isNonMobile ? undefined : "span 3", },
                       borderColor:' solid blue'
                   }}
                  
                  >
                      

                    {
                  investigationdata.map((column,index) =>(
                        // <p>{column.investigationCode}</p>

                        <FormGroup>
                  <FormControlLabel
                  control={
                  <Checkbox defaultChecked={column.selected} 
                            onChange={handleChangeCheck(column.id)}
                            color="primary"
                            name={column.investigationCode}

                  />
                  }
                  label={column.investigationCode}
                  />
                  </FormGroup>

                  ))

                    }

                  </Box>
                      

                
                </Box>
                <Button onClick={handleSubmit}>Final Submit</Button>
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
export default HistoryPage4;