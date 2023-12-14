const router = require("express").Router();
let purchaseOrder = require("../models/purchaseOrder");


//add data
router.post("/add",(req, res) => {
    const date = req.body.date;
    const purchaseOrderNo = req.body.purchaseOrderNo;
    const supplierName = req.body.supplierName;
    const  itemName = req.body. itemName;
    const quantity = req.body.quantity;
    const amount = req.body.amount;



    const newpurchaseOrder = new purchaseOrder({
        date,
        purchaseOrderNo,
        supplierName,
        itemName,
        quantity,
        amount,
    })
    newpurchaseOrder.save().then(() => {
        res.json("New Purchase order created"); //give a response from json format
    }).catch((err) => {
        console.log(err);
    })
})
//fetch data
router.route("/").get((req, res)=>{
    purchaseOrder.find().then((purchaseOrder) => {
        res.json(purchaseOrder);
    }).catch((err) => {
        console.log(err);
    })
})
//update data
router.route("/update/:id").put(async (req, res) => {  //async - wait until a promise is coming
    let Id = req.params.id;

    //const name = req.body.name;
    const {date, purchaseOrderNo, supplierName, itemName, quantity,amount} = req.body; //Destructure

    const updatePurchaseOrder = {
        date,
        purchaseOrderNo,
        supplierName,
        itemName,
        quantity,
        amount,


    }
    const update = await purchaseOrder.findByIdAndUpdate(Id, updatePurchaseOrder)//await - wait until the update is finished
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
    await purchaseOrder.findByIdAndDelete(Id)//await - wait until the deletion is finished
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
    const fetch = await purchaseOrder.findById(Id)//await - wait until the deletion is finished
    .then((purchaseOrder) => {
        res.status(200).send({status: "Data fetched",purchaseOrder})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with getting data", error: err.message});
    })
})

router.get("/report/:year/:month", async (req, res) => {
    try {
      const { year, month } = req.params;
      const report = await purchaseOrder.aggregate([
        {
          $match: {
            date: {
              $gte: new Date(year, month - 1, 1),
              $lt: new Date(year, month, 1),
            },
          },
        },
        {
          $project: {
            _id: 0,
            purchaseOrderNo: 1,
            supplierName: 1,
            itemName: 1,
            quantity: 1,
            amount: 1,
          },
        },
      ]);

      res.json(report);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;