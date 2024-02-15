module.exports = mongoose => {

  var complaintsHistory = mongoose.Schema({
        complaint : String,
        complaintDuration : String,
        complaintdurationTime : String

  });

    var vaccinationHistory =  mongoose.Schema({
        
       dose : String,
       vaccineDate: String,
      });

      var medicationsHistory = mongoose.Schema({

        disease : String,
        diseaseDuration : String,
        diseaseDurationTime : String,
        medicationdetailsarray : String,

      });

      var drugsHistory =mongoose.Schema({
        drug : String,
        duration :String,
        durationTime : String,
      });
      var examinationHistory =mongoose.Schema({
      
        pulse : String,
        blood_pressure :String,
        respiratory_rate :String,
        temperature : String,
        jvp : String,
        bone_tenderness :String,
        

      });

      var examinations1 = mongoose.Schema({
        pallor :String,
        icterus : String,
        Clubbing : String,
        Cyanosis : String,
        Oedema : String ,
        Iymphadenopathy : String,

      });

      var head2toeExamination = mongoose.Schema({

        hair : String,
        skin : String,
        nails : String,
        eye : String,
        fundus : String,
      });

      var abdominalExamination = mongoose.Schema({

        ascites : String,
        organomegaly : String,
        renal_bruit : String,
      });

    var   investigationsRequired = mongoose.Schema({
          testCode : String,
          // testName : String,
    })

    var schema = mongoose.Schema(
      {
          profileNo : String,
          disease : String,
          duration :    String,
          medications : String,
          complaintsHistory : [complaintsHistory],
          vaccinationHistory : [vaccinationHistory],
          medicationsHistory : [medicationsHistory],
          drugsHistory : [drugsHistory],
          surgicalHistory : String,
          familyHistory : Array,
          menstrualHistory : String,
          pregnancyHistory : String,
          provisionalDiag : String,
          examinationHistory : examinationHistory,
          examinations1 : examinations1,
          head2toeExamination : head2toeExamination,
          abdominalExamination : abdominalExamination,
          cardiacExamination : String,
          respiratoryExamination: String,
          neurologicalExamination: String,
          clinicalDiagnosis: String,
          investigationsRequired : Array,


      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const history1 = mongoose.model("patient_profile_comorbidities_datas", schema);
    return history1;
  };