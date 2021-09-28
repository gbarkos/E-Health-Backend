const Doctor = require('./../models/doctorModel');


module.exports.findaDoctor = async () => {
    const doctors = await Doctor.find({});

    index = Math.floor(Math.random() * (doctors.length-1 - 0) + 0);
    
    console.log(doctors);

    return doctors[index]._id;
}




 