const router = require("express").Router();
let employee = require("../models/employee");

//add data
router.route("/add").post((req, res) => {
    const employeeNo = req.body.employeeNo;
    const NIC = req.body.NIC;
    const employeeName= req.body.employeeName;
    const employeeAddress = req.body.employeeAddress;
    const employeeContactNo= req.body.employeeContactNo;
    const employeeJobTitle = req.body.employeeJobTitle;
   

    const newEmployee = new employee({
        employeeNo,
        NIC,
        employeeName,
        employeeAddress,
        employeeContactNo,
        employeeJobTitle,
      
    })

    newEmployee.save().then(() => {
        res.json("New Employee added"); //give a response from json format
    }).catch((err) => {
        console.log(err);
    })

})

//fetch data
router.route("/").get((req, res)=>{

    employee.find().then((employee) => {
        res.json(employee);
    }).catch((err) => {
        console.log(err);
    })
})


//update data
router.route("/update/:id").put(async (req, res) => {  //async - wait until a promise is coming
    let Id = req.params.id;

    //const name = req.body.name;
    const { employeeNo,
        NIC,
        employeeName,
        employeeAddress,
        employeeContactNo,
        employeeJobTitle,} = req.body; //Destructure

    const UpdateEmployee = {
        employeeNo,
        NIC,
        employeeName,
        employeeAddress,
        employeeContactNo,
        employeeJobTitle,
       
    }

    const update = await employee.findByIdAndUpdate(Id, UpdateEmployee
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

    await employee.findByIdAndDelete(Id)//await - wait until the deletion is finished
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
    .then((employee) => {
        res.status(200).send({status: "Data fetched",employee})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with getting data", error: err.message});

    })
})

module.exports = router;