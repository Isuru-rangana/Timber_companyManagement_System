const router = require("express").Router();
let vehicle = require("../models/vehicle");


//add data
router.post("/add",(req, res) => {

    const vehicleNo = req.body.vehicleNo;
    const vehicleType = req.body.vehicleType;
    const fuelConsumptionRate = Number(req.body.fuelConsumptionRate);
    const driverID = req.body.driverID;
    const drivingLicenseNo = req.body.drivingLicenseNo;

    


    const newVehicle = new vehicle({
        vehicleNo,
        vehicleType,
        fuelConsumptionRate,
        driverID,
        drivingLicenseNo,
    })

    newVehicle.save().then(() => {
        res.json("New Vehicle added"); //give a response from json format
    }).catch((err) => {
        console.log(err);
    })

})

//fetch data
router.route("/").get((req, res)=>{

    vehicle.find().then((vehicle) => {
        res.json(vehicle);
    }).catch((err) => {
        console.log(err);
    })
})


//update data
router.route("/update/:id").put(async (req, res) => {  //async - wait until a promise is coming
    let Id = req.params.id;

    //const name = req.body.name;
    const {vehicleNo, vehicleType, fuelConsumptionRate, driverID, drivingLicenseNo} = req.body; //Destructure

    const updateVehicle = {
        vehicleNo,
        vehicleType,
        fuelConsumptionRate,
        driverID,
        drivingLicenseNo,
       
    }

    const update = await vehicle.findByIdAndUpdate(Id, updateVehicle)//await - wait until the update is finished
    .then(() => {
        res.status(200).send({status: "Data updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});

    })
})


//delete data
router.route("/delete/:id").delete(async (req, res) => {  //async - wait until a promise is coming
    let Id = req.params.id;

    await vehicle.findByIdAndDelete(Id)//await - wait until the deletion is finished
    .then(() => {
        res.status(200).send({status: "Data deleted"})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with deleting data", error: err.message});

    })
})


//fetch data by id
router.route("/get/:id").get(async (req, res) => {  //async - wait until a promise is coming
    let Id = req.params.id;

    const fetch = await vehicle.findById(Id)//await - wait until the deletion is finished
    .then((vehicle) => {
        res.status(200).send({status: "Data fetched",vehicle})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with getting data", error: err.message});

    })
})

module.exports = router;