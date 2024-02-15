

const db = require("../models/");
const Patient = db.patients;



// Create and Save a new patient profile
exports.create = (req, res) => {
  // Validate request
  if (!req.body.firstName) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
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
  const curdate = day.toString() + '-'+month.toString()+'-'+year.toString();

const duration =req.body.duration.toString()+" "+req.body.durationTime.toString();


  // Create a Patient
  const patient = new Patient({
    profileNo :req.body.profileNo,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    age :req.body.age,
    occupation:req.body.occupation,
    contact:req.body.contact,
    address1: req.body.address1,
    address2: req.body.address2,
    // complaints: req.body.complaints.toString(),
    // duration : duration.toString(),
    consultDate : curdate
  });

  // Save Tutorial in the database
  patient
    .save(patient)
    .then(data => {

    // console.log("values"+complaintsString);
      res.setHeader("Access-Control-Allow-Origin", "*")
res.setHeader("Access-Control-Allow-Credentials", "true");
res.setHeader("Access-Control-Max-Age", "1800");
res.setHeader("Access-Control-Allow-Headers", "content-type");
res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
res.send(data.profileNo);
console.log(data.profileNo);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the patient profile."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const lastName = req.query.lastName;
  //var condition = lastName ? { lastName: { $regex: new RegExp(lastName), $options: "i" } } : {};

  Patient.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single Tutorial with an id
exports.findPatient = (req, res,next) => {

  
  const id = req.params.id;

  console.log('calling'+id)

  Patient.find({profileNo:id})
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

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Patient.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Patient with id=${id}. Maybe Patient was not found!`
        });
      } else res.send({ message: "Patient was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Patient with id=" + id
      });
    });
};

// Delete a Patient with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Patient.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Patient with id=${id}. Maybe Patient was not found!`
        });
      } else {
        res.send({
          message: "Patient was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Patient with id=" + id
      });
    });
};

// Delete all Patients from the database.
exports.deleteAll = (req, res) => {
    Patient.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Patient were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Patients."
      });
    });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
    Patient.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};