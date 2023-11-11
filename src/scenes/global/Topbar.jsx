import { Box, IconButton, Link, useTheme } from "@mui/material";
import { useContext } from "react";
import {useHistory, useNavigate} from 'react-router-dom';
import { ColorModeContext, tokens } from "../../theme";
import { InputBase } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

import NotificationOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import SearchIcon from "@mui/icons-material/Search";
import styled from "@emotion/styled";
import SignInSide from "../../scenes/sign-in";

const styleBox =styled(Box);

const Topbar =() =>{


const theme =useTheme();

const colors =tokens(theme.palette.mode);
const colorMode = useContext(ColorModeContext);


const navigate = useNavigate();
const handleIconClick = ( ) => {

 /*   history.push('../../scenes/sign-in'); */
 navigate('/sign-in');

}

return (

<Box display="flex" justifyContent="space-between" p={2}>

<Box display="flex" borderRadius="3px" backgroundColor={colors.primary[400]}
>
<InputBase sx={{ml:2,flex:1}} placeholder="Search"></InputBase>
<IconButton type="button" sx ={{ p : 1}}>
<SearchIcon/>

</IconButton>
</Box>

<Box display="flex"> 

<IconButton onClick={colorMode.toggleColorMode}>
{theme.palette.mode === "dark" ?

(

<DarkModeOutlinedIcon/>

) : (
    <LightModeOutlinedIcon/>)
}



</IconButton>

<IconButton>
< NotificationOutlinedIcon/>
</IconButton>

<IconButton>
<SettingsOutlinedIcon/>

</IconButton>
<IconButton onClick={handleIconClick}>
<LoginIcon />

</IconButton>
</Box>
</Box>


); 
}

export default Topbar;