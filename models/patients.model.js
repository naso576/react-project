module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
          profileNo : String,
        firstName: String,
        lastName: String,
        gender : String,
        age : Number,
        occupation: String,
        contact:Number,
        address1 : String,
        address2: String,
        // complaints: String,
        // duration:String,
        consultDate : String
        
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const patients = mongoose.model("patient_profiles", schema);
    return patients;
  };