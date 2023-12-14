const router = require("express").Router();
const OrderItems = require("../models/orderitems");
let orderitems = require("../models/orderitems");

//add data
router.route("/add").post((req, res) => {
    const OrderNo = Number(req.body.OrderNo);
    const ItemNo = req.body.ItemNo;
    const Quantity = Number(req.body.Quantity);
   

    const newOrderItems = new OrderItems({
        OrderNo,
        ItemNo,
        Quantity,
       
       
    })

    newOrderItems.save().then(() => {
        res.json("Order Items added"); //give a response from json format
    }).catch((err) => {
        console.log(err);
    })

})




//update data
router.route("/update/:id").put(async (req, res) => {  //async - wait until a promise is coming
    let Id = req.params.id;

    /*const name = req.body.name;*/
    const {OrderNo, ItemNo, Quantity} = req.body; //Destructure

    const updateOrderItems = {
        OrderNo,
        ItemNo,
        Quantity,
         
    }

    const Update = await orderitems.findByIdAndUpdate(Id, updateOrderItems)//await - wait until the update is finished
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

    await OrderItems.findByIdAndDelete(Id)//await - wait until the deletion is finished
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

    const fetch = await OrderItems.findById(Id)//await - wait until the deletion is finished
    .then((orderitems) => {
        res.status(200).send({status: "Data fetched",orderitems})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with getting data", error: err.message});

    })
})

router.get('/:OrderNo', async (req, res) => {
    try {
      const items = await OrderItems.find({ OrderNo: req.params.OrderNo });
      if (!items || items.length === 0) {
        return res.status(404).send('No items found');
      }
      const itemDetails = items.map((item) => {
        return {
          id: item._id,
          ItemNo: item.ItemNo,
          Quantity: item.Quantity,
        };
      });
  
      res.send(itemDetails);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
})

module.exports = router;