const router = require("express").Router();
let leaveRequest = require("../models/leaveRequest");

//add data
router.route("/add").post((req, res) => {
    const employeeNo = req.body.employeeNo;
    const employeeName= req.body.employeeName;
    const from = req.body.from;
    const to= req.body.to;
    const reason = req.body.reason;
   

    const newLeaveRequest = new leaveRequest({
        employeeNo,
        employeeName,
        from,
        to,
        reason,
      
    })

    newLeaveRequest.save().then(() => {
        res.json("Leave Submitted"); //give a response from json format
    }).catch((err) => {
        console.log(err);
    })

})

//fetch data
router.route("/").get((req, res)=>{

    leaveRequest.find().then((leaveRequest) => {
        res.json(leaveRequest);
    }).catch((err) => {
        console.log(err);
    })
})


//update data
router.route("/update/:id").put(async (req, res) => {  //async - wait until a promise is coming
    let Id = req.params.id;

    //const name = req.body.name;
    const {employeeNo,
        employeeName,
        from,
        to,
        reason} = req.body; //Destructure

    const UpdateleaveRequest = {
        employeeNo,
        employeeName,
        from,
        to,
        reason
       
    }

    const update = await leaveRequest.findByIdAndUpdate(Id, UpdateleaveRequest
        )//await - wait until the update is finished
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

    await leaveRequest.findByIdAndDelete(Id)//await - wait until the deletion is finished
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
    .then((leaveRequest) => {
        res.status(200).send({status: "Data fetched",leaveRequest})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with getting data", error: err.message});

    })
}

)

router.get("/get/:year/:month", async (req, res) => {
    const { year, month } = req.params;
    const records = await leaveRequest.find({
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
      const report = await leaveRequest.aggregate([
        {
          $match: {
            from: {
              $gte: new Date(year, month - 1, 1),
              $lt: new Date(year, month, 1),
            },
          },
        },
        {
          $project: {
            _id: 0,
            employeeNo: 1,
            employeeName: 1,
            from:1,
            to:1,
            reason:1
          },
        },
      ]);
  
      res.json(report);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });




module.exports = router;