const router = require("express").Router();
let supplier = require("../models/supplier");


//add data
router.post("/add",(req, res) => {

    const supplierId = req.body.supplierId;
    const supplierName = req.body.supplierName;
    const  phone = req.body.phone;
    const email = req.body.email;
    

    const newsupplier = new supplier({
        supplierId,
        supplierName,
        phone,
        email,
        
    })

    newsupplier.save().then(() => {
        res.json("New supplier order created"); //give a response from json format
    }).catch((err) => {
        console.log(err);
    })

})

//fetch data
router.route("/").get((req, res)=>{

    supplier.find().then((supplier) => {
        res.json(supplier);
    }).catch((err) => {
        console.log(err);
    })
})


//update data
router.route("/update/:id").put(async (req, res) => {  //async - wait until a promise is coming
    let Id = req.params.id;

    //const name = req.body.name;
    const {supplierId, supplierName, phone, email,} = req.body; //Destructure

    const updateSupplier = {
        supplierId,
        supplierName,
        phone,
        email,
        
       
    }

    const update = await supplier.findByIdAndUpdate(Id, updateSupplier)//await - wait until the update is finished
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

    await supplier.findByIdAndDelete(Id)//await - wait until the deletion is finished
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

    const fetch = await supplier.findById(Id)//await - wait until the deletion is finished
    .then((supplier) => {
        res.status(200).send({status: "Data fetched",supplier})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with getting data", error: err.message});

    })
})

module.exports = router;