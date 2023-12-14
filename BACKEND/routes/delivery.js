const router = require("express").Router();
let delivery = require("../models/delivery");


//add data
router.post("/add",(req, res) => {

    const date = req.body.date;
    const orderNo = req.body.orderNo;
    const vehicleNo = req.body.vehicleNo;
    const status = req.body.status;

    const newDelivery = new delivery({
        date,
        orderNo,
        vehicleNo,
        status,
    })

    newDelivery.save().then(() => {
        res.json("New Delivery added"); //give a response from json format
    }).catch((err) => {
        console.log(err);
    })

})

//fetch data
router.route("/").get((req, res)=>{

    delivery.find().then((delivery) => {
        res.json(delivery);
    }).catch((err) => {
        console.log(err);
    })
})


//update data
router.route("/update/:id").put(async (req, res) => {  //async - wait until a promise is coming
    let Id = req.params.id;

    //const name = req.body.name;
    const {date, orderNo, vehicleNo, status} = req.body; //Destructure

    const updateDelivery = {
        date,
        orderNo,
        vehicleNo,
        status,
       
    }

    const update = await delivery.findByIdAndUpdate(Id, updateDelivery)//await - wait until the update is finished
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

    await delivery.findByIdAndDelete(Id)//await - wait until the deletion is finished
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