import { Box, IconButton,FormControlLabel } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import axios from "axios";
import React, {useState, useEffect} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import {useHistory, useNavigate} from 'react-router-dom';



 
 
const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);


  const navigate = useNavigate();
const handleIconClick = ( ) => {

  /*   history.push('../../scenes/sign-in'); */
  navigate('/manageprofiles');
 
 }


  const MatEdit = ({ index }) => {

    const handleEditClick = () => {
        // some action
    }
  
  
    return <FormControlLabel
               control={
                   <IconButton color="secondary" aria-label="add an alarm" onClick={handleIconClick} >
                       <EditIcon style={{color: colors.blueAccent[500]}}/>
                   </IconButton>
               }
           />
  };
  

  const fetchInfo = () => {
    return axios.get('http://localhost:3000/find').then((res) => setData(res.data));
  };

  useEffect(() => {
    fetchInfo();
  }, []);


  const columns = [
    
    { field: "profileNo", headerName: "Registrar ID" },
    {
      field: `firstName`||`lastName`,
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "contact",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 1,
    },
    {
      field: "consultDate",
      headerName: "Consult Date",
      flex: 1,
    },
    {
      field: "address1",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "address2",
      headerName: "City",
      flex: 1,
    },
    {
      field: "complaints",
      headerName: "Complaints",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Edit",
      sortable: false,
      width: 140,
      disableClickEventBubbling: true,
      renderCell: (params) => {
          return (
              <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                  <MatEdit index={params.row.id} />
               </div>
          );
       }
    }

   
  ];

  return (
    <Box m="20px">
      <Header
        title="PATIENTS LIST"
        subtitle="List of Patients for Future Reference"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        
        />
       

      </Box>
    </Box>
  );
};

export default Contacts;