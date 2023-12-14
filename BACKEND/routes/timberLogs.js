const router = require("express").Router();
let timberLogs = require("../models/timberLogs");

//add data
router.route("/add").post((req, res) => {
    const Log_No = req.body.Log_No;
    const Length = req.body.Length;
    const Girth = req.body.Girth;
    const Volume = req.body.Volume;
    const Timber_Type = req.body.Timber_Type;
    const Date = req.body.Date;


    const newTimber = new timberLogs({
        Log_No,
        Timber_Type,
        Length,
        Girth,
        Volume,
        Date
    })

    newTimber.save().then(() => {
        res.json("New Timber added"); //give a response from json format
    }).catch((err) => {
        console.log(err);
    })

})

//fetch data
router.route("/").get((req, res)=>{

    timberLogs.find().then(( TimberLogs) => {
        res.json( TimberLogs);
    }).catch((err) => {
        console.log(err);
    })
})


//update data
router.route("/update/:id").put(async (req, res) => {  //async - wait until a promise is coming
    let Id = req.params.id;

    /*const name = req.body.name;*/
    const {Log_No,Length,Girth,Volume,Timber_Type,Date} = req.body; //Destructure

    const updateTimber = {
        Log_No,
        Length,
        Girth,
        Volume,
        Timber_Type,
        Date
       
    }

    const update = await  timberLogs.findByIdAndUpdate(Id, updateTimber)//await - wait until the update is finished
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

    await  timberLogs.findByIdAndDelete(Id)//await - wait until the deletion is finished
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

router.get("/report/:year/:month", async (req, res) => {
    try {
      const { year, month } = req.params;
      const report = await timberLogs.aggregate([
        {
          $match: {
            Date: {
              $gte: new Date(year, month - 1, 1),
              $lt: new Date(year, month, 1),
            },
          },
        },
        {
          $project: {
            _id: 0,
            Date:1,
           Log_No:1,
            Length:1,
            Girth:1,
            Volume:1,
            Timber_Type:1,
          },
        },
      ]);
  
      res.json(report);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


module.exports = router;