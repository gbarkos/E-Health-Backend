
// module.exports.generatePrescritpion = async (user) => {
//     let doctorsArray = await Doctor.find({});
//     let doctor = doctorsArray[Math.floor(Math.random()*doctorsArray.length-1)]._id;
//     console.log(doctor);

//     let hospitalsArray = await Hospital.find({});
//     let hospital = hospitalsArray[Math.floor(Math.random()*hospitalsArray.length-1)]._id;
//     console.log(hospital);

//     const medicineArray = ["Acetaminophen", "Cyclobenzaprine", "Pantoprazole", "Xanax", "Naproxen","Fentanyl", "Hydroxychloroquine", "Viagra"];
//     let medicine = medicineArray[Math.floor(Math.random()*medicineArray.length-1)];
//     console.log(medicine);
    
//     let description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent gravida facilisis leo, eget eleifend quam faucibus vitae. Etiam sed neque tempor, tristique leo nec, rutrum eros. Ut efficitur lacinia dolor. Proin lobortis interdum finibus. In sagittis pharetra ante auctor dictum. Etiam est purus, ullamcorper a tellus id, hendrerit tincidunt risus."

//     let prescription = {
//         "hospital": hospital,
//         "user": user,
//         "doctor": doctor,
//         "medicine": medicine,
//         "description": description
//     };
//     
//console.log
(prescription);

//     await Prescription.create(prescription);
//     console.log("OK 1");
// }

// module.exports.generateRandomPrescriptions = async (user) => {
//     
//console.log
(user);
//     let rnd = Math.floor(Math.random() * 10) + 1;
//     console.log("rnd"+rnd);
//     for (let i = 0; i<rnd; i++ ){
        
//         await generatePrescritpion(user);
//         console.log(i);  
//     }
// } 