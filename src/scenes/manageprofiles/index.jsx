import React, { useState, useCallback } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import axios from "axios";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
class ManageProfiles extends React.Component{

    state = {
        result : []

    }

componentDidMount =() =>{

    this.findPatient();
}

 findPatient = () => {


    axios.get('http://localhost:3000/find').then(
        (res) => {
            console.log('success');
            const data = res.data;
            this.setState({result : data})
    
             }
    ).catch(err =>alert('error')
    );


}

render() {

console.log("search page");
return(
    <div>                 
        {
           <ManageProfile/>
        
        /* {this.state.result.map(item => (
             <ManageProfile rowData={item} handleClick={this.state.result}/>
        ))} */}
 </div>               
  );

}
}




const SearchBar = ({setSearchQuery}) => {

  const [value, setValue] = useState('Name');
  const [labelName,setLabelName] =useState('Enter Full Name');
  const [selectedDate,setselectedDate] =useState(null);
  


  const [toggle, setToggle] = useState(false);
  const [textfieldtoggle,setTextfieldtoggle]=useState(true);

const handleChange = (event) => {

  setValue(event.target.value);

  console.log(event.target.value);

  if (event.target.value === 'Date'){

    setLabelName('Pick the date');
    setToggle(true);
    setTextfieldtoggle(false);

  }
  if (event.target.value === 'ProfileNo'){

    setLabelName('Enter Registar No');
    setToggle(false);
    setTextfieldtoggle(true);
  }

  if (event.target.value === 'Name'){

    setLabelName('Enter Full Name');
    setToggle(false);
    setTextfieldtoggle(true);
  }

};

 return(

    <form>
      <div>
              <label>

Search by

<select value={value} onChange={handleChange}>

  <option value="Name" name="">Name</option>

  <option value="Date" name="">Date</option>

  <option value="ProfileNo" name="">RegistarNo</option>

</select>

</label>

     {textfieldtoggle && (
      <TextField
        id="search-bar"
        className="text"
        onInput={(e) => {
          setSearchQuery(e.target.value);
        }}
        label={labelName}
        variant="outlined"
        placeholder="Search..."
        size="small"
      />
     )}
     {toggle && (
      <DatePicker
          id="datepicker"
          selected={selectedDate}
          onChange={date=>setselectedDate(date)}
          dateFormat='dd/MM/yyyy'
          filterDate={date=>date.getDay() !== 6 && date.getDay()!== 0}
          isClearable
          showYearDropdown
          scrollableMonthYearDropdown
          
      />
     )}
      
      
      <IconButton type="submit" aria-label="search">
        <SearchIcon style={{ fill: "blue" }} />
      </IconButton>

      </div>
    </form>
 )
      };

  const filterData = (query, data) => {
    if (!query) {
      return data;
    } else {
      return data.filter((d) => d.toLowerCase().includes(query));
    }
  };

  const data = [
    
  ];

  function ManageProfile(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const dataFiltered = filterData(searchQuery, data);

  return (
    
    <div
      style={{
        display: "flex",
        alignSelf: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: 20
      }}
    >
        <div>
        <p style={{}}>Search Page</p>
        </div>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div style={{ padding: 3 }}>
        {dataFiltered.map((d) => (
          <div
            className="text"
            style={{
              padding: 5,
              justifyContent: "normal",
              fontSize: 20,
              color: "blue",
              margin: 1,
              width: "250px",
              BorderColor: "green",
              borderWidth: "10px"
            }}
            key={d.id}
          >
            {d}
          </div>
        ))}
      </div>
      {/* <div >
                <p> {props.rowData.firstName} </p>
                <p> {props.rowData.lastName} </p>
                <p> {props.rowData.complaints} </p>
           
      </div> */}
    </div>
   
        
  );
}
  export default ManageProfiles;