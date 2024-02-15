
const db = require("../models");
const History1 = db.history1;
exports.createHistory1 = (req, res) => {
    // Validate request
   
    console.log("calling history function")
     // Create a Patient

    const arr = (JSON.stringify(req.body)); 
    //const arr1 =(JSON.parse(arr));

    console.log ('arr is :' +arr);

    const arr1 = JSON.parse(arr);
    console.log('array1 is :'+ arr1);
   
    //  arr1.forEach(element => {
            
      // console.log('inside for each'+JSON.parse(arr.vaccinationHistory));
    const history = new History1({


      profileNo :arr1.profileNo,
      // disease: arr1.disease,
      // duration: arr1.duration,
      complaintsHistory : arr1.complaintsHistory,
      medicationsHistory: arr1.medicationsHistory,
      drugsHistory : arr1.drugsHistory,
      vaccinationHistory : arr1.vaccinationHistory,
      familyHistory : arr1.familyHistory,
      surgicalHistory : arr1.surgicalHistory,      
     });
   
    // Save Tutorial in the database
    history
      .save(history)
      .then(data => {
  
      // console.log("values"+complaintsString);
        res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Content-Type", "application/json");
  res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
 
      })
      .catch(err => {
        if(err){

              
       
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the patient profile."
           
        });
      }
      else
      {
res.send('success');

      }

      });
    // });
  };
  
  exports.findHistory1 =(req,res) => {

    History1.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving DATA."
      });
    });
  }

  exports.updateHistory =(req,res,next)=>{

    const arr = (JSON.stringify(req.body)); 
    const arr1 = JSON.parse(arr);
   
   console.log('update function' + arr1.profileNo)


    History1.updateOne({profileNo : arr1.profileNo }, 
                        { vaccinationHistory : arr1.vaccinationHistory, 
                                    surgicalHistory : arr1.surgicalHistory,
                                    familyHistory : arr1.familyHistory,
                                }
                        
                      ).then(data=>{
                        res.send(data)
                      }).catch(err=>{
                        res.status(500).send({
                          message:
                            err.message || "Some error occurred while retrieving data."
                        });
                      });
  };

  
  exports.updateHistory1 =(req,res,next)=>{

    const arr = (JSON.stringify(req.body)); 
    const arr1 = JSON.parse(arr);
   

   var val =arr1.examinationHistory.blood_pressure;

   console.log('value is'+val)
   console.log('update function  ' + JSON.parse(JSON.stringify(req.body.examinationHistory.blood_pressure))) 


    History1.updateOne({profileNo : arr1.profileNo }, 
                        { menstrualHistory : arr1.menstrualHistory, 
                          pregnancyHistory : arr1.pregnancyHistory,
                          provisionalDiag : arr1.provisionalDiag,
                          examinationHistory :arr1.examinationHistory,
                          examinations1 : arr1.examinations1,
                          head2toeExamination : arr1.head2toeExamination,
                          abdominalExamination : arr1.abdominalExamination
                                }
                        
                      ).then(data=>{
                        res.send(data)
                      }).catch(err=>{
                        res.status(500).send({
                          message:
                            err.message || "Some error occurred while updating details."
                        });
                      });
  };



  
  
  exports.updateHistory2 =(req,res,next)=>{

    const arr = (JSON.stringify(req.body)); 
    const arr1 = JSON.parse(arr);
   
   console.log('update function' + req.body.investigationdata)


    History1.updateOne({profileNo : arr1.profileNo }, 
                        { 
                          cardiacExamination : arr1.cardiacExamination,
                  respiratoryExamination :arr1.respiratoryExamination,
                  neurologicalExamination : arr1.neurologicalExamination,
                  clinicalDiagnosis : arr1.clinicalDiag,
                  investigationsRequired : arr1.investigationdata,
                                }
                        
                      ).then(data=>{
                        res.send(data)
                      }).catch(err=>{
                        res.status(500).send({
                          message:
                            err.message || "Some error occurred while updating details."
                        });
                      });
  };



  exports.findPatientHistory = (req, res,next) => {

    const id = req.params.id;
  
    console.log('calling'+id)
  
      History1.find({profileNo:id})
        .then(data => {
          if (!data)
            res.status(404).send({ message: "Not found Tutorial with id " + id });
          else res.send(data);
          // console.log(data);
        })
        .catch(err => {
          res
            .status(500)
            .send({ message: "Error retrieving Tutorial with id=" + id });
        });
  };