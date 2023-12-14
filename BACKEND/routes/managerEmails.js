const router = require('express').Router();
const manager = require('../models/managerEmails');


router.route("/").get((req, res)=>{

    manager.find().then((manager) => {
        res.json(manager);
    }).catch((err) => {
        console.log(err);
    })
})

router.get('/:email', async (req, res) => {
    try {
      const managers = await manager.findOne({ email: req.params.email });
     
      res.send(managers.email);
      
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });

/*
router.get('/:email', async (req, res) => {
  try {
    const item = await manager.findOne({ itemNo: req.params.itemNo });
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
});*/
  
module.exports = router;