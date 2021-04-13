const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const app = express();
//const CancelToken = axios.CancelToken;
require('dotenv');
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
const USE_LOCAL = false;
// const AXIOS_TIMEOUT = 100000;

// const source = CancelToken.source();

// setTimeout(() => {
//   source.cancel();
// }, AXIOS_TIMEOUT);

AVAILABILITY_API_URL = USE_LOCAL ? `http://localhost:${PORT_AVAILABILITY}` : `http://ec2-54-149-117-186.us-west-2.compute.amazonaws.com:5001`;
USERS_API_URL = USE_LOCAL ? `http://localhost:${PORT_USERS}` : `http://ec2-52-24-37-226.us-west-2.compute.amazonaws.com:5007`;
PHOTOS_API_URL = USE_LOCAL ? `http://localhost:${PORT_PHOTOS}` : `http://ec2-18-223-109-128.us-east-2.compute.amazonaws.com:5005`;


app.get('/photos-service.js', (req, res, next) => {
  console.log('requesting photos bundle');
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