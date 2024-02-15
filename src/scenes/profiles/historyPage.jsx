import {useLocation , useNavigate} from 'react-router-dom'
import * as React from 'react' 
import { useState } from 'react';
import { Box, Button, TextField, Autocomplete, InputLabel } from "@mui/material";
import Select from 'react-select';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { borderColor, styled } from '@mui/system';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from "axios"
import useMediaQuery from "@mui/material/useMediaQuery";
import { Table,TableBody, TableCell, TableContainer,TableFooter, TableHead, TablePagination, TableRow, Paper } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import FullFeaturedCrudGrid from '../profiles/sample';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridColDef
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';
import { date } from 'yup';
import { MenuItem } from '@mui/base';
import { ConstructionOutlined } from '@mui/icons-material';




const initialRows = [
  {
    id: randomId(),
   
      vaccinationDate: randomCreatedDate(),
    dose: '"0" Dose',
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
 function HistoryPage1 (props) {
   const navigate = useNavigate();

     const location = useLocation();
     console.log(location);
    // const  state  = props.location.profileNo;
    const data = location.state; 
    const id =  data.profileNo ;
    // const data1 = JSON.stringify(data.params);
    // const parseData = JSON.parse(data1);
    // console.log(parseData.medicationsHistory);
    // const drugsHistory = JSON.stringify(parseData.drugsHistory);
    //  const medicationsHistory = JSON.stringify(parseData.medicationsHistory);

    console.log('id is'+ id);
    const [selectedDate,setselectedDate] =useState(null);
  
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
  // const deleteRow = (id) => {
  //   const updatedRows = rows.filter((row) => row.id !== id);
  //   setRows(updatedRows);
  // }; 

  // const handleDate =id =>e=>{

    // const updatedRows = rows
    //   .filter(br => br.id === id)
      

  //   const updatedRows =rows.map((data,index)=>{
  //     if (data.id === id)
  //     {
  //       setselectedDate(e);

  //     }
  //   })
   
  //     setRows(updatedRows);
  // }
  const [addrows, setAddrows] = React.useState([]);
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

  const vaccinationoptions =()=>{

    return(
      
          <Select>
             data={myData}
             touchUi={false}
          </Select>

      

    )
  }

  const myData = [
    { text: '"0" Dose', group: 'Hepatitis B', value: '0' },
    { text: '"1" Dose', group: 'Hepatitis B', value: '1' },
    { text: 'PVC1', group: 'PVC', value: 'pvc1' },
    { text: 'PVC2', group: 'PVC', value: 'pvc2' },
];

const options1 =[  {label : '"0" Dose', value : "0_dose"},
            
{label : '"1" Dose', value : "1_dose"},

{label : '"2" Dose', value : "2_dose"},

{label : '"3" Dose', value : "3_dose"}]

const options =[

    {
        label : "Hepatitis B",
        options : [
            {label : '"0" Dose', value : "0_dose"},
            
            {label : '"1" Dose', value : "1_dose"},
            
            {label : '"2" Dose', value : "2_dose"},
            
            {label : '"3" Dose', value : "3_dose"}
        ]

    },

    {
      label : "Pneumococcal vaccine",
      options : [
          {label : 'PCV 13', value : "pcv13"},
          
          {label : 'PPSV 23', value : "ppsv23"},
          
      ]

  },

]

;
  const columns  = [
    {
      field: 'dose',
      // ...vaccinationoptions
      headerName: 'Hepatitis B',
      width: 220,
      editable: true,
      type: 'singleSelect',
      // valueOptions : [vaccinationoptions],
    //   type: 'singleSelect',
      valueOptions:  [
        { text: '"0" Dose', group: 'Hepatitis B', value: '0' },
        { text: '"1" Dose', group: 'Hepatitis B', value: '1' },
        { text: 'PVC1', group: 'PVC', value: 'pvc1' },
        { text: 'PVC2', group: 'PVC', value: 'pvc2' },
    ],
    },
  
    {
      field: 'vaccinationDate',
      headerName: 'Date of vaccination',
      type: 'date',
      width: 180,
      editable: true,
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

  const handleFormSubmit =  () => {

    console.log('start');

    let params = {

            profileNo : data.profileNo,
            vaccinationHistory : [...rows],
            surgicalHistory : document.getElementById("surgicalHistory-id").value,
            // medicationsHistory :JSON.parse([medicationsHistory]),
            // drugsHistory : JSON.parse([drugsHistory]),
            // medicationsHistory : [...data1.medicationsHistory],

    }
    
    console.log("printing" +JSON.stringify(params));
  

     axios.put('http://localhost:3000/updateHistory',(params) ).then(res => 
    {
      // if (res.status === 200) {
      //  setData(res.data );
      //  console.log(res.data);
      // }
    }
    ).catch(err => {
    
      console.log('error: '+err)
    
  });
   
  console.log('id is:::'+id)
  navigate( '/profiles/historyPage',{state : {profileNo :id}}  )
 
   };
  
  const generateRows = () => {
    return (
      addrows.map((row ,index) =>
      {
      return (
        <TableRow key={row.disease}> 
          <TableCell component="th" scope="row">
            {row.disease || 'NA'} 
          </TableCell>
          <TableCell align="right">{row.duration}</TableCell>
          <TableCell align="right">{row.medicationdetails}</TableCell>
          
          
        </TableRow>
      );
    }))
  }

  
  // const [rows, setRows] = useState([]);    
  // const [disease, setDisease] = useState('');
  // const [medication, setMedication] = useState('');
  // const [duration, setDuration] = useState('');
  // const addRow = () => {
  //   const newRow={disease,duration};
  //   setRows([...rows, newRow, { id: rows.length + 1 }]);
  //   setDisease('');
  //   setDuration('');
   
  // };
       
  //    // Function to delete a row
  // const deleteRow = (id) => {
  //   const updatedRows = rows.filter((row) => row.id !== id);
  //   setRows(updatedRows);
  // };   


   

    return(

        <div>
        {/* <div>
        <h3>History of intake of drugs:</h3>
           <Box   display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}                            
            
              >
            <TextField
                  id="disease-id"
                  placeholder="Disease"
                  fullWidth
                  label = "History of intake of drugs"
                  InputLabelProps={{
                    shrink: true,
                  }}
                sx={{gridColumn: "span 2"}}
            />
          
             <TextField
                  id="duration-id"
                 placeholder="Duration"
                  fullWidth
                  label= "Duration"
             
                  InputLabelProps={{
                    shrink: true,
                  }}
                  type="number"
                  sx={{columnSpan:2}}
            />
            
           
              <FormControl size="large" sx={{ gap: 1, margin: 1}}>
                  <FormLabel id="duration-group" />
             <RadioGroup
                    row
                    aria-labelledby="duration-group-label"
                    name="durationTime"
                   
                  >
                    <FormControlLabel value="days" control={<Radio />} label="Day/s" />
                    <FormControlLabel value="weeks" control={<Radio />} label="Week/s" />
                    <FormControlLabel value="months" control={<Radio />} label="Month/s" />
                  </RadioGroup>
            </FormControl>
          </Box>
        </div> */}

        <div>
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

        </div>
        <div>

        <h3>Family history of any disease:</h3>
            <Box  display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4", },
                borderColor:'blue'
              }}
              
           
               
            >
                 
                  <TextField
                  id="medication-id"
                  variant={varianttype}
                  style={{textAlign: 'left'}}
                  placeholder="Family history"
                 
                type="text"
                  label ="Family history "
                //   className={classes.textField}
                  margin={margintype}
                
                  multiline= {true}
                   minrows={5}
                   maxRows={10}
                  
                 // onChange={e=>handleChange(e)}
               
            />

            </Box>
        </div>

              <div>
              <h3>Vaccination History:</h3>
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

              <div>
              <Box  display="-ms-flexbox"
       
       sx={{gap:20, alignItems:"center", alignContent:"center",gridColumn: "span 1"}}
       
       >
               <Button  variant="contained" color="primary" onClick={handleFormSubmit}>
                 Submit & Next
               </Button>
               </Box>
           

              </div>

              <div>
               
              <Select options={options}  />


              </div>

        </div>

    )
};

export default  HistoryPage1;