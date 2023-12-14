const router = require("express").Router();
const Sales = require("../models/sales");
let sales = require("../models/sales");

//add data
router.route("/add").post((req, res) => {
    const OrderNo = Number(req.body.OrderNo);
    const Date = req.body.Date;
    const CustomerID = Number(req.body.CustomerID);
    const Saleprice = Number(req.body.Saleprice);
    const Status = req.body.Status;
   


    const newSales = new Sales({
        OrderNo,
        Date,
        CustomerID,
        Saleprice,
        Status
      
    })

    newSales.save().then(() => {
        res.json("New Sales added"); //give a response from json format
    }).catch((err) => {
        console.log(err);
    })

})


router.route("/cus/add").post((req, res) => {
  const CustomerID = Number(req.body.CustomerID);
  const Saleprice = Number(req.body.Saleprice);


  const newSales = new Sales({
      CustomerID,
      Saleprice,  
  })

  newSales.save().then(() => {
      res.json("New Sales added"); //give a response from json format
  }).catch((err) => {
      console.log(err);
  })

})

//fetch data
router.route("/").get((req, res)=>{

    Sales.find().then((sales) => {
        res.json(sales);
    }).catch((err) => {
        console.log(err);
    })
})


//update data
router.route("/update/:id").put(async (req, res) => {  //async - wait until a promise is coming
    let Id = req.params.id;

    /*const name = req.body.name;*/
    const {OrderNo, Date, CustomerID, Saleprice, Status} = req.body; //Destructure

    const updateSales = {
        OrderNo,
        Date,
        CustomerID,
        Saleprice,
        Status  
        
    }

    const Update = await sales.findByIdAndUpdate(Id, updateSales)//await - wait until the update is finished
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

    await Sales.findByIdAndDelete(Id)//await - wait until the deletion is finished
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

    const fetch = await Sales.findById(Id)//await - wait until the deletion is finished
    .then((sales) => {
        res.status(200).send({status: "Data fetched",sales})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with getting data", error: err.message});

    })
})



router.get("/report/:year/:month", async (req, res) => {
    try {
      const { year, month } = req.params;
      const report = await sales.aggregate([
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
            OrderNo: 1,
            CustomerID: 1,
            Saleprice: 1,
            Status: 1,
            totalSale: { $sum: "$Saleprice" }
          },
        },
      ]);
  
      res.json(report);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.get("/sales/:year/:month", async (req, res) => {
    try {
      const { year, month } = req.params;
      const startOfYearMonth = new Date(year, month - 1, 1);
      const endOfYearMonth = new Date(year, month, 1);
      const totalSales = await sales.aggregate([
        {
          $match: {
            Date: {
              $gte: startOfYearMonth,
              $lt: endOfYearMonth,
            },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$Saleprice" },
          },
        },
      ]);
  
      res.json({ totalSales: totalSales.length ? totalSales[0].total : 0 });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;