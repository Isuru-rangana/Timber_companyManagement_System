const router = require('express').Router();
let customer = require('../models/customer');
//import nodemailer
const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'woodmasters574@gmail.com',
    pass: 'lofkfoafptumclqg',
  },
});
//add data
router.route('/add').post((req, res) => {
  const CustomerName = req.body.CustomerName;
  const Email = req.body.Email;
  const ContactNo = req.body.ContactNo;
  const Address = req.body.Address;
  const newCustomer = new customer({
    CustomerName,
    Email,
    ContactNo,
    Address,
  });

  //nedemailer mail options
  const mailOptions = {
    from: 'woodmasters574@gmail.com',
    to: Email,
    subject: 'New Customer Registration',
    text: `Dear ${CustomerName}, \n Your account has been created successfully, Stay connected with us. \n\n Email: ${Email} \n Contact No: ${ContactNo} \n Address: ${Address}
        (This is system generated Email from "WOOD MASTERS" timber company management system) \n\n\n
        /*Do not reply to this email*/`,
  };

  newCustomer
    .save()
    .then(() => {
      res.json('New Customer added'); //give a response from json format
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
//fetch data
router.route('/').get((req, res) => {
  customer
    .find()
    .then((customer) => {
      res.json(customer);
    })
    .catch((err) => {
      console.log(err);
    });
});
//update data
router.route('/update/:id').put(async (req, res) => {
  //async - wait until a promise is coming
  let Id = req.params.id;
  /*const name = req.body.name;*/
  const { CustomerName, Email, ContactNo, Address } = req.body; //Destructure
  const updateCustomer = {
    CustomerName,
    Email,
    ContactNo,
    Address,
  };
  const Update = await customer
    .findByIdAndUpdate(Id, updateCustomer) //await - wait until the update is finished
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
//delete data
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
router.route('/get/:id').get(async (req, res) => {
  //async - wait until a promise is coming
  let Id = req.params.id;
  const fetch = await customer
    .findById(Id) //await - wait until the deletion is finished
    .then((customer) => {
      res.status(200).send({ status: 'Data fetched', customer });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: 'Error with getting data', error: err.message });
    });
});
router.get('/profile/:Email', async (req, res) => {
  try {
    const details = await customer.findOne({ Email: req.params.Email });
    res.json(details);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;