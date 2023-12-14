let counter = require('../models/counter');
const router = require('express').Router();



router.get('/:model', async (req, res) => {
  try {
    const counters = await counter.findOne({ model: req.params.model });
    if (!counters) {
      return res.status(404).send('No counters found');
    }

    
    res.send(counters.count);
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.route("/get/:id").get(async (req, res) => {  //async - wait until a promise is coming
    let Id = req.params.id;

    const fetch = await counter.findById(Id)//await - wait until the deletion is finished
    .then((counter) => {
        res.status(200).send({status: "Data fetched",counter})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with getting data", error: err.message});

    })
})

module.exports = router;
