import * as React from 'react';
import {render} from 'react-dom';
import { Formik } from "formik";
import * as yup from "yup";
import { useState } from 'react';
import { Button } from '@mui/base';
import Select from 'react-select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Table,TableBody, TableCell, TableContainer,TableFooter, TableHead, TablePagination, TableRow, Paper, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import IconButton from "@mui/material/IconButton";
import {Box, Autocomplete} from '@mui/material'
import { useMediaQuery } from '@mui/material';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { borderColor, styled } from '@mui/system';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import axios from "axios"
import {useLocation} from 'react-router-dom'
import { useNavigate, Link } from "react-router-dom";

const HistoryPage2 =()=>{
  const navigate = useNavigate();
  const location = useLocation();
  // const location = useLocation();
  // const data = location.state; 
//   const data = {profileNo : 'sample'}; 
//   const {profileNo}={profileNo: data.profileNo};
//   const data1 = {profileNo: data.profileNo};
//  // const data = props.id;
// console.log('id is'+profileNo);


console.log(location);
// const  state  = props.location.profileNo;
const data = location.state; 
const id =  data.profileNo ;
// const id = 'sample';

  console.log('id is :'+id);
const [params,setParams] = useState( {
  // profileNo :profileNO,
  medicationsHistory : '',
  drugsHistory : '',
  vaccinationHistory : '',
  familyHistory : '',
  surgicalHistory : ''

})


const isNonMobile = useMediaQuery("(min-width:600px)");
const [rows,setRows] = useState([{}]);
const columnsArray = ["HepatitisB/Pneumococcal ", "Date Of Vaccination", "Action" ]; // pass columns here dynamically
const [dose, setDose] = useState('');
const [vaccineDate, setVaccineDate] = useState('');


const addRow = () => {
  const newRow = {
      id: Date.now(),
      dose: dose,
      // doseenabled: true,
      vaccineDate: vaccineDate,
  };

  setRows([...rows, newRow]);
  setDose('');
  setVaccineDate('');


  const temprows = [{}];

  if (rows.length>1) {
  rows.map((row,idx)=>{
    // console.log('sdfomsdmdfs'+(JSON.stringify(row)))

    temprows[idx]= JSON.parse(JSON.stringify(row)).dose.value;
   
  });
}
  
  // console.log(vales);

  // setOptions( options => {
  
      options.map((row,idx)=>{

      row.options.map((rows,idx1)=>{

        temprows.map((index)=>{

            // console.log('something'+index);

              if (row.options[idx1].value ===index){

              row.options[idx1].isDisabled =true
              // console.log('something'+index);
            }
          })
         })
      
    })
  // })
};


const handleRemoveSpecificRow = (idx) => {
  const tempRows = [...rows]; // to avoid  direct state mutation
  if (tempRows.length<2) 
  {
    alert("can't delete");
  }
  else
  {
  tempRows.splice(idx, 1);
  
  setRows(tempRows);
  };

};

const handleChange = idx => e => {
  const { name, value } = e.target;
  const rows1 = [...rows];
   const tempObj = rows[idx];
tempObj[name]=value;
rows1[idx] = tempObj;
 
  setRows([...rows], rows1);

 console.log(rows); 
};




const [selectedOption, setSelectedOption] = useState(null);


const handleOptions = idx => e => {

  console.log('changing'+JSON.stringify(e))
  // console.log('changing'+e.value);
  // const { name, value } = JSON.parse(JSON.stringify(e));
  const rows1 = [...rows];
   const tempObj = rows[idx];
tempObj["dose"]=e;
rows1[idx] = tempObj;
 
  setRows([...rows], rows1);
  //  setSelectedOption(JSON.parse(JSON.stringify(e)).label);

 console.log(rows); 
};

const [options,setOptions] =useState([

  {
      label : "Hepatitis B",
      options : [
          {label : '"0" Dose', value : "0_dose",isDisabled : false},
          
          {label : '"1" Dose', value : "1_dose",isDisabled: false},
          
          {label : '"2" Dose', value : "2_dose",isDisabled: false},
          
          {label : '"3" Dose', value : "3_dose",isDisabled: false},

          {label : 'Booster Dose', value : "Booster_dose",isDisabled: false}
      ]

  },

  {
    label : "Pneumococcal vaccine",
    options : [
        {label : 'PCV 13', value : "pcv13",isDisabled: false},
        
        {label : 'PPSV 23', value : "ppsv23",isDisabled: false},
        
    ]

},

])

;


//complaints history
const [complaints,setComplaints] = useState([{}]);
const complaintsArray = ["Complaints ", "Duration", "Action" ]; // pass columns here dynamically
const [complaint, setComplaint] = useState('');
const [complaintDuration, setcomplaintDuration] = useState('');
const [complaintdurationTime, setcomplaintDurationTime] = useState('');


const addComplaint = () => {
  const newRow = {
      id: Date.now(),
      complaint: complaint,
      complaintDuration: complaintDuration,
      complaintdurationTime :complaintdurationTime.toString(),
  };



  setComplaints([...complaints, newRow]);
  setComplaint('');
  setcomplaintDuration('');
  setcomplaintDurationTime('');

  console.log('complaints rows'+JSON.stringify(complaints));
};


const handleRemovecomplaint = (idx) => {

  console.log('somesh')
  const tempRows = [...complaints]; // to avoid  direct state mutation
  if (tempRows.length<2) 
  {
    alert("can't delete");
  }
  else
  {
  tempRows.splice(idx, 1);
  
  setComplaints(tempRows);
  };

};


const handleChangeComplaint = idx => e => {
  const { name, value } = e.target;
  const rows1 = [...complaints];
   const tempObj = complaints[idx];
tempObj[name]=value;
rows1[idx] = tempObj;
 
setComplaints([...complaints], rows1);

// console.log(complaints); 
};




//drugs history
const [drugrows,setDrugrows] = useState([{}]);
const drugcolumnsArray = ["History of Intake of Drugs ", "Duration", "Action" ]; // pass columns here dynamically
const [drug, setDrug] = useState('');
const [duration, setDuration] = useState('');
const [durationTime, setDurationTime] = useState('');


const addDrugRow = () => {
  const newRow = {
      id: Date.now(),
      drug: drug,
      duration: duration,
      durationTime :durationTime.toString(),
  };



  setDrugrows([...drugrows, newRow]);
  setDrug('');
  setDuration('');
  setDurationTime('');

  console.log('drug rows'+JSON.stringify(drugrows));
};


const handleRemoveRow = (idx) => {
  const tempRows = [...drugrows]; // to avoid  direct state mutation
  if (tempRows.length<2) 
  {
    alert("can't delete");
  }
  else
  {
  tempRows.splice(idx, 1);
  
  setDrugrows(tempRows);
  };

};


const handleChangeDrug = idx => e => {
  const { name, value } = e.target;
  const rows1 = [...drugrows];
   const tempObj = drugrows[idx];
tempObj[name]=value;
rows1[idx] = tempObj;
 
setDrugrows([...drugrows], rows1);

// console.log(drugrows); 
};


// handle comorbidities
const [comrows,setComrows] = useState([{}]);
const comcolumnsArray = ["Disease ", "Duration", "Medication present used by patient", "Action" ]; // pass columns here dynamically
const [disease, setDisease] = useState('');
const [diseaseDuration, setDiseaseDuration] = useState('');
const [diseaseDurationTime, setDiseaseDurationTime] = useState('');
const [medicationdetailsarray,setmedicationdetailsarray ]= useState([]);



const addComRow = () => {
  const newRow = {
      id: Date.now(),
      disease: disease,
      diseaseDuration: diseaseDuration,
      diseaseDurationTime :diseaseDurationTime,
      medicationdetailsarray : medicationdetailsarray,

  };

  // console.log('medication details: '+medicationdetails);
  console.log('started');
  console.log('empty rows'+JSON.stringify(comrows));

  if (comrows.length>1){
  comrows.map( (row,index) =>{

    
  var medicationdetails = row.medicationdetailsarray;
  // document.getElementById("medication-id").value;
    console.log(row);

    // if (row.disease.length >0) {
      var arr1 =null
      var arr2 =''
           var arr =medicationdetails.split('\n');
             arr.forEach((key,index)=>{
               arr1 = (index+1)+'.'+key +'\n';
               arr2 = arr2 + arr1;
           //    console.log(arr1);
             })
  
          console.log('somesh'+arr2);
         setmedicationdetailsarray(arr2);

         row.medicationdetailsarray= arr2;

          }
        )
        }

      
if(JSON.stringify(comrows)  === '[{}]')
{
  alert('enter all fields');
} 
else {     
  setComrows([...comrows,  newRow]);
  setDisease('');
  setDiseaseDuration('');
  setDiseaseDurationTime('');
  setmedicationdetailsarray('');

  console.log('COM rows'+JSON.stringify(comrows));
}
};

const handleChangeCom = idx => e => {
  const { name, value } = e.target;
  const rows1 = [...comrows];


   const tempObj = comrows[idx];
tempObj[name]=value;

rows1[idx] = tempObj;
 
  setComrows([...comrows], rows1);

};


const handleRemoveComRow = (idx) => {
  const tempRows = [...comrows]; // to avoid  direct state mutation
  if (tempRows.length<2) 
  {
    alert("can't delete");
  }
  else
  {
  tempRows.splice(idx, 1);
  
  setComrows(tempRows);
  };

};



// handle family history


const [checked, setChecked] = React.useState([true, false]);
const [toggle,setToggle] = useState(false);
const [familyHistory,setFamilyHistory] = useState([]);
const [flag,setFlag] =useState('');
const [othersChecked, setOthersChecked] = useState(false);
const [familyHistory1, setFamilyHistory1] =useState('');

const handleChangeCheck =e =>{

  setChecked(e.target.checked);

console.log(e.target.name+'  '+e.target.checked);

if (e.target.name === 'others' && e.target.checked === true){

  setToggle(true);
  setOthersChecked(true);
}
if (e.target.name === 'others' && e.target.checked === false){

  setToggle(false);
}

if (e.target.name === 'kidney' && e.target.checked === true){

  setFamilyHistory ([...familyHistory ,'kidney disease'])
}
if (e.target.name === 'kidney' && e.target.checked === false){


  var array = [...familyHistory]; // make a separate copy of the array
  var index = array.indexOf('kidney disease')
  if (index !== -1) {
    array.splice(index, 1);
    // this.setState({people: array});
    
  setFamilyHistory (array)
  }

}
if (e.target.name === 'others' && e.target.checked === true){

  setFlag(true);

  // setFamilyHistory (familyHistory[1] = document.getElementById('familyHistory-id').value)
}
console.log('falihistory is : '+familyHistory);

}

const handlefamilyHistoryChange =(e) =>{

  setFamilyHistory1(e.target.value);

}
 

//// 

const hangleSkip =(e) =>{

  e.stopPropagation();
  if(window.confirm('Are sure want to continue to without filling details in this page?')) {
      alert('abc');
  } else {
    alert('123');
  }

}

const handleSubmit = () =>{

  const surgicalHistory = document.getElementById('surgicalHistory-id').value;

  // setFamilyHistory ( [...familyHistory, familyHistory1 ]);
  
  console.log('othersChecked' + (JSON.stringify(rows)));

  // setRows(rows.map())

  var temprows = [{}];
  console.log('length is :'+rows.length);
if( rows.length>1) {
  rows.map((i,e)=>
  
  
  {

      // console.log(i.dose.value);
      // console.log(i.vaccineDate);
      temprows.push({"dose":i.dose.value,"vaccineDate":i.vaccineDate})

  }
  
  )
}
console.log('id is :'+id)    
  const params1 = {
    profileNo :id,
    complaintsHistory : [...complaints],
    medicationsHistory : [...comrows],
    drugsHistory : [...drugrows],
    vaccinationHistory : [...temprows],
    familyHistory : [...familyHistory, familyHistory1],
    surgicalHistory : surgicalHistory

  }
  
  

  // if (othersChecked === true){

  //   console.log('inside');
  //  setParams( {
  //   // profileNo :profileNO,
  //   medicationsHistory : [...comrows],
  //   drugsHistory : [...drugrows],
  //   vaccinationHistory : [...rows],
  //   familyHistory : [...familyHistory, familyHistory1],
  //   surgicalHistory : surgicalHistory

  // })
  // }
  // else{

  //   setParams( {
  //     // profileNo :profileNO,
  //     medicationsHistory : [...comrows],
  //     drugsHistory : [...drugrows],
  //     vaccinationHistory : [...rows],
  //     familyHistory : [...familyHistory],
  //     surgicalHistory : surgicalHistory
  
  //   })

  // }


console.log('params : ' +JSON.stringify(params1));


//   console.log('falihistory is : '+JSON.stringify(familyHistory));

  
//  console.log('vaccination details are :' +JSON.stringify(rows)); 
  
//   console.log('comorbidities is : '+JSON.stringify(comrows));

//   console.log(' drug history is:'+ JSON.stringify(drugrows));
//   console.log(' surgical history is:' + surgicalHistory);

axios.post('http://localhost:3000/addhistory1',(params1) ).then(res => 
{
  // if (res.status === 200) {
  //  setData(res.data );
  //  console.log(res.data);
  // }
}
).catch(err => {

  console.log('error: '+err)

});


axios.put('http://localhost:3000/updateHistory',(params1) ).then(res => 
{
  // if (res.status === 200) {
  //  setData(res.data );
  //  console.log(res.data);
  // }
}
).catch(err => {

  console.log('error: '+err)

});

navigate( '/profiles/historyPage3',{state : {profileNo :id}}  )


}
   
return (

<div className="container">

      {<h2>Profile is created successfully.Register No is {id}</h2> }

            <Box  display="flex"
                  justifyContent="right"
                  alignItems="right"
                  sx={{gap:20, alignItems:"right", alignContent:"right",gridColumn: "span 1"}}
            >

              <Button onClick={hangleSkip}>Skip & Next</Button>

            </Box>


            <Box>
                    <h3>Complaints:</h3>
           <Box   display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}                            
            
              >  
            
                <Table sx={{ minWidth: '1000px', border: "solid"  }} size="large" aria-label="simple table" >
                  <TableHead >

                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 1} }}>
                  {complaintsArray.map((column, index) => (
                    <TableCell  key={index} align="left" sx={{fontFamily:{color:'blueviolet',fontStyle:'sans-serif',fontSize:'15px'}}}
                                   
                    >
                      {column}
                    </TableCell>
                  ))}
                  <TableHead />
                    </TableRow>

                  </TableHead>
                  <TableBody>  

                  {complaints.map((row, index) => (

                   <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 1} }}>
                                   
                          <TableCell align="right" size='10px'>
                            <TextField
                                  id="complaint-id"
                                  placeholder="Complaint"
                                  fullWidth
                                  label = "Complaint"
                                  name='complaint'
                                  onChange={handleChangeComplaint(index)}
                                  value ={complaints[index].complaint}
                                  // InputLabelProps={{
                                  //   shrink: true,
                                  // }}
                              
                            />
                          </TableCell>
                          <TableCell align="left" width="290px">
                            <TextField
                                  id="complaintDuration-id"
                                placeholder="Duration"
                                  name='complaintDuration' 
                                  label= "Duration"
                                  value ={complaints[index].complaintDuration}
                                  onChange={handleChangeComplaint(index)}
                                  // value={duration}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  type="number"
                                sx={{width:'100px'}}
                            />
                          
                          
                              <FormControl size="small" sx={{ gap: 1, margin: 1}}>
                                  <FormLabel id="complaintDuration-group" />
                            <RadioGroup
                                    row
                                    aria-labelledby="duration-group-label"
                                    name="complaintdurationTime"
                                    sx={{
                                      '& .MuiSvgIcon-root': {
                                        fontSize: 10,
                                      },
                                    }}
                                    
                                    // defaultValue="days"
                                    onChange={handleChangeComplaint(index)}
                                    value={complaints[index].complaintdurationTime}
                                  
                                  >
                                    <FormControlLabel value="days" control={<Radio size="small"/>} label="D" />
                                    <FormControlLabel value="weeks" control={<Radio size="small"/>} label="W" />
                                    <FormControlLabel value="months" control={<Radio size="small"/>} label="M" />
                                  </RadioGroup>
                            </FormControl>
                            </TableCell>

                            <TableCell align='left' width='120px'>
                                                        
                                       <IconButton onClick={addComplaint}>
                                        <AddIcon/>

                                       </IconButton>
                                        <IconButton  onClick={() => handleRemovecomplaint(index)}>

                                      <DeleteIcon/>
                                      </IconButton>
                                    </TableCell>
                          </TableRow>
                          ))}
                          </TableBody>
                          </Table>
                        </Box>              
                </Box>


                <Box>
                    <h3>Comorbidities:</h3>

                 
            <Box  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                  }}                            
             >  
            
                <Table sx={{ minWidth: '1000px', border: "solid"  }} size="large" aria-label="simple table" >
                  <TableHead >

                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 1} }}>
                  {comcolumnsArray.map((column, index) => (
                    <TableCell  key={index} align="left" sx={{fontFamily:{color:'blueviolet',fontStyle:'sans-serif',fontSize:'15px'}}}
                                   
                    >
                      {column}
                    </TableCell>
                  ))}
                  
                </TableRow>

                  </TableHead>
                  <TableBody>  

                  {comrows.map((row, index) => (

                   <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 1} }}>
                                   
          <TableCell align="right" size='10px'>
            <TextField
                  id="disease-id"
                  placeholder="Disease Name"
                  fullWidth
                  label = "Disease Name"
                  name='disease'
                  onChange={handleChangeCom(index)}
                  value ={comrows[index].disease}
                  // InputLabelProps={{
                  //   shrink: true,
                  // }}
                  // error={!!touched.disease && !!errors.disease}
                  // helperText={touched.disease && errors.disease}
            />
           </TableCell>
          <TableCell align="left" width="290px">
             <TextField
                  id="diseaseDuration-id"
                 placeholder="Duration"
                   name='diseaseDuration' 
                  label= "Duration"
                  value ={comrows[index].diseaseDuration}
                  onChange={handleChangeCom(index)}
                  // value={duration}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  type="number"
                 sx={{width:'100px'}}
            />
           
           
              <FormControl size="small" sx={{ gap: 1, margin: 1}}>
                  <FormLabel id="duration-group" />
             <RadioGroup
                    row
                    aria-labelledby="duration-group-label"
                    name="diseaseDurationTime"
                    sx={{
                      '& .MuiSvgIcon-root': {
                        fontSize: 10,
                      },
                    }}
                    
                    // defaultValue="days"
                    onChange={handleChangeCom(index)}
                    value={comrows[index].diseaseDurationTime}
                   
                  >
                    <FormControlLabel value="days" control={<Radio size="small"/>} label="D" />
                    <FormControlLabel value="weeks" control={<Radio size="small"/>} label="W" />
                    <FormControlLabel value="months" control={<Radio size="small"/>} label="M" />
                  </RadioGroup>
            </FormControl>
            </TableCell>
            <TableCell>

            <TextField
                  id="medication-id"
                  // variant={varianttype}
                  style={{textAlign: 'left'}}
                  placeholder="Medications"
                 name='medicationdetailsarray'
                type="text"
                  label ="Medications present used by the Patient "
                //   className={classes.textField}
                  // margin={margintype}
                
                  multiline= {true}
                   minrows={5}
                   maxRows={10}
                   fullWidth
                  //  sx={{gridColumn : "span 2"}}
                 onChange={handleChangeCom(index)}
               
            />
             

            </TableCell>

            <TableCell align='left' width='120px'>
                                         
                                       <IconButton onClick={addComRow}>
                                        <AddIcon/>

                                       </IconButton>
                                        <IconButton  onClick={() => handleRemoveComRow(index)}>

                                      <DeleteIcon/>
                                      </IconButton>
                                    </TableCell>
            </TableRow>
            ))}
            </TableBody>
            </Table>
       
          </Box>  
        
        </Box>
        <Box>
                    <h3>History of intake of drugs:</h3>
           <Box   display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}                            
            
              >  
            
                <Table sx={{ minWidth: '1000px', border: "solid"  }} size="large" aria-label="simple table" >
                  <TableHead >

                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 1} }}>
                  {drugcolumnsArray.map((column, index) => (
                    <TableCell  key={index} align="left" sx={{fontFamily:{color:'blueviolet',fontStyle:'sans-serif',fontSize:'15px'}}}
                                   
                    >
                      {column}
                    </TableCell>
                  ))}
                  <TableHead />
                    </TableRow>

                  </TableHead>
                  <TableBody>  

                  {drugrows.map((row, index) => (

                   <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 1} }}>
                                   
                          <TableCell align="right" size='10px'>
                            <TextField
                                  id="drug-id"
                                  placeholder="Intake Of Drugs"
                                  fullWidth
                                  label = "History of intake of drugs"
                                  name='drug'
                                  onChange={handleChangeDrug(index)}
                                  value ={drugrows[index].drug}
                                  // InputLabelProps={{
                                  //   shrink: true,
                                  // }}
                              
                            />
                          </TableCell>
                          <TableCell align="left" width="290px">
                            <TextField
                                  id="duration-id"
                                placeholder="Duration"
                                  name='duration' 
                                  label= "Duration"
                                  value ={drugrows[index].duration}
                                  onChange={handleChangeDrug(index)}
                                  // value={duration}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  type="number"
                                sx={{width:'100px'}}
                            />
                          
                          
                              <FormControl size="small" sx={{ gap: 1, margin: 1}}>
                                  <FormLabel id="duration-group" />
                            <RadioGroup
                                    row
                                    aria-labelledby="duration-group-label"
                                    name="durationTime"
                                    sx={{
                                      '& .MuiSvgIcon-root': {
                                        fontSize: 10,
                                      },
                                    }}
                                    
                                    // defaultValue="days"
                                    onChange={handleChangeDrug(index)}
                                    value={drugrows[index].durationTime}
                                  
                                  >
                                    <FormControlLabel value="days" control={<Radio size="small"/>} label="D" />
                                    <FormControlLabel value="weeks" control={<Radio size="small"/>} label="W" />
                                    <FormControlLabel value="months" control={<Radio size="small"/>} label="M" />
                                  </RadioGroup>
                            </FormControl>
                            </TableCell>

                            <TableCell align='left' width='120px'>
                                                        
                                       <IconButton onClick={addDrugRow}>
                                        <AddIcon/>

                                       </IconButton>
                                        <IconButton  onClick={() => handleRemoveRow(index)}>

                                      <DeleteIcon/>
                                      </IconButton>
                                    </TableCell>
                          </TableRow>
                          ))}
                          </TableBody>
                          </Table>
                        </Box>              
                </Box>
                    
            <Box>
                   <h3>Vaccination History:</h3>
                 
              <table className="table table-bordered table-hover" id="tab_logic" 
              
              style={ {width: '500px', align: 'center',
              border: "1px solid black"
              }}
              >
              <thead>
                <tr>
                
                  {columnsArray.map((column, index) => (
                    <th className="text-center" key={index}
                   style={ {width: '300px', align: 'center',
                   border: "1px solid black", padding: '5px'
                   }}
                    
                    >
                      {column}
                    </th>
                  ))}
                  <th />
                </tr>
              </thead>
                        <tbody>
                            {rows.map((row, index) => (
                                <tr key={index}>
                                   
                                    <td
                                     style={ {width: '300px', align: 'center',
                                     border: "1px solid black", padding: '5px'
                                     }}
                                    >
                                    <Select options={options} 
                                    placeholder="Dose"
                                    name="dose"
                                    defaultValue='0_dose'
                                    onChange ={handleOptions(index)}
                                    // onChange={handleChange(index)}
                                    isOptionDisabled={(option) => option.isDisabled}
                                    /> 
                                    </td>
                                    <td
                                     style={ {width: '300px', align: 'center',
                                     border: "1px solid black", padding: '5px'
                                     }}
                                    
                                    > 
                                  <input
                                    type="date"
                                    placeholder="Date of Vaccination"
                                    name="vaccineDate"
                                    value={rows[index].vaccineDate}
                                    onChange={handleChange(index)}
                                />
                                </td>
                                    <td
                                    
                                    >
                                         
                                       <IconButton onClick={addRow}>
                                        <AddIcon/>

                                       </IconButton>
                                        <IconButton  onClick={() => handleRemoveSpecificRow(index)}>

                                      <DeleteIcon/>
                                      </IconButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </Box> 
                
                    <h3>Surgical history:</h3>
                  <Box>
                  <Textarea 
                    id="surgicalHistory-id"
                    minRows={3} 
                    maxRows={7}
                    placeholder="Surgical History"
                    sx={{ gridColumn: "span 40"}}
                    name = "surgicalHistory"

                    />

                  </Box>

                  <div>
                  <Box>
                  <h3>Family History of any disease: </h3>
                  <FormGroup>
                  <FormControlLabel
                  control={
                  <Checkbox defaultChecked={false} 
                            onChange={handleChangeCheck}
                            color="primary"
                            name='kidney'
                  />
                  }
                  label="Kidney Disease"
                  />
                  <FormControlLabel
                  control={
                  <Checkbox defaultChecked={false} 
                            onChange={handleChangeCheck}
                            color="primary"
                            name="others"
                  />
                  }
                  label="Any other Disease"
                  />
                  </FormGroup>
                    {toggle && <div>

                      <Box>
                        <h5>Please type the other disease names</h5>
                  <Textarea 
                    id="familyHistory-id"
                    minRows={2} 
                    maxRows={5}
                    placeholder="Family History"
                    sx={{ gridColumn: "span 40"}}
                    name = "familyHistory1"
                     onChange={handlefamilyHistoryChange}
                    value={familyHistory1}
                    />

                  </Box>

                    </div>
                      }
                  </Box>
                  </div>
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

                  
            );

};



const checkoutSchema = yup.object().shape({
  disease: yup.string().required("required"),
  diseaseDuration: yup.string().required("required"),
});

 
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


export default HistoryPage2;