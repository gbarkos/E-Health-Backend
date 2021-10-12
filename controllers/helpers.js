const Doctor = require('./../models/doctorModel');
const Hospital = require('./../models/hospitalModel');
const Diagnosis = require('./../models/diagnosisModel');
const Prescription = require('./../models/prescriptionModel');
const Appointment = require('./../models/appointmentModel');

//Math.floor(Math.random() * (max - min + 1)) + min; 

module.exports.findaDoctor = async () => {
    const doctors = await Doctor.find({});

    index = Math.floor(Math.random() * (doctors.length));
    
    return doctors[index]._id;
}
//returns a randon boodtype
module.exports.randomBloodType = () => {
    const bloodTypes = ["A+","A-","B+","B-","0+","0-","AB+","AB-"];
    return bloodTypes[Math.floor(Math.random()*(bloodTypes.length))]; 
}

const findaHospital = async () => {
    const hospitals = await Hospital.find({});

    index = Math.floor(Math.random() * (hospitals.length));

    return hospitals[index]._id;
}

const createADiagnosis = async (userID) => {
    
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

}

module.exports.createRandomDiagnosis = async (userID) => {
    let j = Math.floor(Math.random() * (10) + 1);
    console.log("num of diag: ");
    console.log(j);
    for(let i = 1; i<=j; i++) {
        await createADiagnosis(userID);
    }
}

const createAPrescription = async (userID) => {
    
    const doctor = await this.findaDoctor();
    const hospital = await findaHospital();
    const medicineArray = ["Acetaminophen", "Cyclobenzaprine", "Pantoprazole", "Xanax", "Naproxen","Fentanyl", "Hydroxychloroquine", "Viagra"];  
    const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent gravida facilisis leo, eget eleifend quam faucibus vitae. Etiam sed neque tempor, tristique leo nec, rutrum eros. Ut efficitur lacinia dolor. Proin lobortis interdum finibus. In sagittis pharetra ante auctor dictum. Etiam est purus, ullamcorper a tellus id, hendrerit tincidunt risus."

    const prescription = {
        hospital: hospital,
        user: userID,
        doctor: doctor,
        medicine: medicineArray[Math.floor(Math.random()*(medicineArray.length))],
        description: description
    };

    const newDiagnosis = await Prescription.create(prescription);

}

module.exports.createRandomPrescriptions = async (userID) => {
    let j = Math.floor(Math.random() * (10) + 1);
    console.log("num of presc: ");
    console.log(j);
    for(let i = 1; i<=j; i++) {
        await createAPrescription(userID);
    }
}

const createAnAppointment = async (userID) => {
    const hospital = await findaHospital();
    const datetime = Date.now();

    const appointment = {
        hospital: hospital,
        user: userID,
        date: datetime
    }

    const newAppointment = await Appointment.create(appointment);
}

module.exports.createRandomAppointments = async (userID) => {
    let j = Math.floor(Math.random() * (10) + 1);
    console.log("num of appoint: ");
    console.log(j);
    for(let i = 1; i<=j; i++) {
        await createAnAppointment(userID);
    }
}