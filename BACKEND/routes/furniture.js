const router = require("express").Router();
let furniture = require("../models/furniture");

//add data
router.route("/add").post((req, res) => {
    const Item_Code = req.body.Item_Code;
    const Item_Name = req.body.Item_Name;
    const Quantity = Number(req.body.Quantity);
  



    const newFurniture = new furniture({
        Item_Code,
        Item_Name,
        Quantity,
    })

    newFurniture.save().then(() => {
        res.json("New Furniture added"); //give a response from json format
    }).catch((err) => {
        console.log(err);
    })

})

//fetch data
router.route("/").get((req, res)=>{

    furniture.find().then(( furniture) => {
        res.json( furniture);
    }).catch((err) => {
        console.log(err);
    })
})


//update data
router.route("/update/:id").put(async (req, res) => {  //async - wait until a promise is coming
    let Id = req.params.id;

    /*const name = req.body.name;*/
    const {Item_Code,
        Item_Name,
        Quantity,} = req.body; //Destructure

    const updateTimber = {
        Item_Code,
        Item_Name,
        Quantity,
       
    }

    const update = await  furniture.findByIdAndUpdate(Id, updateTimber)//await - wait until the update is finished
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

    await  furniture.findByIdAndDelete(Id)//await - wait until the deletion is finished
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

    const fetch = await  TimberLogs.findById(Id)//await - wait until the deletion is finished
    .then(( TimberLogs) => {
        res.status(200).send({status: "Data fetched", TimberLogs})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with getting data", error: err.message});

    })
})

module.exports = router;