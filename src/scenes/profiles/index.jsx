import { Box, Button, TextField, Autocomplete, Select,MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import * as React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';
import AddDetails from "../addComorbidities";
import { useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";
import NativeSelect from '@mui/material/NativeSelect';


const  Options ={ 
  Option1: "female",
  Option2 : "male",
  Option3 : "others"
};

const durationOptions = {

  Option1: "days",
  Option2 : "weeks",
  Option3 : "months"
}

const PatientProfile = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [data,setData] = useState("");
  const today = new Date();

  const month = today.getMonth()+1;

  const year = today.getFullYear();
  const day = today.getDate();
  const randomNumberInRange = (min, max) => { 
    return Math.floor(Math.random()  
            * (max - min + 1)) + min; 
}; 

const num =randomNumberInRange(1, 500);
const currentdate = year.toString()+month.toString()+day.toString()+num.toString();


  const handleFormSubmit =  (values) => {

    axios.post('http://localhost:3000/register',values).then(res => 
    {
     // console.log('success'+res.data);
      setData(res.data );
    }
    ).catch(err => console.log('error'));

 //  console.log(values);

 
  
   console.log('success'+data.key);
   handleSubmit(data);

  };
  

  const [initialValues,setValues ] = useState({
    firstName: "",
    lastName: "",
    age:"",
    occupation: "",
    contact: "",
    address1: "",
    address2: "",
    duration:"",
    gender : Options.Option1.toString(),
    complaints: "",
    durationTime :durationOptions.Option1.toString(),
    profileNo : currentdate.toString(),
  });
  
  const handleChange =(event) =>{
  
    setValues({...initialValues, [event.target.name]:[event.target.value]})
  }
  
  

   const [gender, setGender] = React.useState('female');
   const [duration,setDuration] =React.useState("");

  const handleGender = (event) => {
    setGender(event.target.value);
  };


  const [value1, setValue1] = React.useState('days');

  const handleDuration = (event) => {
    setValue1(event.target.value);
    setDuration(event.target.duration);


  };
  const navigate = useNavigate();
  console.log('currentDate is'+currentdate)
 // const history = useHistory();
const handleSubmit=(profileNo) =>{
  console.log('profileNo is'+profileNo)
  // navigate('/profiles/addComorbidities');
  //  navigate( '/profiles/addComorbidities',{state : {profileNo :currentdate}}  )

navigate('historyPage2', {state : {profileNo : currentdate}});

 // history.push({ pathname: "/profiles/addComorbidities", state: currentDate });

}




  return (
    <div>
    <Box m="20px">
      <Header title="CREATE PATIENT PROFILE" subtitle="Create a New Patient Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          setFieldValue,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />

            <FormControl sx={{ gridColumn: "span 2" }}>
                  <FormLabel id="demo-row-radio-buttons-group-label" >Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="gender"
                    value={values.gender.toString()}
                    onChange={handleChange}                
                  >
                    <FormControlLabel value={Options.Option1.toString()} control={<Radio />} label="Female" />
                    <FormControlLabel value={Options.Option2.toString()} control={<Radio />} label="Male" />
                    <FormControlLabel value={Options.Option3.toString()} control={<Radio />} label="Other" />
                  
                  </RadioGroup>
                </FormControl >
                <TextField
                 fullWidth
                 variant="filled"
                 type="number"
                 label="Age"
                 onBlur={handleBlur}
                 onChange={handleChange}
                 value={values.age}
                 name="age"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
                error={!!touched.age && !!errors.age}
                helperText={touched.age && errors.age}
                sx={{ gridColumn: "span 2" }}
                />


              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Occupation"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.occupation}
                name="occupation"
                error={!!touched.occupation && !!errors.occupation}
                helperText={touched.occupation && errors.occupation}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 1"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address1}
                name="address1"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 2"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address2}
                name="address2"
                error={!!touched.address2 && !!errors.address2}
                helperText={touched.address2 && errors.address2}
                sx={{ gridColumn: "span 2" }}
              />
               {/* <Autocomplete
                    freeSolo
                    multiple
                    limitTags={10}
                    id="complaints"
                    options={top10Complaints}
                    getOptionLabel={(option) => option.title}
                    name="complaints"
                       onChange={(event,value)=> setFieldValue("complaints",value.map((option) => option.title))}
                   
                    renderInput={(params) => (
                      <TextField {...params} 
                      label="Complaints" 
                      name="complaints"
                     
                      placeholder="Favorites" 
                      error={!!touched.complaints && !!errors.complaints}
                helperText={touched.complaints && errors.complaints}
                      />
                    )}
                    sx={{ gridColumn: "span 2" }}
                    
                />
             
            
                  <TextField
                fullWidth
                variant="filled"
                type="number"
                 label ="Duration"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.duration}
                name="duration"
                error={!!touched.duration && !!errors.duration}
                helperText={touched.duration && errors.duration}
                sx={{ gridColumn: "span 1", width :'200px' }}
              />

                  <FormControl >
                  <FormLabel id="duration-group" />
                  <RadioGroup
                    row
                    aria-labelledby="duration-group-label"
                    name="durationTime"
                    value={values.durationTime.toString()}
                    onChange={handleChange} 
                    
                  >
                    
                    <FormControlLabel value={durationOptions.Option1.toString()} control={<Radio />} label="Day/s" />
                    <FormControlLabel value={durationOptions.Option2.toString()} control={<Radio />} label="Week/s" />
                    <FormControlLabel value={durationOptions.Option3.toString()} control={<Radio />} label="Month/s" />
                  </RadioGroup>
                </FormControl>
                 */}

            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained" >
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>

    </Box>
  
   
   </div>
   


  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
 age: yup.string().required("required"),
  occupation :yup.string().required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
  // duration: yup.string().required("required"),
});


const top10Complaints = [
{ title: 'Swelling of face' },
{ title: 'Swelling of feet' },
{ title: 'breathing difficulty' },
{ title: 'decreased urine output'},
{ title: 'red colored urine' },
{ title: 'frothing of urine' },
{ title: 'body and backaches' },
{ title: 'burning micturtion'},
{ title: "dribbling of urine" },
{ title: 'loin to groin pain' },
{ title: 'fever' },
{ title: 'found to have elevated creatinine on general checkup' },
{ title: 'found to have abnormal anatomy of kidney' },
];

export default PatientProfile;