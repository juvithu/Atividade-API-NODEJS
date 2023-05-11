const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Define as rotas
router.get('/products', function(req, res) {
  Product.find(function(err, products) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(products);
    }
  });
});

router.get('/products/:id', function(req, res) {
  Product.findById(req.params.id, function(err, product) {
    if (err) {
      res.status(500).send(err);
    } else if (!product) {
      res.status(404).send('Produto não encontrado.');
    } else {
      res.json(product);
    }
  });
});

router.post('/products', function(req, res) {
  const product = new Product(req.body);
  product.save(function(err) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(product);
    }
  });
});

router.put('/products/:id', function(req, res) {
  Product.findById(req.params.id, function(err, product) {
    if (err) {
      res.status(500).send(err);
    } else if (!product) {
      res.status(404).send('Produto não encontrado.');
    } else {
      product.name = req.body.name || product.name;
      product.price = req.body.price || product.price;
      product.description = req.body.description || product.description;

      product.save(function(err) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(product);
        }
      });
    }
  });
});

router.delete('/products/:id', function(req, res) {
  Product.findByIdAndDelete(req.params.id, function(err, product) {
    if (err) {
      res.status(500).send(err);
    } else if (!product) {
      res.status(404).send('Produto não encontrado.');
    } else {
      res.send(`Produto "${product.name}" removido com sucesso.`);
    }
  });
});

module.exports = router;
