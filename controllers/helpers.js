const Doctor = require('./../models/doctorModel');
const Hospital = require('./../models/hospitalModel');
const Diagnosis = require('./../models/diagnosisModel');


module.exports.findaDoctor = async () => {
    const doctors = await Doctor.find({});

    index = Math.floor(Math.random() * (doctors.length-1 - 0) + 0);
    
    return doctors[index]._id;
}
//returns a randon boodtype
module.exports.randomBloodType = () => {
    const bloodTypes = ["A+","A-","B+","B-","0+","0-","AB+","AB-"];
    return bloodTypes[Math.floor(Math.random()*bloodTypes.length-1)]; 
}

const findaHospital = async () => {
    const hospitals = await Hospital.find({});

    index = Math.floor(Math.random() * (hospitals.length-1 - 0) + 0);
    
   // console.log(hospitals);

    return hospitals[index]._id;
}

const createADiagnosis = async (userID) => {
   // consol.log(user);
    const doctor = await this.findaDoctor();
    const hospital = await findaHospital();    
    const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent gravida facilisis leo, eget eleifend quam faucibus vitae. Etiam sed neque tempor, tristique leo nec, rutrum eros. Ut efficitur lacinia dolor. Proin lobortis interdum finibus. In sagittis pharetra ante auctor dictum. Etiam est purus, ullamcorper a tellus id, hendrerit tincidunt risus."

    const diagnosis = {
        hospital: hospital,
        user: userID,
        doctor: doctor,
        description: description
    };

    const newDiagnosis = await Diagnosis.create(diagnosis);

    //return newDiagnosis ? newDiagnosis : false;

}

module.exports.createRandomDiagnosis = async (userID) => {
    let j = Math.floor(Math.random() * (10 - 0) + 0);
    console.log("num of diag: ");
    console.log(j);
    for(let i = 1; i<=j; i++) {
        await createADiagnosis(userID);
    }
}

