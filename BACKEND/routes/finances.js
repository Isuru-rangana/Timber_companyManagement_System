const router = require("express").Router();
let finance = require("../models/finance");

//Create
router.route("/add").post((req, res) => {
    const transaction_id = req.body.transaction_id;
    const transaction = req.body.transaction;
    const amount = Number(req.body.amount);
    const type = req.body.type;
    const date = req.body.date;

    const newFinance = new finance({
        transaction_id, 
        transaction,
        amount,
        type,
        date
    })

    newFinance.save().then(() => {
        res.json("New Transaction record added"); //give a response from json format
    }).catch((err) => {
        console.log(err);
    })
})


//View

router.route("/").get((req, res)=>{

    finance.find().then((transaction) => {
        res.json(transaction);
    }).catch((err) => {
        console.log(err);
    })
})

//Update

router.route("/update/:id").put(async (req, res) => {  //async - wait until a promise is coming
    let Id = req.params.id;

    /*const name = req.body.name;*/
    const {transaction_id, transaction, amount, type,date} = req.body; //Destructure

    const updateTransaction = {
        transaction_id,
        transaction,
        amount,
        type,
        date
       
    }

    const update = await finance.findByIdAndUpdate(Id, updateTransaction)//await - wait until the update is finished
    .then(() => {
        res.status(200).send({status: "Record updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});

    })
})

router.route("/delete/:id").delete(async (req, res) => {
    let Id = req.params.id;
    
    await finance.findByIdAndDelete(Id)
    .then(() => {
        res.status(200).send({status: "Record Deleted"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with deleting data", error: err.message});

    })
})

router.route("/get/:id").get(async (req, res)=>{
    let Id = req.params.id;

    const data = await finance.findById(Id)
    .then(() => {
        res.status(200).send({status: "Data Fetched", data: data})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error fetching data", error: err.message});

    })
})

router.get("/report/:year/:month", async (req, res) => {
  try {
    const { year, month } = req.params;
    const report = await finance.aggregate([
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
          transaction_id: 1,
          transaction: 1,
          amount:1,
          type:1,
          date:1
        },
      },
    ]);

    res.json(report);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;