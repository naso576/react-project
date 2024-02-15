import React, { useState, useCallback, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { Box, Button, Autocomplete, InputLabel, } from "@mui/material";
import Select from 'react-select';
import { Table,TableBody, TableCell, TableContainer,TableFooter, TableHead, TablePagination, TableRow, Paper, TextField } from '@mui/material';
import useMediaQuery from "@mui/material/useMediaQuery";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import CancelIcon from '@mui/icons-material/Close';
import InputMask from 'react-input-mask';
import { useNavigate,useLocation } from "react-router-dom";
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
  



const  ManageTemplates = () => {

  const location = useLocation();
  // const [val,setVal] = useState('false');

  // if (  location.state === null){

    
  // console.log('sample is : '+(location.state));
  // }
  // else{

  //   setVal(location.state.open);
  // }



    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [openModal, setOpenmodal] = useState(false);
    const [openViewModal,setOpenViewModal] =useState(false);


   
         return(
    
        <div>

            <Box
                     display="grid"
                     gap="30px"
                     gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                     sx={{
                       "& > div": { gridColumn: isNonMobile ? undefined : "span 2", },
                       borderColor:'blue'
                     }}
                     
                     border="solid"
            
            >
                    <Button
                        variant="contained"
                         color="primary" 
                             onClick={()=>{setOpenmodal(true)

                              setOpenViewModal(false)
                             }
                            }
                    >
                        Add Template
                    </Button>

                   
                    <Button color="primary" 
                             onClick={()=>{
                               
                              setOpenViewModal(true)
                              setOpenmodal(false)
                            }

                            }
                    >
                        View Templates
                    </Button>

            </Box>

            <Box>

               {

                   openModal && <AddTemplate setOpenmodal={setOpenmodal}/>
               }      

            </Box>
               {openViewModal && <ViewTemplates/>
              }
           
        </div>
        )
    
}


const AddTemplate = ({setOpenmodal}) => {


    const isNonMobile = useMediaQuery("(min-width:600px)");
    
const medicationsArray = ["Medicine Name ", "Dosage", ,"Timing","Freq.","Duration","Action" ]; // pass columns here dynamically
const [medications,setMedications] = useState([{}]);
const [medicine, setMedicine] = useState('');
const [dosage, setDosage] = useState('');
const [timing, setTiming] = useState('');
const [freq,setFreq] = useState('');
const [duration,setDuration] = useState('');
const [prescriptionDetails,setPrescriptionDetails] = useState('');
const [templateName, setTemplateName] = useState('');

const navigate = useNavigate();



const [freqOptions,setFreqOptions] = useState(

    [


            {label : 'Every Day', value : 'Every Day'},
            
            {label : 'Weekly Once', value : 'Weekly Once'},
            
            {label : 'Alternate Day', value : 'Alternate Day'},
            
           
    
        ]
);

const [timingOptions,setTimingOptions] = useState(


      [

        {label :'Before Food', value : 'Before Food'},
        {label:'After Food', value : 'After Food'},
        {label : 'Along with Food', value : 'Along with Food'},
      ]
)

const [durationOptions, setDurationOptions] = useState(
    
    [
            
      {label : '1 Day', value : '1 Day'},
      
      {label : '2 Days', value : '2 Days'},
      
      {label : '3 Days', value : '3 Days'},
      
      {label : '4 Days', value : '4 Days'},
            {label : '5 Days', value : '5 Days'},
            {label : '1 Week', value : '1 Week'},
            {label : '1 Month', value : '1 Month'},
            {label : '2 Weeks', value : '2 Weeks'},
            {label : '2 Months', value : '2 Months'},
            {label : '3 Weeks', value : '3 Weeks'},
           
           
    ]
           
    )

const [dosageOptions, setDosageOptions ] =useState(
    [
    {
        label : '0--0--1', value : '0--0--1'

    },
    // {
    //     label : '0--1--1', value : '011'

    // },
    {
        label : '1--1--1', value : '1--1--1'

    },
    {
        label : '1--0--1', value : '1--0--1'

    },
    {
        label : '1--0--0', value : '1--0--0'

    },
    // {
    //     label : '1--1--0', value : '110'

    // },
    // {
    //     label : '0--1--0', value : '010'

    // },
    {
      label : 'STAT',value :'STAT'
    },
    {
      label : 'SOS',value : 'SOS'
    }
]
);




const addMedicine = () => {
    const newRow = {
        id: Date.now(),
        medicine: medicine,
       dosage :dosage,
       timing : timing,
       freq : freq,
       duration : duration
    };
  
  
  
    setMedications([...medications, newRow]);
    setMedicine('');
    setDosage('');
    setTiming('');
    setFreq('');
    setDuration('');
   
  
    console.log('complaints rows'+JSON.stringify(medications));
  };
  
  
  const handleRemoveMedicine = (idx) => {
  
    console.log('somesh')
    const tempRows = [...medications]; // to avoid  direct state mutation
    if (tempRows.length<2) 
    {
      alert("can't delete");
    }
    else
    {
    tempRows.splice(idx, 1);
    
    setMedications(tempRows);
    };
  
  };
  
  
  const handleChangeMedicine = idx => e => {
    const { name, value } = e.target;
    const rows1 = [...medications];
     const tempObj = medications[idx];
  tempObj[name]=value;
  rows1[idx] = tempObj;
   
  setMedications([...medications], rows1);
  
  // console.log(medications); 
  };
  
  
const handleOptions = idx => e => {


    // const { name, value } = JSON.parse(JSON.stringify(e));
    const rows1 = [...medications];
     const tempObj = medications[idx];
  tempObj["dosage"]=e.value;
  rows1[idx] = tempObj;
   
    setMedications([...medications], rows1);
    //  setSelectedOption(JSON.parse(JSON.stringify(e)).label);
  
   console.log(medications); 
  };
  
  
  
const handleOptions1 = idx => e => {


    // const { name, value } = JSON.parse(JSON.stringify(e));
    const rows1 = [...medications];
     const tempObj = medications[idx];
  tempObj["freq"]=e.value;
  rows1[idx] = tempObj;
   
    setMedications([...medications], rows1);
    //  setSelectedOption(JSON.parse(JSON.stringify(e)).label);
  
   console.log(medications); 
  };
  

  
  
const handleOptions2 = idx => e => {


    // const { name, value } = JSON.parse(JSON.stringify(e));
    const rows1 = [...medications];
     const tempObj = medications[idx];
  tempObj["duration"]=e.value;
  rows1[idx] = tempObj;
   
    setMedications([...medications], rows1);
    //  setSelectedOption(JSON.parse(JSON.stringify(e)).label);
  
   console.log(medications); 
  };
  
  
  const handleOptions3 = idx => e => {


    // const { name, value } = JSON.parse(JSON.stringify(e));
    const rows1 = [...medications];
     const tempObj = medications[idx];
  tempObj["timing"]=e.value;
  rows1[idx] = tempObj;
   
    setMedications([...medications], rows1);
    //  setSelectedOption(JSON.parse(JSON.stringify(e)).label);
  
   console.log(medications); 
  };
  
  
const [counter, setCounter] = useState([]);


// const fetchData = async() =>
// {
//   try{
//   const {data} = await axios.get('http://localhost:3000/gettemplateCounter');

//   console.log('data'+JSON.stringify(data));
//   setCounter(data);
//   return data;
//   }
//   catch(err){

//     console.error(err);
//       process.exitCode = 1;
//   }
// }

const updateCounter =()=>{


  axios.put('http://localhost:3000/templateCounter' ).then(res => 
  {
  
  }
  ).catch(err => {
  
  console.log('error: '+err)
  
  });
  
}


const handleCancel = ()=> {

          
setOpenmodal(false);

        }

const handleSubmit = ()=> {

  updateCounter();
  // fetchData();
// setCounter();
// const cnt = JSON.stringify(counter);

// console.log('cnt is'+cnt)

const cnt = data.length;

  const param1 ={
    templateId : cnt+1,
  templateName : templateName,
  templateDesc :prescriptionDetails,
  medicineusage : [...medications],
  
}

console.log('params : '+ JSON.stringify((param1)) );

axios.post('http://localhost:3000/createTemplate',(param1) ).then(res => 
{

}
).catch(err => {

console.log('error: '+err)

});

alert('Template is created successfully');

setOpenmodal(false);
// navigate( '/templates', {state: {open : false}}  )

}


const [data, setData] = useState([]);

const fetchInfo = () => {
  return axios.get('http://localhost:3000/viewTemplates').then((res) => setData(res.data));
};

useEffect(() => {
  fetchInfo();
}, []);

    return (

        <div>



             <IconButton >

             <CancelIcon  onClick={() => {
              setOpenmodal(false);
            }}/>
            </IconButton>
            <h3>Template format</h3>

            <Box display="inline-flex"
                flexDirection="column"
                width="1000px"
                alignItems="center"
                bgcolor='#1009090'
                borderRadius='12px'
                boxShadow='2'
              
                height='300px'
                sx={{height : '100%'}}
                >
                <TextField
                    label="Template Name"
                    name="templateName"
                    value={templateName}
                    onChange={e=>setTemplateName(e.target.value)}            
                />
                 <TextField
                    label="Description"
                    name="prescriptionDetails" 
                    value={prescriptionDetails}
                    onChange={e=>setPrescriptionDetails(e.target.value)}               
                />


                <Box   display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                            }}                            
                            
                            >  
                            
                                <Table sx={{ minWidth: '1000px', }} size="large" aria-label="simple table" >
                                <TableHead >

                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 1} }}>
                                {medicationsArray.map((column, index) => (
                                    <TableCell  key={index} align="left" sx={{fontFamily:{color:'blueviolet',fontStyle:'sans-serif',fontSize:'15px'}}}
                                                
                                                >
                                {column}
                                </TableCell>
                            ))}
                            <TableHead />
                                </TableRow>

                            </TableHead>
                            <TableBody>  

                            {medications.map((row, index) => (

                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 1} }}>
                                            
                                    <TableCell align="right" size='10px'>
                                        <TextField
                                            id="medicine-id"
                                            placeholder="Medicine"
                                            fullWidth
                                            label = "Medicine"
                                            name='medicine'
                                            onChange={handleChangeMedicine(index)}
                                            value ={medications[index].medicine}
                                            // InputLabelProps={{
                                            //   shrink: true,
                                            // }}
                                        
                                        />
                                    </TableCell>
                                    <TableCell>

                                        <Select
                                        options = {dosageOptions}
                                        placeholder='Dosage'
                                        onChange={handleOptions(index)}
                                        name = "dosage"

                                        >


                                        </Select>

                                    </TableCell>
                                    <TableCell align="left" width="150px">
                                        {/* <TextField
                                            id="Timing-id"
                                            placeholder="Timing"
                                            name='timing' 
                                            label= "Timing"
                                            value ={medications[index].timing}
                                            onChange={handleChangeMedicine(index)}
                                            // value={duration}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            type="text"
                                            sx={{width:'150px'}}
                                        /> */}
                                    
                                    <Select
                                        options = {timingOptions}
                                        placeholder='Timing'
                                        onChange={handleOptions3(index)}
                                        name = "timing"

                                        >
                                          </Select>
                                    
                                    </TableCell>

                                    <TableCell>

                                        <Select
                                        options = {freqOptions}
                                        placeholder='Freq.'
                                        onChange={handleOptions1(index)}
                                        name = "freq"

                                        >


                                        </Select>

                                        </TableCell>
                                        
                                        
                                    <TableCell>

                                    <Select
                                    options = {durationOptions}
                                    placeholder='Duration'
                                    onChange={handleOptions2(index)}
                                    name = "duration"

                                    >


                                    </Select>

                                    </TableCell>


                                        <TableCell align='left' width='120px'>
                                                                    
                                                <IconButton onClick={addMedicine}>
                                                    <AddIcon/>

                                                </IconButton>
                                                    <IconButton  onClick={() => handleRemoveMedicine(index)}>

                                                <DeleteIcon/>
                                                </IconButton>
                                                </TableCell>
                                    </TableRow>
                                    ))}
                                    </TableBody>
                                    </Table>
                                    </Box>              
               <Box display='flex'
                    columnGap='100px'
               >
                    <Button
                        // variant="contained"
                        // color="#110011" 
                        onClick={handleSubmit}
                        style={{
                          borderRadius: 15,
                          backgroundColor: "#7C69E1",
                          padding: "10px 25px",
                          fontSize: "12px"
                      }}
                    >
                       Submit
                    </Button>
                   
                    <Button
                        // variant="contained"
                        // color="#110011" 
                        onClick={handleCancel}
                        style={{
                          borderRadius: 15,
                          borderColor:'blue',
                          border:'10px',
                        
                          backgroundColor: "#E2F5FA",
                          padding: "10px 25px",
                          fontSize: "12px"
                      }}
                    >
                       Cancel
                    </Button>
                    </Box>
            </Box>
        </div>

    )

};


const ViewTemplates = ()=> {



  const [data, setData] = useState([]);

  const fetchInfo = () => {
    return axios.get('http://localhost:3000/viewTemplates').then((res) => setData(res.data));
  };
  
  useEffect(() => {
    fetchInfo();
  }, []);
  
  
  function EditToolbar(props) {
      const { setRows, setRowModesModel } = props;
    
      const handleClick = () => {
        const id = randomId();
        setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
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
  
    const [rows, setRows] = React.useState(data);
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
      { field: 'templateID', headerName: 'Template ID', width: 180, editable: false },
     
      {
        field: 'templateName',
        headerName: 'Template Name',
        type: 'text',
        width: 180,
        align: 'left',
        headerAlign: 'left',
        editable: true,
      },
      {
        field: 'prescriptionName',
        headerName: 'Template Description',
        type: 'text',
        width: 180,
        editable: true,
      },
     
      {field : 'medicineUsage', headerName : 'Medicine Details', width: 500,
      // editable: true,
      // renderCell: (params) => {
      //   return <div className="rowitem">
          
      //     {JSON.stringify(params.value)}
          
      //     </div>;
      // },
      valueGetter: (rows) => 
        
      ( JSON.stringify(rows.value))
        ,
  
      },
      {
        field : 'medicine', headerName : 'Medicine Name', width :100,
        valueGetter : (data) => JSON.stringify(data.row.medicineUsage).medicine

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

    return (

      <div>

<Box
                sx={{
                    height: 500,
                    width: '100%',
                    '& .actions': {
                    color: 'text.secondary',
                    },
                    '& .textPrimary': {
                    color: 'text.primary',
                    },
                }}
                >
                <DataGrid
                    rows={data}
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
                />
                </Box>
             
      </div>


    )

}

export default ManageTemplates;