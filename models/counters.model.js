

module.exports = mongoose =>{

    
    var schema = mongoose.Schema(
        {
            id : String,
           templateID : Number,
  
          
        },
        { timestamps: true }
      );

      schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });

      const counters = mongoose.model("counters", schema);
      return counters;

}