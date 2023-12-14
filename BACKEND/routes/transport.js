const router = require("express").Router();
let transportation = require("../models/transport");
let vehicle = require("../models/vehicle");

//add data
router.route("/add").post((req, res) => {
    const date = req.body.date;
    const vehicleNo = req.body.vehicleNo;
    const purchaseOrderNo = req.body.purchaseOrderNo;
    const noOfKms= Number(req.body.noOfKms);
    const fuelConsumption = Number(req.body.fuelConsumption);
    const timberVolume = Number(req.body.timberVolume);

    const newTransportation = new transportation({
        date,
        vehicleNo,
        purchaseOrderNo,
        noOfKms,
        fuelConsumption,
        timberVolume 
    })

    newTransportation.save().then(() => {
        res.json("New transportation added"); //give a response from json format
    }).catch((err) => {
        console.log(err);
    })

})

//fetch data
router.route("/").get((req, res)=>{

    transportation.find().then((transportation) => {
        res.json(transportation);
    }).catch((err) => {
        console.log(err);
    })
})


//update data
router.route("/update/:id").put(async (req, res) => {  //async - wait until a promise is coming
    let Id = req.params.id;

    //const name = req.body.name;
    const {date, vehicleNo, purchaseOrderNo, noOfKms, fuelConsumption, timberVolume} = req.body; //Destructure

    const updateTransportation = {
        date,
        vehicleNo,
        purchaseOrderNo,
        noOfKms,
        fuelConsumption,
        timberVolume
       
    }

    const update = await transportation.findByIdAndUpdate(Id, updateTransportation)//await - wait until the update is finished
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

    await transportation.findByIdAndDelete(Id)//await - wait until the deletion is finished
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

    const fetch = await transportation.findById(Id)//await - wait until the deletion is finished
    .then((transportation) => {
        res.status(200).send({status: "Data fetched",transportation})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with getting data", error: err.message});

    })
})


//report genarate
router.get("/get/:year/:month", async (req, res) => {
    const { year, month } = req.params;
    const records = await transportation.find({
      date: {
        $gte: new Date(year, month - 1, 1),
        $lt: new Date(year, month, 1),
      },
    });
    res.json(records);
  });


router.get("/report/:year/:month", async (req, res) => {
  try {
    const { year, month } = req.params;
    const report = await transportation.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(year, month - 1, 1),
            $lt: new Date(year, month, 1),
          },
        },
      },

    {
      $lookup: {
        from: "vehicles",
        localField: "vehicleNo",
        foreignField: "vehicleNo",
        as: "vehicle",
      },
    },

    {
      $unwind: "$vehicle",
    },

      {
        $group: {
          _id: {
            vehicleNo: "$vehicleNo",
            year: { $year: "$date" },
            month: { $month: "$date" },
          },
          totalNoOfKms: { $sum: "$noOfKms" },
          totalFuelConsumption: { $sum: "$fuelConsumption" },
          totalTimberVolume: { $sum: "$timberVolume" },
          fuelConsumptionRate: { $first: "$vehicle.fuelConsumptionRate" },
        },
      },


      {
        $project: {
          _id: 0,
          vehicleNo: "$_id.vehicleNo",
          year: "$_id.year",
          month: "$_id.month",
          totalNoOfKms: 1,
          totalFuelConsumption:1,
          totalTimberVolume:1,
          fuelConsumptionRate: 1,
          productivity: { $round: [{ $divide: ["$totalTimberVolume", "$totalFuelConsumption"] }, 2] },
          monthlyFuelConsumptionRate: { $round: [{ $divide: ["$totalNoOfKms", "$totalFuelConsumption"] }, 2] },
        },
      },
    ]);

      res.json(report);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;