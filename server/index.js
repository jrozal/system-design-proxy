var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
var axios = require('axios');
const app = express();
//const CancelToken = axios.CancelToken;
require('dotenv');
require('newrelic');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var exampleAvailableDates = require('./exampleData/exampleAvailableDates.js');
var examplePhotos = require('./exampleData/examplePhotos.js');
var exampleUser = require('./exampleData/exampleUser.js');
var exampleSummary = require('./exampleData/exampleSummary.js');
var exampleMorePlaces = require('./exampleData/exampleMorePlaces.js');
var exampleTitle = require('./exampleData/exampleTitle.js');

var PORT = 5000;
var PORT_AVAILABILITY = 5001;
var PORT_PHOTOS = 5005;
var PORT_USERS = 5007;
var PORT_SUMMARY = 5002;
var USE_LOCAL = true;
// var AXIOS_TIMEOUT = 100000;

// var source = CancelToken.source();

// setTimeout(() => {
//   source.cancel();
// }, AXIOS_TIMEOUT);

AVAILABILITY_API_URL = USE_LOCAL ? `http://localhost:${PORT_AVAILABILITY}` : `http://ec2-54-149-117-186.us-west-2.compute.amazonaws.com:5001`;
USERS_API_URL = USE_LOCAL ? `http://localhost:${PORT_USERS}` : `http://ec2-52-24-37-226.us-west-2.compute.amazonaws.com:5007`;
PHOTOS_API_URL = USE_LOCAL ? `http://localhost:${PORT_PHOTOS}` : `http://ec2-18-191-199-80.us-east-2.compute.amazonaws.com:5005`; //update later
SUMMARY_API_URL = USE_LOCAL ? `http://localhost:${PORT_SUMMARY}` : `http://ec2-54-149-117-186.us-west-2.compute.amazonaws.com:5002`; //update later
MORE_PLACES_API_URL = USE_LOCAL ? '' : `http://ec2-54-203-153-69.us-west-2.compute.amazonaws.com:5008`;
TITLE_API_URL = USE_LOCAL ? '' : `http://ec2-18-191-199-80.us-east-2.compute.amazonaws.com:5006`;


app.use(cors());
app.use(express.static(__dirname + '/../client/dist'));

app.use('/rooms/:id', express.static(__dirname + '/../client/dist'));


// app.get('/header.js', (req, res, next) => {
//   console.log('requesting header bundle');
//   axios.get('https://fec-gnocchi-user-profile.s3-us-west-2.amazonaws.com/header.js')
//   .then( (headerBundle) => {
//     console.log('got a request to header bundle');
//     res.send(headerBundle.data);
//   })
//   .catch((err) => {
//     console.log(err, 'error getting header bundle');
//     res.sendStatus(404);
//   })
// })

// app.get('/title-service.js', (req, res, next) => {
//   console.log('requesting header bundle');
//   axios.get('https://react-bundles.s3.us-east-2.amazonaws.com/title-service.js')
//   .then( (titleBundle) => {
//     console.log('got a request to title bundle');
//     res.send(titleBundle.data);
//   })
//   .catch((err) => {
//     console.log(err, 'error getting title bundle');
//     res.sendStatus(404);
//   })
// })

// app.get('/footer.js', (req, res, next) => {
//   console.log('requesting footer bundle');
//   axios.get('https://footer-bundle.s3-us-west-2.amazonaws.com/footer.js')
//   .then( (footerBundle) => {
//     console.log('got a request to footer bundle');
//     res.send(footerBundle.data);
//   })
//   .catch((err) => {
//     console.log(err, 'error getting footer bundle');
//     res.sendStatus(404);
//   })
// })

// app.get('/places.js', (req, res, next) => {
//   console.log('requesting more places bundle');
//   axios.get('https://fec-gnocchi-user-profile.s3-us-west-2.amazonaws.com/places.js')
//   .then( (placesBundle) => {
//     console.log('got a request to more places bundle');
//     res.send(placesBundle.data);
//   })
//   .catch((err) => {
//     console.log(err, 'error getting more places bundle');
//     res.sendStatus(404);
//   })
// })

// app.get('/bundle_availability.js', (req, res, next) => {
//   console.log('requesting availability bundle');
//   axios.get('https://availability-bundle.s3-us-west-2.amazonaws.com/bundle_availability.js')
//   .then( (availabilityBundle) => {
//     console.log('got a request to availability bundle');
//     res.send(availabilityBundle.data);
//   })
//   .catch((err) => {
//     console.log(err, 'error getting availability bundle');
//     res.sendStatus(404);
//   })
// })

// app.get('/summary.js', (req, res, next) => {
//   console.log('requesting summary bar bundle');
//   axios.get('https://summarybundle-mockairbnb.s3-us-west-2.amazonaws.com/summary.js')
//   .then( (summaryBundle) => {
//     console.log('got a request to summary bundle');
//     res.send(summaryBundle.data);
//   })
//   .catch((err) => {
//     console.log(err, 'error getting summary bundle');
//     res.sendStatus(404);
//   })
// })

// app.get('/users.js', (req, res, next) => {
//   console.log('requesting users bundle');
//   axios.get('https://fec-gnocchi-user-profile.s3-us-west-2.amazonaws.com/users.js')
//   .then( (usersBundle) => {
//     console.log('got a request to users bundle');
//     res.send(usersBundle.data);
//   })
//   .catch((err) => {
//     console.log(err, 'error getting users bundle');
//     res.sendStatus(404);

//   })
// })

app.get('/photos-service.js', (req, res, next) => {
  console.log('requesting photos bundle');
  axios.get(`http://localhost:${PORT_PHOTOS}/photos-service.js`)
  .then( (photosBundle) => {
    console.log('got a request to photos bundle');
    res.send(photosBundle.data);
  })
  .catch((err) => {
    console.log(err, 'error getting photos bundle');
    res.sendStatus(404);

  })
})

// app.get('/rooms/:id/availableDates', (req, res) => {
//   axios.get(`${AVAILABILITY_API_URL}/rooms/${req.params.id}/availableDates`)
//   .then( (availableDatesRes) => {
//     res.send(availableDatesRes.data);
//   })
//   .catch( (err) => {
//     console.log(err, 'could not GET available dates');
//     res.send(exampleAvailableDates.exampleData);
//   })
// });

// app.get('/rooms/:id/minNightlyRate', (req, res) => {
//   axios.get(`${AVAILABILITY_API_URL}/rooms/${req.params.id}/minNightlyRate`)
//   .then( (minRateRes) => {
//     res.send(minRateRes.data);
//   })
//   .catch((err) => {
//     console.log(err, 'could not GET nightly rate');
//     res.send({minNightlyRate: 434});
//   })
// })

// app.get('/users/:id/', (req, res) => {
//   axios.get(`${USERS_API_URL}/users/${req.params.id}`)
//   .then( (usersRes) => {
//     res.send(usersRes.data);
//   })
//   .catch((err) => {
//     console.log(err)
//     console.log('could not GET user data');
//     res.send(exampleUser.exampleUser);
//   })
// })


// app.get('/rooms/:id/summary', (req, res) => {
//   axios.get(`${SUMMARY_API_URL}/rooms/${req.params.id}/summary`)
//   .then( (summaryRes) => {
//     res.send(summaryRes.data);
//   })
//   .catch((err) => {
//     console.log(err, 'could not GET summary info');
//     res.send(exampleSummary.exampleSummary);
//   })
// })

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

// app.get('/places/:id', (req, res) => {
//   axios.get(`${MORE_PLACES_API_URL}/places/${req.params.id}`)
//   .then( (placesRes) => {
//     res.send(placesRes.data);
//   })
//   .catch((err) => {
//     console.log(err, 'could not GET more places')
//     res.send(exampleMorePlaces);
//   })
// })

// app.get('/rooms/:id/title', (req, res) => {
//   axios.get(`${TITLE_API_URL}/rooms/${req.params.id}/title`)
//   .then( (titleRes) => {
//     res.send(titleRes.data);
//     console.log('SENDING TITLE: ', titleRes.data);
//   })
//   .catch((err) => {
//     console.log(err, 'could not GET title')
//     res.send(exampleTitle);
//   })
// });

console.log(`listening on port ${PORT}`);
app.listen(PORT);

module.exports = app;