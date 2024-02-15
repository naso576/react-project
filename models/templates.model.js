



module.exports = mongoose => {



    var medicineUsage = mongoose.Schema({
        medicine : String,
        dosage : String,
        timing : String,
        freq : String,
        duration : String
  });


    var schema = mongoose.Schema(
      {
         templateID : Number,
         templateName : String,
         prescriptionName : String,
         medicineUsage : [medicineUsage],

        
      },
      { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });

      // autoIncrement.initialize(mongoose.connection);
      // // schema.plugin(autoIncrement.plugin, {
      // //   model: "post", 
      // //   field: "_id", 
      // //   startAt: 1, 
      // //   incrementBy: 1, 
      // // });
      const templates = mongoose.model("prescription_templates", schema);
      return templates;

}