const express = require('express');
const debug = require('debug')('app:productsRouter');
const { MongoClient, ObjectID } = require('mongodb');

const products = require('../data/products.json');

const productsRouter = express.Router();

productsRouter.route('/').get((req, res) => {
  const url =
    'mongodb+srv://dbuser:CaLMeb9ASSmtic6S@cluster0.sf1rv42.mongodb.net/?retryWrites=true&w=majority';
  const dbName = 'ProductsDB';

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug('Connected to the mongo DB');

      const db = client.db(dbName);

      const products = await db.collection('products').find().toArray();

      res.render('products', { products });
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  })();
});

productsRouter.route('/:id').get((req, res) => {
  const id = req.params.id;
  const url =
    'mongodb+srv://dbuser:CaLMeb9ASSmtic6S@cluster0.sf1rv42.mongodb.net/?retryWrites=true&w=majority';
  const dbName = 'ProductsDB';

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug('Connected to the mongo DB');
     const db = client.db(dbName);    
     debugger;
     const product = await db.collection('products').findOne({id: Number(id)});

     res.render('product', { product });
    }

      catch (error) {
      debug(error.stack);
    }
    client.close();
  })();
});

module.exports = productsRouter;
