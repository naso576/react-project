const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser')

const db = require("./models");
const { findAll , create,findPatient} = require("./controllers/patients.controller");
const  {createHistory1,findHistory1, updateHistory,updateHistory1,updateHistory2, findPatientHistory  } = require("./controllers/history1.controller");
const {createTemplate, viewTemplates,cntTemplates,templateCounter,gettemplateCounter} = require("./controllers/templates.controller");


const patientroute = require('./routes/patients.routes');
const history1route =require('./routes/history1.routes');
const templateroute = require('./routes/templates.routes');
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
app.use(bodyParser.urlencoded({ extended: true }))

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


app.use(bodyParser.json());
app.use("/api",patientroute);
app.use("/api",history1route);
app.use("/api",templateroute);
app.get("/find", findAll);
app.get("/viewTemplates",viewTemplates);
app.get("/cntTemplates",cntTemplates);
app.get("/findPatient/:id",findPatient);

app.get("/findPatientHistory/:id",findPatientHistory);
app.get("/gettemplateCounter",gettemplateCounter);
// app.put("templateCounter",templateCounter);

app.put("/templateCounter",cors(corsOptions), templateCounter , function(req,res){
  return res.send({key:'success'})

}
);
app.post("/register",cors(corsOptions), create, function(req,res)
            {
            res.send({key:'successfull'})

             }
        );

app.post("/addhistory1", cors(corsOptions),createHistory1, function(req,res){
           // console.log("Using Body-parser: ", req.body.disease);
            return res.send({key:'success'})

          });
app.get("/findHistory",findHistory1);
app.put("/updateHistory",cors(corsOptions), updateHistory , function(req,res){
          return res.send({key:'success'})

}
);

app.put("/updateHistory1",cors(corsOptions), updateHistory1 , function(req,res){
  return res.send({key:'success'})

}
);


app.put("/updateHistory2",cors(corsOptions), updateHistory2 , function(req,res){
  return res.send({key:'success'})

}
);



app.post("/createTemplate", cors(corsOptions),createTemplate, function(req,res){
  // console.log("Using Body-parser: ", req.body.disease);
   return res.send({key:'success'})

 });

 


require("./routes/patients.routes");

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});