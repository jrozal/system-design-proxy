require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const app = express();
require('newrelic');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/../client'));
app.use('/rooms/:id', express.static(__dirname + '/../client'));

const PORT = 5000;
const PORT_AVAILABILITY = 5001;
const PORT_PHOTOS = 5005;
const PORT_USERS = 5007;
const USE_LOCAL = true;

const PHOTOS_API_URL = USE_LOCAL ? `http://localhost:${PORT_PHOTOS}` : process.env.PHOTOS_API_URL;

app.get('/photos-service.js', (req, res, next) => {
  axios.get(`${PHOTOS_API_URL}/photos-service.js`)
  .then( (photosBundle) => {
    console.log('got a request to photos bundle');
    res.send(photosBundle.data);
  })
  .catch((err) => {
    console.log(err, 'error getting photos bundle');
    res.sendStatus(404);

  })
})

app.get('/rooms/:id/getPhotosByRoomId', (req, res) => {
  axios.get(`${PHOTOS_API_URL}/rooms/${req.params.id}/getPhotosByRoomId`)
  .then( (photosRes) => {
    res.send(photosRes.data);
  })
  .catch((err) => {
    console.log(err, 'could not GET photos by room id')
    res.send(examplePhotos.examplePhotos);
  })
})

app.post('/rooms/:id/addPhotosByRoomID', (req, res) => {
  axios.post(`${PHOTOS_API_URL}/rooms/${req.params.id}/addPhotosByRoomID`, req.body)
    .then(data => res.send(data.data))
    .catch(err => {
      console.log('could not POST photo data', err)
      res.status(500)
    })
})

console.log(`listening on port ${PORT}`);
app.listen(PORT);

module.exports = app;