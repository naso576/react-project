import * as React from 'react';
import {useState,useEffect} from 'react';
import axios from "axios"
import {useLocation} from 'react-router-dom';
import { useTheme } from "@mui/material";
import { useMediaQuery } from '@mui/material';
import { tokens } from "../../theme";
import { Box,TextField,Button } from '@mui/material';
import { styled } from "@mui/material/styles";
import { Container } from "@mui/material";
import { bgcolor, display, height, maxHeight, textAlign } from '@mui/system';
import IconButton from "@mui/material/IconButton";
import { format } from 'date-fns';
import Moment from 'moment';
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
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import CancelIcon from '@mui/icons-material/Close';
import { joinPaths } from '@remix-run/router';
import {TableRow,TableCell,Table,TableHead,TableBody} from '@mui/material'


const FinalPage =() => {

     
    const location = useLocation();
    const data = location.state; 
    const {profileNo}={profileNo: data.profileNo};
    
    console.log('id is'+profileNo);
    // var profileNo = '202421185';
      
    

    const Wrapper = styled(Box)({
      display: "grid",
      gridTemplateColumns: "repeat(8, 2fr)",
    gridGap: 5,
    marginTop: 5
    });
  
  
      const isNonMobile = useMediaQuery("(min-width:600px)");
      const theme = useTheme();
      const colors = tokens(theme.palette.mode);

    
    var clinicName = "KTD Clinic";
     

    const [patientName,setPatientName] = useState();
    const [checkupdetails,setCheckupdetails] = useState();
    const [complaints,setComplaints] = useState([]);
    const [complaint,setComplaint] =useState([]);
    const [pastHistory,setPasthistory] = useState([]);
    const [diagnosis,setDiagnosis]  =   useState();
    const [testPrescribed,setTestPrescribed]    =   useState([]);
    const [bp,setBP]  = useState();
    const [pulse,setPulse]  = useState();
    const [spo2,setSpo2]  = useState();
    const [pallor,setPallor]  = useState();
    const [edema,setEdama] = useState();
    const [tenderness,setTenderness]= useState();
    const [advice,setAdvice] = useState();
    const [nextVisitDate,setNextVisitDate] = useState();
    const [openModal, setOpenmodal] = useState(false);
    const [openViewModal,setOpenViewModal] =useState(false);
    const [valueList,setValueList] = useState([]);
    const medicationsArray = ["S.No","Medicine", "Dosage", ,"Timing","Freq.","Duration" ]; // pass columns here dynamically


    
  const today = new Date();
  
  const month = today.getMonth()+1;
  const month1 =today.getUTCMonth()+1;

  const year = today.getFullYear();
  const day = today.getDate();
  const time = today.getTime()
  
  const currentdate =Moment(today).format("DD-MMM-YYYY")+' ' +today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

   
    const handleChangevisitdate=(e)=>{

     
      const day = Moment(e).format('dddd');

      const date = Moment(e).format("DD-MMM-YYYY") +'  '+ day  ;
      
      setNextVisitDate(date)
    }


    const getPatientName=()=>{


       return axios.get(`http://localhost:3000/findPatient/${profileNo}`).then(
         (res) => {
          console.log(res.data[0]);
          setPatientName((res.data[0].firstName)+' '+(res.data[0].lastName))
          
        
        });


    };

        
    useEffect(() => {
        getPatientName();
    }, []);

    const getPatientHistory = () =>{

      return axios.get(`http://localhost:3000/findPatientHistory/${profileNo}`).then(
        (res) => {
            console.log(res.data[0].complaintsHistory);
            // setComplaints(res.data[0].complaintsHistory);
            // complaints.map(i=>{

            //   complaint.push(i.complaint,',');
            // })
      //       res.data[0].complaintsHistory.map((i,next)=>{
                
     

      // complaint.push(i.complaint,',');

      //       })
      }
      );
      // setComplaint('');

    };

    useEffect(() => {
      getPatientHistory();
  }, []);


  const fetchItems = async () => {
    try {
      const data = await fetch(`http://localhost:3000/findPatientHistory/${profileNo}`);
      const items = await data.json();
      console.log("HELLO FROM INSIDE OF FETCHITEMS", items);
      setComplaint(items[0].complaintsHistory);
      setTestPrescribed(items[0].investigationsRequired);
      // setDiagnosis(items[0].)
      setBP(items[0].examinationHistory.blood_pressure);
      setPulse(items[0].examinationHistory.pulse);
      setPallor(items[0].examinations1.pallor);
      setTenderness(items[0].examinationHistory.tenderness);
      setDiagnosis(items[0].clinicalDiagnosis);
      setPasthistory(items[0].familyHistory);
      setEdama(items[0].examinations1.Oedema);

    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchItems();
  }, []);

  const showHistory =()=>{

    console.log('show'+JSON.stringify(complaint))

    // complaint.map(i=>{
        
    // console.log('show'+JSON.stringify(i))

    // })
  }

  
useEffect(()=>{

  showHistory();
},[]);

const handleModal =() =>{

console.log('clicked');

setOpenmodal(true);
console.log('list is '+ JSON.stringify(valueList))

}


const handleAddMore =()=>{



}





    return (
          <div>
           <div style={{width:'1000px'}}>
             <Container>
              <Wrapper maxHeight='100px' gap='5px'>
             <Box
              maxHeight='100px'
              
               >
                <img
                
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/log_blue.jpg`}
                  style={{ cursor: "pointer", borderRadius: "0%" }}
                />
                </Box>
              
                <Box
                  
                    maxHeight='100px' 
                    paddingBottom='3px'      
                >
              <h2>KTD Clinic</h2>
              <p>Sheela Nagar
                 Visakhapatnam
              </p>
              {/* <p>Visakhapatnam</p> */}
              </Box>
              <Box>

              </Box>
              <Box>

              </Box>
              <Box>

              </Box>
              <Box>

              </Box>
             
              <Box>

              </Box>
              <Box textAlign="right"  maxHeight='3px'   >
              <h4>Dr.Naveen Kumar Koppara</h4>
              <p> naveen.koppara@gmail.com
                  Mob.No: 9949175218
              </p>
              {/* <p>Mob.No: 7702172172</p> */}
              </Box>
            </Wrapper>
            </Container>
            
           
           </div> 
            <div style={{width:'1000px'}}
                
                >
            <Box
            display='flex'
            justifyContent='space-between'
            sx={{backgroundColor:'lightblue',borderTop:1,borderBottom:1,}}
            lineHeight='1px'
            color='darkblue'

            >
         
            <p ><b>Patient Name :</b> {patientName}</p>
         
            <p ><b>Date & Time:</b> {currentdate}</p>
        
            </Box>
            </div>
            <div
            style={{display:'flex'
                    
                  }}
            >
              <b>BP: {
              bp
              }
              
              </b> &nbsp;&nbsp;&nbsp;
              <b>Pulse: {pulse }
              
              </b>&nbsp;&nbsp;&nbsp;
              <b>Pallor: {pallor === 'n' ? '+' : '-'}
              
              </b>&nbsp;&nbsp;&nbsp;
              <b>Edema: {edema === 'n' ? '+' : '-'}
              
              </b>&nbsp;&nbsp;&nbsp;
            </div>

            <div style={{ 
                        display: 'flex',
                       justifyContent:'start'
                       
              
                }}
            >

            
                <b style={{display:'inline-block',textAlign:'justify', lineHeight:'25px'}}>Complaints:    
                </b> 
                
                {complaint.map((item,index) => (
                          
                      
                         <p style={{display:'inline',textAlign:'justify',lineHeight:'1px'}}> {item.complaint},</p>
                      
              ))}
              
            </div>
            <div
            style={{display:'flex'}}
            >
                  <b style={{display:'inline-block',textAlign:'justify', lineHeight:'25px'}}>Past History:</b>
                  {pastHistory.map(item=>(
                    <p style={{display:'inline',textAlign:'justify',lineHeight:'1px'}}>{item}</p>
                  ))}

            </div>
            <div>
              <h4 style={{display:'inline-block',textAlign:'justify', lineHeight:'5px'}}>Sys.Exam:</h4>

            </div>
            <div 
              style={{display:'flex'}}
              >
              <h4 style={{display:'inline-block',textAlign:'justify', lineHeight:'1px'}}>Diagnosis: </h4>
              <p style={{display:'inline',textAlign:'justify',lineHeight:'10px'}}>{diagnosis}</p>
            </div>

            <div>

            <IconButton 
            
            onClick={handleModal}
            
                   
            >
                                        <AddIcon/>

                                       </IconButton>

            </div>

            <div>
            <Box>

                    {

                        openModal && <OpenTemplatesList setOpenmodal={setOpenmodal} setOpenViewModal ={setOpenViewModal} setValueList ={setValueList}/>
                    }      

                    </Box>
                   
                   { openViewModal  &&
                    <Box                             
                             display="grid"
                             gap="30px"
                             gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                             sx={{
                                 "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                             }} 
                            >  

                    <Table   >
                                <TableHead >

                                <TableRow >
                                {/* {medicationsArray.map((column, index) => (
                                    <TableCell  key={index} align="left" sx={{fontFamily:{color:'blueviolet',fontStyle:'sans-serif',fontSize:'15px'}}}
                                                
                                                >
                                {column}
                                </TableCell>

                                
                            ))} */}
                            <TableCell align='left' sx={{size:'40%'}} >

                             <b> Medicine</b>
                            </TableCell>
                            <TableCell align='right' size='10px' >
                             <b> Dosage</b>
                            </TableCell>
                            <TableCell align='right' size='10px' >

                              <b>Timing</b>
                            </TableCell>
                            <TableCell align='right' size='10px' >

                              <b>Freq.</b>
                            </TableCell>
                            <TableCell align='left' size='10px' >

                              <b>Duration</b>
                            </TableCell>
                            
                               
                                </TableRow>

                            </TableHead>
                            <TableBody>  
                            {valueList.map((row)=>(

                                row.medicineUsage.map((val,i) => (

                                  <TableRow key={i} >
                                  {/* <TableCell>
                                    {i+1}
                                  </TableCell> */}
                                  <TableCell align="left" sx={{size:'40%'}}>
                                    {i+1})   {val.medicine}
                                  
                                    {/* <TextField
                                    value=  {'  '+ val.medicine}
                                    onChange={e=>e.target.value}
          
                                    variant="outlined"
                                    sx={{border: 'none', "& fieldset": { border: 'none' },
                                          bgcolor: '#10B0000'
                                        }}
                                    margin="normal"
                                    fullWidth
                                  InputProps={{
                                   
                                    disableUnderline: true, 
                                  }}
                                   >
                                  
                                    </TextField> */}
                                    </TableCell>
                                  <TableCell align="right">
                                    
                                    {val.dosage}
                                    
                                    </TableCell>
                                  <TableCell align="right">
                                    
                                    {val.timing}
                                    
                                    </TableCell>
                                  
                                  <TableCell align="right">
                                    {val.freq}
                                    
                                    </TableCell>
                                  
                                  <TableCell align="left">
                                    
                                    {val.duration}
                                    
                                    </TableCell>
                                  </TableRow>

                                ))
                              
                    
                            ))}
                              </TableBody>
                              
                   </Table> 
                      </Box>}
                          
{/* 
                    {valueList.map((row)=>(
                    


                    <TableRow key={row.medicineUsage} > 

                      {Object.values(row.medicineUsage).map((val,i) =>(
                        <TableRow >
                        <TableCell align="right">
                          
                         
                          <TextField
                          value=  {val.medicine}

                         
                         >
                        
                          </TextField>
                          </TableCell>
                        <TableCell align="right">
                          
                          {val.dosage}
                          
                          </TableCell>
                        <TableCell align="right">
                          
                          {val.timing}
                          
                          </TableCell>
                        
                        <TableCell align="right">
                          {val.freq}
                          
                          </TableCell>
                        
                        <TableCell align="right">
                          
                          {val.duration}
                          
                          </TableCell>
                        </TableRow>
                      ))
                   
                  
                      }
              </TableRow>
              

                  ))} */}

                 <div>

                    <IconButton 

                    onClick={handleAddMore}

                          
                    >
                     <EditIcon/>

                    </IconButton>

               </div>

            </div>
            
            
            <div 
           
            >

                  <h4 style={{display:'inline',textAlign:'justify',lineHeight:'1px'}}>Tests Prescribed :</h4>
                  
                  <div   style={{ 
              display:'inline-flex',
             
            }}>
                  {testPrescribed.map((item,index) => (
                          
                      
                          <p style={{display:'list-item',lineHeight:'10px', textAlign:'left', padding:'1px'}}>  {item}</p>
                      
              ))}
              </div>


            </div>
            <div >
              <h4 style={{display:'inline-block',textAlign:'justify',lineHeight:'1px'}}>Advice: </h4>
              <TextField
                    variant="outlined"
                    sx={{border: 'none', "& fieldset": { border: 'none' },
                          bgcolor: '#10B0000'
                        }}
                    margin="normal"
                    fullWidth
                  InputProps={{
                   
                    disableUnderline: true, 
                  }}
                />

            </div>
           <div
           style={{display:'flex'}}
           >
              <h5 style={{display:'inline-block',textAlign:'justify',lineHeight:'1px'}}>Next Visit: </h5>
                  <input
                                    type="date"
                                    placeholder="Next Visit"
                                    name="nextVisitDate"
                                    // value={nextDate}
                                    defaultValue={day}
                                    onChange={e=>handleChangevisitdate(e.target.value)}
                                    min={day}
                                />

                  <p>{nextVisitDate}</p>

           </div>

        </div>

    )

}


export default FinalPage;



const OpenTemplatesList=({ setOpenmodal ,setOpenViewModal, setValueList})=>{



  
  const [data, setData] = useState([]);
  const [medicineList,setMedicineList] = useState([]);

  const fetchInfo = () => {
    return axios.get('http://localhost:3000/viewTemplates').then((res) => setData(res.data)
    
   
    );
  };
  
  useEffect(() => {
    fetchInfo();
    // console.log(data);
  }, []);



  // setMedicineList(
  //   data.map(i =>{
  //   medicineList.push(
  //   i.medicineUsage);

  //   return {...medicineList}

  //   })
  // )

  // console.log(medicineList);
 setValueList(data);
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

    <div>

      <h3>Templates list</h3>

      <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenmodal(false);
              setOpenViewModal(true);
            }}
          >
            X
          </button>
        </div>

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
                    // editMode="row"
                    
                    checkboxSelection
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={handleRowModesModelChange}
                    // onRowEditStop={handleRowEditStop}
                    // processRowUpdate={processRowUpdate}
                    // slots={{
                    // toolbar: EditToolbar,
                    // }}
                    // slotProps={{
                    // toolbar: { setRows, setRowModesModel },
                    // }}
                />
                </Box>
             
      </div>
    </div>

  )}