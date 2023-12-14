let cart = require('../models/shoppingcart');
const router = require('express').Router();

router.post('/add', (req, res) => {
  const email = req.body.email;
  const itemNo = req.body.itemNo;

  const newItem = new cart({
    email,
    itemNo,
  });

  newItem
    .save()
    .then(() => {
      res.json('New item added to cart'); //give a response from json format
    })
    .catch((err) => {
      console.log(err);
    });
});

//update data
router.route('/update/:id').put(async (req, res) => {
  //async - wait until a promise is coming
  let Id = req.params.id;

  const {quantity} = req.body;

  const updateCartItem = {
    quantity,
  };

  const update = await cart
    .findByIdAndUpdate(Id, updateCartItem) //await - wait until the update is finished
    .then(() => {
      res.status(200).send({ status: 'Data updated' });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: 'Error with updating data', error: err.message });
    });
});

//delete data by id
router.route('/delete/:id').delete(async (req, res) => {
  //async - wait until a promise is coming
  let Id = req.params.id;

  await cart
    .findByIdAndDelete(Id) //await - wait until the deletion is finished
    .then(() => {
      res.status(200).send({ status: 'Data deleted' });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: 'Error with deleting data', error: err.message });
    });
});

//delete all records
router.delete("/clear/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const deletedRecords = await cart.deleteMany({ email });
    res.status(200).json({ message: "Records deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//fetch data by email
router.get('/:email', async (req, res) => {
  try {
    const items = await cart.find({ email: req.params.email });
    if (!items || items.length === 0) {
      return res.status(404).send('No items found');
    }
    const itemDetails = items.map((item) => {
      return {
        id: item._id,
        itemNo: item.itemNo,
        quantity: item.quantity,
      };
    });

    res.send(itemDetails);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
