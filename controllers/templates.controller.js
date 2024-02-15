const db = require("../models/");
const Template = db.templates;
const TemplateCounter =db.counters;


exports.createTemplate = (req, res) => {

const arr = JSON.stringify(req.body);
const arr1 = JSON.parse(arr);
    console.log('asoerhzsd  '+JSON.stringify(req.body));
 const   template = new Template ({


    templateID : req.body.templateId,
    templateName : req.body.templateName,
    prescriptionName : req.body.templateDesc,
    medicineUsage : arr1.medicineusage

 });

 template
 .save(template)
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
}




exports.viewTemplates =(req,res) => {

    Template.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Templates."
      });
    });
  }

  exports.cntTemplates =(req,res)=>{

  //  const doccnt= Template.find({}).count();
  //  console.log('somes' + doccnt);
  //  return doccnt;

  Template.find({})
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Templates."
    });
  });
  }

  exports.templateCounter =(req,res)=>{

    console.log('enter');

    TemplateCounter.findOneAndUpdate(
        {id:"autoval"},
        {"$inc":{"templateID": 1}}
        ,
        {new: true}
       
    ).exec();
  };

  exports.gettemplateCounter =(req,res)=>{

    TemplateCounter.find({}).then(data=>{
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Templates."
      });
    });
  }