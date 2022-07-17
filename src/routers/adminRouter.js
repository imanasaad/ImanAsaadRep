const { greenBright } = require('chalk');
const express = require('express');
const debug = require('debug')('app:adminRouter');
const { MongoClient } = require('mongodb');
const products = require('../data/products.json');

const adminRouter = express.Router();

adminRouter.route('/').get((req, res) => {
  const url =
    'mongodb+srv://dbuser:CaLMeb9ASSmtic6S@cluster0.sf1rv42.mongodb.net/?retryWrites=true&w=majority';
  const dbName = 'cluster0';

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug('Connected to the mongo DB');

      const db = client.db(dbName);

      const response = await db.collection('products').insertMany(products);
      res.json(response);
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  })();
});

module.exports = adminRouter;
