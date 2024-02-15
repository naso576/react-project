
import * as React from 'react';
import {useState, useEffect} from 'react-dom';
import { Formik } from 'formik';
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, Button, TextField, Autocomplete, InputLabel,Select } from "@mui/material";
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { borderColor, styled } from '@mui/system';

import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from "axios"

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {useLocation} from 'react-router-dom'
import { useNavigate, Link } from "react-router-dom";
// import { makeStyles } from "@mui/material/styles";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import { Table,TableBody, TableCell, TableContainer,TableFooter, TableHead, TablePagination, TableRow, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';


const initialRows = [
  {
    id: randomId(),
    history : '',
    duration : '',
    durationtime : '',
  }
];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, {  id  , isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };
  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}


export default function AddDetails () {
    const location = useLocation();
    const data = location.state; 
    const {profileNo}={profileNo: data.profileNo};
    const data1 = {profileNo: data.profileNo};
   // const data = props.id;
console.log('id is'+profileNo);
//console.log('surya'+ data.profileNo);

    return (
    
        <div>

            {<h2>Profile is created successfully.Register No is {data.profileNo}</h2> }
            <Link to=  "/profiles/historyPage" state={ data1} >skip to next page</Link>
                <h1>Comorbidities</h1> 
                <div>

                    <AddComorbidities id ={ profileNo}/>
                </div>
        </div>
    )

};

 export const AddComorbidities =(id)=>{

    const [addrows, setAddrows] = React.useState([]);
    const [medicationdetailsarray,setmedicationdetailsarray ]= React.useState([]);
    const [data, setData] = React.useState();
    const profileNO =id.id;
    const [disease,setDisease] =React.useState('');
    const [duration,setDuration] =React.useState('');
    
  const [durationtime,setDurationtime] =React.useState('days');
  const navigate = useNavigate();

    const [comorbiditiesDetails,setComorbiditiesDetails] = React.useState( {
     
      disease:'',
      duration: '',
      medicationdetails: '',
      isNew : true,
      
     });
    
  const handleFormSubmit =  () => {

      const params = {
        profileNo :profileNO,
        medicationsHistory : [...addrows],
        drugsHistory : [...rows],

      }
      
    
    console.log("printing" + JSON.stringify([...addrows]));
    
    console.log("printing" + JSON.stringify(params));

     axios.post('http://localhost:3000/addhistory1',(params) ).then(res => 
    {
      // if (res.status === 200) {
      //  setData(res.data );
      //  console.log(res.data);
      // }
    }
    ).catch(err => {
    
      console.log('error: '+err)
    
  });
  
  navigate( '/profiles/historyPage',{state : {profileNo :profileNO, medicationsHistory :  [...addrows], drugsHistory : [...rows]}}  )
 
   };
      const handleAdddetails = (event) => {
        
        setDisease(document.getElementById("disease-id").value)
        // var duration = 
        setDuration(document.getElementById("duration-id").value)
        var medicationdetails = document.getElementById("medication-id").value

      //  console.log(medicationdetails);
      console.log('disease is '+disease);

      if (disease.toString().length >0) {
       var arr1 =null
       var arr2 =''
            var arr =medicationdetails.split('\n');
              arr.forEach((key,index)=>{
                arr1 = (index+1)+'.'+key +'\n';
                arr2 = arr2 + arr1;
            //    console.log(arr1);

              })

         //   console.log('somesh'+arr2);
          setmedicationdetailsarray(arr2);
           //  let updatedAnswersCount = null;

//              medicationdetailsarray.forEach((key) => {
//  updatedAnswersCount = update(this.state.answersCount, {
//   [answer]: {$apply: (currentValue) => currentValue + 1},
//  });
// }
   //  setData (JSON.stringify(comorbiditiesDetails)); 
   setComorbiditiesDetails({  disease:disease,
    duration: duration+durationtime,
    medicationdetails: medicationdetailsarray,isNew : false});                  
         setAddrows( [...addrows,comorbiditiesDetails]);
       
    //setLoanProgram(event.target.value);
            }
      };
      const handleDelete=(index,e) =>{
        setAddrows( addrows.filter((v, i) => i !== index));
          console.log('deleted');
      }
    
      const generateRows = () => {
        return (
          addrows.map((row ,index) =>
          {

            // if (row.isNew ===false) 
            { 

            
          return (

           
          

            <TableRow key={row.disease}> 
              <TableCell component="th" scope="row">
                {row.disease } 
              </TableCell>
              <TableCell align="right">{row.duration}</TableCell>
              <TableCell align="right">{row.medicationdetails}</TableCell>
              <TableCell align='right'>
                        <IconButton onClick={e=>handleDelete(index,e)}>

                          <DeleteIcon/>
                        </IconButton>

                      </TableCell>
              
            </TableRow> 
           
           
          )
            };


        }))
      }

      const handleChange =(event)=>{
        if (event.target.value==='completed')  

        console.log('text')
        
      }
      
  const handleDuration = (event) => {

  console.log('something');
    setDurationtime(event.target.value);


  };
      const varianttype = "outlined"
  const margintype = "normal"
  const marginvalue = 8
  const isNonMobile = useMediaQuery("(min-width:600px)");
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

  const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    width: 320px;
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

  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: 'history',
      headerName: 'History of intake of drugs',
      width: 500,
      editable: true,
      type: 'text',
     
    },
  
    {
      field: 'duration',
      headerName: 'Duration',
      type: 'number',
      width: 100,
      editable: true,
    },
    {
      field: 'durationtime',
      headerName: 'Time',
      type: 'singleSelect',
      width: 100,
      editable: true,
      valueOptions : ['days','weeks','months'],

    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];


    return(
        <div >
        
        <div>
          <div >
          <Box  display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 2", },
                borderColor:'blue'
              }}
              
              border="solid"
              >
            <TextField
                  id="disease-id"
                  variant={varianttype}
                  style={{ margin: {marginvalue} }}
                  placeholder="Disease"
                  fullWidth
                  label = "Disease Name"
                //   className={classes.textField}
                  margin={margintype}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ gridColumn: "span 1" }}
            />

              <FormControl size="large" sx={{ gap: 1, margin: 1}}>
                  <FormLabel id="duration-group" />
            <TextField
                  id="duration-id"
                  variant={varianttype}
                  style={{ margin: {marginvalue} }}
                  placeholder="Duration"
                  fullWidth
                  label= "Duration"
                //   className={classes.textField}
                  margin={margintype}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  type="number"
                  sx={{ gridColumn: "span 2" }}
            />
             <RadioGroup
                    row
                    aria-labelledby="duration-group-label"
                    name="durationTime"
                     value={durationtime}
                    onChange={handleDuration} 
                  >
                    <FormControlLabel value="days" control={<Radio />} label="Day/s" />
                    <FormControlLabel value="weeks" control={<Radio />} label="Week/s" />
                    <FormControlLabel value="months" control={<Radio />} label="Month/s" />
                  </RadioGroup>
            </FormControl>
          
             <TextField
                  id="medication-id"
                  variant={varianttype}
                  style={{textAlign: 'left'}}
                  placeholder="Medications"
                 
                type="text"
                  label ="Medications present used by the Patient "
                //   className={classes.textField}
                  margin={margintype}
                
                  multiline= {true}
                   minrows={5}
                   maxRows={10}
                   sx={{gridColumn : "span 2"}}
                 // onChange={e=>handleChange(e)}
               
            />
             
            {/* <Textarea 
             id="medication-id"
            minRows={3} 
            maxRows={7}
            placeholder="Medications present used by the Patient"
            sx={{ gridColumn: "span 2"}}
            
            /> */}
          

            <Box></Box>
              <Box>
              <Button variant="contained" color="primary" onClick={handleAdddetails}>
                Add
              </Button>
              </Box>
            </Box>
           
            <Box sx={{gap:40}} > 

              <p>






              </p>
            </Box>
           
            <Box gap="30px" sx={{color: 'text.secondary', gap:1 ,borderColor:'blue',}}  border="solid">
            <div>
              <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Disease Name</TableCell>
                      <TableCell align="right">Duration</TableCell>
                      <TableCell align="right">Medication present used by the Patient</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {generateRows()}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            </Box>
          </div>
              
        </div>
        <div>
        <h3>History of intake of drugs:</h3>
           
        </div>
        <div>
        <Box
      sx={{
        height: 400,
        width: '70%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        initialState={{
          ...setRows.initialState,
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10, 25]}
      />
    </Box>


              </div>

          
        <Box  display="flex"
  justifyContent="center"
  alignItems="center"
       
        sx={{gap:20, alignItems:"center", alignContent:"center",gridColumn: "span 1"}}
        
        >
                <Button  variant="contained" color="primary" onClick={handleFormSubmit}>
                  Submit & Next
                </Button>
                </Box>
            
      </div>
    )
 };
