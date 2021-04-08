// artillery helper functions for stress testing
const { v4: uuidv4 } = require('uuid');
const faker = require('faker');
const dotenv = require('dotenv');
dotenv.config();
const AWS_URL = process.env.AWS_URL

const randomNumberGenerator = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// get random id between 9M - 10M (last 10% of dataset)
const getRandomId = (userContext, events, done) => {
  const id = randomNumberGenerator(9000000, 10000000);
  userContext.vars.id = id;
  return done();
};

// post random photo data to database (within last 10% of dataset)
const postRandomData = (userContext, events, done) => {
  const photoNum = randomNumberGenerator(1, 1000);

  const photoId = uuidv4();
  const roomNumber = randomNumberGenerator(9000000, 10000000);
  const name = faker.commerce.productAdjective();
  const caption = faker.commerce.productName();
  const isPrimary = false;
  const storageUrl = `https://${AWS_URL}/${photoNum}.jpg`;

  userContext.vars.roomNumber = roomNumber;
  userContext.vars.photoId = photoId;
  userContext.vars.name = name;
  userContext.vars.caption = caption;
  userContext.vars.isPrimary = isPrimary;
  userContext.vars.storageUrl = storageUrl;

  return done();
};

module.exports = { getRandomId, postRandomData };