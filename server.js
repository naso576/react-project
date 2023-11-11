const express = require("express");
const cors = require("cors");

const db = require("./models");
const { findAll , create,findOne} = require("./controllers/patients.controller");
const patientroute = require('./routes/patients.routes');
const app = express();
// const findAll = require('./routes/patients.routes');

var corsOptions = {
  origin: "http://localhost:3001",
  credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
    allowedHeaders :'content-type'
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route



app.use("/api",patientroute);
app.get("/find", findAll);
app.get("/findbydate",findOne);
app.post("/register",cors(corsOptions), create);


require("./routes/patients.routes");

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});