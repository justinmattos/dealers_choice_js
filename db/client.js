const { Client } = require('pg');
const postgresURL = 'postgres://localhost/dealerschoice';

const client = new Client(postgresURL);

client
  .connect()
  .then(() => console.log('connected to database'))
  .catch((err) => console.error('database connection error', err));

module.exports = client;
