const router = require("express").Router();
let product = require('../models/products');

/*
router.route("/").post( async (req, res) => {
    try {

        const product = await Products (req.body).save();
        res.status().send({data: product, message: "product created successfully"})
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"})
    }
})*/


router.post("/",(req, res) => {

    const {itemNo, itemName, category, timberType, size, price, image} = req.body;


    const newProduct = new product ({
        itemNo,
        itemName,
        category,
        timberType,
        size,
        price,
        image
    })

    newProduct.save().then(() => {
        res.json("New Product added"); //give a response from json format
    }).catch((err) => {
        console.log(err);
    })

})

// Get all songs
router.get("/", async (req, res) => {
    try {
        const products = await product.find();
        res.status(200).send({data: products})
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"})
    }
})


//update data
router.put("/:id", async (req, res) => {  //async - wait until a promise is coming
    let Id = req.params.id;

    //const name = req.body.name;
    const {itemNo,
        itemName,
        category,
        timberType,
        size,
        price,
        image} = req.body; //Destructure

    const updateProduct = {
        itemNo,
        itemName,
        category,
        timberType,
        size,
        price,
        image
       
    }

    const update = await product.findByIdAndUpdate(Id, updateProduct)//await - wait until the update is finished
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

    await product.findByIdAndDelete(Id)//await - wait until the deletion is finished
    .then(() => {
        res.status(200).send({status: "Data deleted"})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with deleting data", error: err.message});

    })
})


//fetch data by id
router.get('/:itemNo', async (req, res) => {
    try {
      const item = await product.findOne({ itemNo: req.params.itemNo });
      if (!item) {
        return res.status(404).send('Item not found');
      }
      const itemDetails = {
        itemName: item.itemName,
        price: item.price,
        image: item.image
      };
      
      res.send(itemDetails);
      
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });

module.exports = router;