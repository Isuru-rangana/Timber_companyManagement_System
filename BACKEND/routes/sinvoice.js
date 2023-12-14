const router = require("express").Router();
const sinvoice = require("../models/sinvoice");
let purchaseOrder = require("../models/sinvoice");


//add data
router.post("/add",(req, res) => {

    const date = req.body.date;
    const invoiceNo = req.body.invoiceNo;
    const supplier = req.body.supplier;
    const amount = req.body.amount;
    const purchaseOrderNo= req.body.purchaseOrderNo;

    const newsinvoice = new sinvoice ({
        date,
        invoiceNo,
        supplier,
        amount,
        purchaseOrderNo
    })

    newsinvoice.save().then(() => {
        res.json("New  invoice created"); //give a response from json format
    }).catch((err) => {
        console.log(err);
    })

})

//fetch data
router.route("/").get((req, res)=>{

    sinvoice.find().then((sinvoice) => {
        res.json(sinvoice);
    }).catch((err) => {
        console.log(err);
    })
})


//update data
router.route("/update/:id").put(async (req, res) => {  //async - wait until a promise is coming
    let Id = req.params.id;

    //const name = req.body.name;
    const {date, invoiceNo, supplier, amount,purchaseOrderNo} = req.body; //Destructure

    const updatesinvoice = {
        date,
        invoiceNo,
        supplier,
        amount,
        purchaseOrderNo
        
        
       
    }

    const update = await sinvoice.findByIdAndUpdate(Id, updatesinvoice)//await - wait until the update is finished
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

    await sinvoice.findByIdAndDelete(Id)//await - wait until the deletion is finished
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

    const fetch = await sinvoice.findById(Id)//await - wait until the deletion is finished
    .then((sinvoice) => {
        res.status(200).send({status: "Data fetched",invoice})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with getting data", error: err.message});

    })
})

module.exports = router;