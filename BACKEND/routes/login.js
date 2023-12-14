const router = require('express').Router();
let login = require('../models/login');

router.post('/add', (req, res) => {
  //creates new customer

  const { Email, Password } = req.body;

  const newLogin = new login({
    Email,
    Password,
  });

  newLogin
    .save()
    .then(() => {
      res.json('New Login added'); //give a response from json format
    })
    .catch((err) => {
      console.log(err);
    });
});

//update data
router.route('/update/:id').put(async (req, res) => {
  //async - wait until a promise is coming
  let Id = req.params.id;

  //const name = req.body.name;
  const Email = req.body.Email;
  const password = req.body.Password;

  console.log(Id,Email, password); //Destructure

  const UpdateCustomer = {
    Email,
    password
  };

  const update = await login
    .findByIdAndUpdate(Id, UpdateCustomer) //await - wait until the update is finished
    .then(() => {
      res.status(200).send({ status: 'Login data updated' });
      console.log('Login data updated');
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

  await customer
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

//fetch data by id
router.get('/:Email', async (req, res) => {
  const details = await login.findOne({ Email: req.params.Email });

  res.send(details.Password);
});

module.exports = router;
