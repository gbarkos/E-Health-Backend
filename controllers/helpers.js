module.exports.randomBloodType = () => {
    let bloodTypes = ["A+","A-","B+","B-","0+","0-","AB+","AB-"];
    return bloodTypes[Math.floor(Math.random()*bloodTypes.length-1)]; 
}
