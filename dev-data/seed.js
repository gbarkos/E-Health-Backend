const Doctor = require('./../models/doctorModel');
const Hospital = require('./../models/hospitalModel');
const Diagnosis = require('./../models/diagnosisModel');
const Prescription = require('./../models/prescriptionModel');
const User = require('./../models/userModel');
const Appointment = require('./../models/appointmentModel');
const Department = require('./../models/departmentModel');

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
        prefecture: "Thessaloniki"
    },
    {
        name: "General Hospital of Giannitsa",
        prefecture: "Pella"
    },
    {
        name: "Sismanogleio General Hospital",
        prefecture: "Rodopi"
    },
    {
        name: "General Hospital of Rethymno",
        prefecture: "Rethymno"
    },
    {
        name: "Evaggelismos",
        prefecture: "Attica"
    },
    {
        name: "General Hospital of Volos",
        prefecture: "Magnesia"
    }
];

const deleteData = async (connection) => {
    try{
        await Appointment.deleteMany();
        await Prescription.deleteMany();
        await Diagnosis.deleteMany();
        await Doctor.deleteMany();
        await Hospital.deleteMany();
        await User.deleteMany();
        console.log('DB succesfully dumped');
    }catch(err){
        console.log(err);
    }
}

const insertData = async () => {
    try{
        await Doctor.create(doctorData);
        await Hospital.create(hospitalData);
        console.log('Doctor and Hospital data succesfully inserted');
    }catch(err){
        console.log(err);
    }
}

async function seedDB(){
    await deleteData();
    await insertData();
}

module.exports = seedDB;

