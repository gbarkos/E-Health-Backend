const Doctor = require('./../models/doctorModel');
const Hospital = require('./../models/hospitalModel');
const Diagnosis = require('./../models/diagnosisModel');
const Prescription = require('./../models/prescriptionModel');
const Appointment = require('./../models/appointmentModel');
const Department = require('./../models/departmentModel');

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

const findaDepartment = async () => {
    const departments = await Department.find({});
    index = Math.floor(Math.random() * (departments.length));
    return departments[index]._id;
}

const createADiagnosis = async (userID) => {
    
    const doctor = await this.findaDoctor();
    const department = await findaDepartment();    
    const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent gravida facilisis leo, eget eleifend quam faucibus vitae. Etiam sed neque tempor, tristique leo nec, rutrum eros. Ut efficitur lacinia dolor. Proin lobortis interdum finibus. In sagittis pharetra ante auctor dictum. Etiam est purus, ullamcorper a tellus id, hendrerit tincidunt risus."
    const now =  new Date(Date.now());
    const createdAt = new Date(
        now.getFullYear(), 
        now.getMonth(), 
        now.getDate(),
        now.getHours(), 
        now.getMinutes(), 
        now.getSeconds(), 
        now.getMilliseconds()-(Math.floor(Math.random() * ((50 * 24 * 60 * 60 * 1000) - 0 + 1)) + 0) 
    );

    const diagnosis = {
        department,
        user: userID,
        doctor,
        description,
        createdAt
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
    const department = await findaDepartment();
    const medicineArray = ["Acetaminophen", "Cyclobenzaprine", "Pantoprazole", "Xanax", "Naproxen","Fentanyl", "Hydroxychloroquine", "Viagra"];  
    const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent gravida facilisis leo, eget eleifend quam faucibus vitae. Etiam sed neque tempor, tristique leo nec, rutrum eros. Ut efficitur lacinia dolor. Proin lobortis interdum finibus. In sagittis pharetra ante auctor dictum. Etiam est purus, ullamcorper a tellus id, hendrerit tincidunt risus."
    const dispensed = (Math.floor(Math.random() * (10 - 0 + 1)) + 0) > 2;
    const now =  new Date(Date.now());
    const createdAt = new Date(
        now.getFullYear(), 
        now.getMonth(), 
        now.getDate(), 
        now.getHours(), 
        now.getMinutes(), 
        now.getSeconds(), 
        now.getMilliseconds()-(Math.floor(Math.random() * ((50 * 24 * 60 * 60 * 1000) - 0 + 1)) + 0) 
    );

    const prescription = {
        department,
        user: userID,
        doctor,
        medicine: medicineArray[Math.floor(Math.random()*(medicineArray.length))],
        description,
        dispensed,
        createdAt
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

const createAnAppointment = async (userID, timeslot) => {
    const datetime = new Date(Date.now());
    const time = timeslot.split(':');
    datetime.setHours(time[0], time[1], 00, 000);
    console.log("inside helpers"+datetime);
    const department = await findaDepartment();

    const appointment = {
        department: department,
        user: userID,
        date: datetime
    }

    const newAppointment = await Appointment.create(appointment);
}

module.exports.createRandomAppointments = async (userID) => {
    const appointmentList = ["09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30"];
    let j = Math.floor(Math.random() * (10) + 1);
    console.log("num of appoint: ");
    console.log(j);
    for(let i = 1; i<=j; i++) {
        let timeslot = appointmentList.pop();
        await createAnAppointment(userID, timeslot);
    }
}