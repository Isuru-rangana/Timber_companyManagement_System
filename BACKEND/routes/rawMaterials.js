const router = require("express").Router();
let rawMaterials = require("../models/rawMaterials");


//add data
router.post("/add",(req, res) => {

    const Materials_Id = req.body.Materials_Id;
    const Materials_Name = req.body.Materials_Name;
    const Quantity = req.body.Quantity;
    const Price = req.body.Price;


    const newrawmaterials = new rawMaterials({
        Materials_Id,
        Materials_Name,
        Quantity,
        Price,
    })

    newrawmaterials.save().then(() => {
        res.json("New raw materials added"); //give a response from json format
    }).catch((err) => {
        console.log(err);
    })

})

//fetch data
router.route("/").get((req, res)=>{

    rawMaterials.find().then((rawMaterials) => {
        res.json(rawMaterials);
    }).catch((err) => {
        console.log(err);
    })
})


//update data
router.route("/update/:id").put(async (req, res) => {  //async - wait until a promise is coming
    let Id = req.params.id;

    //const name = req.body.name;
    const { Materials_Id,Materials_Name,Quantity, Price,} = req.body; //Destructure

    const updaterawmaterials = {
        Materials_Id,
        Materials_Name,
        Quantity,
        Price,
    }

    const update = await rawMaterials.findByIdAndUpdate(Id, updaterawmaterials)//await - wait until the update is finished
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

    await rawMaterials.findByIdAndDelete(Id)//await - wait until the deletion is finished
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

    const fetch = await rawMaterials.findById(Id)//await - wait until the deletion is finished
    .then((rawMaterials) => {
        res.status(200).send({status: "Data fetched",rawMaterials})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with getting data", error: err.message});

    })
})

module.exports = router;