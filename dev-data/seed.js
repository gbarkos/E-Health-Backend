const Doctor = require('./../models/doctorModel');
const Hospital = require('./../models/hospitalModel');
//const Diagnosis = require('./../models/diagnosisModel');
//const Prescription = require('./../models/prescriptionModel');

const doctorData = [
    {
        name: "Kostas",
        surname: "Papadopoulos",
        //speciality: "Radiologist"
    },
    {
        name: "Yannis",
        surname: "Yannakis",
        //speciality: "Dermatologist"
    },
    {
        name: "Yorgos",
        surname: "Alexiou",
        //speciality: "Ophtalmologist"
    },
    {
        name: "Maria",
        surname: "Karyoti",
        //speciality: "Cardiologist"
    },
    {
        name: "Anastasia",
        surname: "Efthimiou",
        //speciality: "Neurologist"
    },
    {
        name: "Kyriaki",
        surname: "Sotiriou",
        //speciality: "Pathologist"
    }
];

const hospitalData = [
    {
        name: "Ippokratio General Hospital",
        prefecture: "Thessaloniki",
        departments: ["Pathology", "Neurology"]
    },
    {
        name: "General Hospital of Giannitsa",
        prefecture: "Pella",
        departments: ["Cardiology", "Dermatology", "Opthalmology"]
    },
    {
        name: "Sismanogleio General Hospital",
        prefecture: "Rodopi",
        departments: ["Radiology"]
    },
    {
        name: "General Hospital of Rethymno",
        prefecture: "Rethymno",
        departments: ["Radiology", "Cardiology"]
    },
    {
        name: "Evaggelismos",
        prefecture: "Attica",
        departments: ["Cardiology", "Ophtalmology", "Radiology", "Dermatology"]
    },
    {
        name: "General Hospital of Volos",
        prefecture: "Magnesia",
        departments: ["Neurology", "Patholoy"]
    }
];

const deleteData = async () => {
    try{
        //await Appointment.deleteMany();
        //await Prescription.delteMany();
        //await Diagnosis.deleteMany();
        await Doctor.deleteMany();
        await Hospital.deleteMany();
        //await User.deleteMany();
        console.log('Data succesfully deleted');
    }catch(err){
        console.log(err);
    }
}

const insertData = async () => {
    try{
        await Doctor.create(doctorData);
        await Hospital.create(hospitalData);
        console.log('Data succesfully inserted')
    }catch(err){
        console.log(err);
    }
}

async function seedDB(){
    await deleteData();
    await insertData();
}

module.exports = seedDB;

