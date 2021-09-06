const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const db = require('../db')

router.route('/seats').get((req, res) => {
  res.json(db.seats);  
});

router.route('/seats/:id').get((req, res) => {
  res.json(db.seats[req.params.id]);
});

router.route('/seats').post((req, res) => {
  const data = {
    id: uuidv4(),
    performer: req.body.performer,
    genre: req.body.genre,
    price: req.body.price,
    day: req.body.day,
    image: req.body.image,
  }
  db.seats.push(data);
  res.json({message: 'OK'});
});

router.route('/seats/:id').delete((req, res) => {
  db.seats.splice(`${req.params.id}`, 1);
  res.json({message: 'OK'});
});

router.route('/seats/:id').put((req, res) => {
  db.seats[req.params.id].performer = req.body.performer;
  db.seats[req.params.id].genre = req.body.genre;
  db.seats[req.params.id].price = req.body.price;
  db.seats[req.params.id].day = req.body.day;
  db.seats[req.params.id].image = req.body.image;
  res.json({message: 'OK'});
});

module.exports = router;